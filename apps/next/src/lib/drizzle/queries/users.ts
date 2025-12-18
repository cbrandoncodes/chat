"server-only";

import { unstable_cache, revalidateTag } from "next/cache";
import { eq } from "drizzle-orm";

import { db } from "@shared/drizzle";
import { user as users } from "@shared/drizzle/schema";

export function getUser({ id }: { id: string }) {
  return unstable_cache(
    async () => {
      const user = await db.query.user.findFirst({
        where: eq(users.id, id),
      });
      return user;
    },
    undefined,
    {
      revalidate: 60,
      tags: ["users", `user-${id}`],
    }
  )();
}

export async function updateUser({ id, name }: { id: string; name: string }) {
  const updatedUser = (
    await db.update(users).set({ name }).where(eq(users.id, id)).returning()
  )?.[0];

  revalidateTag("users");
  revalidateTag(`user-${id}`);

  return updatedUser;
}
