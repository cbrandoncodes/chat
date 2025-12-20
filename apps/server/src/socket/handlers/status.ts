import { Socket } from "socket.io";

import { deleteUser, getUsers, setUser } from "@/socket/state";

export async function registerStatusHandlers(socket: Socket) {
  await setUser(socket.data.userId, socket.id);

  const userId = socket.data.userId;
  const onlineUsers = await getUsers();

  socket.broadcast.emit("user:online", { userId });

  socket.emit("user:online-users", { userIds: onlineUsers });

  socket.on("disconnect", () => {
    deleteUser(userId);
    socket.broadcast.emit("user:offline", { userId });
  });
}
