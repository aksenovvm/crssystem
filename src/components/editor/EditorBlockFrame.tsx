"use client";

import type { KeyboardEvent, MouseEvent, ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Copy, GripVertical, Trash2, type LucideIcon } from "lucide-react";
import { toast } from "sonner";

import type { BlockDefinition } from "@/builder/registry/types";
import { cn } from "@/lib/utils";
import { selectCurrentPage, useEditorStore } from "@/store/editorStore";
import type { PageBlock } from "@/types";

interface EditorBlockFrameProps {
  block: PageBlock;
  definition: BlockDefinition | undefined;
  children: ReactNode;
}

/**
 * Оболочка блока в редакторе: hover/selected outline, label, toolbar и сортировка (drag handle).
 * Сам renderer блока ничего не знает про редактор.
 */
export function EditorBlockFrame({ block, definition, children }: EditorBlockFrameProps) {
  const isSelected = useEditorStore((state) => state.selectedBlockId === block.id);
  const selectBlock = useEditorStore((state) => state.selectBlock);
  const duplicateBlock = useEditorStore((state) => state.duplicateBlock);
  const label = definition?.label ?? block.type;

  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } =
    useSortable({ id: block.id });

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
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform), transition }}
      data-block-id={block.id}
      tabIndex={0}
      aria-label={`Блок ${label}`}
      aria-current={isSelected || undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "group/block relative outline-2 -outline-offset-2 outline-transparent transition-[outline-color] hover:outline-sky-400 focus-visible:outline-sky-500",
        isSelected && "outline-sky-600 hover:outline-sky-600",
        // Место, откуда тянут блок: полупрозрачный оригинал с пунктирной рамкой.
        isDragging && "z-20 opacity-40 outline-dashed outline-sky-600",
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

      <div
        role="toolbar"
        aria-label={`Действия с блоком ${label}`}
        className={cn(
          "invisible absolute top-1.5 right-1.5 z-10 flex gap-0.5 rounded-md bg-sky-600 p-0.5 font-sans text-white shadow-md group-focus-within/block:visible group-hover/block:visible",
          isSelected && "visible",
        )}
      >
        <button
          ref={setActivatorNodeRef}
          type="button"
          title="Перетащить"
          {...attributes}
          {...listeners}
          aria-label={`Перетащить блок ${label}`}
          onClick={(event) => event.stopPropagation()}
          className="flex size-7 cursor-grab touch-none items-center justify-center rounded hover:bg-white/20 focus-visible:bg-white/20 focus-visible:outline-2 focus-visible:outline-white active:cursor-grabbing"
        >
          <GripVertical className="size-4" aria-hidden />
        </button>
        <FrameButton icon={Copy} label="Дублировать" onClick={() => duplicateBlock(block.id)} />
        <FrameButton icon={Trash2} label="Удалить" onClick={() => removeBlockWithUndo(block, label)} />
      </div>

      {children}
    </div>
  );
}

interface FrameButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

function FrameButton({ icon: Icon, label, onClick }: FrameButtonProps) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className="flex size-7 items-center justify-center rounded hover:bg-white/20 focus-visible:bg-white/20 focus-visible:outline-2 focus-visible:outline-white"
    >
      <Icon className="size-4" aria-hidden />
    </button>
  );
}

/** Удаляет блок без confirm-диалога, но с возможностью отменить удаление из toast. */
function removeBlockWithUndo(block: PageBlock, label: string) {
  const state = useEditorStore.getState();
  const index = selectCurrentPage(state)?.blocks.findIndex((item) => item.id === block.id) ?? -1;
  state.removeBlock(block.id);

  toast(`Блок «${label}» удалён`, {
    action: {
      label: "Отменить",
      onClick: () => useEditorStore.getState().addBlock(block, index),
    },
  });
}
