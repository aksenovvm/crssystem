import type { ComponentType } from "react";
import type { LucideIcon } from "lucide-react";

import type { PageBlock } from "@/types";

/** Где рисуется страница: в редакторе, в предпросмотре или при экспорте. */
export type RendererMode = "editor" | "preview" | "export";

export interface BlockVariant {
  id: string;
  label: string;
}

export interface BlockRendererProps {
  block: PageBlock;
  locale: string;
  mode: RendererMode;
}

interface BaseControlDefinition {
  /** Путь внутри `block.content`, например `title` или `items.0.title`. */
  path: string;
  label: string;
  /** Значение — LocalizedText: Inspector редактирует `${path}.${currentLocale}`. */
  localized?: boolean;
  /** Показывать поле только для этих вариантов блока. */
  variants?: string[];
}

/** Описание одного поля в Inspector. */
export type ControlDefinition =
  | (BaseControlDefinition & { type: "text"; placeholder?: string })
  | (BaseControlDefinition & { type: "textarea"; rows?: number; placeholder?: string })
  | (BaseControlDefinition & { type: "select"; options: { value: string; label: string }[] });

/** Декларативное описание типа блока. Новый блок подключается только через registry. */
export interface BlockDefinition {
  type: string;
  label: string;
  category: string;
  description?: string;
  icon?: LucideIcon;

  variants: BlockVariant[];

  createDefault: () => PageBlock;

  renderer: ComponentType<BlockRendererProps>;

  inspector: {
    content: ControlDefinition[];
    style: ControlDefinition[];
  };
}
