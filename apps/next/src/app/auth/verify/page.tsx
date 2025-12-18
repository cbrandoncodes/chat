import { Metadata } from "next";
import { Suspense } from "react";

import Verify from "@/modules/auth/verify";

export const metadata: Metadata = {
  title: "Verify Magic Link",
  description: "Verify your magic link",
};

export default function VerifyPage() {
  return (
    <Suspense>
      <Verify />
    </Suspense>
  );
}
