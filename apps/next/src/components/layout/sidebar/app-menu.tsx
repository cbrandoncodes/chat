"use client";

import { ChevronLeft, Pen, Gift, Sun, LogOut, User } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Logo from "@/components/layout/logo";
import { UserProfileDialog } from "@/components/user-profile-dialog";
import { SelectUser } from "@shared/drizzle/schema";
import Logout from "@/modules/auth/logout";

type AppMenuProps = {
  user: SelectUser;
};

export default function AppMenu({ user }: AppMenuProps) {
  const { name, email } = user;

  const credits = {
    left: 20,
    total: 25,
    usedToday: 5,
    renewsIn: "6h 24m",
    tomorrowBonus: 25,
  };

  const progress = ((credits.total - credits.left) / credits.total) * 100;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="size-10">
          <Logo link={false} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        align="start"
        sideOffset={16}
        className="w-80 rounded-2xl p-0"
      >
        <div className="flex flex-col gap-2 p-4">
          <Button variant="ghost" className="justify-start gap-3 px-3">
            <span className="bg-muted flex size-8 items-center justify-center rounded-lg">
              <ChevronLeft className="size-4" />
            </span>
            <span className="text-sm font-medium">Go back to dashboard</span>
          </Button>

          <Button
            variant="ghost"
            className="bg-muted hover:bg-muted/80 justify-start gap-3 px-3"
          >
            <span className="flex size-8 items-center justify-center">
              <Pen className="size-4" />
            </span>
            <span className="text-sm font-medium">Rename file</span>
          </Button>
        </div>

        <Separator />

        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{name}</span>
            <span className="text-muted-foreground text-sm">{email}</span>
          </div>

          <div className="bg-muted/50 flex flex-col gap-3 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-muted-foreground text-xs">Credits</span>
                <span className="text-lg font-semibold">
                  {credits.left} left
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-muted-foreground text-xs">Renews in</span>
                <span className="text-lg font-semibold">
                  {credits.renewsIn}
                </span>
              </div>
            </div>

            <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
              <div
                className="bg-primary h-full rounded-full transition-all"
                style={{ width: `${100 - progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">
                {credits.usedToday} of {credits.total} used today
              </span>
              <span className="text-primary text-xs font-medium">
                +{credits.tomorrowBonus} tomorrow
              </span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-1 p-4">
          <UserProfileDialog user={user}>
            <Button variant="ghost" className="justify-start gap-3 px-3">
              <span className="bg-muted flex size-8 items-center justify-center rounded-lg">
                <User className="size-4" />
              </span>
              <span className="text-sm font-medium">Update profile</span>
            </Button>
          </UserProfileDialog>

          <Button variant="ghost" className="justify-start gap-3 px-3">
            <span className="bg-muted flex size-8 items-center justify-center rounded-lg">
              <Gift className="size-4" />
            </span>
            <span className="text-sm font-medium">Win free credits</span>
          </Button>

          <Button variant="ghost" className="justify-start gap-3 px-3">
            <span className="bg-muted flex size-8 items-center justify-center rounded-lg">
              <Sun className="size-4" />
            </span>
            <span className="text-sm font-medium">Theme Style</span>
          </Button>

          <Logout variant="ghost" className="justify-start gap-3 px-3">
            <span className="bg-muted flex size-8 items-center justify-center rounded-lg">
              <LogOut className="size-4" />
            </span>
            <span className="text-sm font-medium">Log out</span>
          </Logout>
        </div>
      </PopoverContent>
    </Popover>
  );
}
