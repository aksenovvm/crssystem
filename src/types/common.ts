/** Режим просмотра. Порядок наследования значений: mobile → tablet → desktop. */
export type Breakpoint = "desktop" | "tablet" | "mobile";

/** Переводимый текст: ключ — код языка (`ru`, `en`, `uz`), значение — текст. */
export type LocalizedText = Record<string, string>;

/** Значение, которое может отличаться для каждого breakpoint. Отсутствующие берутся по наследованию. */
export type ResponsiveValue<T> = {
  desktop?: T;
  tablet?: T;
  mobile?: T;
};

/** Отступы по четырём сторонам, в px. */
export type SpacingValue = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};
