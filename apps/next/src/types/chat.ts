import { SelectChatMessage, SelectUser } from "@shared/drizzle/schema";

export type Chat = {
  id: string;
  unread: string[];
  excerpt: string;
  recipient: SelectUser;
  lastMessage: SelectChatMessage | null;
  createdAt: Date;
  modifiedAt: Date;
};

export type BotChatResponse = {
  response: string;
  context: {
    response: string;
    action?: "generate" | "modify";
  };
};
