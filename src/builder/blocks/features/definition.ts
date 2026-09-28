import { LayoutGrid } from "lucide-react";

import { createId } from "@/lib/id";

import type { BlockDefinition } from "../../registry/types";
import { FeaturesBlock } from "./FeaturesBlock";

export const featuresDefinition: BlockDefinition = {
  type: "features",
  label: "Features",
  category: "content",
  description: "Преимущества: сетка или список пунктов",
  icon: LayoutGrid,

  variants: [
    { id: "grid", label: "Grid" },
    { id: "list", label: "List" },
  ],

  createDefault: () => ({
    id: createId(),
    type: "features",
    variant: "grid",
    content: {
      title: { ru: "Почему выбирают нас", en: "Why choose us", uz: "Nega bizni tanlashadi" },
      subtitle: {
        ru: "Три причины начать работу уже сегодня",
        en: "Three reasons to get started today",
        uz: "Bugunoq boshlash uchun uchta sabab",
      },
      items: [
        {
          title: { ru: "Быстро", en: "Fast", uz: "Tez" },
          description: {
            ru: "Запускаем проект за несколько дней, а не месяцев.",
            en: "We launch in days, not months.",
            uz: "Loyihani oylarda emas, bir necha kunda ishga tushiramiz.",
          },
        },
        {
          title: { ru: "Понятно", en: "Clear", uz: "Tushunarli" },
          description: {
            ru: "Прозрачные этапы и фиксированная стоимость.",
            en: "Transparent stages and a fixed price.",
            uz: "Shaffof bosqichlar va qat'iy narx.",
          },
        },
        {
          title: { ru: "Надёжно", en: "Reliable", uz: "Ishonchli" },
          description: {
            ru: "Поддержка и гарантия после запуска.",
            en: "Support and warranty after launch.",
            uz: "Ishga tushirilgandan keyin qo'llab-quvvatlash va kafolat.",
          },
        },
      ],
    },
    styles: {},
  }),

  renderer: FeaturesBlock,

  inspector: {
    content: [
      { type: "text", path: "title", label: "Заголовок", localized: true },
      { type: "textarea", path: "subtitle", label: "Подзаголовок", localized: true },
    ],
    style: [],
  },
};
