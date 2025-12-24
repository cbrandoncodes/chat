"use client";

import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/components/layout/logo";
import MagicLinkAuth from "./magic-link-auth";
import GoogleAuth from "./google-auth";

export default function Auth() {
  return (
    <div className="bg-primary-foreground w-full [&>.container]:pt-16 lg:[&>.container]:pt-24">
      <div className="container">
        <div className="flex w-full flex-col items-center gap-y-8">
          <Logo size="lg" />
          <div className="flex flex-col items-center gap-y-4">
            <h1 className="text-center text-3xl font-bold">Welcome Back</h1>
            <p className="text-muted-foreground text-center text-base">
              Connect with your friends and colleagues securely and instantly.
            </p>
          </div>
          <Card className="x w-full max-w-xl border-none shadow-sm sm:py-8">
            <CardContent className="space-y-8 text-center sm:px-8">
              <MagicLinkAuth />
              <div className="flex w-full items-center justify-between gap-4 sm:gap-6">
                <div className="border-t-placeholder/60 flex-1 border-t" />
                <p className="text-muted-foreground min-w-fit flex-1 text-center text-xs font-medium sm:text-sm">
                  OR CONTINUE WITH
                </p>
                <div className="border-t-placeholder/60 flex-1 border-t" />
              </div>
              <GoogleAuth />
            </CardContent>
          </Card>
          <p className="text-muted-foreground text-center text-sm">
            By continuing, you agree to our{" "}
            <Link href="#" className="link">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="link">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
