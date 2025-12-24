import { useState } from "react";
import { MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import PencilPlusIcon from "@/components/icons/pencil-plus";
import NewChatPopup from "@/modules/chat/new-chat-popup";

type ChatsListEmptyProps = {
  userId: string;
  onSelectUser: ({ recipientId }: { recipientId?: string }) => void;
};

export default function ChatsListEmpty({
  userId,
  onSelectUser,
}: ChatsListEmptyProps) {
  const [isNewChatPopupOpen, setIsNewChatPopupOpen] = useState(false);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-12">
      <div className="bg-muted flex size-16 items-center justify-center rounded-full">
        <MessageSquare className="text-muted-foreground size-8" />
      </div>
      <div className="flex flex-col items-center gap-1 text-center">
        <p className="text-sm font-medium">No messages yet</p>
        <p className="text-muted-foreground text-sm">
          Start a conversation to see your messages here
        </p>
      </div>
      <div className="relative">
        <Button size="sm" onClick={() => setIsNewChatPopupOpen(true)}>
          <PencilPlusIcon />
          New Message
        </Button>
        <NewChatPopup
          open={isNewChatPopupOpen}
          onOpenChange={setIsNewChatPopupOpen}
          userId={userId}
          onSelectUser={(user) => onSelectUser({ recipientId: user.id })}
        />
      </div>
    </div>
  );
}
