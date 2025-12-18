import { type NextRequest, NextResponse } from "next/server";
import { betterFetch } from "@better-fetch/fetch";
import { headers } from "next/headers";

import type { Session } from "@/types/auth";

export async function middleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/me`,
    {
      baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
      headers: await headers(),
    }
  );

  const pathname = request.nextUrl.pathname;

  if (!session && !pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (session?.user && !pathname.startsWith("/app")) {
    return NextResponse.redirect(new URL("/app", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/app/:path*", "/((?!api|_next|.*\\..*).*)"],
};
