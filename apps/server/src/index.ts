import http from "http";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { Server } from "socket.io";

import { auth } from "./lib/auth";
import { authCheck } from "./lib/auth/auth-check";
import { getChat, updateChat } from "@shared/drizzle/queries/chats";
import { createChat } from "@shared/drizzle/queries/chats";
import { insertChatMessage } from "@shared/drizzle/queries/chat-message";
import { InsertChatMessage } from "@shared/drizzle/schema";

config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

const userSockets = new Map<string, string>();

io.use(async (socket, next) => {
  console.log(
    "headers ",
    socket?.handshake?.headers,
    "auth ",
    socket?.handshake?.auth,
    socket?.handshake
  );
  const session = await authCheck({ headers: socket.handshake.headers });
  const user = session?.user;

  console.log("session ", session);

  if (!user) return next(new Error("unauthorized"));

  socket.data.userId = user.id;
  next();
});

io.on("connection", (socket) => {
  const userId = socket.data.userId;
  userSockets.set(userId, socket.id);

  console.log(`User ${userId} connected`);

  // broadcast to all other users that this user is online
  socket.broadcast.emit("user:online", { userId });

  // send current online users to the newly connected user
  socket.emit("user:online-users", { userIds: Array.from(userSockets.keys()) });

  socket.on("disconnect", () => {
    userSockets.delete(userId);
    console.log(`User ${userId} disconnected`);

    // broadcast to all other users that this user is offline
    socket.broadcast.emit("user:offline", { userId });
  });

  socket.on("chat:read", async ({ chatId, recipientUserId }) => {
    const recipientSocketId = userSockets.get(recipientUserId);

    try {
      await updateChat({
        data: {
          id: chatId,
          unread: [],
        },
      });

      // notify the recipient that their messages have been read
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("chat:read", { chatId });
      }
    } catch (error) {
      console.error("Error marking chat as read:", error);
    }
  });

  socket.on("chat:send", async ({ recipientUserId, chatId, content }) => {
    const senderUserId = socket.data.userId;
    const recipientSocketId = userSockets.get(recipientUserId);

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

      // send to recipient if online
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("chat:message", message);
        io.to(recipientSocketId).emit("chat:update", chatUpdate);
      }

      // echo back to sender
      socket.emit("chat:message", message);
      socket.emit("chat:update", chatUpdate);
    } catch (error) {
      console.error("Error sending message:", error);
      socket.emit("chat:error", { message: "Failed to send message" });
    }
  });
});

const port = process.env.PORT || 5050;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
});

app.get("/api/sign-out", async (req, res) => {
  const session = await auth.api.signOut({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
});

// Use server.listen instead of app.listen for Socket.IO to work
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
