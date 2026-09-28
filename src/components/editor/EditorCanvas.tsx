import { cn } from "@/lib/utils";

interface EditorCanvasProps {
  className?: string;
}

export function EditorCanvas({ className }: EditorCanvasProps) {
  return (
    <section
      aria-label="Canvas"
      className={cn("flex min-h-[60vh] flex-col bg-muted p-4 sm:p-6 xl:min-h-0 xl:overflow-y-auto", className)}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-2 rounded-lg border bg-background p-8 text-center shadow-sm">
        <h2 className="text-lg font-medium">Canvas</h2>
        <p className="text-sm text-muted-foreground">Здесь будет предпросмотр страницы.</p>
      </div>
    </section>
  );
}
