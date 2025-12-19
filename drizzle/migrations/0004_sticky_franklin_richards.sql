-- Drop the old boolean column and add new jsonb column
ALTER TABLE "chats" DROP COLUMN "unread";--> statement-breakpoint
ALTER TABLE "chats" ADD COLUMN "unread" jsonb DEFAULT '[]'::jsonb NOT NULL;