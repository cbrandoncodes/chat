import FilterIcon from "@/components/icons/filter";
import { Button } from "@/components/ui/button";

export default function ChatListFilter() {
  return (
    <div>
      <Button size="icon" variant="outline" className="size-10">
        <FilterIcon className="size-[13px]" />
      </Button>
    </div>
  );
}
