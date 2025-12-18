import ChatHeader from "./chat-header";
import ChatsList from "./chats-list";
import ChatActions from "./chat-actions";

type ChatPaneProps = {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
  onOpenChatList?: () => void;
};

export default function ChatPane({ user, onOpenChatList }: ChatPaneProps) {
  return (
    <div className="bg-background flex h-full flex-col rounded-3xl shadow-sm">
      <ChatHeader user={user} onOpenChatList={onOpenChatList} />
      <ChatsList />
      <ChatActions />
    </div>
  );
}
