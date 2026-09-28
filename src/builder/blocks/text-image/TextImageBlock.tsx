import { getLocalizedText } from "@/lib/i18n";

import type { BlockRendererProps } from "../../registry/types";
import { getString } from "../../renderer/content";
import { EditableText } from "../../renderer/EditableText";
import { BlockImage } from "../shared/BlockImage";

export function TextImageBlock({ block, locale }: BlockRendererProps) {
  const { content } = block;
  const buttonLabel = getLocalizedText(content.buttonLabel, locale);
  const buttonHref = getString(content, "buttonHref") || "#";
  const variant = block.variant === "image-left" ? "image-left" : "image-right";

  return (
    <section className={`vsb-section vsb-text-image vsb-text-image--${variant}`}>
      <div className="vsb-container vsb-text-image__inner">
        <div className="vsb-text-image__text">
          <EditableText as="h2" className="vsb-section-title" path="title" value={content.title} placeholder="Заголовок" />
          <EditableText
            as="p"
            className="vsb-text-image__body"
            path="text"
            value={content.text}
            multiline
            placeholder="Текст"
          />
          {buttonLabel && (
            <a className="vsb-button" href={buttonHref}>
              <EditableText path="buttonLabel" value={content.buttonLabel} placeholder="Кнопка" />
            </a>
          )}
        </div>

        <BlockImage
          className="vsb-text-image__media"
          src={getString(content, "imageUrl")}
          alt={getLocalizedText(content.title, locale)}
        />
      </div>
    </section>
  );
}
