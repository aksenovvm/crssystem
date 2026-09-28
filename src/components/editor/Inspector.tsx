"use client";

import "@/builder/blocks";

import { SlidersHorizontal } from "lucide-react";

import { getBlockDefinition } from "@/builder/registry/blockRegistry";
import { Badge } from "@/components/ui/badge";
import { selectSelectedBlock, useEditorStore } from "@/store/editorStore";

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
        <p className="text-sm text-muted-foreground">
          Выберите блок на странице, чтобы увидеть его настройки.
        </p>
      )}
    </EditorPanel>
  );
}
