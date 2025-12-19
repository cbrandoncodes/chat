import { Button } from "@/components/ui/button";
import PencilPlusIcon from "@/components/icons/pencil-plus";
import ChatListFilter from "./chat-list-filter";
import ChatListSearch from "./chat-list-search";
import ChatListCore from "./chat-list-core";
import ChatsListEmpty from "./chat-list-empty";
import ChatListSkeleton from "./chat-list-skeleton";
import NewChatDialog from "@/modules/chat/new-chat-dialog";
import { Chat } from "@/types/chat";
import { cn } from "@/lib/utils";

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
  return (
    <div
      className={cn(
        "bg-background h-auto w-full p-6 lg:rounded-3xl lg:shadow-sm",
        className
      )}
    >
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center justify-between">
          <p className="text-foreground text-xl font-semibold">All Messages</p>

          <NewChatDialog
            onSelectUser={(user) => {
              onSelectChat({ recipientId: user.id });
            }}
          >
            <Button>
              <PencilPlusIcon />
              New Message
            </Button>
          </NewChatDialog>
        </div>

        <div className="flex items-center gap-4">
          <ChatListSearch />
          <ChatListFilter />
        </div>

        {isLoadingChats ? (
          <ChatListSkeleton />
        ) : chats.length === 0 ? (
          <ChatsListEmpty onSelectUser={onSelectChat} />
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
