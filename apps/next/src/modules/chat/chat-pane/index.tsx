"use client";

import ChatHeader from "./chat-header";
import ChatMessages from "./chat-messages";
import ChatActions from "./chat-actions";
import ChatEmpty from "./chat-empty";
import { ChatProvider } from "./chat-context";
import { useChat } from "@/hooks/use-chat";
import { SelectUser } from "@shared/drizzle/schema";

type ChatPaneProps = {
  chatId?: string;
  isBot?: boolean;
  currentUserId?: string;
  recipient?: SelectUser;
};

export default function ChatPane({
  chatId,
  isBot,
  currentUserId,
  recipient,
}: ChatPaneProps) {
  if (!chatId || !currentUserId || !recipient) {
    return <ChatEmpty />;
  }

  return (
    <ChatPaneContent
      isBot={isBot}
      chatId={chatId}
      currentUserId={currentUserId}
      recipient={recipient}
    />
  );
}

function ChatPaneContent({
  isBot,
  chatId,
  currentUserId,
  recipient,
}: {
  isBot?: boolean;
  chatId: string;
  currentUserId: string;
  recipient: SelectUser;
}) {
  const {
    messages,
    isConnected,
    isLoadingMessages,
    isBotResponding,
    sendMessage,
    sendMessageToBot,
    markChatAsRead,
  } = useChat({
    isBot,
    userId: currentUserId,
    chatId,
    recipientUserId: recipient.id,
  });

  return (
    <ChatProvider
      value={{
        chatId,
        currentUserId,
        recipientUserId: recipient.id,
        messages,
        isConnected,
        isLoadingMessages,
        isBotResponding,
        sendMessage,
        sendMessageToBot,
      }}
    >
      <div className="bg-background flex h-full flex-col rounded-3xl shadow-xs">
        <ChatHeader user={recipient} />
        <ChatMessages markChatAsRead={markChatAsRead} />
        <ChatActions isBot={isBot} />
      </div>
    </ChatProvider>
  );
}
