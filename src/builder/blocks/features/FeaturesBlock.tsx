import { getLocalizedText } from "@/lib/i18n";

import type { BlockRendererProps } from "../../registry/types";
import { getList } from "../../renderer/content";
import { SectionHeader } from "../shared/SectionHeader";

export function FeaturesBlock({ block, locale }: BlockRendererProps) {
  const { content } = block;
  const items = getList(content, "items");
  const variant = block.variant === "list" ? "list" : "grid";

  return (
    <section className={`vsb-section vsb-features vsb-features--${variant}`}>
      <div className="vsb-container">
        <SectionHeader
          title={getLocalizedText(content.title, locale)}
          subtitle={getLocalizedText(content.subtitle, locale)}
        />

        <ul className="vsb-features__items">
          {items.map((item, index) => (
            <li key={index} className="vsb-feature">
              <span className="vsb-feature__marker" aria-hidden>
                {index + 1}
              </span>
              <div className="vsb-feature__body">
                <h3 className="vsb-feature__title">{getLocalizedText(item.title, locale)}</h3>
                <p className="vsb-feature__description">{getLocalizedText(item.description, locale)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
