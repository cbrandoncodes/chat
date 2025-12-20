import { Server, Socket } from "socket.io";

import { getUserSocket } from "@/socket/state";
import { getChat, createChat, updateChat } from "@shared/drizzle/queries/chats";
import { insertChatMessage } from "@shared/drizzle/queries/chat-message";
import { InsertChatMessage } from "@shared/drizzle/schema";

export function registerChatHandlers(io: Server, socket: Socket) {
  socket.on("chat:read", async ({ chatId, recipientUserId }) => {
    const recipientSocketId = await getUserSocket(recipientUserId);

    try {
      await updateChat({
        data: {
          id: chatId,
          unread: [],
        },
      });

      if (recipientSocketId) {
        io.to(recipientSocketId).emit("chat:read", { chatId });
      }
    } catch (error) {
      console.error("Error marking chat as read:", error);
    }
  });

  socket.on("chat:send", async ({ recipientUserId, chatId, content }) => {
    const senderUserId = socket.data.userId;
    const recipientSocketId = await getUserSocket(recipientUserId);

    try {
      let chat = chatId ? await getChat({ chatId }) : null;

      if (!chat) {
        chat =
          (await getChat({ senderUserId, recipientUserId })) ??
          (await createChat({
            senderUserId,
            recipientUserId,
          }));
      }

      const messagePayload: InsertChatMessage = {
        chatId: chat.id,
        senderId: senderUserId,
        content,
      };

      const message = await insertChatMessage({ data: messagePayload });

      const updatedUnread = [...chat.unread, message.id];

      await updateChat({
        data: {
          id: chat.id,
          excerpt: message.content,
          unread: updatedUnread,
        },
      });

      const chatUpdate = {
        id: chat.id,
        excerpt: message.content,
        unread: updatedUnread,
        lastMessage: message,
      };

      if (recipientSocketId) {
        io.to(recipientSocketId).emit("chat:message", message);
        io.to(recipientSocketId).emit("chat:update", chatUpdate);
      }

      socket.emit("chat:message", message);
      socket.emit("chat:update", chatUpdate);
    } catch (error) {
      console.error("Error sending message:", error);
      socket.emit("chat:error", { message: "Failed to send message" });
    }
  });
}
