"use server";

import { headers } from "next/headers";
import { betterFetch } from "@better-fetch/fetch";

import { parseError } from "@/lib/utils";

export async function signOut() {
  const { error } = await betterFetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/sign-out`,
    {
      baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
      headers: await headers(),
    }
  );

  if (error) {
    const message = parseError(error);
    throw new Error(message);
  }
}
