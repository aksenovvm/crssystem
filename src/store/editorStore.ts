import { create } from "zustand";

import { demoProject } from "@/builder/fixtures/demoProject";
import type { Breakpoint, Page, PageBlock, SiteProject } from "@/types";

export interface EditorState {
  project: SiteProject | null;

  selectedPageId: string | null;
  selectedBlockId: string | null;

  currentLocale: string;
  currentBreakpoint: Breakpoint;

  selectPage(id: string): void;
  selectBlock(id: string | null): void;

  setLocale(locale: string): void;
  setBreakpoint(bp: Breakpoint): void;
}

/**
 * Состояние редактора. Пока проект — демо-фикстура;
 * загрузка из repository появится в Sprint 11.1.
 */
export const useEditorStore = create<EditorState>()((set) => ({
  project: demoProject,

  selectedPageId: demoProject.pages[0]?.id ?? null,
  selectedBlockId: null,

  currentLocale: demoProject.defaultLocale,
  currentBreakpoint: "desktop",

  selectPage: (id) => set({ selectedPageId: id, selectedBlockId: null }),
  selectBlock: (id) => set({ selectedBlockId: id }),

  setLocale: (locale) => set({ currentLocale: locale }),
  setBreakpoint: (bp) => set({ currentBreakpoint: bp }),
}));

/* ---------- Селекторы ---------- */

export function selectCurrentPage(state: EditorState): Page | null {
  return state.project?.pages.find((page) => page.id === state.selectedPageId) ?? null;
}

export function selectSelectedBlock(state: EditorState): PageBlock | null {
  if (!state.selectedBlockId) {
    return null;
  }
  return selectCurrentPage(state)?.blocks.find((block) => block.id === state.selectedBlockId) ?? null;
}
