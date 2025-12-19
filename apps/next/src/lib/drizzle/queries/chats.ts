"server-only";

import { desc, eq } from "drizzle-orm/sql";

import { db } from "@shared/drizzle";
import {
  chatMessages,
  chats,
  chatsToUsers,
  InsertChat,
  SelectUser,
  user,
} from "@shared/drizzle/schema";
import { Chat } from "@/types/chat";

export async function getChatsByUserId({
  userId,
}: {
  userId: string;
}): Promise<Chat[]> {
  const rows = await db.query.chatsToUsers.findMany({
    where: eq(chatsToUsers.userId, userId),
    with: {
      chat: {
        with: {
          participants: {
            with: {
              user: true,
            },
          },
          messages: {
            limit: 1,
            orderBy: desc(chatMessages.createdAt),
          },
        },
      },
    },
  });

  const chatsWithRecipients = rows.map((row) => {
    const chat = row.chat;

    const recipient = chat.participants.find((p) => p.userId !== userId)
      ?.user as SelectUser;

    return {
      id: chat.id,
      unread: chat.unread,
      excerpt: chat.excerpt,
      lastMessage: chat?.messages?.[0] ?? null,
      createdAt: chat.createdAt,
      modifiedAt: chat.modifiedAt,
      recipient,
    };
  });

  return chatsWithRecipients;
}

export async function createChat({
  userId,
  recipientId,
}: {
  userId: string;
  recipientId: string;
}): Promise<Chat> {
  // Check if chat already exists between these users
  const existingChat = await db.query.chatsToUsers.findFirst({
    where: eq(chatsToUsers.userId, userId),
    with: {
      chat: {
        with: {
          participants: {
            with: {
              user: true,
            },
          },
          messages: {
            limit: 1,
            orderBy: desc(chatMessages.createdAt),
          },
        },
      },
    },
  });

  if (existingChat) {
    const hasRecipient = existingChat.chat.participants.some(
      (p) => p.userId === recipientId
    );
    if (hasRecipient) {
      const recipient = existingChat.chat.participants.find(
        (p) => p.userId === recipientId
      )?.user as SelectUser;

      return {
        id: existingChat.chat.id,
        recipient,
        unread: existingChat.chat.unread,
        excerpt: existingChat.chat.excerpt,
        lastMessage: existingChat.chat?.messages?.[0] ?? null,
        createdAt: existingChat.chat.createdAt,
        modifiedAt: existingChat.chat.modifiedAt,
      };
    }
  }

  const [newChat] = await db
    .insert(chats)
    .values({
      excerpt: "",
      unread: [],
    })
    .returning();

  await db.insert(chatsToUsers).values([
    { chatId: newChat.id, userId },
    { chatId: newChat.id, userId: recipientId },
  ]);

  const recipient = await db.query.user.findFirst({
    where: eq(user.id, recipientId),
  });

  if (!recipient) {
    throw new Error("Recipient not found");
  }

  return {
    id: newChat.id,
    recipient,
    unread: newChat.unread,
    excerpt: newChat.excerpt,
    lastMessage: null,
    createdAt: newChat.createdAt,
    modifiedAt: newChat.modifiedAt,
  };
}

export async function updateChat({
  data,
}: {
  data: Partial<InsertChat> & {
    id: string;
  };
}) {
  await db
    .update(chats)
    .set({ ...data, modifiedAt: new Date() })
    .where(eq(chats.id, data.id));
}

export async function deleteChat({ id }: { id: string }) {
  await db.delete(chats).where(eq(chats.id, id));
}
