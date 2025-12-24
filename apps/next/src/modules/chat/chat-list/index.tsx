import { useState } from "react";

import { Button } from "@/components/ui/button";
import PencilPlusIcon from "@/components/icons/pencil-plus";
import ChatListFilter from "./chat-list-filter";
import ChatListSearch from "./chat-list-search";
import ChatListCore from "./chat-list-core";
import ChatsListEmpty from "./chat-list-empty";
import ChatListSkeleton from "./chat-list-skeleton";
import NewChatPopup from "@/modules/chat/new-chat-popup";
import { cn } from "@/lib/utils";
import { Chat } from "@/types/chat";

type Props = {
  isLoadingChats?: boolean;
  userId: string;
  onSelectChat: ({
    recipientId,
    chatId,
  }: {
    recipientId?: string;
    chatId?: string;
  }) => void;
  chats: Chat[];
  className?: string;
};

export default function ChatList({
  isLoadingChats,
  userId,
  onSelectChat,
  chats,
  className,
}: Props) {
  const [isNewChatPopupOpen, setIsNewChatPopupOpen] = useState(false);
  return (
    <div
      className={cn(
        "bg-background h-auto w-full p-6 lg:rounded-3xl lg:shadow-xs",
        className
      )}
    >
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center justify-between">
          <p className="text-foreground text-xl font-semibold">All Messages</p>

          <div className="relative">
            <Button size="sm" onClick={() => setIsNewChatPopupOpen(true)}>
              <PencilPlusIcon />
              New Message
            </Button>
            <NewChatPopup
              open={isNewChatPopupOpen}
              onOpenChange={setIsNewChatPopupOpen}
              userId={userId}
              onSelectUser={(user) => {
                onSelectChat({ recipientId: user.id });
              }}
            />
          </div>
        </div>

        <div className="flex h-10 items-stretch gap-4">
          <ChatListSearch />
          <ChatListFilter />
        </div>

        {isLoadingChats ? (
          <ChatListSkeleton />
        ) : chats.length === 0 ? (
          <ChatsListEmpty userId={userId} onSelectUser={onSelectChat} />
        ) : (
          <ChatListCore
            userId={userId}
            chats={chats}
            onSelectChat={onSelectChat}
          />
        )}
      </div>
    </div>
  );
}
