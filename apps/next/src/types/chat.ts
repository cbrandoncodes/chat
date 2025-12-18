export type Chat = {
  id: string;
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
  unread?: boolean;
  excerpt: string;
  timestamp: string;
};
