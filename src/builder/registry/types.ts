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

/** Описание одного поля в Inspector. */
export interface ControlDefinition {
  type: string;
  path: string;
  label: string;
}

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
