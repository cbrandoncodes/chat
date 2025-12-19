"use server";

import {
  createChat,
  deleteChat,
  getChatsByUserId,
  updateChat,
} from "@/lib/drizzle/queries/chats";
import {
  deleteMessagesByChatId,
  getMessagesByChatId,
} from "@/lib/drizzle/queries/messages";
import { InsertChat } from "@shared/drizzle/schema";

export async function getChatsByUserIdAction({ userId }: { userId: string }) {
  const chats = await getChatsByUserId({ userId });
  return chats;
}

export async function createChatAction({
  userId,
  recipientId,
}: {
  userId: string;
  recipientId: string;
}) {
  const chat = await createChat({ userId, recipientId });
  return chat;
}

export async function updateChatAction(data: {
  data: Partial<InsertChat> & { id: string };
}) {
  await updateChat(data);
}

export async function clearChatAction({ chatId }: { chatId: string }) {
  await deleteMessagesByChatId({ chatId });
  await updateChat({
    data: {
      id: chatId,
      excerpt: "",
    },
  });
}

export async function getMessagesAction({ chatId }: { chatId: string }) {
  const messages = await getMessagesByChatId({ chatId });
  return messages;
}

export async function deleteChatAction({ chatId }: { chatId: string }) {
  await deleteChat({ id: chatId });
}
