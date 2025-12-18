import FilterIcon from "@/components/icons/filter";
import { Button } from "@/components/ui/button";

export default function ChatListFilter() {
  return (
    <div>
      <Button size="icon" variant="outline">
        <FilterIcon />
      </Button>
    </div>
  );
}
