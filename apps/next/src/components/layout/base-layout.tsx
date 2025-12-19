"use client";

import { ThemeProvider } from "next-themes";
import { AppProgressProvider } from "@bprogress/next";
import { Toaster } from "sonner";

import StoreProvider from "@/lib/store/provider";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function BaseLayout({ children }: AppLayoutProps) {
  return (
    <>
      <div className="bg-primary-foreground text-foreground flex min-h-screen flex-col">
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <AppProgressProvider
              height="3px"
              color="#5d76da66"
              options={{ showSpinner: false }}
              shallowRouting
            >
              {children}
            </AppProgressProvider>
            <Toaster duration={8000} />
          </ThemeProvider>
        </StoreProvider>
      </div>
    </>
  );
}
