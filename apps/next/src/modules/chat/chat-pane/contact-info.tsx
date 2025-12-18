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

type ChatInfoProps = {
  children: React.ReactNode;
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
};

export default function ContactInfo({ children, user }: ChatInfoProps) {
  const { name, email, image } = user;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Contact Info
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col items-center gap-6">
            <ProfileImage
              name={name}
              image={image ?? undefined}
              className="size-18"
            />
            <div className="flex flex-col items-center gap-2">
              <p className="text-center text-base font-semibold">{name}</p>
              <p className="text-muted-foreground text-center text-sm">
                {email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button size="sm" variant="outline" className="h-8">
              <PhoneCallIcon className="size-4" />
              Audio
            </Button>
            <Button size="sm" variant="outline" className="h-8">
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
