import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

function ChatEntrySkeleton() {
  return (
    <div className="flex w-full items-center gap-2">
      <div className="flex w-full items-center gap-3 rounded-xl p-4">
        <Skeleton className="size-10 shrink-0 rounded-full" />

        <div className="flex flex-1 flex-col gap-y-2">
          <div className="flex items-center justify-between gap-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-12" />
          </div>

          <div className="flex items-center justify-between gap-1">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="size-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChatListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-y-4">
        {Array.from({ length: count }).map((_, index) => (
          <ChatEntrySkeleton key={index} />
        ))}
      </div>
    </ScrollArea>
  );
}
