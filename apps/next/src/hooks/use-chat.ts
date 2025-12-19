import { useEffect, useRef, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io, Socket } from "socket.io-client";
import { generate as generateUuid } from "short-uuid";
import { toast } from "sonner";

import type { RootState, AppDispatch } from "@/lib/store";
import {
  addMessage,
  setMessages,
  updateMessage,
  setIsLoading,
  removeMessage,
} from "@/lib/store/slices/chat-messages";
import { updateChat } from "@/lib/store/slices/chats";
import {
  getMessagesAction,
  insertChatMessageAction,
} from "@/lib/actions/chats";
import { updateUser } from "@/lib/store/slices/users";
import { parsePartialJson } from "@/lib/utils/parse-partial-json";
import { SelectChatMessage } from "@shared/drizzle/schema";
import { BotChatResponse, Chat } from "@/types/chat";

type Props = {
  isBot?: boolean;
  userId: string;
  chatId: string;
  recipientUserId: string;
};

export function useChat({ isBot, userId, chatId, recipientUserId }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const socketRef = useRef<Socket | null>(null);
  const hasFetchedRef = useRef(false);
  const chatRef = useRef<Chat | undefined>(undefined);
  const [isConnected, setIsConnected] = useState(false);
  const [isBotResponding, setIsBotResponding] = useState(false);

  const chat = useSelector((state: RootState) =>
    state.chats.chats.find((c) => c.id === chatId)
  );

  // keep ref in sync with latest chat
  chatRef.current = chat;
  const messages = useSelector(
    (state: RootState) => state.chatMessages.messages[chatId] ?? []
  );
  const isLoadingMessages = useSelector(
    (state: RootState) => state.chatMessages.isLoading[chatId] ?? false
  );

  const fetchMessages = useCallback(async () => {
    // skip if already fetched for this chat
    if (hasFetchedRef.current) return;

    try {
      dispatch(setIsLoading({ chatId, isLoading: true }));

      const fetchedMessages = await getMessagesAction({ chatId });

      const existingIds = new Set(messages.map((m: SelectChatMessage) => m.id));
      const newMessages = fetchedMessages.filter(
        (m: SelectChatMessage) => !existingIds.has(m.id)
      );

      if (newMessages.length >= 1 || messages.length === 0) {
        const allMessages = [...messages, ...newMessages].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        dispatch(setMessages({ chatId, messages: allMessages }));
      }

      hasFetchedRef.current = true;
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      dispatch(setIsLoading({ chatId, isLoading: false }));
    }
  }, [chatId, dispatch, messages]);

  async function connect() {
    if (socketRef.current) return;

    const socket = io(process.env.NEXT_PUBLIC_SERVER_BASE_URL!, {
      withCredentials: true,
      transports: ["websocket"],
      auth: {
        userId: userId,
      },
    });

    socket.on("connect", () => {
      console.log("connected");
      setIsConnected(true);

      // mark chat as read if unread
      const currentChat = chatRef.current;
      const isUnread =
        currentChat?.unread &&
        currentChat.unread.length >= 1 &&
        currentChat.lastMessage?.senderId === recipientUserId;

      if (isUnread) {
        socket.emit("chat:read", { chatId, recipientUserId });
        dispatch(updateChat({ id: chatId, unread: [] }));
      }
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
      setIsConnected(false);
    });

    socket.on("chat:message", (message: SelectChatMessage) => {
      dispatch(addMessage({ chatId: message.chatId, message }));
      dispatch(
        updateChat({
          id: message.chatId,
          lastMessage: message,
          excerpt: message.content,
          unread: [...(chat?.unread ?? []), message.id],
        })
      );
    });

    socket.on("chat:update", (chatUpdate: Partial<Chat> & { id: string }) => {
      dispatch(updateChat(chatUpdate));
    });

    socket.on("chat:read", ({ chatId }: { chatId: string }) => {
      dispatch(updateChat({ id: chatId, unread: [] }));
    });

    socket.on("user:online", ({ userId }: { userId: string }) => {
      dispatch(updateUser({ id: userId, isOnline: true }));
    });

    socket.on("user:offline", ({ userId }: { userId: string }) => {
      dispatch(updateUser({ id: userId, isOnline: false }));
    });

    socket.on("user:online-users", ({ userIds }: { userIds: string[] }) => {
      userIds.forEach((userId) => {
        dispatch(updateUser({ id: userId, isOnline: true }));
      });
    });

    socketRef.current = socket;
  }

  async function sendMessageToBot(content: string) {
    setIsBotResponding(true);

    const message = await insertChatMessageAction({
      data: {
        chatId,
        senderId: userId,
        content,
      },
    });
    dispatch(
      addMessage({
        chatId,
        message: {
          id: message.id,
          chatId,
          content,
          senderId: userId,
          createdAt: new Date().toISOString(),
          modifiedAt: new Date().toISOString(),
        },
      })
    );

    const botMessageId = generateUuid();
    dispatch(
      addMessage({
        chatId,
        message: {
          id: botMessageId,
          chatId,
          content: "",
          senderId: recipientUserId,
          createdAt: new Date().toISOString(),
          modifiedAt: new Date().toISOString(),
        },
      })
    );

    let parsed: BotChatResponse | null = null;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId,
          messageId: message.id,
        }),
      });

      if (!response.body) {
        toast.error("No result in response");
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let result = "";

      try {
        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          const decoded = decoder.decode(value, { stream: true });
          result += decoded;

          const parsedJson = parsePartialJson(result) as BotChatResponse;
          parsed = parsedJson ?? result;

          dispatch(
            updateMessage({
              chatId,
              message: {
                id: botMessageId,
                content: parsed?.response ?? "Empty response.",
                chatId,
                senderId: recipientUserId,
                createdAt: new Date().toISOString(),
                modifiedAt: new Date().toISOString(),
              },
            })
          );
        }
      } catch (error) {
        console.error("error reading stream ", error);
        throw new Error("Error reading stream");
      } finally {
        reader.releaseLock();

        parsed &&
          dispatch(
            updateChat({
              id: chatId,
              excerpt: parsed.response ?? "Empty response.",
            })
          );
      }
    } catch (error: unknown) {
      console.log("error ", error instanceof Error ? error.message : error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again."
      );

      dispatch(removeMessage({ chatId, messageId: botMessageId }));
    } finally {
      setIsBotResponding(false);
    }
  }

  function sendMessage(content: string) {
    if (!isConnected) return;

    socketRef.current?.emit("chat:send", {
      content,
      chatId,
      recipientUserId,
    });
  }

  function markChatAsRead() {
    if (!isConnected) return;
    socketRef.current?.emit("chat:read", { chatId, recipientUserId });
    dispatch(updateChat({ id: chatId, unread: [] }));
  }

  function disconnect() {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  }

  // fetch messages on mount
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // reset fetch flag when chatId changes
  useEffect(() => {
    hasFetchedRef.current = false;
  }, [chatId]);

  // connect to websocket
  useEffect(() => {
    if (isBot) return;

    connect();
    return () => disconnect();
  }, [chatId, recipientUserId]);

  return {
    messages,
    isConnected,
    isLoadingMessages,
    isBotResponding,
    markChatAsRead,
    sendMessage,
    sendMessageToBot,
    disconnect,
  };
}
