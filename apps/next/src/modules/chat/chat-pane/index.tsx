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
  currentUserId?: string;
  recipient?: SelectUser;
};

export default function ChatPane({
  chatId,
  currentUserId,
  recipient,
}: ChatPaneProps) {
  if (!chatId || !currentUserId || !recipient) {
    return <ChatEmpty />;
  }

  return (
    <ChatPaneContent
      chatId={chatId}
      currentUserId={currentUserId}
      recipient={recipient}
    />
  );
}

function ChatPaneContent({
  chatId,
  currentUserId,
  recipient,
}: {
  chatId: string;
  currentUserId: string;
  recipient: SelectUser;
}) {
  const {
    messages,
    isConnected,
    isLoadingMessages,
    sendMessage,
    markChatAsRead,
  } = useChat({
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
        sendMessage,
      }}
    >
      <div className="bg-background flex h-full flex-col rounded-3xl shadow-sm">
        <ChatHeader user={recipient} />
        <ChatMessages markChatAsRead={markChatAsRead} />
        <ChatActions />
      </div>
    </ChatProvider>
  );
}
