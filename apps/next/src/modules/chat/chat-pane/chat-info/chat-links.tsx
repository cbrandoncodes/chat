import Image from "next/image";

const linksList = [
  {
    month: "May",
    links: [
      {
        url: "https://basecamp.net/",
        image: "/assets/media/basecamp.png",
        label: "Basecamp",
        excerpt:
          "Discover thousands of premium UI kits, templates, and design resources tailored for designers, developers, and startups.",
      },
      {
        url: "https://notion.com/",
        image: "/assets/media/notion.png",
        label: "Notion",
        excerpt:
          "A new tool that blends your everyday work apps into one. It’s the all-in-one workspace for you and your team.",
      },
      {
        url: "https://asana.com/",
        image: "/assets/media/asana.png",
        label: "Asana",
        excerpt:
          "Work anytime, anywhere with Asana. Keep remote and distributed teams, and your entire organization, focused on their goals, projects, and tasks.",
      },
      {
        url: "https://trello.com/",
        image: "/assets/media/trello.png",
        label: "Trello",
        excerpt:
          "Make the impossible, possible with Trello. The ultimate teamwork project management tool. Start up board in seconds, automate tedious tasks, and collaborate anywhere, even on mobile.",
      },
    ],
  },
];

export default function ChatLinks() {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-y-4">
        {linksList.map(({ month, links }) => (
          <div key={month} className="flex flex-col gap-y-2">
            <div className="bg-muted inline-flex items-center rounded-lg px-2 py-1">
              <span className="text-muted-foreground text-xs font-medium">
                {month}
              </span>
            </div>
            <div className="flex flex-col gap-y-4">
              {links.map(({ url, image, label, excerpt }) => (
                <div key={label} className="flex gap-3">
                  <div className="relative aspect-square size-15 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={image}
                      alt={label}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <p className="text-foreground text-sm font-medium">{url}</p>
                    <p className="text-muted-foreground text-xs">{excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
