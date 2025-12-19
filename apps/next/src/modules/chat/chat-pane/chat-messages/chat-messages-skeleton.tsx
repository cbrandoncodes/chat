import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

function MessageBubbleSkeleton({ isSent }: { isSent: boolean }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1",
        isSent ? "items-end" : "items-start"
      )}
    >
      <Skeleton
        className={cn(
          "rounded-xl",
          isSent ? "bg-primary-foreground-alt/90" : "bg-background/90"
        )}
        style={{
          width: `${Math.floor(Math.random() * 100) + 120}px`,
          height: "44px",
        }}
      />
    </div>
  );
}

function MessageGroupSkeleton({ isSent }: { isSent: boolean }) {
  const messageCount = Math.floor(Math.random() * 2) + 1;

  return (
    <div
      className={cn(
        "flex flex-col gap-1",
        isSent ? "items-end" : "items-start"
      )}
    >
      {Array.from({ length: messageCount }).map((_, index) => (
        <MessageBubbleSkeleton key={index} isSent={isSent} />
      ))}
      <div
        className={cn(
          "mt-1 flex items-center gap-1",
          isSent ? "flex-row-reverse" : "flex-row"
        )}
      >
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
  );
}

function DateSeparatorSkeleton() {
  return (
    <div className="flex justify-center py-4">
      <Skeleton className="h-6 w-16 rounded-full" />
    </div>
  );
}

export default function ChatMessagesSkeleton() {
  return (
    <div className="bg-background flex-1 px-4">
      <div className="bg-muted-background flex h-full flex-1 flex-col gap-4 rounded-2xl p-6">
        <DateSeparatorSkeleton />

        <MessageGroupSkeleton isSent={false} />

        <MessageGroupSkeleton isSent={true} />

        <MessageGroupSkeleton isSent={false} />

        <MessageGroupSkeleton isSent={true} />

        <MessageGroupSkeleton isSent={false} />
      </div>
    </div>
  );
}
