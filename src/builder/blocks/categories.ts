export interface BlockCategory {
  id: string;
  label: string;
}

/** Порядок категорий в библиотеке блоков. */
export const blockCategories: BlockCategory[] = [
  { id: "hero", label: "Первый экран" },
  { id: "content", label: "Контент" },
  { id: "conversion", label: "Призыв к действию" },
];
