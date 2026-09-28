import { cn } from "@/lib/utils";
import type { Page, SiteProject } from "@/types";

interface EditorCanvasProps {
  project: SiteProject;
  page: Page | null;
  className?: string;
}

export function EditorCanvas({ project, page, className }: EditorCanvasProps) {
  return (
    <section
      aria-label="Canvas"
      className={cn("flex min-h-[60vh] flex-col bg-muted p-4 sm:p-6 xl:min-h-0 xl:overflow-y-auto", className)}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-4 rounded-lg border bg-background p-8 text-center shadow-sm">
        <p className="text-sm text-muted-foreground">{project.name}</p>

        {page ? (
          <>
            <h2 className="text-2xl font-semibold tracking-tight">{page.title}</h2>
            <p className="text-sm text-muted-foreground">
              Блоков на странице: <span className="font-medium text-foreground">{page.blocks.length}</span>
            </p>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">В проекте пока нет страниц.</p>
        )}
      </div>
    </section>
  );
}
