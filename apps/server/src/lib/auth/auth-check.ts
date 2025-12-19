import http from "http";
import { fromNodeHeaders } from "better-auth/node";

import { auth } from ".";

export async function authCheck({
  headers,
}: {
  headers: http.IncomingHttpHeaders;
}) {
  const parsedHeaders = fromNodeHeaders(headers);
  const session = await auth.api.getSession({
    headers: parsedHeaders,
  });

  return session ?? null;
}
