import { getLocalizedText } from "@/lib/i18n";

import type { BlockRendererProps } from "../../registry/types";
import { getString } from "../../renderer/content";
import { EditableText } from "../../renderer/EditableText";

export function CtaBlock({ block, locale }: BlockRendererProps) {
  const { content } = block;
  const buttonLabel = getLocalizedText(content.buttonLabel, locale);
  const buttonHref = getString(content, "buttonHref") || "#";
  const variant = block.variant === "banner" ? "banner" : "centered";

  return (
    <section className={`vsb-section vsb-cta vsb-cta--${variant}`}>
      <div className="vsb-container">
        <div className="vsb-cta__box">
          <div className="vsb-cta__text">
            <EditableText as="h2" className="vsb-section-title" path="title" value={content.title} placeholder="Заголовок" />
            <EditableText
              as="p"
              className="vsb-cta__description"
              path="description"
              value={content.description}
              multiline
              placeholder="Описание"
            />
          </div>
          {buttonLabel && (
            <a className="vsb-button" href={buttonHref}>
              <EditableText path="buttonLabel" value={content.buttonLabel} placeholder="Кнопка" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
