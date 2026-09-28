import { BriefcaseBusiness } from "lucide-react";

import { createId } from "@/lib/id";

import type { BlockDefinition } from "../../registry/types";
import { ServicesBlock } from "./ServicesBlock";

export const servicesDefinition: BlockDefinition = {
  type: "services",
  label: "Services",
  category: "content",
  description: "Услуги с описанием и ценой",
  icon: BriefcaseBusiness,

  variants: [
    { id: "cards", label: "Cards" },
    { id: "list", label: "List" },
  ],

  createDefault: () => ({
    id: createId(),
    type: "services",
    variant: "cards",
    content: {
      title: { ru: "Услуги", en: "Services", uz: "Xizmatlar" },
      subtitle: {
        ru: "Выберите то, что подходит именно вам",
        en: "Pick what suits you best",
        uz: "O'zingizga mosini tanlang",
      },
      items: [
        {
          title: { ru: "Лендинг", en: "Landing page", uz: "Landing sahifa" },
          description: {
            ru: "Одностраничный сайт для продукта или акции.",
            en: "A one-page site for a product or campaign.",
            uz: "Mahsulot yoki aksiya uchun bir sahifali sayt.",
          },
          price: { ru: "от 30 000 ₽", en: "from $400", uz: "5 000 000 so'mdan" },
        },
        {
          title: { ru: "Корпоративный сайт", en: "Company website", uz: "Korporativ sayt" },
          description: {
            ru: "Несколько страниц, блог и форма заявки.",
            en: "Several pages, a blog and a contact form.",
            uz: "Bir nechta sahifa, blog va ariza shakli.",
          },
          price: { ru: "от 80 000 ₽", en: "from $1,000", uz: "12 000 000 so'mdan" },
        },
        {
          title: { ru: "Поддержка", en: "Support", uz: "Qo'llab-quvvatlash" },
          description: {
            ru: "Обновления контента и технические работы.",
            en: "Content updates and maintenance.",
            uz: "Kontentni yangilash va texnik ishlar.",
          },
          price: { ru: "от 10 000 ₽/мес", en: "from $150/mo", uz: "oyiga 2 000 000 so'mdan" },
        },
      ],
    },
    styles: {},
  }),

  renderer: ServicesBlock,

  inspector: {
    content: [],
    style: [],
  },
};
