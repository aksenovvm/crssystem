"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type Announcements,
  type DragEndEvent,
  type DragStartEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Box, GripVertical } from "lucide-react";

import { getBlockDefinition } from "@/builder/registry/blockRegistry";
import { PageRenderer } from "@/builder/renderer/PageRenderer";
import { cn } from "@/lib/utils";
import { selectCurrentPage, useEditorStore } from "@/store/editorStore";

import { EditorBlockFrame } from "./EditorBlockFrame";

interface EditorCanvasProps {
  className?: string;
}

export function EditorCanvas({ className }: EditorCanvasProps) {
  const projectName = useEditorStore((state) => state.project?.name ?? "");
  const page = useEditorStore(selectCurrentPage);
  const locale = useEditorStore((state) => state.currentLocale);
  const selectBlock = useEditorStore((state) => state.selectBlock);
  const selectedBlockId = useEditorStore((state) => state.selectedBlockId);
  const moveBlock = useEditorStore((state) => state.moveBlock);

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  // После drop браузер присылает click по общему предку — он не должен снимать выделение.
  const justDroppedRef = useRef(false);
  // Стабильный id для DndContext, чтобы aria-атрибуты совпадали при SSR и гидрации.
  const dndContextId = useId();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const blocks = page?.blocks ?? [];
  const blockIds = blocks.map((block) => block.id);
  const activeBlock = blocks.find((block) => block.id === activeId);

  // Новый или скопированный блок может оказаться за пределами экрана — прокручиваем к нему.
  useEffect(() => {
    if (!selectedBlockId) {
      return;
    }
    document
      .querySelector(`[data-block-id="${CSS.escape(selectedBlockId)}"]`)
      ?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [selectedBlockId]);

  function handleDragStart({ active }: DragStartEvent) {
    setActiveId(active.id);
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveId(null);
    justDroppedRef.current = true;
    setTimeout(() => {
      justDroppedRef.current = false;
    }, 0);

    if (!over || active.id === over.id) {
      return;
    }
    const fromIndex = blockIds.indexOf(String(active.id));
    const toIndex = blockIds.indexOf(String(over.id));
    moveBlock(fromIndex, toIndex);
  }

  const labelOf = (id: UniqueIdentifier) => {
    const block = blocks.find((item) => item.id === id);
    return block ? (getBlockDefinition(block.type)?.label ?? block.type) : "";
  };
  const positionOf = (id: UniqueIdentifier) => blockIds.indexOf(String(id)) + 1;
  const announcements: Announcements = {
    onDragStart: ({ active }) => `Блок ${labelOf(active.id)} взят. Позиция ${positionOf(active.id)} из ${blocks.length}.`,
    onDragOver: ({ active, over }) =>
      over ? `Блок ${labelOf(active.id)} над позицией ${positionOf(over.id)}.` : undefined,
    onDragEnd: ({ active, over }) =>
      over ? `Блок ${labelOf(active.id)} перемещён на позицию ${positionOf(over.id)}.` : `Блок ${labelOf(active.id)} отпущен.`,
    onDragCancel: ({ active }) => `Перемещение блока ${labelOf(active.id)} отменено.`,
  };

  return (
    // Клик по пустой области canvas снимает выбор; клики по блокам останавливает EditorBlockFrame.
    <section
      aria-label="Canvas"
      onClick={() => {
        if (!justDroppedRef.current) {
          selectBlock(null);
        }
      }}
      className={cn("flex min-h-[60vh] flex-col gap-3 bg-muted p-4 sm:p-6 xl:min-h-0 xl:overflow-y-auto", className)}
    >
      <p className="text-xs text-muted-foreground">
        {projectName}
        {page && (
          <>
            {" / "}
            <span className="font-medium text-foreground">{page.title}</span>
            {` · блоков: ${page.blocks.length}`}
          </>
        )}
      </p>

      <div className="mx-auto w-full max-w-[1200px] flex-1 rounded-lg bg-background shadow-sm">
        {page && page.blocks.length === 0 && (
          <p className="p-12 text-center text-sm text-muted-foreground">
            Страница пустая. Добавьте блок из библиотеки слева.
          </p>
        )}
        {page ? (
          <DndContext
            id={dndContextId}
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={() => setActiveId(null)}
            accessibility={{
              announcements,
              screenReaderInstructions: {
                draggable:
                  "Чтобы переместить блок, нажмите пробел или Enter, стрелками выберите позицию и снова нажмите пробел. Escape отменяет перемещение.",
              },
            }}
          >
            <SortableContext items={blockIds} strategy={verticalListSortingStrategy}>
              <PageRenderer
                page={page}
                locale={locale}
                mode="editor"
                renderBlockWrapper={({ block, definition, children }) => (
                  <EditorBlockFrame block={block} definition={definition}>
                    {children}
                  </EditorBlockFrame>
                )}
              />
            </SortableContext>

            <DragOverlay dropAnimation={null}>
              {activeBlock ? <DragPreview type={activeBlock.type} variant={activeBlock.variant} /> : null}
            </DragOverlay>
          </DndContext>
        ) : (
          <p className="p-8 text-center text-sm text-muted-foreground">В проекте пока нет страниц.</p>
        )}
      </div>
    </section>
  );
}

/** Компактная карточка под курсором вместо копии всего блока. */
function DragPreview({ type, variant }: { type: string; variant: string }) {
  const definition = getBlockDefinition(type);
  const Icon = definition?.icon ?? Box;

  return (
    <div className="flex w-64 cursor-grabbing items-center gap-3 rounded-lg border-2 border-sky-600 bg-background px-4 py-3 shadow-xl">
      <GripVertical className="size-4 text-muted-foreground" aria-hidden />
      <Icon className="size-4 text-sky-600" aria-hidden />
      <span className="text-sm font-medium">{definition?.label ?? type}</span>
      <span className="ml-auto text-xs text-muted-foreground">{variant}</span>
    </div>
  );
}
