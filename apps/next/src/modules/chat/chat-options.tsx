"use client";

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

type ChatOptionsProps = {
  children: React.ReactNode;
  onMarkAsUnread?: () => void;
  onArchive?: () => void;
  onMute?: () => void;
  onContactInfo?: () => void;
  onExportChat?: () => void;
  onClearChat?: () => void;
  onDeleteChat?: () => void;
};

export default function ChatOptions({
  children,
  onMarkAsUnread,
  onArchive,
  onMute,
  onContactInfo,
  onExportChat,
  onClearChat,
  onDeleteChat,
}: ChatOptionsProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        sideOffset={8}
        className="w-64 rounded-2xl p-3"
      >
        <div className="flex flex-col gap-1">
          <Button
            variant="ghost"
            onClick={onMarkAsUnread}
            className="hover:bg-muted h-auto justify-start gap-3 rounded-xl px-3 py-3"
          >
            <MessageCircle className="size-5" />
            <span className="text-sm font-medium">Mark as unread</span>
          </Button>

          <Button
            variant="ghost"
            onClick={onArchive}
            className="h-auto justify-start gap-3 rounded-xl px-3 py-3"
          >
            <Archive className="size-5" />
            <span className="text-sm font-medium">Archive</span>
          </Button>

          <Button
            variant="ghost"
            onClick={onMute}
            className="h-auto justify-between gap-3 rounded-xl px-3 py-3"
          >
            <div className="flex items-center gap-3">
              <VolumeX className="size-5" />
              <span className="text-sm font-medium">Mute</span>
            </div>
            <ChevronRight className="size-4" />
          </Button>

          <Button
            variant="ghost"
            onClick={onContactInfo}
            className="h-auto justify-start gap-3 rounded-xl px-3 py-3"
          >
            <User className="size-5" />
            <span className="text-sm font-medium">Contact info</span>
          </Button>

          <Button
            variant="ghost"
            onClick={onExportChat}
            className="h-auto justify-start gap-3 rounded-xl px-3 py-3"
          >
            <Upload className="size-5" />
            <span className="text-sm font-medium">Export chat</span>
          </Button>

          <Button
            variant="ghost"
            onClick={onClearChat}
            className="h-auto justify-start gap-3 rounded-xl px-3 py-3"
          >
            <X className="size-5" />
            <span className="text-sm font-medium">Clear chat</span>
          </Button>

          <Button
            variant="ghost"
            onClick={onDeleteChat}
            className="h-auto justify-start gap-3 rounded-xl px-3 py-3 text-red-500 hover:text-red-500"
          >
            <Trash2 className="size-5" />
            <span className="text-sm font-medium">Delete chat</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
