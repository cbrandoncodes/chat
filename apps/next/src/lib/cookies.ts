export const BETTER_AUTH_TOKEN =
  process.env.NEXT_PUBLIC_ENV === "production"
    ? "__Secure-better-auth.session_token"
    : "better-auth.session_token";
