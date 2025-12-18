import { Mic, Smile, Paperclip, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChatActions() {
  return (
    <div className="px-6 py-3">
      <div className="relative">
        <Input
          type="text"
          placeholder="Type any message..."
          className="text-muted-foreground w-full flex-1 rounded-3xl bg-transparent pr-38.5 text-sm shadow-none focus-visible:ring-0"
        />
        <div className="absolute top-1/2 right-1 flex -translate-y-1/2 items-center gap-2.5">
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground size-6 [&>svg]:size-3.5"
          >
            <Mic className="size-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground size-6 [&>svg]:size-3.5"
          >
            <Smile className="size-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground size-6 [&>svg]:size-3.5"
          >
            <Paperclip className="size-5" />
          </Button>
          <Button
            size="icon"
            className="bg-primary hover:bg-primary/90 size-9 rounded-full"
          >
            <Send className="text-background size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
