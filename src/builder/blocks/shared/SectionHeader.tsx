import { EditableText } from "../../renderer/EditableText";

interface SectionHeaderProps {
  /** `content.title` блока (LocalizedText). */
  title: unknown;
  /** `content.subtitle` блока (LocalizedText). */
  subtitle: unknown;
}

/** Заголовок + подзаголовок секции по центру. Пути в content: `title`, `subtitle`. */
export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <header className="vsb-section-header">
      <EditableText as="h2" className="vsb-section-title" path="title" value={title} placeholder="Заголовок" />
      <EditableText
        as="p"
        className="vsb-section-subtitle"
        path="subtitle"
        value={subtitle}
        multiline
        placeholder="Подзаголовок"
      />
    </header>
  );
}
