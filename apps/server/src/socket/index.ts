import { Server } from "socket.io";
import http from "http";

import { socketAuth } from "./auth";
import { registerStatusHandlers } from "./handlers/status";
import { registerChatHandlers } from "./handlers/chat";

export function initSocket(server: http.Server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  io.use(socketAuth);

  io.on("connection", (socket) => {
    registerStatusHandlers(socket);
    registerChatHandlers(io, socket);
  });

  return io;
}
