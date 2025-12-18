"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProps,
  useSidebar,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavMain } from "@/components/layout/sidebar/nav-main";
import { useIsTablet } from "@/hooks/use-mobile";
import StarFourIcon from "@/components/icons/star-four";
import ProfileImage from "@/components/profile-image";
import AppMenu from "./app-menu";
import { SelectUser } from "@shared/drizzle/schema";

type AppSidebarProps = SidebarProps & {
  user: SelectUser;
};

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const pathname = usePathname();
  const { setOpen, setOpenMobile, isMobile } = useSidebar();
  const isTablet = useIsTablet();

  useEffect(() => {
    if (isMobile) setOpenMobile(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    setOpen(!isTablet);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTablet]);

  return (
    <Sidebar collapsible="none" {...props} className="min-h-[calc(100vh-1rem)]">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex h-14 w-full items-center justify-center gap-1.5">
            <AppMenu user={user} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="flex flex-col justify-between">
        <ScrollArea>
          <NavMain />
        </ScrollArea>
        <div className="bg-sidebar flex flex-col items-center gap-y-8 py-6">
          <span className="text-foreground">
            <StarFourIcon className="size-5" />
          </span>
          <ProfileImage name="John Doe" />
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
