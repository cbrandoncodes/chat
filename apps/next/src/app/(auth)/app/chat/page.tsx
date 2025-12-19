import { Metadata } from "next";
import { redirect } from "next/navigation";

import Chat from "@/modules/chat";
import { getUser } from "@shared/drizzle/queries/users";
import { authCheck, getAuthToken } from "@/lib/utils/auth";

export const metadata: Metadata = {
  title: "Chat",
  description: "Chat",
};

export default async function ChatPage() {
  const session = await authCheck();

  const userId = session?.user?.id;
  const user = await getUser({ id: userId });
  const authToken = await getAuthToken();

  if (!user) {
    redirect("/auth");
  }

  return (
    <div className="h-full">
      <Chat user={user} authToken={authToken} />
    </div>
  );
}
