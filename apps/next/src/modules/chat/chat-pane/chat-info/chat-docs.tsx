import AiFileIcon from "@/components/icons/ai-file";
import FigFileIcon from "@/components/icons/fig-file";
import PdfFileIcon from "@/components/icons/pdf-file";

type Doc = {
  name: string;
  type: "pdf" | "fig" | "ai";
  pages?: number;
  size: string;
};

const docsList = [
  {
    month: "May",
    docs: [
      {
        name: "Document Requirement.pdf",
        type: "pdf" as const,
        pages: 10,
        size: "16 MB",
      },
      {
        name: "User Flow.pdf",
        type: "pdf" as const,
        pages: 7,
        size: "32 MB",
      },
      {
        name: "Existing App.fig",
        type: "fig" as const,
        size: "213 MB",
      },
      {
        name: "Product Illustrations.ai",
        type: "ai" as const,
        size: "72 MB",
      },
      {
        name: "Quotation-Hikariworks-May.pdf",
        type: "pdf" as const,
        pages: 2,
        size: "329 KB",
      },
    ],
  },
];

function formatMeta(doc: Doc) {
  const parts: string[] = [];
  if (doc.pages) parts.push(`${doc.pages} pages`);
  parts.push(doc.size);
  parts.push(doc.type);
  return parts.join("  •  ");
}

export default function ChatDocs() {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-y-4">
        {docsList.map(({ month, docs }) => (
          <div key={month} className="flex flex-col gap-y-2">
            <div className="bg-muted inline-flex items-center rounded-lg px-2 py-1">
              <span className="text-muted-foreground text-xs font-medium">
                {month}
              </span>
            </div>
            <div className="flex flex-col gap-y-2">
              {docs.map((doc) => {
                const { name, type } = doc;

                return (
                  <div
                    key={name}
                    className="hover:bg-muted/50 [&>svg:size-5] flex cursor-pointer gap-3 rounded-lg p-2 transition-colors"
                  >
                    {type === "pdf" ? (
                      <PdfFileIcon />
                    ) : type === "fig" ? (
                      <FigFileIcon />
                    ) : (
                      <AiFileIcon />
                    )}
                    <div className="flex flex-col justify-center gap-y-1">
                      <p className="text-foreground text-sm font-medium">
                        {name}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {formatMeta(doc)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
