"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarMenu, SidebarMenuButton } from "@/components/ui/sidebar";
import HomeIcon from "@/components/icons/home";
import FolderIcon from "@/components/icons/folder";
import ImagesSquareIcon from "@/components/icons/images-square";
import MessageIcon from "@/components/icons/message";
import CompassIcon from "@/components/icons/compass";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types/nav";

export const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/app",
    icon: HomeIcon,
  },
  {
    label: "Chat",
    href: "/app/chat",
    icon: MessageIcon,
  },
  {
    label: "History",
    href: "#",
    icon: CompassIcon,
  },
  {
    label: "Files",
    href: "#",
    icon: FolderIcon,
  },
  {
    label: "Media",
    href: "#",
    icon: ImagesSquareIcon,
  },
];

export function NavMain() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-y-4">
      {navItems.map(({ label, href, icon: Icon }) => {
        const isActive = pathname === href;

        return (
          <SidebarMenu key={label} className="relative">
            <SidebarMenuButton
              className={cn(
                "mx-auto flex h-11 w-11 items-center justify-center gap-4 rounded-xl border border-transparent transition-colors",
                "hover:text-foreground hover:bg-accent-background",
                isActive
                  ? "border-primary bg-accent-background! active:text-foreground"
                  : "border-transparent bg-transparent"
              )}
              isActive={pathname === href}
              tooltip={label}
              asChild
            >
              <Link href={href}>
                <span className="text-foreground [&>svg]:size-5">
                  {Icon && <Icon className="size-5" />}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenu>
        );
      })}
    </div>
  );
}
