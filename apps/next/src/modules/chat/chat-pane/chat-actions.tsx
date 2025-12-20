"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { Mic, Smile, Paperclip, Send } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatContext } from "./chat-context";
import { cn } from "@/lib/utils";

type ChatActionsProps = {
  isBot?: boolean;
};

export default function ChatActions({ isBot = false }: ChatActionsProps) {
  const { sendMessage, sendMessageToBot, isConnected, isBotResponding } =
    useChatContext();
  const [message, setMessage] = useState("");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const actionDisabled =
    !message.trim() || (isBot ? isBotResponding : !isConnected);

  function handleSendMessage() {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || (isBot ? isBotResponding : !isConnected)) return;

    isBot ? sendMessageToBot(trimmedMessage) : sendMessage(trimmedMessage);
    setMessage("");
    inputRef.current?.focus();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }

  return (
    <div className="px-6 py-3">
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type any message..."
          className="w-full flex-1 rounded-3xl bg-transparent pr-38.5 text-sm shadow-none focus-visible:ring-0"
        />
        <div className="absolute top-1/2 right-1 flex -translate-y-1/2 items-center gap-2.5">
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground size-6 [&>svg]:size-3.5"
          >
            <Mic className="size-5" />
          </Button>
          <div>
            {isEmojiPickerOpen && (
              <div className="absolute right-0 bottom-full z-50 mb-2">
                <EmojiPicker
                  open={isEmojiPickerOpen}
                  onEmojiClick={(emojiData) => {
                    setMessage((prev) => prev + emojiData.emoji);
                    setIsEmojiPickerOpen(false);
                  }}
                />
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground size-6 [&>svg]:size-3.5"
              onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
            >
              <Smile className="size-5" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground size-6 [&>svg]:size-3.5"
          >
            <Paperclip className="size-5" />
          </Button>

          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={actionDisabled}
            className={cn(
              "bg-primary size-9 rounded-full",
              actionDisabled && "opacity-50"
            )}
          >
            <Send className="text-background size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
