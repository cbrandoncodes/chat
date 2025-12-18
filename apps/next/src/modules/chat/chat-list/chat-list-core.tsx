import ChecksIcon from "@/components/icons/checks";
import MessageIcon from "@/components/icons/message";
import ProfileImage from "@/components/profile-image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Chat } from "@/types/chat";

type ChatListCoreProps = {
  activeChatId: string | null;
  chats: Chat[];
  onSelectChat: (chatId: string) => void;
};

function ChatEntry({
  chat,
  activeChatId,
  onSelectChat,
}: {
  chat: Chat;
  activeChatId: string | null;
  onSelectChat: (chatId: string) => void;
}) {
  const { user, excerpt, timestamp, unread } = chat;

  return (
    <div
      className="group bg-background flex w-full cursor-pointer items-center gap-2"
      onClick={() => onSelectChat(chat.id)}
    >
      {unread && (
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
        <ProfileImage name={user.name} image={user.image ?? undefined} />
        <div className="flex flex-1 flex-col gap-y-1">
          <div className="flex items-center justify-between gap-1">
            <span className="text-sm font-medium">{user.name}</span>
            <span className="text-muted-foreground text-xs">{timestamp}</span>
          </div>
          <div className="text-muted-foreground flex items-center justify-between gap-1">
            <p className="text-muted-foreground text-xs">{excerpt}</p>
            <span className="flex-1">
              <ChecksIcon className="size-4" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChatListCore({
  activeChatId,
  chats,
  onSelectChat,
}: ChatListCoreProps) {
  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-y-4">
        {chats.map((chat) => (
          <ChatEntry
            key={chat.id}
            activeChatId={activeChatId}
            chat={chat}
            onSelectChat={onSelectChat}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
