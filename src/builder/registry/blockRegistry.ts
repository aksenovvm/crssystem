import { createId } from "@/lib/id";
import type { PageBlock } from "@/types";

import type { BlockDefinition } from "./types";

const registry = new Map<string, BlockDefinition>();

/** Регистрирует тип блока. Повторная регистрация того же type заменяет definition (удобно при HMR). */
export function registerBlock(definition: BlockDefinition): void {
  registry.set(definition.type, definition);
}

export function getBlockDefinition(type: string): BlockDefinition | undefined {
  return registry.get(type);
}

export function getAllBlocks(): BlockDefinition[] {
  return Array.from(registry.values());
}

export function getBlocksByCategory(category: string): BlockDefinition[] {
  return getAllBlocks().filter((definition) => definition.category === category);
}

/**
 * Создаёт новый экземпляр блока с уникальным ID.
 * Неизвестный variant заменяется первым вариантом из definition.
 */
export function createBlock(type: string, variant?: string): PageBlock {
  const definition = registry.get(type);
  if (!definition) {
    throw new Error(`Block type "${type}" is not registered`);
  }

  const block = definition.createDefault();
  const variantExists = definition.variants.some((v) => v.id === variant);

  return {
    ...block,
    id: createId(),
    variant: variant && variantExists ? variant : block.variant,
  };
}
