import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";

export default function ChatListSearch() {
  return (
    <div className="w-full">
      <Input
        placeholder="Search in message"
        icon={SearchIcon}
        className="bg-background h-10"
      />
    </div>
  );
}
