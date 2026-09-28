import type { BlockRendererProps } from "../../registry/types";
import { getList } from "../../renderer/content";
import { EditableText } from "../../renderer/EditableText";
import { SectionHeader } from "../shared/SectionHeader";

export function FeaturesBlock({ block }: BlockRendererProps) {
  const { content } = block;
  const items = getList(content, "items");
  const variant = block.variant === "list" ? "list" : "grid";

  return (
    <section className={`vsb-section vsb-features vsb-features--${variant}`}>
      <div className="vsb-container">
        <SectionHeader title={content.title} subtitle={content.subtitle} />

        <ul className="vsb-features__items">
          {items.map((item, index) => (
            <li key={index} className="vsb-feature">
              <span className="vsb-feature__marker" aria-hidden>
                {index + 1}
              </span>
              <div className="vsb-feature__body">
                <EditableText
                  as="h3"
                  className="vsb-feature__title"
                  path={`items.${index}.title`}
                  value={item.title}
                  placeholder="Пункт"
                />
                <EditableText
                  as="p"
                  className="vsb-feature__description"
                  path={`items.${index}.description`}
                  value={item.description}
                  multiline
                  placeholder="Описание пункта"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
