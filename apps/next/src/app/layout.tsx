import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";

import BaseLayout from "@/components/layout/base-layout";
import { cn } from "@/lib/utils";
import siteMetadata from "@/lib/utils/metadata";

import "@/styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: siteMetadata.siteUrl,
  title: {
    template: "%s | Chat",
    default: siteMetadata.title,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    creator: siteMetadata.author,
  },
} satisfies Metadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />

        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={cn(
          inter.variable,
          geistSans.variable,
          geistMono.variable,
          "antialiased"
        )}
      >
        <BaseLayout>{children}</BaseLayout>
      </body>
    </html>
  );
}
