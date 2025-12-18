import Image from "next/image";

const mediaList = [
  {
    month: "May",
    files: [
      "/assets/media/media-1.png",
      "/assets/media/media-2.png",
      "/assets/media/media-3.png",
      "/assets/media/media-4.png",
    ],
  },
  {
    month: "June",
    files: [
      "/assets/media/media-3.png",
      "/assets/media/media-1.png",
      "/assets/media/media-2.png",
    ],
  },
  {
    month: "July",
    files: [
      "/assets/media/media-2.png",
      "/assets/media/media-3.png",
      "/assets/media/media-1.png",
    ],
  },
];

export default function ChatMedia() {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-y-2">
        {mediaList.map(({ month, files }) => (
          <div key={month} className="flex flex-col gap-y-1">
            <div className="bg-muted inline-flex items-center rounded-lg px-2 py-1">
              <span className="text-muted-foreground text-xs font-medium">
                {month}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="relative aspect-square w-full overflow-hidden rounded-xl"
                >
                  <Image src={file} alt={file} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
