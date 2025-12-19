"use client";

import { useEffect, useRef, useMemo } from "react";
import { format, isToday, isYesterday, isSameDay } from "date-fns";

import ChecksIcon from "@/components/icons/checks";
import { useChatContext } from "@/modules/chat/chat-pane/chat-context";
import ChatMessagesSkeleton from "./chat-messages-skeleton";
import { SelectChatMessage } from "@shared/drizzle/schema";
import { useAppSelector } from "@/lib/store/hooks";
import { cn } from "@/lib/utils";
import { Chat } from "@/types/chat";

type MessageGroup = {
  messages: SelectChatMessage[];
  timestamp: string;
  isSent: boolean;
};

type DateGroup = {
  date: Date;
  label: string;
  messageGroups: MessageGroup[];
};

function getDateLabel(date: Date): string {
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return format(date, "d MMM");
}

function formatTime(date: Date): string {
  return format(date, "h:mm a");
}

function groupMessagesByDateAndSender(
  messages: SelectChatMessage[],
  currentUserId: string
): DateGroup[] {
  if (messages.length === 0) return [];

  const dateGroups: DateGroup[] = [];
  let currentDateGroup: DateGroup | null = null;
  let currentMessageGroup: MessageGroup | null = null;

  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  for (const message of sortedMessages) {
    const messageDate = new Date(message.createdAt);
    const isSent = message.senderId === currentUserId;

    // check if need for new date group
    if (!currentDateGroup || !isSameDay(currentDateGroup.date, messageDate)) {
      currentDateGroup = {
        date: messageDate,
        label: getDateLabel(messageDate),
        messageGroups: [],
      };
      dateGroups.push(currentDateGroup);
      currentMessageGroup = null;
    }

    // check if need for new message group (different sender or time gap > 5 min)
    const shouldStartNewGroup =
      !currentMessageGroup ||
      currentMessageGroup.isSent !== isSent ||
      (currentMessageGroup.messages.length > 0 &&
        messageDate.getTime() -
          new Date(
            currentMessageGroup.messages[
              currentMessageGroup.messages.length - 1
            ].createdAt
          ).getTime() >
          5 * 60 * 1000);

    if (shouldStartNewGroup) {
      currentMessageGroup = {
        messages: [],
        timestamp: formatTime(messageDate),
        isSent,
      };
      currentDateGroup.messageGroups.push(currentMessageGroup);
    }

    currentMessageGroup!.messages.push(message);
  }

  return dateGroups;
}

function MessageBubble({
  message,
  isSent,
}: {
  message: SelectChatMessage;
  isSent: boolean;
}) {
  return (
    <div
      className={cn(
        "max-w-xs rounded-xl p-3 text-sm whitespace-pre-wrap",
        isSent
          ? "bg-primary-foreground-alt text-foreground"
          : "bg-background text-foreground"
      )}
    >
      {message.content}
    </div>
  );
}

function MessageGroupComponent({
  group,
  userId,
  chat,
}: {
  group: MessageGroup;
  userId: string;
  chat?: Chat | null;
}) {
  const unread = chat?.unread ?? [];
  const isUnread =
    unread.length >= 1 &&
    unread.some((id) => !!group.messages.find((message) => message.id === id));

  return (
    <div
      className={cn(
        "flex flex-col gap-1",
        group.isSent ? "items-end" : "items-start"
      )}
    >
      {group.messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          isSent={group.isSent}
        />
      ))}
      <div
        className={cn(
          "text-muted-foreground mt-1 flex items-center gap-1 text-xs",
          group.isSent ? "flex-row-reverse" : "flex-row"
        )}
      >
        <span>{group.timestamp}</span>
        {group.isSent && (
          <ChecksIcon
            className={cn(
              "size-4",
              isUnread ? "text-muted-foreground" : "text-primary"
            )}
          />
        )}
      </div>
    </div>
  );
}

function DateSeparator({ label }: { label: string }) {
  return (
    <div className="sticky top-0 z-10 flex justify-center py-4">
      <span className="bg-background text-muted-foreground rounded-full px-4 py-1 text-xs font-medium shadow-sm">
        {label}
      </span>
    </div>
  );
}

function EmptyMessages() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <p className="text-muted-foreground text-sm">
        No messages yet. Start the conversation!
      </p>
    </div>
  );
}

export default function ChatMessages({
  markChatAsRead,
}: {
  markChatAsRead: () => void;
}) {
  const { chatId, messages, currentUserId, isLoadingMessages } =
    useChatContext();
  const { chats } = useAppSelector((state) => state.chats);
  const scrollRef = useRef<HTMLDivElement>(null);

  const chat = chats.find((chat) => chat.id === chatId);
  const isUnread =
    chat?.unread &&
    chat.unread.length >= 1 &&
    chat?.lastMessage?.senderId !== currentUserId;

  const dateGroups = useMemo(
    () => groupMessagesByDateAndSender(messages, currentUserId),
    [messages, currentUserId]
  );

  // mark chat as read when viewing unread messages
  useEffect(() => {
    if (isUnread) {
      markChatAsRead();
    }
  }, [isUnread, markChatAsRead]);

  // auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (isLoadingMessages) {
    return <ChatMessagesSkeleton />;
  }

  if (messages.length === 0) {
    return (
      <div className="bg-background flex-1 px-4">
        <div className="bg-muted-background flex h-full flex-1 flex-col rounded-2xl p-6">
          <EmptyMessages />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background flex-1 overflow-hidden px-4">
      <div
        ref={scrollRef}
        className="bg-muted-background flex h-full flex-col gap-4 overflow-y-auto rounded-2xl p-6"
      >
        {dateGroups.map((dateGroup, dateIndex) => (
          <div key={dateIndex} className="flex flex-col gap-4">
            <DateSeparator label={dateGroup.label} />
            {dateGroup.messageGroups.map((group, groupIndex) => (
              <MessageGroupComponent
                key={groupIndex}
                group={group}
                userId={currentUserId}
                chat={chat}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
