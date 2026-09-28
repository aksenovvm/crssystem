import { create } from "zustand";

import { demoProject } from "@/builder/fixtures/demoProject";
import { moveItem } from "@/lib/array";
import { createId } from "@/lib/id";
import type { Breakpoint, Page, PageBlock, SiteProject } from "@/types";

export interface EditorState {
  project: SiteProject | null;

  selectedPageId: string | null;
  selectedBlockId: string | null;

  currentLocale: string;
  currentBreakpoint: Breakpoint;

  selectPage(id: string): void;
  selectBlock(id: string | null): void;

  /** Вставляет блок в текущую страницу (по умолчанию в конец) и выделяет его. */
  addBlock(block: PageBlock, index?: number): void;
  removeBlock(id: string): void;
  /** Вставляет копию блока сразу после оригинала и выделяет копию. */
  duplicateBlock(id: string): void;
  /** Меняет порядок блоков текущей страницы. Выделение не трогает. */
  moveBlock(fromIndex: number, toIndex: number): void;

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

  addBlock: (block, index) =>
    set((state) => {
      if (!state.project) {
        return {};
      }
      const newBlock = hasBlockId(state.project, block.id) ? { ...block, id: createId() } : block;
      return {
        ...updateCurrentPageBlocks(state, (blocks) => insertAt(blocks, newBlock, index ?? blocks.length)),
        selectedBlockId: newBlock.id,
      };
    }),

  removeBlock: (id) =>
    set((state) => ({
      ...updateCurrentPageBlocks(state, (blocks) => blocks.filter((block) => block.id !== id)),
      selectedBlockId: state.selectedBlockId === id ? null : state.selectedBlockId,
    })),

  duplicateBlock: (id) =>
    set((state) => {
      const blocks = selectCurrentPage(state)?.blocks ?? [];
      const index = blocks.findIndex((block) => block.id === id);
      if (index === -1) {
        return {};
      }
      const copy: PageBlock = { ...structuredClone(blocks[index]), id: createId() };
      return {
        ...updateCurrentPageBlocks(state, (current) => insertAt(current, copy, index + 1)),
        selectedBlockId: copy.id,
      };
    }),

  moveBlock: (fromIndex, toIndex) =>
    set((state) => updateCurrentPageBlocks(state, (blocks) => moveItem(blocks, fromIndex, toIndex))),

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

/* ---------- Помощники для иммутабельных обновлений ---------- */

/** Возвращает patch для store с новым массивом блоков текущей страницы. */
function updateCurrentPageBlocks(
  state: EditorState,
  update: (blocks: PageBlock[]) => PageBlock[],
): Partial<EditorState> {
  const { project, selectedPageId } = state;
  if (!project || !selectedPageId) {
    return {};
  }
  return {
    project: {
      ...project,
      pages: project.pages.map((page) =>
        page.id === selectedPageId
          ? { ...page, blocks: update(page.blocks), updatedAt: new Date().toISOString() }
          : page,
      ),
    },
  };
}

function insertAt<T>(items: T[], item: T, index: number): T[] {
  const position = Math.max(0, Math.min(index, items.length));
  return [...items.slice(0, position), item, ...items.slice(position)];
}

/** ID блока должен быть уникален во всём проекте, а не только на странице. */
function hasBlockId(project: SiteProject, id: string): boolean {
  return project.pages.some((page) => page.blocks.some((block) => block.id === id));
}
