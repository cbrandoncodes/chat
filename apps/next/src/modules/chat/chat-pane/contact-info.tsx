"use client";

import { useState } from "react";

import PhoneCallIcon from "@/components/icons/phone-call";
import VideoCallIcon from "@/components/icons/video-call";
import ProfileImage from "@/components/profile-image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ChatInfo from "./chat-info";
import BotProfileImage from "@/components/bot-profile-image";
import XIcon from "@/components/icons/x";

type ChatInfoProps = {
  children: React.ReactNode;
  user: {
    name: string;
    email: string;
    image?: string | null;
    isBot?: boolean;
  };
};

export default function ContactInfo({ children, user }: ChatInfoProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { name, email, image, isBot } = user;

  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="top-2 right-2 left-auto flex min-h-[calc(100vh-0.25rem)] translate-0 flex-col gap-6 sm:top-3 sm:right-3 sm:min-h-[calc(100vh-1.5rem)]"
        overlayClassName="bg-transparent"
      >
        <DialogHeader className="flex-row items-center justify-between">
          <DialogTitle className="text-xl font-semibold">
            Contact Info
          </DialogTitle>
          <Button
            size="icon"
            variant="ghost"
            className="size-6"
            onClick={() => setIsOpen(false)}
          >
            <XIcon className="size-3" />
          </Button>
        </DialogHeader>

        <div className="flex h-full flex-1 flex-col gap-y-6">
          <div className="flex flex-col items-center gap-4">
            {isBot ? (
              <BotProfileImage size={72} />
            ) : (
              <ProfileImage size={72} name={name} image={image ?? undefined} />
            )}
            <div className="flex flex-col items-center gap-1">
              <p className="text-center text-base font-semibold">{name}</p>
              <p className="text-muted-foreground text-center text-sm">
                {email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button size="sm" variant="outline" className="h-8 gap-1.5">
              <PhoneCallIcon className="size-4" />
              Audio
            </Button>
            <Button size="sm" variant="outline" className="h-8 gap-1.5">
              <VideoCallIcon className="size-4" />
              Video
            </Button>
          </div>

          <ChatInfo />
        </div>
      </DialogContent>
    </Dialog>
  );
}
