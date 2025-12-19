import BoringAvatar from "boring-avatars";
import { UserIcon, ChevronDownIcon } from "lucide-react";

import { UserProfileDialog } from "@/components/user-profile-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Logout from "@/modules/auth/logout";
import { getNameInitials } from "@/lib/utils/user";
import { SelectUser } from "@shared/drizzle/schema";

type UserMenuProps = {
  user: SelectUser;
};

export default function UserMenu({ user }: UserMenuProps) {
  const { name, email, image } = user;
  const initials = name ? getNameInitials(name) : "N/A";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex cursor-pointer items-center gap-2">
        <Avatar className="bg-muted">
          {image ? <AvatarImage src={image} alt={initials} /> : null}
          {image ? null : (
            <AvatarFallback className="rounded-lg">
              <BoringAvatar size={32} name={email} variant="bauhaus" />
            </AvatarFallback>
          )}
        </Avatar>
        <ChevronDownIcon className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-60"
        align="end"
      >
        <UserProfileDialog user={user}>
          <Button
            size="sm"
            variant="ghost"
            className="w-full justify-start gap-2 font-normal"
          >
            <UserIcon className="size-4" />
            Update profile
          </Button>
        </UserProfileDialog>
        <Logout
          size="sm"
          variant="ghost"
          className="w-full justify-start gap-2 font-normal"
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
