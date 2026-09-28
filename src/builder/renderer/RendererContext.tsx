"use client";

import { createContext, useContext, type ReactNode } from "react";

import type { RendererMode } from "../registry/types";

interface RendererContextValue {
  locale: string;
  mode: RendererMode;
}

const RendererContext = createContext<RendererContextValue>({ locale: "ru", mode: "preview" });

export function RendererProvider({ value, children }: { value: RendererContextValue; children: ReactNode }) {
  return <RendererContext.Provider value={value}>{children}</RendererContext.Provider>;
}

export function useRendererContext(): RendererContextValue {
  return useContext(RendererContext);
}

/**
 * Связь блока с редактором. Её даёт только EditorBlockFrame, поэтому
 * в preview/export контекста нет и EditableText рендерит обычный текст.
 */
export interface InlineEditing {
  /** Текст редактируется только у выделенного блока — первый клик выделяет блок. */
  isSelected: boolean;
  /** `path` — полный путь в `block.content`, например `title.ru`. */
  onTextChange(path: string, value: string): void;
}

const InlineEditingContext = createContext<InlineEditing | null>(null);

export function InlineEditingProvider({ value, children }: { value: InlineEditing; children: ReactNode }) {
  return <InlineEditingContext.Provider value={value}>{children}</InlineEditingContext.Provider>;
}

export function useInlineEditing(): InlineEditing | null {
  return useContext(InlineEditingContext);
}
