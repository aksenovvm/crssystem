import { Megaphone } from "lucide-react";

import { createId } from "@/lib/id";

import type { BlockDefinition } from "../../registry/types";
import { CtaBlock } from "./CtaBlock";

export const ctaDefinition: BlockDefinition = {
  type: "cta",
  label: "CTA",
  category: "conversion",
  description: "Призыв к действию с кнопкой",
  icon: Megaphone,

  variants: [
    { id: "centered", label: "Centered" },
    { id: "banner", label: "Banner" },
  ],

  createDefault: () => ({
    id: createId(),
    type: "cta",
    variant: "centered",
    content: {
      title: { ru: "Готовы начать?", en: "Ready to start?", uz: "Boshlashga tayyormisiz?" },
      description: {
        ru: "Оставьте заявку — ответим в течение одного рабочего дня.",
        en: "Leave a request and we will reply within one business day.",
        uz: "Ariza qoldiring — bir ish kuni ichida javob beramiz.",
      },
      buttonLabel: { ru: "Оставить заявку", en: "Get in touch", uz: "Ariza qoldirish" },
      buttonHref: "#contacts",
    },
    styles: {},
  }),

  renderer: CtaBlock,

  inspector: {
    content: [],
    style: [],
  },
};
