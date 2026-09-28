import { getLocalizedText } from "@/lib/i18n";

import type { BlockRendererProps } from "../../registry/types";
import { getList } from "../../renderer/content";
import { SectionHeader } from "../shared/SectionHeader";

export function ServicesBlock({ block, locale }: BlockRendererProps) {
  const { content } = block;
  const items = getList(content, "items");
  const variant = block.variant === "list" ? "list" : "cards";

  return (
    <section className={`vsb-section vsb-services vsb-services--${variant}`}>
      <div className="vsb-container">
        <SectionHeader
          title={getLocalizedText(content.title, locale)}
          subtitle={getLocalizedText(content.subtitle, locale)}
        />

        <ul className="vsb-services__items">
          {items.map((item, index) => (
            <li key={index} className="vsb-service">
              <div className="vsb-service__body">
                <h3 className="vsb-service__title">{getLocalizedText(item.title, locale)}</h3>
                <p className="vsb-service__description">{getLocalizedText(item.description, locale)}</p>
              </div>
              <p className="vsb-service__price">{getLocalizedText(item.price, locale)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
