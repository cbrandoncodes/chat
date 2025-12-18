import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  showTitle?: boolean;
  link?: boolean;
};

function LogoImage({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  return (
    <Image
      src="/assets/media/logo.svg"
      alt="Chat"
      width={44}
      height={44}
      className={cn("w-auto object-contain", {
        "h-12 sm:h-14": size === "lg",
        "h-11": size === "md",
        "h-6": size === "sm",
      })}
    />
  );
}

export default function Logo({
  size = "md",
  showTitle = false,
  link = true,
}: LogoProps) {
  return (
    <div className="flex items-center gap-2">
      {link ? (
        <Link href="/">
          <LogoImage size={size} />
        </Link>
      ) : (
        <LogoImage size={size} />
      )}
      {showTitle && (
        <span className="text-2xl font-semibold tracking-tighter">Chat</span>
      )}
    </div>
  );
}
