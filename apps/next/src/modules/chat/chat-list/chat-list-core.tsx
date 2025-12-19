import { useMemo, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";

import ChecksIcon from "@/components/icons/checks";
import MessageIcon from "@/components/icons/message";
import ProfileImage from "@/components/profile-image";
import { ScrollArea } from "@/components/ui/scroll-area";
import BotProfileImage from "@/components/bot-profile-image";
import ChatMenu from "@/modules/chat/chat-menu";
import { cn, truncateString } from "@/lib/utils";
import { Chat } from "@/types/chat";

type ChatListCoreProps = {
  userId: string;
  chats: Chat[];
  onSelectChat: ({
    chatId,
    recipientId,
  }: {
    chatId?: string;
    recipientId?: string;
  }) => void;
};

function ChatEntry({
  userId,
  chat,
  onSelectChat,
}: {
  userId: string;
  chat: Chat;
  onSelectChat: ({
    chatId,
    recipientId,
  }: {
    chatId?: string;
    recipientId?: string;
  }) => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { recipient, excerpt, unread, lastMessage } = chat;

  const isBot = recipient?.isBot;
  const isUnread = unread.length >= 1 && lastMessage?.senderId !== userId;
  const timestamp = lastMessage?.createdAt
    ? formatDistanceToNowStrict(lastMessage?.createdAt)
    : undefined;

  return (
    <>
      <div
        className="group bg-background relative flex w-full cursor-pointer items-center gap-2"
        onMouseEnter={() => setIsMenuOpen(true)}
        onMouseLeave={() => setIsMenuOpen(false)}
        onClick={() => onSelectChat({ chatId: chat.id })}
      >
        {isUnread && (
          <div className="bg-primary text-background flex flex-col items-center gap-y-2 rounded-xl p-4">
            <MessageIcon className="size-4" />
            <span className="text-xs font-medium">Unread</span>
          </div>
        )}
        <div
          className={cn(
            "group-hover:bg-muted flex w-full items-center gap-3 rounded-xl p-4 transition-colors duration-300",
            unread && "bg-muted"
          )}
        >
          {isBot ? (
            <BotProfileImage />
          ) : (
            <ProfileImage
              name={recipient.name}
              image={recipient.image ?? undefined}
            />
          )}
          <div className="flex flex-1 flex-col gap-y-1">
            <div className="flex items-center justify-between gap-1">
              <span className="text-sm font-medium">{recipient.name}</span>
              <span className="text-muted-foreground text-xs">{timestamp}</span>
            </div>
            <div className="text-muted-foreground flex w-full items-center justify-between gap-1">
              <p className="text-muted-foreground text-xs">
                {excerpt && excerpt.length >= 1
                  ? truncateString(excerpt, 50)
                  : "No messages yet"}
              </p>
              {lastMessage && (
                <span
                  className={
                    isUnread ? "text-muted-foreground" : "text-primary"
                  }
                >
                  <ChecksIcon className="size-4" />
                </span>
              )}
            </div>
          </div>
        </div>
        <ChatMenu
          isOpen={isMenuOpen}
          onOpenChange={setIsMenuOpen}
          userId={userId}
          chatId={chat.id}
          recipient={recipient}
        />
      </div>
    </>
  );
}

export default function ChatListCore({
  userId,
  chats,
  onSelectChat,
}: ChatListCoreProps) {
  const sortedChats = useMemo(
    () =>
      [...chats].sort((a, b) => {
        return a.recipient?.isBot
          ? -1
          : new Date(b.lastMessage?.createdAt ?? 0).getTime() -
              new Date(a.lastMessage?.createdAt ?? 0).getTime();
      }),
    [chats]
  );

  return (
    <ScrollArea>
      <div className="flex flex-col gap-y-4">
        {sortedChats.map((chat) => (
          <ChatEntry
            key={chat.id}
            userId={userId}
            chat={chat}
            onSelectChat={onSelectChat}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
