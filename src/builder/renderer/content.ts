/**
 * Безопасное чтение `block.content`. Контент хранится как `Record<string, unknown>`
 * (он приходит из JSON / localStorage / AI), поэтому renderer не доверяет его форме.
 */

export function getString(content: Record<string, unknown>, key: string): string {
  const value = content[key];
  return typeof value === "string" ? value : "";
}

export function getList(content: Record<string, unknown>, key: string): Record<string, unknown>[] {
  const value = content[key];
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter(
    (item): item is Record<string, unknown> => typeof item === "object" && item !== null,
  );
}
