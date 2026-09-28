import type { ResponsiveValue, SpacingValue } from "./common";

export type BlockId = string;

/** Локальные стили секции. Всё необязательно: отсутствующее значение берётся из глобальных стилей. */
export interface BlockStyles {
  spacing?: {
    padding?: ResponsiveValue<SpacingValue>;
    margin?: ResponsiveValue<SpacingValue>;
    gap?: ResponsiveValue<number>;
  };

  sizing?: {
    width?: ResponsiveValue<number | string>;
    maxWidth?: ResponsiveValue<number | string>;
    minHeight?: ResponsiveValue<number | string>;
  };

  background?: {
    type?: "color" | "gradient" | "image";
    color?: string;
    value?: string;
    imageUrl?: string;
    overlay?: string;
  };

  border?: {
    width?: number;
    style?: "solid" | "dashed" | "dotted" | "none";
    color?: string;
    radius?: ResponsiveValue<number>;
  };

  typography?: {
    fontFamily?: string;
    fontSize?: ResponsiveValue<number>;
    fontWeight?: number;
    lineHeight?: ResponsiveValue<number>;
    letterSpacing?: ResponsiveValue<number>;
    textAlign?: ResponsiveValue<"left" | "center" | "right" | "justify">;
    color?: string;
  };

  layout?: {
    display?: "block" | "flex" | "grid";
    columns?: ResponsiveValue<number>;
    direction?: ResponsiveValue<"row" | "column">;
    alignItems?: string;
    justifyContent?: string;
  };
}

/** Секция страницы. `type` и `variant` ссылаются на определение в Block Registry. */
export interface PageBlock {
  id: BlockId;
  type: string;
  variant: string;
  content: Record<string, unknown>;
  styles: BlockStyles;
  hidden?: boolean;
}
