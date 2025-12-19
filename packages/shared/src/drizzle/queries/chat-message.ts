import { InsertChatMessage } from "@shared/drizzle/schema";
import { db } from "@shared/drizzle";
import { chatMessages } from "@shared/drizzle/schema";

export async function insertChatMessage({ data }: { data: InsertChatMessage }) {
  const message = (await db.insert(chatMessages).values(data).returning())?.[0];
  return message;
}
