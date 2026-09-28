/**
 * Чтение и иммутабельная запись вложенных значений по пути через точку:
 *   getByPath(content, "title.ru")
 *   setByPath(content, "items.0.title.en", "Fast")
 * Числовой сегмент — индекс массива. Недостающие уровни создаются.
 */

const FORBIDDEN_KEYS = new Set(["__proto__", "prototype", "constructor"]);

function splitPath(path: string): string[] {
  const keys = path.split(".").filter(Boolean);
  if (keys.some((key) => FORBIDDEN_KEYS.has(key))) {
    throw new Error(`Invalid path "${path}"`);
  }
  return keys;
}

function isContainer(value: unknown): value is Record<string, unknown> | unknown[] {
  return typeof value === "object" && value !== null;
}

const isIndex = (key: string) => /^\d+$/.test(key);

export function getByPath(source: unknown, path: string): unknown {
  let current = source;
  for (const key of splitPath(path)) {
    if (!isContainer(current)) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[key];
  }
  return current;
}

/** Возвращает новый объект; исходный не изменяется. Копируются только объекты на пути. */
export function setByPath<T>(source: T, path: string, value: unknown): T {
  const keys = splitPath(path);
  if (keys.length === 0) {
    return value as T;
  }
  return setAt(source, keys, value) as T;
}

function setAt(source: unknown, keys: string[], value: unknown): unknown {
  const [key, ...rest] = keys;
  const container = isContainer(source) ? source : isIndex(key) ? [] : {};
  const child = (container as Record<string, unknown>)[key];
  const next = rest.length === 0 ? value : setAt(child, rest, value);

  if (Array.isArray(container)) {
    const copy = [...container];
    copy[Number(key)] = next;
    return copy;
  }
  return { ...container, [key]: next };
}
