import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";
import { SiteHeader } from "@/components/layout/header";
import PageMessage from "@/components/page-message";
import { authCheck } from "@/lib/utils/auth";
import { getUser } from "@/lib/drizzle/queries/users";
import { SelectUser } from "@shared/drizzle/schema";
import { UserProfileDialog } from "@/components/user-profile-dialog";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await authCheck();
  const userId = session?.user?.id;

  let user: SelectUser | null = null;
  let message: string | null = null;

  try {
    user = (await getUser({ id: userId })) ?? null;
  } catch (error: unknown) {
    message =
      error instanceof Error
        ? (error?.message ?? "An unknown error occurred")
        : "An unknown error occurred";
    console.log("error ", error);
  }

  const cookieStore = await cookies();
  const defaultOpen =
    cookieStore.get("sidebar_state")?.value === "true" ||
    cookieStore.get("sidebar_state") === undefined;

  if (!user) {
    redirect("/auth");
  }

  return (
    <>
      {message ? (
        <PageMessage>{message}</PageMessage>
      ) : (
        <SidebarProvider
          defaultOpen={defaultOpen}
          style={
            {
              "--sidebar-width": "calc(var(--sidebar-spacing) * 24)",
              "--header-height": "calc(var(--spacing) * 14)",
            } as React.CSSProperties
          }
          className="bg-sidebar"
        >
          <AppSidebar variant="inset" user={user} />
          <SidebarInset className="bg-muted-background">
            <SiteHeader user={user} />
            <div className="flex flex-1 flex-col">
              <div className="@container/main h-full px-2 pt-2 pb-4 sm:px-4 xl:group-data-[theme-content-layout=centered]/layout:container xl:group-data-[theme-content-layout=centered]/layout:mx-auto">
                {children}
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      )}
      <UserProfileDialog user={user} />
    </>
  );
}
