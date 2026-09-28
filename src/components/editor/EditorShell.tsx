import { BlockLibrary } from "./BlockLibrary";
import { EditorCanvas } from "./EditorCanvas";
import { EditorTopbar } from "./EditorTopbar";
import { Inspector } from "./Inspector";

interface EditorShellProps {
  projectName: string;
}

/**
 * Каркас редактора: Topbar сверху, под ним Blocks | Canvas | Inspector.
 * xl+: три колонки на всю высоту окна, каждая прокручивается отдельно.
 * md: библиотека слева от canvas, inspector под ними.
 * Мобильные: панели идут друг под другом, прокручивается вся страница.
 */
export function EditorShell({ projectName }: EditorShellProps) {
  return (
    <div className="flex min-h-dvh flex-col xl:h-dvh">
      <EditorTopbar projectName={projectName} />

      <div className="grid flex-1 grid-cols-1 md:grid-cols-[240px_minmax(0,1fr)] xl:min-h-0 xl:grid-cols-[260px_minmax(0,1fr)_300px]">
        <BlockLibrary className="border-b md:border-r md:border-b-0" />
        <EditorCanvas />
        <Inspector className="border-t md:col-span-2 xl:col-span-1 xl:border-t-0 xl:border-l" />
      </div>
    </div>
  );
}
