import { getLocalizedText } from "@/lib/i18n";

import type { BlockRendererProps } from "../../registry/types";
import { getString } from "../../renderer/content";
import { EditableText } from "../../renderer/EditableText";
import { BlockImage } from "../shared/BlockImage";

export function HeroBlock({ block, locale }: BlockRendererProps) {
  const { content } = block;
  const buttonLabel = getLocalizedText(content.buttonLabel, locale);
  const buttonHref = getString(content, "buttonHref") || "#";
  const isSplit = block.variant === "split";

  return (
    <section className={`vsb-section vsb-hero vsb-hero--${isSplit ? "split" : "centered"}`}>
      <div className="vsb-container vsb-hero__inner">
        <div className="vsb-hero__text">
          <EditableText as="h1" className="vsb-hero__title" path="title" value={content.title} placeholder="Заголовок" />
          <EditableText
            as="p"
            className="vsb-hero__description"
            path="description"
            value={content.description}
            multiline
            placeholder="Описание"
          />
          {buttonLabel && (
            <a className="vsb-button" href={buttonHref}>
              <EditableText path="buttonLabel" value={content.buttonLabel} placeholder="Кнопка" />
            </a>
          )}
        </div>

        {isSplit && (
          <BlockImage
            className="vsb-hero__media"
            src={getString(content, "imageUrl")}
            alt={getLocalizedText(content.title, locale)}
          />
        )}
      </div>
    </section>
  );
}
