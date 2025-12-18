import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOutIcon } from "lucide-react";
import { toast } from "sonner";

import { Button, ButtonProps } from "@/components/ui/button";
import { authClient } from "@/lib/auth";

type LogoutProps = {} & ButtonProps;

export default function Logout({ children, disabled, ...props }: LogoutProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    try {
      setIsLoading(true);
      const { error } = await authClient.signOut();

      if (error) {
        throw new Error(error?.message ?? "Logout failed. Please try again.");
      }

      router.refresh();
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error?.message
          : "Logout failed. Please try again.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button disabled={disabled || isLoading} onClick={handleLogout} {...props}>
      {children ?? (
        <>
          <LogOutIcon />
          Log out
        </>
      )}
    </Button>
  );
}
