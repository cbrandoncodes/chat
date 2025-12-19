"server-only";

import { and, eq } from "drizzle-orm/sql";

import { db } from "@shared/drizzle";
import { chats, chatsToUsers, InsertChat } from "@shared/drizzle/schema";
import { aliasedTable } from "drizzle-orm/alias";

export async function createChat({
  senderUserId,
  recipientUserId,
}: {
  senderUserId: string;
  recipientUserId: string;
}) {
  return await db.transaction(async (tx) => {
    const [chat] = await tx
      .insert(chats)
      .values({
        excerpt: "",
      })
      .returning();

    await tx.insert(chatsToUsers).values([
      { chatId: chat.id, userId: senderUserId },
      { chatId: chat.id, userId: recipientUserId },
    ]);

    return chat;
  });
}

export async function getChat(
  params: { chatId: string } | { senderUserId: string; recipientUserId: string }
) {
  if ("chatId" in params) {
    const chat = await db.query.chats.findFirst({
      where: eq(chats.id, params.chatId),
    });
    return chat ?? null;
  }

  const { senderUserId, recipientUserId } = params;
  const cu1 = aliasedTable(chatsToUsers, "cu1");
  const cu2 = aliasedTable(chatsToUsers, "cu2");

  const existingChat = (
    await db
      .select({ id: chats.id, unread: chats.unread })
      .from(chats)
      .innerJoin(cu1, eq(cu1.chatId, chats.id))
      .innerJoin(cu2, eq(cu2.chatId, chats.id))
      .where(and(eq(cu1.userId, senderUserId), eq(cu2.userId, recipientUserId)))
      .limit(1)
  )?.[0];

  return existingChat ?? null;
}

export async function updateChat({
  data,
}: {
  data: Partial<InsertChat> & {
    id: string;
  };
}) {
  return await db.update(chats).set(data).where(eq(chats.id, data.id));
}
