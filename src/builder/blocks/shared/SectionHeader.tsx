interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

/** Заголовок + подзаголовок секции по центру. */
export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <header className="vsb-section-header">
      <h2 className="vsb-section-title">{title}</h2>
      {subtitle && <p className="vsb-section-subtitle">{subtitle}</p>}
    </header>
  );
}
