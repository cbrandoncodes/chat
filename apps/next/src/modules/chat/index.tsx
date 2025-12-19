"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import ChatList from "./chat-list";
import ChatPane from "./chat-pane";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { parseError } from "@/lib/utils";
import { createChatAction, getChatsByUserIdAction } from "@/lib/actions/chats";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setChats,
  addChat,
  setActiveChatId,
  setIsLoading,
} from "@/lib/store/slices/chats";
import { SelectUser } from "@shared/drizzle/schema";

type ChatProps = {
  user: SelectUser;
};

export default function Chat({ user }: ChatProps) {
  const dispatch = useAppDispatch();
  const {
    chats,
    activeChatId,
    isLoading: isLoadingChats,
  } = useAppSelector((state) => state.chats);
  const [sheetOpen, setSheetOpen] = useState(false);

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  async function handleSelectChat({
    chatId,
    recipientId,
  }: {
    chatId?: string;
    recipientId?: string;
  }) {
    if (recipientId) {
      const existingChat = chats.find(
        (chat) => chat.recipient.id === recipientId
      );

      if (existingChat) {
        chatId = existingChat.id;
      } else {
        try {
          const newChat = await createChatAction({
            userId: user.id,
            recipientId,
          });
          dispatch(addChat(newChat));
          chatId = newChat.id;
        } catch (error: unknown) {
          const message = parseError(error);
          toast.error(message);
        }
      }
    }

    chatId && dispatch(setActiveChatId(chatId));
    setSheetOpen(false);
  }

  useEffect(() => {
    (async () => {
      try {
        dispatch(setIsLoading(true));

        const fetchedChats = await getChatsByUserIdAction({ userId: user.id });
        dispatch(setChats(fetchedChats));

        if (!activeChatId && fetchedChats.length >= 1) {
          const latestChat = fetchedChats.reduce((latest, chat) =>
            new Date(chat.modifiedAt) > new Date(latest.modifiedAt)
              ? chat
              : latest
          );
          dispatch(setActiveChatId(latestChat.id));
        }
      } catch (error: unknown) {
        const message = parseError(error);
        toast.error(message);
      } finally {
        dispatch(setIsLoading(false));
      }
    })();
  }, [dispatch, user.id]);

  return (
    <div className="flex h-[calc(100vh-var(--header-height)-2rem)] w-full items-stretch">
      {/* Desktop */}
      <div className="hidden w-full grid-cols-[0.45fr_0.55fr] grid-rows-1 gap-4 lg:grid xl:grid-cols-[0.35fr_0.65fr]">
        <ChatList
          isLoadingChats={isLoadingChats}
          userId={user.id}
          onSelectChat={handleSelectChat}
          chats={chats}
        />
        <ChatPane
          chatId={activeChat?.id}
          currentUserId={user.id}
          recipient={activeChat?.recipient}
        />
      </div>

      {/* Mobile */}
      <div className="flex w-full flex-col lg:hidden">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent
            showCloseButton={false}
            side="left"
            className="w-full max-w-[90vw] p-0 sm:max-w-md"
          >
            <SheetTitle className="sr-only">Chat List</SheetTitle>
            <ChatList
              userId={user.id}
              onSelectChat={handleSelectChat}
              chats={chats}
            />
          </SheetContent>
        </Sheet>
        <div className="w-full">
          <ChatPane
            chatId={activeChat?.id}
            currentUserId={user.id}
            recipient={activeChat?.recipient}
          />
        </div>
      </div>
    </div>
  );
}
