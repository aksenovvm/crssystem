import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Visual Site Builder",
    template: "%s · Visual Site Builder",
  },
  description: "Визуальный конструктор сайтов из готовых секций с экспортом в статический сайт.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
