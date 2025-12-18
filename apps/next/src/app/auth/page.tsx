import { Metadata } from "next";

import Auth from "@/modules/auth";

export const metadata: Metadata = {
  title: "Login or Sign up",
  description: "Login or Sign up",
};

export default function AuthPage() {
  return <Auth />;
}
