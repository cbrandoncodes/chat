import { NextRequest, NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

import {
  updateMessage,
  insertMessage,
  getMessagesByChatId,
  getMessage,
} from "@/lib/drizzle/queries/messages";
import { parsePartialJson } from "@/lib/utils/parse-partial-json";
import { getChat } from "@shared/drizzle/queries/chats";
import { BotChatResponse } from "@/types/chat";
import { authCheckApi } from "@/lib/utils/auth";
import { getChatBotUser } from "@/lib/drizzle/queries/users";
import { updateChat } from "@/lib/drizzle/queries/chats";

const MODEL = "gpt-4o-mini";

export async function POST(req: NextRequest) {
  try {
    await authCheckApi();

    const { chatId, messageId } = await req.json();

    if (!chatId || !messageId) {
      return NextResponse.json(
        {
          error: "Missing required fields.",
        },
        { status: 400 }
      );
    }

    const chat = await getChat({ chatId });
    if (!chat) {
      return NextResponse.json(
        {
          error: "Chat not found.",
        },
        { status: 404 }
      );
    }

    const userMessage = await getMessage({ messageId });
    if (!userMessage) {
      return NextResponse.json(
        {
          error: "User message not found.",
        },
        { status: 404 }
      );
    }

    const chatMessages = await getMessagesByChatId({ chatId });
    const chatBotUser = await getChatBotUser();

    if (!chatBotUser) {
      return NextResponse.json(
        {
          error: "Chat bot not found.",
        },
        { status: 404 }
      );
    }

    const systemMessage = {
      role: "system",
      content: `You are a helpful, intelligent, and versatile AI assistant. Your role is to assist users across a wide range of topics including general knowledge, problem solving, learning, productivity, planning, creative tasks, and technical questions. Always maintain a professional, friendly, and supportive tone. Provide clear, accurate, and practical responses based on general best practices and commonly accepted principles.
      
      If a user requests highly specialized, professional, or sensitive advice (such as medical, legal, or financial advice), provide only high-level, informational guidance and recommend consulting a qualified professional when appropriate.
      
      
      IMPORTANT RESPONSE RULES:
      - Your response must be a valid JSON object
      - The JSON object must contain exactly ONE top-level field: "response"
      - The value of "response" must be a string
      - Do NOT include any additional fields
      - Do NOT include any text outside the JSON object
      
      
      EXAMPLE RESPONSE FORMAT:
      {
        "response": "Here is a clear and helpful answer to your question."
      }
      `,
    };
    const newMessage = { role: "user", content: userMessage.content };
    const messages = [
      systemMessage,
      ...chatMessages.map(
        ({ senderId, content }: { senderId: string; content: string }) => {
          return {
            role: senderId === chatBotUser.id ? "assistant" : "user",
            content,
          };
        }
      ),
      newMessage,
    ];

    const botMessage = await insertMessage({
      data: {
        chatId,
        senderId: chatBotUser.id,
        content: "",
      },
    });

    if (!userMessage || !botMessage) {
      throw new Error("Failed to insert messages");
    }

    const result = streamText({
      model: openai(MODEL),
      messages: messages.map(({ role, content }) => ({
        role: role as "system" | "user" | "assistant",
        content: content,
      })),
    });

    const stream = result.fullStream;
    let buffer = "";
    let parsed: BotChatResponse | null = null;
    let latestDate = Date.now();

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (!chunk.type) continue;

            if (chunk.type === "error") {
              throw new Error(
                (chunk as unknown as { error: string })?.error ??
                  (chunk as unknown as { textDelta: string })?.textDelta ??
                  "Unknown error"
              );
            }

            const textDelta =
              (chunk as unknown as { text: string })?.text ?? "";
            buffer += textDelta;

            controller.enqueue(new TextEncoder().encode(textDelta));

            try {
              const parsedJson = parsePartialJson(buffer) as BotChatResponse;
              parsed = parsedJson ?? buffer;

              const now = Date.now();
              if (parsed && now - latestDate > 5000) {
                latestDate = now;
                await updateMessage({
                  data: {
                    id: botMessage.id,
                    content:
                      typeof parsed === "string"
                        ? parsed
                        : (parsed?.response ?? ""),
                  },
                });
              }
            } catch (error: unknown) {
              console.warn(
                "JSON not fully received yet, waiting for more chunks..."
              );
            }
          }
        } catch (error: unknown) {
          console.error("Streaming error:", error);
          controller.error(error);
        } finally {
          if (parsed) {
            await updateMessage({
              data: {
                id: botMessage.id,
                content:
                  typeof parsed === "string"
                    ? parsed
                    : (parsed?.response ?? ""),
              },
            });
            await updateChat({
              data: {
                id: chatId,
                excerpt: parsed.response ?? "Empty response.",
              },
            });
          }

          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.log("error ", error);

    return NextResponse.json(
      {
        error: "Unable to process your chat request. Please try again.",
      },
      { status: 500 }
    );
  }
}
