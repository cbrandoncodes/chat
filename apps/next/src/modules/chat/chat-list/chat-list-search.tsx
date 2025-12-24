import { Input } from "@/components/ui/input";
import SearchIcon from "@/components/icons/search";

export default function ChatListSearch() {
  return (
    <div className="w-full">
      <Input
        placeholder="Search in message"
        icon={SearchIcon}
        className="bg-background placeholder:text-text-secondary h-10 text-sm"
        iconClassName="text-text-secondary"
      />
    </div>
  );
}
