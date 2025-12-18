"server-only";

import { eq } from "drizzle-orm";

import { db } from "@shared/drizzle";
import { user as users } from "@shared/drizzle/schema";

export async function getUser({ id }: { id: string }) {
  const user = await db.query.user.findFirst({
    where: eq(users.id, id),
  });
  return user;
}
