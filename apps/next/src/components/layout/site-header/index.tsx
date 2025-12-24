"use client";

import { usePathname } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import UserMenu from "@/components/layout/site-header/user-menu";
import { SelectUser } from "@shared/drizzle/schema";
import CogsIcon from "@/components/icons/cogs";
import BellIcon from "@/components/icons/bell";
import { navItems } from "@/components/layout/sidebar/nav-main";
import MessageIcon from "@/components/icons/message";
import AppSearch from "./app-search";
import { useAppDispatch } from "@/lib/store/hooks";
import { setIsChatListOpen } from "@/lib/store/slices/chats";

type SiteHeaderProps = {
  user: SelectUser;
};

export function SiteHeader({ user }: SiteHeaderProps) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  function handleOpenChatList() {
    dispatch(setIsChatListOpen(true));
  }

  const activeNavItem =
    navItems.find((item) => item.href === pathname) ?? navItems[0];
  const { icon: Icon, label } = activeNavItem;

  return (
    <header className="h-var(--header-height) sticky top-0 z-50 flex shrink-0 items-center gap-2 bg-transparent px-2 pt-2 backdrop-blur-md transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) sm:px-3 sm:pt-3">
      <div className="bg-background flex h-(--header-height) w-full items-center gap-1 rounded-2xl px-4 shadow-xs sm:gap-8 sm:px-6">
        <div>
          <Button
            variant="outline"
            onClick={handleOpenChatList}
            className="lg:hidden"
          >
            <MessageIcon />
            Chats
          </Button>
          <span className="text-foreground hidden items-center gap-2 lg:inline-flex">
            <Icon className="text-foreground-alt size-4 stroke-2" />
            <span className="text-sm font-medium">{label}</span>
          </span>
        </div>
        <div className="ml-auto flex flex-1 items-center justify-end gap-2">
          <div className="hidden w-full max-w-[250px] sm:block lg:max-w-[300px]">
            <AppSearch />
          </div>
          <Button
            size="icon"
            variant="outline"
            className="text-foreground-icon size-8"
          >
            <BellIcon className="size-3" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="text-foreground-icon size-8"
          >
            <CogsIcon className="size-3" />
          </Button>
          <Separator
            orientation="vertical"
            className="mx-1 data-[orientation=vertical]:h-4 sm:mx-2"
          />
          <UserMenu user={user} />
        </div>
      </div>
    </header>
  );
}
