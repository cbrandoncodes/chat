"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  MessageCircle,
  Archive,
  VolumeX,
  ChevronRight,
  User,
  Upload,
  X,
  Trash2,
} from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  clearChatAction,
  deleteChatAction,
  updateChatAction,
} from "@/lib/actions/chats";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { removeChat, updateChat } from "@/lib/store/slices/chats";
import { clearMessages } from "@/lib/store/slices/chat-messages";
import ContactInfo from "./chat-pane/contact-info";
import { SelectUser } from "@shared/drizzle/schema";

type ChatMenuProps = {
  children?: React.ReactNode;
  chatId: string;
  recipient: SelectUser;
  userId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ChatMenu({
  children,
  chatId,
  recipient,
  userId,
  isOpen,
  onOpenChange,
}: ChatMenuProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const dispatch = useAppDispatch();
  const { messages } = useAppSelector((state) => state.chatMessages);

  function handleClearChat() {
    try {
      setIsClearing(true);

      clearChatAction({ chatId });

      dispatch(clearMessages(chatId));
      dispatch(updateChat({ id: chatId, unread: [] }));
    } catch (error) {
      console.error(error);
      toast.error("Failed to clear chat");
    } finally {
      setIsClearing(false);
    }
  }

  function handleDeleteChat() {
    try {
      setIsDeleting(true);

      deleteChatAction({ chatId });

      dispatch(removeChat(chatId));
      dispatch(clearMessages(chatId));
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete chat");
    } finally {
      setIsDeleting(false);
    }
  }

  function handleMarkAsUnread() {
    const lastSentMessage = messages[chatId].find(
      (message) => message.senderId === userId
    );
    if (lastSentMessage) {
      updateChatAction({ data: { id: chatId, unread: [lastSentMessage.id] } });
      dispatch(updateChat({ id: chatId, unread: [lastSentMessage.id] }));
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        {children ? (
          children
        ) : (
          <span className="absolute top-1/2 right-0 -z-10 -translate-y-1/2" />
        )}
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        sideOffset={8}
        className="w-64 rounded-2xl p-3"
      >
        <div className="flex flex-col gap-1">
          <Button
            variant="ghost"
            className="hover:bg-muted h-auto justify-start gap-3 rounded-xl px-3 py-3"
            onClick={handleMarkAsUnread}
          >
            <MessageCircle className="size-5" />
            <span className="text-sm font-medium">Mark as unread</span>
          </Button>

          <Button
            variant="ghost"
            className="h-auto justify-start gap-3 rounded-xl px-3 py-3"
          >
            <Archive className="size-5" />
            <span className="text-sm font-medium">Archive</span>
          </Button>

          <Button
            variant="ghost"
            className="h-auto justify-between gap-3 rounded-xl px-3 py-3"
          >
            <div className="flex items-center gap-3">
              <VolumeX className="size-5" />
              <span className="text-sm font-medium">Mute</span>
            </div>
            <ChevronRight className="size-4" />
          </Button>

          <ContactInfo user={recipient}>
            <Button
              variant="ghost"
              className="h-auto justify-start gap-3 rounded-xl px-3 py-3"
            >
              <User className="size-5" />
              <span className="text-sm font-medium">Contact info</span>
            </Button>
          </ContactInfo>

          <Button
            variant="ghost"
            className="h-auto justify-start gap-3 rounded-xl px-3 py-3"
          >
            <Upload className="size-5" />
            <span className="text-sm font-medium">Export chat</span>
          </Button>

          <Button
            variant="ghost"
            disabled={isClearing}
            className="h-auto justify-start gap-3 rounded-xl px-3 py-3"
            onClick={handleClearChat}
          >
            <X className="size-5" />
            <span className="text-sm font-medium">Clear chat</span>
          </Button>

          <Button
            variant="ghost"
            disabled={isDeleting}
            className="text-destructive hover:text-destructive h-auto justify-start gap-3 rounded-xl px-3 py-3"
            onClick={handleDeleteChat}
          >
            <Trash2 className="size-5" />
            <span className="text-sm font-medium">Delete chat</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
