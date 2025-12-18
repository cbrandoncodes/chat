import { config } from "dotenv";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins";
import { SendEmailCommand } from "@aws-sdk/client-ses";
import { render } from "@react-email/render";

import MagicLinkEmail from "@/components/email-templates/magic-link";
import { db } from "@/lib/drizzle";
import { sesClient } from "@/lib/ses";

config({
  path: ".env",
});

export const auth = betterAuth({
  baseURL: process.env.BASE_URL as string,
  secret: process.env.BETTER_AUTH_SECRET as string,
  trustedOrigins: [
    process.env.BASE_URL as string,
    process.env.CLIENT_URL as string,
  ],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      redirectURI: `${process.env.CLIENT_URL}/api/auth/google/callback`,
    },
  },

  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token }) => {
        const magicLinkHtml = await render(
          MagicLinkEmail({
            magicLink: `${process.env.CLIENT_URL}/auth/verify?token=${token}`,
          })
        );
        const sendMagicLinkEmailCommand = new SendEmailCommand({
          Source: `Chat <${process.env.AWS_SES_SENDER!}>`,
          Destination: {
            ToAddresses: [email],
          },
          ReplyToAddresses: [],
          Message: {
            Body: {
              Html: {
                Charset: "UTF-8",
                Data: magicLinkHtml,
              },
            },
            Subject: {
              Charset: "UTF-8",
              Data: "Chat - Magic Link",
            },
          },
        });
        await sesClient.send(sendMagicLinkEmailCommand);
      },
    }),
  ],
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  user: {
    deleteUser: {
      enabled: true,
    },
  },
});
