"use client";

import { usePathname } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import UserMenu from "@/components/layout/header/user-menu";
import { SelectUser } from "@shared/drizzle/schema";
import AppSearch from "./app-search";
import CogsIcon from "@/components/icons/cogs";
import BellIcon from "@/components/icons/bell";
import { navItems } from "@/components/layout/sidebar/nav-main";

type SiteHeaderProps = {
  user: SelectUser;
};

export function SiteHeader({ user }: SiteHeaderProps) {
  const pathname = usePathname();

  const activeNavItem =
    navItems.find((item) => item.href === pathname) ?? navItems[0];
  const { icon: Icon, label } = activeNavItem;

  return (
    <header className="sticky top-0 z-50 flex shrink-0 items-center gap-2 bg-transparent px-2 py-2 backdrop-blur-md transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) sm:px-4">
      <div className="bg-background flex h-(--header-height) w-full items-center gap-1 rounded-2xl px-4 shadow-sm sm:px-6 lg:gap-2 lg:px-8">
        <span className="text-foreground inline-flex items-center gap-2">
          <Icon className="size-4" />
          <span className="hidden text-sm font-medium sm:inline">{label}</span>
        </span>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden sm:block">
            <AppSearch />
          </div>
          <Button size="icon" variant="outline" className="size-8">
            <BellIcon />
          </Button>
          <Button size="icon" variant="outline" className="size-8">
            <CogsIcon />
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
