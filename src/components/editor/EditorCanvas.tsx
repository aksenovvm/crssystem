"use client";

import { PageRenderer } from "@/builder/renderer/PageRenderer";
import { cn } from "@/lib/utils";
import { selectCurrentPage, useEditorStore } from "@/store/editorStore";

interface EditorCanvasProps {
  className?: string;
}

export function EditorCanvas({ className }: EditorCanvasProps) {
  const projectName = useEditorStore((state) => state.project?.name ?? "");
  const page = useEditorStore(selectCurrentPage);
  const locale = useEditorStore((state) => state.currentLocale);

  return (
    <section
      aria-label="Canvas"
      className={cn("flex min-h-[60vh] flex-col gap-3 bg-muted p-4 sm:p-6 xl:min-h-0 xl:overflow-y-auto", className)}
    >
      <p className="text-xs text-muted-foreground">
        {projectName}
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
          <PageRenderer page={page} locale={locale} mode="editor" />
        ) : (
          <p className="p-8 text-center text-sm text-muted-foreground">В проекте пока нет страниц.</p>
        )}
      </div>
    </section>
  );
}
