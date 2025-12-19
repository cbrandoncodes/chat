"use server";

import { getUsers, updateUser } from "@/lib/drizzle/queries/users";

export async function getUsersAction() {
  const users = await getUsers();
  return users;
}

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
