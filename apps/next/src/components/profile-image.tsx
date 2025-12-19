import BoringAvatar from "boring-avatars";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type ProfileImageProps = {
  image?: string;
  name: string;
  className?: string;
};

export default function ProfileImage({
  image,
  name,
  className,
}: ProfileImageProps) {
  return (
    <Avatar className={cn("size-10 items-center justify-center", className)}>
      <AvatarImage src={image} alt={name} />
      <AvatarFallback className="rounded-lg">
        <BoringAvatar
          size={40}
          name={name}
          variant="bauhaus"
          className="size-10"
        />
      </AvatarFallback>
    </Avatar>
  );
}
