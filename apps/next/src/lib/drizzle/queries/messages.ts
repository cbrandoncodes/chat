"server-only";

import { desc, eq } from "drizzle-orm/sql";

import { db } from "@shared/drizzle";
import { chatMessages } from "@shared/drizzle/schema";

export async function getMessagesByChatId({ chatId }: { chatId: string }) {
  const messages = await db.query.chatMessages.findMany({
    where: eq(chatMessages.chatId, chatId),
    orderBy: desc(chatMessages.createdAt),
    limit: 50,
  });

  return messages.reverse();
}

export async function deleteMessagesByChatId({ chatId }: { chatId: string }) {
  await db.delete(chatMessages).where(eq(chatMessages.chatId, chatId));
}
