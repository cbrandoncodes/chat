import { Input } from "@/components/ui/input";
import SearchIcon from "@/components/icons/search";

export default function AppSearch() {
  return (
    <div className="relative">
      <Input
        placeholder="Search"
        icon={SearchIcon}
        className="bg-background h-8 pr-13"
      />
      <span className="bg-muted-background text-text-secondary absolute top-1/2 right-1 inline-flex h-6 w-10 -translate-y-1/2 items-center justify-center rounded-md px-1.5 py-1.25 text-xs">
        ⌘+K
      </span>
    </div>
  );
}
