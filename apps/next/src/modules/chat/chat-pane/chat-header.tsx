import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ProfileImage from "@/components/profile-image";
import SearchIcon from "@/components/icons/search";
import PhoneCallIcon from "@/components/icons/phone-call";
import VideoCallIcon from "@/components/icons/video-call";
import MoreHorizontalIcon from "@/components/icons/more-horizontal";
import ContactInfo from "./contact-info";
import { cn } from "@/lib/utils";

type ChatHeaderProps = {
  user: {
    name: string;
    email: string;
    isOnline: boolean;
    image?: string | null;
  };
};

const chatOptions = [
  { icon: SearchIcon, label: "Search" },
  { icon: PhoneCallIcon, label: "Voice call" },
  { icon: VideoCallIcon, label: "Video call" },
  { icon: MoreHorizontalIcon, label: "More options" },
];

export default function ChatHeader({ user }: ChatHeaderProps) {
  const { name, email, image, isOnline } = user;

  return (
    <div className="flex flex-col gap-2 px-4 py-4 lg:px-6">
      <div className="grid w-full grid-cols-[1fr_2.5rem] items-center gap-4 sm:grid-cols-[1fr_auto]">
        <div className="grid grid-cols-[2.5rem_1fr] items-center gap-2 overflow-hidden lg:gap-3">
          <ContactInfo
            user={{
              email,
              name,
              image,
            }}
          >
            <Button variant="ghost" size="icon" className="size-10">
              <ProfileImage name={name} image={image ?? undefined} />
            </Button>
          </ContactInfo>
          <div className="flex max-w-[calc(60vw-4.5rem)] flex-col lg:max-w-[calc(40vw-16rem)]">
            <span className="block truncate text-sm font-semibold">{name}</span>
            <span
              className={cn(
                "text-xs",
                isOnline ? "text-primary" : "text-muted-foreground"
              )}
            >
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>

        {/* Desktop options */}
        <div className="hidden items-center gap-4 lg:flex">
          {chatOptions.map(({ icon: Icon, label }) => (
            <Button key={label} variant="outline" size="icon">
              <Icon className="size-4" />
            </Button>
          ))}
        </div>

        {/* Mobile options popover */}
        <div className="lg:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="min-w-10 flex-1">
                <MoreHorizontalIcon className="size-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-48 p-2">
              <div className="flex flex-col gap-1">
                {chatOptions.map(({ icon: Icon, label }) => (
                  <Button
                    key={label}
                    variant="ghost"
                    className="h-auto justify-start gap-3 px-3 py-2"
                  >
                    <Icon className="size-4" />
                    <span className="text-sm">{label}</span>
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
