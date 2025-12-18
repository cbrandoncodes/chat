import { google } from "googleapis";

const REDIRECT_URI = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google/callback`;

export function getGoogleOAuthClient({
  accessToken,
  refreshToken,
}: {
  accessToken?: string;
  refreshToken?: string;
}) {
  const client = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    redirectUri: REDIRECT_URI,
  });
  accessToken &&
    refreshToken &&
    client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  return client;
}

/**
 * Generate the Google OAuth URL for frontend-initiated OAuth flow.
 * This is used instead of better-auth's social sign-in to avoid PKCE/state issues
 * when frontend and backend are on different domains.
 */
export function getGoogleAuthUrl() {
  const client = getGoogleOAuthClient({});

  const authUrl = client.generateAuthUrl({
    access_type: "offline",
    prompt: "select_account",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
      "openid",
    ],
  });

  return authUrl;
}
