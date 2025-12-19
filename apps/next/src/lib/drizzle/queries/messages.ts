"server-only";

import { desc, eq } from "drizzle-orm/sql";

import { db } from "@shared/drizzle";
import { chatMessages, InsertChatMessage } from "@shared/drizzle/schema";

export async function getMessage({ messageId }: { messageId: string }) {
  const message = await db.query.chatMessages.findFirst({
    where: eq(chatMessages.id, messageId),
  });
  return message ?? null;
}

export async function getMessagesByChatId({ chatId }: { chatId: string }) {
  const messages = await db.query.chatMessages.findMany({
    where: eq(chatMessages.chatId, chatId),
    orderBy: desc(chatMessages.createdAt),
    limit: 50,
  });

  return messages.reverse();
}

export async function insertMessage({
  data,
}: {
  data: InsertChatMessage & { chatId: string };
}) {
  const message = (await db.insert(chatMessages).values(data).returning())[0];

  return message ?? null;
}

export async function updateMessage({
  data,
}: {
  data: Partial<InsertChatMessage> & { id: string };
}) {
  const message = (
    await db
      .update(chatMessages)
      .set({ ...data, modifiedAt: new Date() })
      .where(eq(chatMessages.id, data.id))
      .returning()
  )[0];

  return message ?? null;
}

export async function deleteMessagesByChatId({ chatId }: { chatId: string }) {
  await db.delete(chatMessages).where(eq(chatMessages.chatId, chatId));
}
