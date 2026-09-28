import type { SiteProject } from "@/types";

const CREATED_AT = "2026-01-01T00:00:00.000Z";

/**
 * Демо-проект для `/editor/demo`. ID и даты фиксированные,
 * чтобы серверный и клиентский рендер совпадали.
 */
export const demoProject: SiteProject = {
  id: "demo",
  name: "Демо-проект",
  defaultLocale: "ru",
  locales: ["ru", "en", "uz"],
  pages: [
    {
      id: "page-home",
      title: "Главная",
      slug: "",
      status: "published",
      createdAt: CREATED_AT,
      updatedAt: CREATED_AT,
      seo: {
        title: { ru: "Главная", en: "Home", uz: "Bosh sahifa" },
      },
      blocks: [
        {
          id: "block-hero",
          type: "hero",
          variant: "centered",
          content: {
            title: {
              ru: "Сайт без кода за один вечер",
              en: "A website without code in one evening",
              uz: "Bir kechada kodsiz sayt",
            },
            description: {
              ru: "Собирайте страницы из готовых секций и публикуйте их как статический сайт.",
              en: "Build pages from ready-made sections and publish them as a static site.",
              uz: "Sahifalarni tayyor bo'limlardan yig'ing va statik sayt sifatida chop eting.",
            },
            buttonLabel: { ru: "Попробовать", en: "Try it", uz: "Sinab ko'rish" },
            buttonHref: "#features",
            imageUrl: "",
          },
          styles: {
            spacing: {
              padding: { desktop: { top: 80, right: 24, bottom: 80, left: 24 } },
            },
            typography: { textAlign: { desktop: "center" } },
          },
        },
        {
          id: "block-features",
          type: "features",
          variant: "grid",
          content: {
            title: { ru: "Возможности", en: "Features", uz: "Imkoniyatlar" },
            subtitle: {
              ru: "Всё, что нужно для небольшого сайта",
              en: "Everything a small website needs",
              uz: "Kichik sayt uchun kerak bo'lgan hamma narsa",
            },
            items: [
              {
                title: { ru: "Готовые секции", en: "Ready-made sections", uz: "Tayyor bo'limlar" },
                description: {
                  ru: "Hero, услуги, отзывы, контакты и другие блоки.",
                  en: "Hero, services, reviews, contacts and more.",
                  uz: "Hero, xizmatlar, sharhlar, kontaktlar va boshqalar.",
                },
              },
              {
                title: { ru: "Три языка", en: "Three languages", uz: "Uchta til" },
                description: {
                  ru: "Русский, английский и узбекский из коробки.",
                  en: "Russian, English and Uzbek out of the box.",
                  uz: "Rus, ingliz va o'zbek tillari tayyor.",
                },
              },
              {
                title: { ru: "Экспорт в ZIP", en: "ZIP export", uz: "ZIP eksport" },
                description: {
                  ru: "Готовый статический сайт без зависимости от конструктора.",
                  en: "A static site that doesn't depend on the builder.",
                  uz: "Konstruktorga bog'liq bo'lmagan statik sayt.",
                },
              },
            ],
          },
          styles: {
            layout: { columns: { desktop: 3, tablet: 2, mobile: 1 } },
          },
        },
        {
          id: "block-cta",
          type: "cta",
          variant: "centered",
          content: {
            title: { ru: "Готовы начать?", en: "Ready to start?", uz: "Boshlashga tayyormisiz?" },
            description: {
              ru: "Соберите первую страницу за 10 минут.",
              en: "Build your first page in 10 minutes.",
              uz: "Birinchi sahifani 10 daqiqada yig'ing.",
            },
            buttonLabel: { ru: "Начать", en: "Get started", uz: "Boshlash" },
            buttonHref: "#",
          },
          styles: {},
        },
      ],
    },
    {
      id: "page-about",
      title: "О нас",
      slug: "about",
      status: "draft",
      createdAt: CREATED_AT,
      updatedAt: CREATED_AT,
      seo: {},
      blocks: [],
    },
  ],
  globalStyles: {
    colors: {
      primary: "#2563eb",
      secondary: "#f59e0b",
      text: "#0f172a",
      background: "#ffffff",
    },
    typography: {
      headingFont: "Inter, system-ui, sans-serif",
      bodyFont: "Inter, system-ui, sans-serif",
    },
    radius: { sm: 4, md: 8, lg: 16 },
    containerMaxWidth: 1200,
  },
  translations: {
    "button.getStarted": { ru: "Начать", en: "Get started", uz: "Boshlash" },
  },
};
