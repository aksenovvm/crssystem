import type { PageBlock } from "./block";
import type { LocalizedText } from "./common";

export interface PageSEO {
  title?: LocalizedText;
  description?: LocalizedText;
  canonical?: string;
  ogTitle?: LocalizedText;
  ogDescription?: LocalizedText;
  ogImage?: string;
  noIndex?: boolean;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "published";
  blocks: PageBlock[];
  seo: PageSEO;
  /** ISO 8601 */
  createdAt: string;
  /** ISO 8601 */
  updatedAt: string;
}

/** Дизайн-токены сайта. Превращаются в CSS variables (Sprint 10.1). */
export interface GlobalStyles {
  colors: {
    primary: string;
    secondary: string;
    text: string;
    background: string;
  };

  typography: {
    headingFont: string;
    bodyFont: string;
  };

  radius: {
    sm: number;
    md: number;
    lg: number;
  };

  containerMaxWidth: number;
}

export interface SiteProject {
  id: string;
  name: string;
  defaultLocale: string;
  locales: string[];
  pages: Page[];
  globalStyles: GlobalStyles;
  /** Статические переводы: ключ (например `button.submit`) → текст по языкам. */
  translations: Record<string, LocalizedText>;
}
