"use client";

import "@/builder/blocks";

import { useState } from "react";
import { Blocks, Box, Plus, Search } from "lucide-react";

import { blockCategories } from "@/builder/blocks/categories";
import { createBlock, getAllBlocks, getBlocksByCategory } from "@/builder/registry/blockRegistry";
import type { BlockDefinition } from "@/builder/registry/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { selectCurrentPage, useEditorStore } from "@/store/editorStore";

import { EditorPanel } from "./EditorPanel";

interface BlockLibraryProps {
  className?: string;
}

export function BlockLibrary({ className }: BlockLibraryProps) {
  const [query, setQuery] = useState("");
  const groups = groupBlocks(query);

  return (
    <EditorPanel title="Blocks" icon={Blocks} className={className}>
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search
            className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Поиск блоков"
            aria-label="Поиск блоков"
            className="pl-8"
          />
        </div>

        {groups.length === 0 ? (
          <p className="text-sm text-muted-foreground">Ничего не найдено.</p>
        ) : (
          groups.map((group) => (
            <section key={group.id} aria-labelledby={`block-category-${group.id}`} className="flex flex-col gap-2">
              <h3
                id={`block-category-${group.id}`}
                className="text-xs font-medium tracking-wide text-muted-foreground uppercase"
              >
                {group.label}
              </h3>
              <ul className="flex flex-col gap-2">
                {group.blocks.map((definition) => (
                  <BlockLibraryItem key={definition.type} definition={definition} />
                ))}
              </ul>
            </section>
          ))
        )}
      </div>
    </EditorPanel>
  );
}

function BlockLibraryItem({ definition }: { definition: BlockDefinition }) {
  const Icon = definition.icon ?? Box;
  const hasVariants = definition.variants.length > 1;

  return (
    <li className="flex flex-col gap-3 rounded-md border p-3">
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
        <div className="min-w-0">
          <p className="text-sm font-medium">{definition.label}</p>
          {definition.description && (
            <p className="text-xs text-muted-foreground">{definition.description}</p>
          )}
        </div>
      </div>

      {hasVariants ? (
        <div className="flex flex-wrap gap-1.5">
          {definition.variants.map((variant) => (
            <Button
              key={variant.id}
              size="sm"
              variant="outline"
              className="h-7 flex-1 px-2 text-xs"
              aria-label={`Добавить ${definition.label}: ${variant.label}`}
              onClick={() => addBlockToPage(definition.type, variant.id)}
            >
              <Plus aria-hidden />
              {variant.label}
            </Button>
          ))}
        </div>
      ) : (
        <Button
          size="sm"
          variant="outline"
          className="h-7 text-xs"
          aria-label={`Добавить ${definition.label}`}
          onClick={() => addBlockToPage(definition.type)}
        >
          <Plus aria-hidden />
          Добавить
        </Button>
      )}
    </li>
  );
}

interface BlockGroup {
  id: string;
  label: string;
  blocks: BlockDefinition[];
}

/** Блоки по категориям в порядке `blockCategories`; неизвестные категории — в группе «Другое». */
function groupBlocks(query: string): BlockGroup[] {
  const normalized = query.trim().toLowerCase();
  const matches = (definition: BlockDefinition, categoryLabel: string) =>
    !normalized ||
    [definition.label, definition.type, definition.description ?? "", categoryLabel].some((text) =>
      text.toLowerCase().includes(normalized),
    );

  const knownIds = new Set(blockCategories.map((category) => category.id));
  const groups: BlockGroup[] = blockCategories.map((category) => ({
    ...category,
    blocks: getBlocksByCategory(category.id).filter((definition) => matches(definition, category.label)),
  }));
  groups.push({
    id: "other",
    label: "Другое",
    blocks: getAllBlocks().filter(
      (definition) => !knownIds.has(definition.category) && matches(definition, "Другое"),
    ),
  });

  return groups.filter((group) => group.blocks.length > 0);
}

/** Новый блок встаёт после выделенного, а если ничего не выделено — в конец страницы. */
function addBlockToPage(type: string, variant?: string) {
  const state = useEditorStore.getState();
  const blocks = selectCurrentPage(state)?.blocks ?? [];
  const selectedIndex = blocks.findIndex((block) => block.id === state.selectedBlockId);
  const index = selectedIndex === -1 ? blocks.length : selectedIndex + 1;

  state.addBlock(createBlock(type, variant), index);
}
