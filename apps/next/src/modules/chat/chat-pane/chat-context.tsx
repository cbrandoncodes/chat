"use client";

import { createContext, useContext } from "react";
import { SelectChatMessage } from "@shared/drizzle/schema";

type ChatContextType = {
  chatId: string;
  currentUserId: string;
  recipientUserId: string;
  messages: SelectChatMessage[];
  isConnected: boolean;
  isLoadingMessages: boolean;
  isBotResponding: boolean;
  sendMessage: (content: string) => void;
  sendMessageToBot: (content: string) => void;
};

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: ChatContextType;
}) {
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
}
