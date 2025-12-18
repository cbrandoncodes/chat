import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

import { nodeApi } from "@/lib/api";
import { getGoogleOAuthClient } from "@/lib/google";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(
      new URL("/auth?error=Missing authorization code", request.url)
    );
  }

  try {
    const oauth2Client = getGoogleOAuthClient({});

    const {
      tokens: { access_token: accessToken, id_token: idToken },
    } = await oauth2Client.getToken(code);

    if (!idToken || !accessToken) {
      return NextResponse.redirect(
        new URL("/auth?error=Missing ID token or access token", request.url)
      );
    }

    const authResponse = await nodeApi.post("/auth/sign-in/social", {
      provider: "google",
      idToken: {
        token: idToken,
        accessToken: accessToken,
      },
    });

    const redirectResponse = NextResponse.redirect(
      new URL("/app", process.env.NEXT_PUBLIC_BASE_URL!)
    );

    const setCookieHeaders = authResponse.headers["set-cookie"];
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
