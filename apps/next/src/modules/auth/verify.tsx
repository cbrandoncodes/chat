"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, CheckCircle2, XCircle, ArrowLeftIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Logo from "@/components/layout/logo";
import { authClient } from "@/lib/auth";
import { parseError } from "@/lib/utils";

type Status = "loading" | "success" | "error";

export default function Verify() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      if (!token) {
        setStatus("error");
        setMessage("Missing verification token");
        return;
      }

      try {
        const { data, error } = await authClient.magicLink.verify({
          query: { token },
        });

        if (error) {
          setStatus("error");
          setMessage(error.message ?? "Verification failed");
          return;
        }

        setStatus("success");
        setMessage("Verification successful! Redirecting...");

        setTimeout(() => {
          router.push("/app");
        }, 1500);
      } catch (error: unknown) {
        setStatus("error");
        setMessage(parseError(error));
      }
    })();
  }, [token, router]);

  return (
    <div className="bg-primary-foreground w-full">
      <div className="container">
        <div className="flex w-full flex-col items-center gap-y-8">
          <Logo size="lg" />
          <Card className="w-full max-w-md border-none shadow-sm">
            <CardContent className="flex flex-col items-center gap-y-6 py-12">
              {status === "loading" && (
                <>
                  <Loader2 className="text-primary h-12 w-12 animate-spin" />
                  <div className="text-center">
                    <h2 className="text-xl font-semibold">Verifying...</h2>
                    <p className="text-muted-foreground mt-2 text-sm">
                      Please wait while we verify your magic link
                    </p>
                  </div>
                </>
              )}

              {status === "success" && (
                <>
                  <CheckCircle2 className="h-12 w-12 text-green-500" />
                  <div className="text-center">
                    <h2 className="text-xl font-semibold">Success!</h2>
                    <p className="text-muted-foreground mt-2 text-sm">
                      {message}
                    </p>
                  </div>
                </>
              )}

              {status === "error" && (
                <>
                  <XCircle className="h-12 w-12 text-red-500" />
                  <div className="text-center">
                    <h2 className="text-xl font-semibold">
                      Verification Failed
                    </h2>
                    <p className="text-muted-foreground mt-2 text-sm">
                      {message}
                    </p>
                  </div>
                  <Button
                    onClick={() => router.push("/auth")}
                    variant="outline"
                    className="mt-4"
                  >
                    <ArrowLeftIcon className="size-4" />
                    Back to Login
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
