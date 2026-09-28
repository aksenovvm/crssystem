import { getLocalizedText } from "@/lib/i18n";

import type { BlockRendererProps } from "../../registry/types";
import { getString } from "../../renderer/content";
import { BlockImage } from "../shared/BlockImage";

export function HeroBlock({ block, locale }: BlockRendererProps) {
  const { content } = block;
  const title = getLocalizedText(content.title, locale);
  const description = getLocalizedText(content.description, locale);
  const buttonLabel = getLocalizedText(content.buttonLabel, locale);
  const buttonHref = getString(content, "buttonHref") || "#";
  const isSplit = block.variant === "split";

  return (
    <section className={`vsb-section vsb-hero vsb-hero--${isSplit ? "split" : "centered"}`}>
      <div className="vsb-container vsb-hero__inner">
        <div className="vsb-hero__text">
          <h1 className="vsb-hero__title">{title}</h1>
          {description && <p className="vsb-hero__description">{description}</p>}
          {buttonLabel && (
            <a className="vsb-button" href={buttonHref}>
              {buttonLabel}
            </a>
          )}
        </div>

        {isSplit && (
          <BlockImage className="vsb-hero__media" src={getString(content, "imageUrl")} alt={title} />
        )}
      </div>
    </section>
  );
}
