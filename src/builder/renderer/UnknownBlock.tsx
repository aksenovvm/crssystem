import { CircleHelp } from "lucide-react";

import type { PageBlock } from "@/types";

import type { RendererMode } from "../registry/types";

interface UnknownBlockProps {
  block: PageBlock;
  mode: RendererMode;
}

/** Fallback для типа, которого нет в registry. На сайте такой блок просто не выводится. */
export function UnknownBlock({ block, mode }: UnknownBlockProps) {
  if (mode !== "editor") {
    return null;
  }

  return (
    <section className="m-4 flex items-center gap-3 rounded-md border-2 border-dashed border-amber-400 bg-amber-50 p-6 text-sm text-amber-900">
      <CircleHelp className="size-5 shrink-0" aria-hidden />
      <p>
        Неизвестный тип блока <code className="font-mono font-semibold">{block.type}</code>. Он не
        зарегистрирован в Block Registry и не попадёт на сайт.
      </p>
    </section>
  );
}
