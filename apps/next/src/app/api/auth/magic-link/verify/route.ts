import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

import { nodeApi } from "@/lib/api";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { error: "Missing token", success: false },
      { status: 400 }
    );
  }

  try {
    const response = await nodeApi.get(
      `/auth/magic-link/verify?token=${token}`
    );

    const redirectResponse = NextResponse.redirect(
      new URL("/app", process.env.NEXT_PUBLIC_BASE_URL!)
    );

    const setCookieHeaders = response.headers["set-cookie"];
    if (setCookieHeaders) {
      for (const cookie of setCookieHeaders) {
        redirectResponse.headers.append("Set-Cookie", cookie);
      }
    }

    return redirectResponse;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Better-auth sign-in failed:", error.response?.data);
    } else {
      console.error("Google callback error:", error);
    }
    return NextResponse.redirect(
      new URL("/auth?error=Something went wrong", request.url)
    );
  }
}
