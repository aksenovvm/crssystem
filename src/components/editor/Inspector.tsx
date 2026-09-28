"use client";

import "@/builder/blocks";

import { SlidersHorizontal } from "lucide-react";

import { getBlockDefinition } from "@/builder/registry/blockRegistry";
import type { ControlDefinition } from "@/builder/registry/types";
import { SelectControl } from "@/components/controls/SelectControl";
import { TextareaControl } from "@/components/controls/TextareaControl";
import { TextControl } from "@/components/controls/TextControl";
import { Badge } from "@/components/ui/badge";
import { getByPath } from "@/lib/path";
import { selectCurrentPage, selectSelectedBlock, useEditorStore } from "@/store/editorStore";
import type { PageBlock } from "@/types";

import { EditorPanel } from "./EditorPanel";

interface InspectorProps {
  className?: string;
}

export function Inspector({ className }: InspectorProps) {
  const block = useEditorStore(selectSelectedBlock);
  const definition = block ? getBlockDefinition(block.type) : undefined;
  const updateBlockVariant = useEditorStore((state) => state.updateBlockVariant);

  return (
    <EditorPanel title="Inspector" icon={SlidersHorizontal} className={className}>
      {block ? (
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold">{definition?.label ?? block.type}</h3>
            <Badge variant="secondary">{block.variant}</Badge>
          </div>

          {definition && definition.variants.length > 1 && (
            <SelectControl
              label="Вариант"
              value={block.variant}
              options={definition.variants.map((variant) => ({ value: variant.id, label: variant.label }))}
              onChange={(variant) => updateBlockVariant(block.id, variant)}
            />
          )}

          {definition && <ContentControls block={block} controls={definition.inspector.content} />}

          <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-2 border-t pt-4 text-xs">
            <dt className="text-muted-foreground">Type</dt>
            <dd className="font-mono">{block.type}</dd>
            <dt className="text-muted-foreground">ID</dt>
            <dd className="font-mono break-all">{block.id}</dd>
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

interface ContentControlsProps {
  block: PageBlock;
  controls: ControlDefinition[];
}

/** Поля контента из `definition.inspector.content`. Переводимые поля редактируют текущий язык. */
function ContentControls({ block, controls }: ContentControlsProps) {
  const locale = useEditorStore((state) => state.currentLocale);
  const updateBlockContent = useEditorStore((state) => state.updateBlockContent);

  const visible = controls.filter((control) => !control.variants || control.variants.includes(block.variant));
  if (visible.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="inspector-content-title" className="flex flex-col gap-4">
      <h4 id="inspector-content-title" className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        Content
      </h4>

      {visible.map((control) => {
        const path = control.localized ? `${control.path}.${locale}` : control.path;
        const value = getByPath(block.content, path);
        const text = typeof value === "string" ? value : "";
        const hint = control.localized ? locale : undefined;
        const onChange = (next: string) => updateBlockContent(block.id, path, next);

        switch (control.type) {
          case "text":
            return (
              <TextControl
                key={control.path}
                label={control.label}
                value={text}
                placeholder={control.placeholder}
                hint={hint}
                onChange={onChange}
              />
            );
          case "textarea":
            return (
              <TextareaControl
                key={control.path}
                label={control.label}
                value={text}
                rows={control.rows}
                placeholder={control.placeholder}
                hint={hint}
                onChange={onChange}
              />
            );
          case "select":
            return (
              <SelectControl
                key={control.path}
                label={control.label}
                value={text}
                options={control.options}
                hint={hint}
                onChange={onChange}
              />
            );
        }
      })}
    </section>
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
