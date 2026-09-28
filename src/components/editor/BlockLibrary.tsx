"use client";

import "@/builder/blocks";

import { Blocks, Box, Plus } from "lucide-react";

import { createBlock, getAllBlocks } from "@/builder/registry/blockRegistry";
import { Button } from "@/components/ui/button";
import { selectCurrentPage, useEditorStore } from "@/store/editorStore";

import { EditorPanel } from "./EditorPanel";

interface BlockLibraryProps {
  className?: string;
}

export function BlockLibrary({ className }: BlockLibraryProps) {
  const blocks = getAllBlocks();

  return (
    <EditorPanel title="Blocks" icon={Blocks} className={className}>
      {blocks.length === 0 ? (
        <p className="text-sm text-muted-foreground">В Block Registry пока нет блоков.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {blocks.map((definition) => {
            const Icon = definition.icon ?? Box;
            return (
              <li key={definition.type} className="flex flex-col gap-3 rounded-md border p-3">
                <div className="flex items-start gap-3">
                  <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{definition.label}</p>
                    {definition.description && (
                      <p className="text-xs text-muted-foreground">{definition.description}</p>
                    )}
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={() => addBlockToPage(definition.type)}>
                  <Plus aria-hidden />
                  Add {definition.label}
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </EditorPanel>
  );
}

/** Новый блок встаёт после выделенного, а если ничего не выделено — в конец страницы. */
function addBlockToPage(type: string, variant?: string) {
  const state = useEditorStore.getState();
  const blocks = selectCurrentPage(state)?.blocks ?? [];
  const selectedIndex = blocks.findIndex((block) => block.id === state.selectedBlockId);
  const index = selectedIndex === -1 ? blocks.length : selectedIndex + 1;

  state.addBlock(createBlock(type, variant), index);
}
