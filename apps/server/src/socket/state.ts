import { redis } from "@/lib/redis";

const STATUS_KEY = "status";

export async function setUser(userId: string, socketId: string) {
  await redis.hset(STATUS_KEY, { [userId]: socketId });
}

export async function deleteUser(userId: string) {
  await redis.hdel(STATUS_KEY, userId);
}

export async function getUsers(): Promise<string[]> {
  return await redis.hkeys(STATUS_KEY);
}

export async function getUserSocket(userId: string): Promise<string | null> {
  return await redis.hget(STATUS_KEY, userId);
}
