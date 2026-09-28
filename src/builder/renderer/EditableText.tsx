"use client";

import { useState, type FormEvent, type KeyboardEvent } from "react";

import { getLocalizedText } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { useInlineEditing, useRendererContext } from "./RendererContext";

interface EditableTextProps {
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** Путь в `block.content` без locale, например `title` или `items.0.title`. */
  path: string;
  /** Значение из `block.content` — LocalizedText или строка. */
  value: unknown;
  /** Если false, `value` — обычная строка и locale к пути не добавляется. */
  localized?: boolean;
  /** Разрешить переносы строк (Shift+Enter). */
  multiline?: boolean;
  /** Подсказка для пустого поля в редакторе. */
  placeholder?: string;
  className?: string;
}

/**
 * Текст блока. На сайте — обычный элемент; в редакторе у выделенного блока
 * становится contentEditable и пишет изменения в store через InlineEditingContext.
 *
 * Enter — закончить, Shift+Enter — новая строка (только multiline), Escape — отменить правку.
 */
export function EditableText({
  as: Tag = "span",
  path,
  value,
  localized = true,
  multiline = false,
  placeholder,
  className,
}: EditableTextProps) {
  const { locale } = useRendererContext();
  const editing = useInlineEditing();
  const text = getLocalizedText(value, locale);

  // Пока идёт редактирование, React не должен трогать DOM внутри элемента,
  // иначе курсор прыгает в конец. Поэтому children «замораживаются» на время правки,
  // а после неё элемент пересоздаётся (новый key) уже с актуальным текстом.
  const [session, setSession] = useState<{ original: string } | null>(null);
  const [renderKey, setRenderKey] = useState(0);

  if (!editing) {
    return text ? <Tag className={className}>{text}</Tag> : null;
  }

  const fullPath = localized ? `${path}.${locale}` : path;
  const isEditable = editing.isSelected;

  function finish() {
    setSession(null);
    setRenderKey((key) => key + 1);
  }

  function handleInput(event: FormEvent<HTMLElement>) {
    const raw = event.currentTarget.textContent ?? "";
    editing?.onTextChange(fullPath, multiline ? raw : raw.replace(/\n/g, " "));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Enter" && !(multiline && event.shiftKey)) {
      event.preventDefault();
      event.currentTarget.blur();
    } else if (event.key === "Escape") {
      event.preventDefault();
      if (session) {
        editing?.onTextChange(fullPath, session.original);
      }
      event.currentTarget.blur();
    }
  }

  return (
    <Tag
      key={renderKey}
      className={cn(
        className,
        "rounded-sm outline-offset-4 empty:before:opacity-40 empty:before:content-[attr(data-placeholder)]",
        isEditable &&
          "cursor-text hover:outline-1 hover:outline-sky-500 hover:outline-dashed focus:bg-sky-500/5 focus:outline-2 focus:outline-sky-600 focus:outline-solid",
      )}
      data-placeholder={placeholder}
      data-editing={session ? "true" : undefined}
      contentEditable={isEditable ? "plaintext-only" : undefined}
      suppressContentEditableWarning
      spellCheck={isEditable ? true : undefined}
      role={isEditable ? "textbox" : undefined}
      aria-multiline={isEditable ? multiline : undefined}
      aria-label={isEditable ? placeholder : undefined}
      onFocus={() => setSession({ original: text })}
      onBlur={finish}
      onInput={handleInput}
      onKeyDown={isEditable ? handleKeyDown : undefined}
    >
      {session ? session.original : text}
    </Tag>
  );
}
