import "@/builder/blocks";

import { Blocks, Box } from "lucide-react";

import { getAllBlocks } from "@/builder/registry/blockRegistry";

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
              <li key={definition.type} className="flex items-start gap-3 rounded-md border p-3">
                <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
                <div className="min-w-0">
                  <p className="text-sm font-medium">{definition.label}</p>
                  {definition.description && (
                    <p className="text-xs text-muted-foreground">{definition.description}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </EditorPanel>
  );
}
