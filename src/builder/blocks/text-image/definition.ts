import { PanelsLeftRight } from "lucide-react";

import { createId } from "@/lib/id";

import type { BlockDefinition } from "../../registry/types";
import { TextImageBlock } from "./TextImageBlock";

export const textImageDefinition: BlockDefinition = {
  type: "text-image",
  label: "Text + Image",
  category: "content",
  description: "Текст рядом с изображением",
  icon: PanelsLeftRight,

  variants: [
    { id: "image-right", label: "Image right" },
    { id: "image-left", label: "Image left" },
  ],

  createDefault: () => ({
    id: createId(),
    type: "text-image",
    variant: "image-right",
    content: {
      title: { ru: "О компании", en: "About us", uz: "Kompaniya haqida" },
      text: {
        ru: "Мы помогаем малому бизнесу запускать понятные и быстрые сайты. Расскажите здесь свою историю: кто вы, что делаете и чем отличаетесь.",
        en: "We help small businesses launch clear and fast websites. Tell your story here: who you are, what you do and what makes you different.",
        uz: "Kichik bizneslarga tushunarli va tez saytlarni ishga tushirishda yordam beramiz. Bu yerda o'z hikoyangizni aytib bering.",
      },
      buttonLabel: { ru: "Подробнее", en: "Learn more", uz: "Batafsil" },
      buttonHref: "#",
      imageUrl: "",
    },
    styles: {},
  }),

  renderer: TextImageBlock,

  inspector: {
    content: [
      { type: "text", path: "title", label: "Заголовок", localized: true },
      { type: "textarea", path: "text", label: "Текст", localized: true, rows: 5 },
      { type: "text", path: "buttonLabel", label: "Текст кнопки", localized: true },
      { type: "text", path: "buttonHref", label: "Ссылка кнопки", placeholder: "#" },
      { type: "text", path: "imageUrl", label: "Изображение (URL)", placeholder: "https://…" },
    ],
    style: [],
  },
};
