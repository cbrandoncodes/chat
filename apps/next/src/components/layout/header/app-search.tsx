import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";

export default function AppSearch() {
  return (
    <div className="relative">
      <Input
        placeholder="Search"
        icon={SearchIcon}
        className="bg-background h-8 pr-14"
      />
      <span className="bg-muted-background text-foreground absolute top-1/2 right-3 inline-flex h-6 w-11 -translate-y-1/2 items-center justify-center rounded-md p-0.5 text-xs">
        ⌘ + K
      </span>
    </div>
  );
}
