import { Sparkles } from "lucide-react";

import { createId } from "@/lib/id";

import type { BlockDefinition } from "../../registry/types";
import { HeroBlock } from "./HeroBlock";

export const heroDefinition: BlockDefinition = {
  type: "hero",
  label: "Hero",
  category: "hero",
  description: "Первый экран: заголовок, описание и кнопка",
  icon: Sparkles,

  variants: [
    { id: "centered", label: "Centered" },
    { id: "split", label: "Split" },
  ],

  createDefault: () => ({
    id: createId(),
    type: "hero",
    variant: "centered",
    content: {
      title: {
        ru: "Заголовок первого экрана",
        en: "Your main headline",
        uz: "Asosiy sarlavha",
      },
      description: {
        ru: "Коротко расскажите, чем вы занимаетесь и почему к вам стоит обратиться.",
        en: "Briefly explain what you do and why people should choose you.",
        uz: "Nima bilan shug'ullanishingiz va nega sizni tanlash kerakligini qisqacha aytib bering.",
      },
      buttonLabel: { ru: "Связаться", en: "Contact us", uz: "Bog'lanish" },
      buttonHref: "#contacts",
      imageUrl: "",
    },
    styles: {},
  }),

  renderer: HeroBlock,

  inspector: {
    content: [],
    style: [],
  },
};
