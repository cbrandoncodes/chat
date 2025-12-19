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
