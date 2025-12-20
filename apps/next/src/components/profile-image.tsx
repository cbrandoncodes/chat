import BoringAvatar from "boring-avatars";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type ProfileImageProps = {
  image?: string;
  name: string;
  size?: number;
  className?: string;
};

export default function ProfileImage({
  image,
  name,
  size = 40,
  className,
}: ProfileImageProps) {
  return (
    <Avatar
      className={cn("items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <AvatarImage src={image} alt={name} />
      <AvatarFallback className="rounded-lg">
        <BoringAvatar size={size} name={name} variant="bauhaus" />
      </AvatarFallback>
    </Avatar>
  );
}
