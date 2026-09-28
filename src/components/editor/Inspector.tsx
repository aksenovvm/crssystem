"use client";

import "@/builder/blocks";

import { SlidersHorizontal } from "lucide-react";

import { getBlockDefinition } from "@/builder/registry/blockRegistry";
import { Badge } from "@/components/ui/badge";
import { selectCurrentPage, selectSelectedBlock, useEditorStore } from "@/store/editorStore";

import { EditorPanel } from "./EditorPanel";

interface InspectorProps {
  className?: string;
}

export function Inspector({ className }: InspectorProps) {
  const block = useEditorStore(selectSelectedBlock);
  const definition = block ? getBlockDefinition(block.type) : undefined;

  return (
    <EditorPanel title="Inspector" icon={SlidersHorizontal} className={className}>
      {block ? (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold">{definition?.label ?? block.type}</h3>
            <Badge variant="secondary">{block.variant}</Badge>
          </div>

          <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-2 text-sm">
            <dt className="text-muted-foreground">Type</dt>
            <dd className="font-mono">{block.type}</dd>
            <dt className="text-muted-foreground">ID</dt>
            <dd className="font-mono text-xs break-all">{block.id}</dd>
          </dl>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            Выберите блок на странице, чтобы увидеть его настройки.
          </p>
          <PageStructure />
        </div>
      )}
    </EditorPanel>
  );
}

/** Порядок блоков текущей страницы прямо из store — видно, что drag-and-drop меняет данные. */
function PageStructure() {
  const blocks = useEditorStore((state) => selectCurrentPage(state)?.blocks);
  const selectBlock = useEditorStore((state) => state.selectBlock);

  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="page-structure-title" className="flex flex-col gap-2">
      <h3 id="page-structure-title" className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        Структура страницы
      </h3>
      <ol className="flex flex-col gap-1" aria-label="Порядок блоков">
        {blocks.map((item, index) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => selectBlock(item.id)}
              className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent"
            >
              <span className="w-5 text-right font-mono text-xs text-muted-foreground">{index + 1}</span>
              <span className="font-medium">{getBlockDefinition(item.type)?.label ?? item.type}</span>
              <span className="ml-auto text-xs text-muted-foreground">{item.variant}</span>
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}
