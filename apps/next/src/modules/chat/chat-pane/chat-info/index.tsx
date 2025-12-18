import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatMedia from "./chat-media";
import ChatLinks from "./chat-links";
import ChatDocs from "./chat-docs";

export default function ChatInfo() {
  return (
    <Tabs defaultValue="media">
      <TabsList>
        <TabsTrigger value="media">Media</TabsTrigger>
        <TabsTrigger value="links">Links</TabsTrigger>
        <TabsTrigger value="docs">Docs</TabsTrigger>
      </TabsList>

      <TabsContent value="media">
        <ChatMedia />
      </TabsContent>
      <TabsContent value="links">
        <ChatLinks />
      </TabsContent>
      <TabsContent value="docs">
        <ChatDocs />
      </TabsContent>
    </Tabs>
  );
}
