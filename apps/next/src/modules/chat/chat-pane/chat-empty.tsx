import MessageIcon from "@/components/icons/message";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/store/hooks";
import { setIsChatListOpen } from "@/lib/store/slices/chats";

export default function ChatEmpty() {
  const dispatch = useAppDispatch();

  function handleOpenChatList() {
    dispatch(setIsChatListOpen(true));
  }

  return (
    <div className="bg-background flex h-full flex-col items-center justify-center rounded-3xl shadow-sm">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="bg-primary/10 flex size-16 items-center justify-center rounded-full">
          <MessageIcon className="text-primary size-8" />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">No conversation selected</h3>
          <p className="text-muted-foreground max-w-xs text-sm">
            Choose a chat from the list to start messaging or create a new
            conversation.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleOpenChatList}
          className="lg:hidden"
        >
          <MessageIcon />
          Chats
        </Button>
      </div>
    </div>
  );
}
