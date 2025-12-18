import ChecksIcon from "@/components/icons/checks";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  content: string;
  sent: boolean;
  timestamp?: string;
  read?: boolean;
};

type MessageGroup = {
  messages: Message[];
  timestamp: string;
  sent: boolean;
};

const messageGroups: MessageGroup[] = [
  {
    sent: false,
    timestamp: "10:17 AM",
    messages: [
      { id: "1", content: "Hey, Jonjon", sent: false },
      {
        id: "2",
        content: "Can you help with with the last task on basecamp, please?",
        sent: false,
      },
      {
        id: "3",
        content: "I'm little bit confused with the task.. 🙄",
        sent: false,
      },
    ],
  },
  {
    sent: true,
    timestamp: "10:22 AM",
    messages: [
      {
        id: "4",
        content: "it's done already, no worries!",
        sent: true,
        read: true,
      },
    ],
  },
  {
    sent: false,
    timestamp: "10:32 AM",
    messages: [
      { id: "5", content: "what...", sent: false },
      { id: "6", content: "Really?! Thank you so much! 🤩", sent: false },
    ],
  },
  {
    sent: true,
    timestamp: "11:01 AM",
    messages: [
      { id: "7", content: "anytime! my pleasure~\n📍", sent: true, read: true },
    ],
  },
];

function MessageBubble({ message }: { message: Message }) {
  return (
    <div
      className={cn(
        "max-w-xs rounded-xl p-3 text-sm whitespace-pre-wrap",
        message.sent
          ? "bg-primary-foreground-alt text-foreground"
          : "bg-background text-foreground"
      )}
    >
      {message.content}
    </div>
  );
}

function MessageGroupComponent({ group }: { group: MessageGroup }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1",
        group.sent ? "items-end" : "items-start"
      )}
    >
      {group.messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      <div
        className={cn(
          "text-muted-foreground mt-1 flex items-center gap-1 text-xs",
          group.sent ? "flex-row-reverse" : "flex-row"
        )}
      >
        <span>{group.timestamp}</span>
        {group.sent && group.messages.some((m) => m.read) && (
          <ChecksIcon className="text-primary size-4" />
        )}
      </div>
    </div>
  );
}

function DateSeparator({ date }: { date: string }) {
  return (
    <div className="flex justify-center py-4">
      <span className="bg-background text-muted-foreground rounded-full px-4 py-1 text-xs font-medium">
        {date}
      </span>
    </div>
  );
}

export default function ChatsList() {
  return (
    <div className="bg-background flex-1 px-4">
      <div className="bg-muted-background flex h-full flex-1 flex-col gap-4 overflow-y-auto rounded-2xl p-6">
        <DateSeparator date="Today" />
        {messageGroups.map((group, index) => (
          <MessageGroupComponent key={index} group={group} />
        ))}
      </div>
    </div>
  );
}
