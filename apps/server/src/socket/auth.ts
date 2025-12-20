import { Socket } from "socket.io";

import { getUser } from "@shared/drizzle/queries/users";

export async function socketAuth(socket: Socket, next: (err?: Error) => void) {
  const userId = socket.handshake.auth.userId;

  const user = await getUser({ id: userId });
  if (!user) return next(new Error("unauthorized"));

  socket.data.userId = user.id;
  next();
}
