"use server";

import { updateUser } from "@/lib/drizzle/queries/users";

export async function updateUserAction({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const updatedUser = await updateUser({ id, name });

  if (!updatedUser) {
    throw new Error("Failed to update user");
  }

  return updatedUser;
}
