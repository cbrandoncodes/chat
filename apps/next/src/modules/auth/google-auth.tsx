"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import GoogleIcon from "@/components/icons/google";

export default function GoogleAuthButton() {
  const [disabled, setDisabled] = useState(false);

  function handleGoogleAuth() {
    setDisabled(true);
    window.location.href = `/api/auth/google`;
  }

  return (
    <Button
      size="lg"
      variant="outline"
      className="w-full"
      disabled={disabled}
      onClick={handleGoogleAuth}
    >
      <GoogleIcon className="size-5" />
      Google
    </Button>
  );
}
