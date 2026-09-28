import { PageRenderer } from "@/builder/renderer/PageRenderer";
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
      className={cn("flex min-h-[60vh] flex-col gap-3 bg-muted p-4 sm:p-6 xl:min-h-0 xl:overflow-y-auto", className)}
    >
      <p className="text-xs text-muted-foreground">
        {project.name}
        {page && (
          <>
            {" / "}
            <span className="font-medium text-foreground">{page.title}</span>
            {` · блоков: ${page.blocks.length}`}
          </>
        )}
      </p>

      <div className="mx-auto w-full max-w-[1200px] flex-1 rounded-lg bg-background shadow-sm">
        {page ? (
          <PageRenderer page={page} locale={project.defaultLocale} mode="editor" />
        ) : (
          <p className="p-8 text-center text-sm text-muted-foreground">В проекте пока нет страниц.</p>
        )}
      </div>
    </section>
  );
}
