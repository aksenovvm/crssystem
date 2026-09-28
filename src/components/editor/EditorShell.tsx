import type { SiteProject } from "@/types";

import { BlockLibrary } from "./BlockLibrary";
import { EditorCanvas } from "./EditorCanvas";
import { EditorTopbar } from "./EditorTopbar";
import { Inspector } from "./Inspector";

interface EditorShellProps {
  project: SiteProject;
}

/**
 * Каркас редактора: Topbar сверху, под ним Blocks | Canvas | Inspector.
 * xl+: три колонки на всю высоту окна, каждая прокручивается отдельно.
 * md: библиотека слева от canvas, inspector под ними.
 * Мобильные: панели идут друг под другом, прокручивается вся страница.
 */
export function EditorShell({ project }: EditorShellProps) {
  // Текущая страница — первая, пока нет selectedPageId (Sprint 3.1).
  const page = project.pages[0] ?? null;

  return (
    <div className="flex min-h-dvh flex-col xl:h-dvh">
      <EditorTopbar projectName={project.name} />

      <div className="grid flex-1 grid-cols-1 md:grid-cols-[240px_minmax(0,1fr)] xl:min-h-0 xl:grid-cols-[260px_minmax(0,1fr)_300px]">
        <BlockLibrary className="border-b md:border-r md:border-b-0" />
        <EditorCanvas project={project} page={page} />
        <Inspector className="border-t md:col-span-2 xl:col-span-1 xl:border-t-0 xl:border-l" />
      </div>
    </div>
  );
}
