export function getURL() {
  let url =
    process.env?.NEXT_PUBLIC_BASE_URL ??
    process.env?.NEXT_PUBLIC_VERCEL_URL ??
    "http://localhost:9090/";
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Make sure to including trailing `/`.
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  return url;
}

export const protocol =
  process.env.NODE_ENV === "production" ? "https" : "http";
export const rootDomain =
  process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:9090";
