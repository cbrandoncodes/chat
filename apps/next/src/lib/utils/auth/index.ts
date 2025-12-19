import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { headers, cookies } from "next/headers";
import { betterFetch } from "@better-fetch/fetch";

import type { Session } from "@/types/auth";
import type { AuthSession, AuthUser } from "@/types/auth";
import { BETTER_AUTH_TOKEN } from "@/lib/cookies";

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

export async function authCheckApi() {
  const { data: session } = await betterFetch<Session>(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/me`,
    {
      baseURL: process.env.NEXT_PUBLIC_SERVER_API_URL,
      headers: await headers(),
    }
  );

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    ) as unknown as Promise<{
      user: AuthUser;
      session: AuthSession;
    }>;
  }

  return session;
}

export async function getAuthToken() {
  const cookiesList = await cookies();
  const token = cookiesList.get(BETTER_AUTH_TOKEN)?.value;

  return token;
}
