import { FlaskConical } from "lucide-react";

import { createId } from "@/lib/id";

import type { BlockDefinition, BlockRendererProps } from "../../registry/types";

function TestBlock({ block }: BlockRendererProps) {
  return <section>Test block {block.id}</section>;
}

/** Временный блок для проверки registry (Sprint 2.1). Будет заменён Hero в Sprint 2.2. */
export const testDefinition: BlockDefinition = {
  type: "test",
  label: "Test block",
  category: "test",
  description: "Проверка Block Registry",
  icon: FlaskConical,
  variants: [{ id: "default", label: "Default" }],
  createDefault: () => ({
    id: createId(),
    type: "test",
    variant: "default",
    content: {},
    styles: {},
  }),
  renderer: TestBlock,
  inspector: { content: [], style: [] },
};
