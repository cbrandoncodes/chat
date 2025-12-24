"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import ProfileImage from "@/components/profile-image";
import BotProfileImage from "@/components/bot-profile-image";
import SearchIcon from "@/components/icons/search";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setUsers,
  setIsLoading as setIsLoadingUsers,
} from "@/lib/store/slices/users";
import { SelectUser } from "@shared/drizzle/schema";
import { getUsersAction } from "@/lib/actions/users";
import { parseError } from "@/lib/utils";

type NewChatPopupProps = {
  children?: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  onSelectUser?: (user: SelectUser) => void;
};

export default function NewChatPopup({
  children,
  open,
  onOpenChange,
  userId,
  onSelectUser,
}: NewChatPopupProps) {
  const dispatch = useAppDispatch();
  const { users, isLoading: isLoadingUsers } = useAppSelector(
    (state) => state.users
  );

  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.id !== userId &&
      (user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()))
  );

  function handleSelectUser(user: SelectUser) {
    onSelectUser?.(user);
    onOpenChange(false);
    setSearch("");
  }

  useEffect(() => {
    if (users.length > 0) return;

    (async () => {
      try {
        dispatch(setIsLoadingUsers(true));
        const fetchedUsers = await getUsersAction();
        dispatch(setUsers(fetchedUsers));
      } catch (error: unknown) {
        const message = parseError(error);
        toast.error(message);
      } finally {
        dispatch(setIsLoadingUsers(false));
      }
    })();
  }, [dispatch, users.length]);

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        {children ?? <span className="absolute top-full right-0" />}
      </PopoverTrigger>
      <PopoverContent className="flex w-[250px] flex-col gap-4 p-3 sm:w-[273px]">
        <p className="text-base font-medium">New Message</p>

        <div className="relative">
          <Input
            icon={SearchIcon}
            placeholder="Search name or email"
            value={search}
            className="h-8 bg-transparent text-sm"
            iconClassName="text-foreground-icon"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex max-h-80 w-full flex-col gap-0.5 overflow-y-auto">
          {filteredUsers.map((user) => (
            <button
              key={user.id}
              onClick={() => handleSelectUser(user)}
              className="hover:bg-muted-background flex w-full cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 text-left transition-colors"
            >
              {user?.isBot ? (
                <BotProfileImage />
              ) : (
                <ProfileImage
                  name={user.name}
                  image={user.image ?? undefined}
                />
              )}
              <span className="text-sm font-medium">{user.name}</span>
            </button>
          ))}
          {isLoadingUsers ? (
            <span className="text-muted-foreground inline-flex items-center justify-center p-2">
              <Loader2Icon className="size-4 animate-spin" />
            </span>
          ) : (
            filteredUsers.length === 0 && (
              <p className="text-muted-foreground py-4 text-center text-sm">
                No users found
              </p>
            )
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
