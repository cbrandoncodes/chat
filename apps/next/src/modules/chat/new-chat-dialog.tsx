"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import ProfileImage from "@/components/profile-image";
import { users, type User } from "@/lib/data/users";

type NewChatDialogProps = {
  children: React.ReactNode;
  onSelectUser?: (user: User) => void;
};

export default function NewChatDialog({
  children,
  onSelectUser,
}: NewChatDialogProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectUser = (user: User) => {
    onSelectUser?.(user);
    setOpen(false);
    setSearch("");
  };

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
              <ProfileImage name={user.name} image={user.image ?? undefined} />
              <span className="text-sm font-medium">{user.name}</span>
            </button>
          ))}
          {filteredUsers.length === 0 && (
            <p className="text-muted-foreground py-4 text-center text-sm">
              No users found
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
