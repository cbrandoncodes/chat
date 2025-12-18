import { Metadata } from "next";

import { getURL } from "@/lib/config";

const siteURL = getURL();

export const siteMetadata = {
  title:
    "Chat - Connect with your friends and colleagues securely and instantly.",
  author: "Chat",
  headerTitle: "Chat",
  description:
    "Connect with your friends and colleagues securely and instantly.",
  language: "en-us",
  siteUrl: new URL(siteURL),
  locale: "en-US",
};

export function generateMeta({
  title,
  description,
  canonical,
}: {
  title: string;
  description: string;
  canonical: string;
}): Metadata {
  return {
    title: title ?? siteMetadata.title,
    description: description ?? siteMetadata.description,
    metadataBase: new URL(siteURL),
    alternates: {
      canonical: `${siteURL}/app${canonical}`,
    },
  };
}

export default siteMetadata;
