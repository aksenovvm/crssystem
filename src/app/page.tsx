import { LayoutTemplate } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="flex max-w-xl flex-col items-center gap-6 text-center">
        <div className="flex size-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <LayoutTemplate className="size-7" aria-hidden />
        </div>

        <Badge variant="secondary">MVP · учебный проект</Badge>

        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Visual Site Builder</h1>

        <p className="text-balance text-muted-foreground">
          Собирайте многостраничные сайты из готовых секций, настраивайте их визуальными
          контролами и экспортируйте как обычный статический сайт.
        </p>

        <p className="text-sm text-muted-foreground">Редактор появится в Sprint 1.1.</p>
      </div>
    </main>
  );
}
