/**
 * Текст для выбранного языка.
 * Строка возвращается как есть; для LocalizedText берётся значение нужного locale.
 * Fallback на другой язык не делается: в редакторе пустой перевод должен быть виден.
 */
export function getLocalizedText(value: unknown, locale: string): string {
  if (typeof value === "string") {
    return value;
  }
  if (value && typeof value === "object") {
    const text = (value as Record<string, unknown>)[locale];
    return typeof text === "string" ? text : "";
  }
  return "";
}
