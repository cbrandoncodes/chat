import http from "http";
import { fromNodeHeaders } from "better-auth/node";

import { auth } from ".";

export async function authCheck({
  headers,
  token,
}: {
  headers: http.IncomingHttpHeaders;
  token?: string;
}) {
  const parsedHeaders = token
    ? new Headers({
        origin: process.env.CLIENT_URL as string,
        Authorization: `Bearer ${token}`,
      })
    : fromNodeHeaders(headers);

  const session = await auth.api.getSession({
    headers: parsedHeaders,
  });

  return session ?? null;
}
