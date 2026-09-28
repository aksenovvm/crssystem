import "@/builder/blocks";

import { Fragment, type ReactNode } from "react";

import type { Page, PageBlock } from "@/types";

import { getBlockDefinition } from "../registry/blockRegistry";
import type { BlockDefinition, RendererMode } from "../registry/types";
import { UnknownBlock } from "./UnknownBlock";

export interface BlockWrapperArgs {
  block: PageBlock;
  index: number;
  definition: BlockDefinition | undefined;
  children: ReactNode;
}

interface PageRendererProps {
  page: Page;
  locale: string;
  mode: RendererMode;
  /** Оболочка вокруг каждого блока. Редактор добавляет через неё выделение, toolbar и drag-and-drop. */
  renderBlockWrapper?: (args: BlockWrapperArgs) => ReactNode;
}

/**
 * Строит страницу из Page JSON: для каждого блока находит definition в registry
 * и отдаёт данные его renderer. Про конкретные типы блоков ничего не знает.
 */
export function PageRenderer({ page, locale, mode, renderBlockWrapper }: PageRendererProps) {
  const blocks = mode === "editor" ? page.blocks : page.blocks.filter((block) => !block.hidden);

  return (
    <div className="vsb-site" lang={locale}>
      {blocks.map((block, index) => {
        const definition = getBlockDefinition(block.type);
        const Renderer = definition?.renderer;
        const children = Renderer ? (
          <Renderer block={block} locale={locale} mode={mode} />
        ) : (
          <UnknownBlock block={block} mode={mode} />
        );

        return (
          <Fragment key={block.id}>
            {renderBlockWrapper ? renderBlockWrapper({ block, index, definition, children }) : children}
          </Fragment>
        );
      })}
    </div>
  );
}
