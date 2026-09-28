import { getLocalizedText } from "@/lib/i18n";

import type { BlockRendererProps } from "../../registry/types";
import { getString } from "../../renderer/content";

export function CtaBlock({ block, locale }: BlockRendererProps) {
  const { content } = block;
  const description = getLocalizedText(content.description, locale);
  const buttonLabel = getLocalizedText(content.buttonLabel, locale);
  const buttonHref = getString(content, "buttonHref") || "#";
  const variant = block.variant === "banner" ? "banner" : "centered";

  return (
    <section className={`vsb-section vsb-cta vsb-cta--${variant}`}>
      <div className="vsb-container">
        <div className="vsb-cta__box">
          <div className="vsb-cta__text">
            <h2 className="vsb-section-title">{getLocalizedText(content.title, locale)}</h2>
            {description && <p className="vsb-cta__description">{description}</p>}
          </div>
          {buttonLabel && (
            <a className="vsb-button" href={buttonHref}>
              {buttonLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
