import http from "http";
import { fromNodeHeaders } from "better-auth/node";

import { auth } from ".";

export async function authCheck({
  headers,
}: {
  headers: http.IncomingHttpHeaders;
}) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(headers),
  });

  return session ?? null;
}
