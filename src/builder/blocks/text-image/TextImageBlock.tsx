import { getLocalizedText } from "@/lib/i18n";

import type { BlockRendererProps } from "../../registry/types";
import { getString } from "../../renderer/content";
import { BlockImage } from "../shared/BlockImage";

export function TextImageBlock({ block, locale }: BlockRendererProps) {
  const { content } = block;
  const title = getLocalizedText(content.title, locale);
  const text = getLocalizedText(content.text, locale);
  const buttonLabel = getLocalizedText(content.buttonLabel, locale);
  const buttonHref = getString(content, "buttonHref") || "#";
  const variant = block.variant === "image-left" ? "image-left" : "image-right";

  return (
    <section className={`vsb-section vsb-text-image vsb-text-image--${variant}`}>
      <div className="vsb-container vsb-text-image__inner">
        <div className="vsb-text-image__text">
          <h2 className="vsb-section-title">{title}</h2>
          {text && <p className="vsb-text-image__body">{text}</p>}
          {buttonLabel && (
            <a className="vsb-button" href={buttonHref}>
              {buttonLabel}
            </a>
          )}
        </div>

        <BlockImage className="vsb-text-image__media" src={getString(content, "imageUrl")} alt={title} />
      </div>
    </section>
  );
}
