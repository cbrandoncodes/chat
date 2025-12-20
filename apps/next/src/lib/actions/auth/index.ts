"use server";

import { headers, cookies } from "next/headers";
import { betterFetch } from "@better-fetch/fetch";

import { parseError } from "@/lib/utils";
import { BETTER_AUTH_TOKEN } from "@/lib/cookies";

export async function signOut() {
  const { error } = await betterFetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/me/sign-out`,
    {
      baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
      headers: await headers(),
    }
  );

  const cookieStore = await cookies();
  cookieStore.delete(BETTER_AUTH_TOKEN);

  if (error) {
    const message = parseError(error);
    throw new Error(message);
  }
}
