import PencilPlusIcon from "@/components/icons/pencil-plus";
import { Button } from "@/components/ui/button";
import ChatListFilter from "./chat-list-filter";
import ChatListSearch from "./chat-list-search";
import ChatListCore from "./chat-list-core";
import { Chat } from "@/types/chat";
import NewChatDialog from "../new-chat-dialog";

type Props = {
  activeChatId: string | null;
  onSelectChat: (chatId: string) => void;
  chats: Chat[];
};

export default function ChatList({ activeChatId, onSelectChat, chats }: Props) {
  return (
    <div className="bg-background w-full rounded-3xl p-6 shadow-sm">
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center justify-between">
          <p className="text-foreground text-xl font-semibold">All Messages</p>
          <NewChatDialog>
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

        <ChatListCore
          activeChatId={activeChatId}
          chats={chats}
          onSelectChat={onSelectChat}
        />
      </div>
    </div>
  );
}
