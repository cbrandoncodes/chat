import ProfileImage from "./profile-image";
import { cn } from "@/lib/utils";

export default function BotProfileImage({
  className,
  size = 40,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      className={cn(
        "border-primary/20 bg-primary/10 flex items-center justify-center overflow-hidden rounded-full border-2 p-1 [&_img]:size-6",
        className
      )}
      style={{ width: size, height: size }}
    >
      <ProfileImage name="Bot" image="/assets/media/bot.svg" size={size} />
    </div>
  );
}
