"use client";

import { useState } from "react";

import ChatList from "./chat-list";
import ChatPane from "./chat-pane";
import ChatEmpty from "./chat-pane/chat-empty";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import type { Chat } from "@/types/chat";

type ChatProps = {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
};

const chats: Chat[] = [
  {
    id: "1",
    user: {
      name: "Sarah Chen",
      email: "sarah@example.com",
      image: "https://i.pravatar.cc/150?u=sarah",
    },
    unread: true,
    excerpt: "Hey! Are we still on for the meeting tomorrow?",
    timestamp: "2m ago",
  },
  {
    id: "2",
    user: { name: "Marcus Johnson", email: "marcus@example.com" },
    unread: true,
    excerpt: "I just sent over the documents you requested",
    timestamp: "15m ago",
  },
  {
    id: "3",
    user: {
      name: "Emily Rodriguez",
      email: "emily@example.com",
      image: "https://i.pravatar.cc/150?u=emily",
    },
    unread: false,
    excerpt: "Thanks for your help with the project!",
    timestamp: "1h ago",
  },
  {
    id: "4",
    user: {
      name: "David Kim",
      email: "david@example.com",
      image: "https://i.pravatar.cc/150?u=david",
    },
    unread: false,
    excerpt: "Let me know when you're free to chat",
    timestamp: "3h ago",
  },
  {
    id: "5",
    user: { name: "Lisa Thompson", email: "lisa@example.com" },
    unread: false,
    excerpt: "The shipment has been dispatched 📦",
    timestamp: "Yesterday",
  },
];

export default function Chat({ user }: ChatProps) {
  const [activeChatId, setActiveChatId] = useState<string>("1");
  const [sheetOpen, setSheetOpen] = useState(false);

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  const handleSelectChat = (chatId: string) => {
    setActiveChatId(chatId);
    setSheetOpen(false);
  };

  return (
    <div className="h-full w-full">
      {/* Desktop */}
      <div className="hidden h-full w-full grid-cols-[0.45fr_0.55fr] items-stretch gap-4 lg:grid xl:grid-cols-[0.35fr_0.65fr]">
        <ChatList
          activeChatId={activeChatId}
          onSelectChat={handleSelectChat}
          chats={chats}
        />
        {activeChat ? <ChatPane user={activeChat.user} /> : <ChatEmpty />}
      </div>

      {/* Mobile */}
      <div className="flex h-full w-full flex-col lg:hidden">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent
            showCloseButton={false}
            side="left"
            className="w-full max-w-[90vw] p-0 sm:max-w-md"
          >
            <SheetTitle className="sr-only">Chat List</SheetTitle>
            <ChatList
              activeChatId={activeChatId}
              onSelectChat={handleSelectChat}
              chats={chats}
            />
          </SheetContent>
        </Sheet>
        <div className="h-full w-full">
          {activeChat ? (
            <ChatPane
              user={activeChat.user}
              onOpenChatList={() => setSheetOpen(true)}
            />
          ) : (
            <ChatEmpty />
          )}
        </div>
      </div>
    </div>
  );
}
