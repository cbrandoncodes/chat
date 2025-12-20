"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2Icon, Search } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import ProfileImage from "@/components/profile-image";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setUsers,
  setIsLoading as setIsLoadingUsers,
} from "@/lib/store/slices/users";
import { SelectUser } from "@shared/drizzle/schema";
import { getUsersAction } from "@/lib/actions/users";
import { parseError } from "@/lib/utils";
import BotProfileImage from "@/components/bot-profile-image";

type NewChatDialogProps = {
  children: React.ReactNode;
  userId: string;
  onSelectUser?: (user: SelectUser) => void;
};

export default function NewChatDialog({
  userId,
  children,
  onSelectUser,
}: NewChatDialogProps) {
  const dispatch = useAppDispatch();
  const { users, isLoading: isLoadingUsers } = useAppSelector(
    (state) => state.users
  );

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.id !== userId &&
      (user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()))
  );

  function handleSelectUser(user: SelectUser) {
    onSelectUser?.(user);
    setOpen(false);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-sm gap-0 rounded-2xl p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-xl font-semibold">
            New Message
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-4">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              placeholder="Search name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex max-h-80 flex-col overflow-y-auto px-4 pb-6">
          {filteredUsers.map((user) => (
            <button
              key={user.id}
              onClick={() => handleSelectUser(user)}
              className="hover:bg-muted flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors"
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
      </DialogContent>
    </Dialog>
  );
}
