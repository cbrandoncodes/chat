import { authClient } from "@/lib/auth";

export type AuthUser = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null | undefined | undefined;
};

export type AuthSession = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  expiresAt: Date;
  token: string;
  ipAddress?: string | null | undefined | undefined;
  userAgent?: string | null | undefined | undefined;
};

export type Session = typeof authClient.$Infer.Session;
