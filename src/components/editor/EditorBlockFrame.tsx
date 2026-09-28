"use client";

import type { KeyboardEvent, MouseEvent, ReactNode } from "react";

import type { BlockDefinition } from "@/builder/registry/types";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/editorStore";
import type { PageBlock } from "@/types";

interface EditorBlockFrameProps {
  block: PageBlock;
  definition: BlockDefinition | undefined;
  children: ReactNode;
}

/**
 * Оболочка блока в редакторе: hover/selected outline и label.
 * Сам renderer блока ничего не знает про редактор.
 */
export function EditorBlockFrame({ block, definition, children }: EditorBlockFrameProps) {
  const isSelected = useEditorStore((state) => state.selectedBlockId === block.id);
  const selectBlock = useEditorStore((state) => state.selectBlock);
  const label = definition?.label ?? block.type;

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    // Клик по блоку не должен долетать до canvas (там он снимает выбор).
    event.stopPropagation();
    // Ссылки внутри блоков в редакторе не должны уводить со страницы.
    if (event.target instanceof Element && event.target.closest("a")) {
      event.preventDefault();
    }
    selectBlock(block.id);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) {
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectBlock(block.id);
    } else if (event.key === "Escape") {
      selectBlock(null);
    }
  }

  return (
    <div
      data-block-id={block.id}
      tabIndex={0}
      aria-label={`Блок ${label}`}
      aria-current={isSelected || undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "group/block relative outline-2 -outline-offset-2 outline-transparent transition-[outline-color] hover:outline-sky-400 focus-visible:outline-sky-500",
        isSelected && "outline-sky-600 hover:outline-sky-600",
      )}
    >
      <span
        className={cn(
          "pointer-events-none absolute top-0 left-0 z-10 rounded-br-md px-2 py-0.5 font-sans text-[11px] leading-4 font-medium text-white opacity-0 transition-opacity group-hover/block:opacity-100",
          isSelected ? "bg-sky-600 opacity-100" : "bg-sky-400",
        )}
      >
        {label}
      </span>
      {children}
    </div>
  );
}
