export type User = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
};

export const users: User[] = [
  {
    id: "1",
    name: "Adrian Kurt",
    email: "adrian@example.com",
    image: "https://i.pravatar.cc/150?u=adrian",
  },
  {
    id: "2",
    name: "Bianca Lofre",
    email: "bianca@example.com",
    image: "https://i.pravatar.cc/150?u=bianca",
  },
  {
    id: "3",
    name: "Diana Sayu",
    email: "diana@example.com",
    image: "https://i.pravatar.cc/150?u=diana",
  },
  {
    id: "4",
    name: "Palmer Dian",
    email: "palmer@example.com",
    image: "https://i.pravatar.cc/150?u=palmer",
  },
  {
    id: "5",
    name: "Sam Kohler",
    email: "sam@example.com",
    image: "https://i.pravatar.cc/150?u=sam",
  },
  {
    id: "6",
    name: "Yuki Tanaka",
    email: "yuki@example.com",
    image: "https://i.pravatar.cc/150?u=yuki",
  },
  {
    id: "7",
    name: "Zender Lowre",
    email: "zender@example.com",
    image: "https://i.pravatar.cc/150?u=zender",
  },
];

