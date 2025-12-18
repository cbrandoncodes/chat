import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { betterFetch } from "@better-fetch/fetch";

import type { Session } from "@/types/auth";
import type { AuthSession, AuthUser } from "@/types/auth";

export async function authCheck(
  searchParams: { [key: string]: string } = {}
): Promise<{
  user: AuthUser;
  session: AuthSession;
}> {
  const { data: session } = await betterFetch<Session>(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/me`,
    {
      baseURL: process.env.NEXT_PUBLIC_SERVER_API_URL,
      headers: await headers(),
    }
  );

  if (!session) {
    return redirect(`/auth?${new URLSearchParams(searchParams).toString()}`);
  }

  return session;
}
