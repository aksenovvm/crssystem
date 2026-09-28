import type { BlockRendererProps } from "../../registry/types";
import { getList } from "../../renderer/content";
import { EditableText } from "../../renderer/EditableText";
import { SectionHeader } from "../shared/SectionHeader";

export function ServicesBlock({ block }: BlockRendererProps) {
  const { content } = block;
  const items = getList(content, "items");
  const variant = block.variant === "list" ? "list" : "cards";

  return (
    <section className={`vsb-section vsb-services vsb-services--${variant}`}>
      <div className="vsb-container">
        <SectionHeader title={content.title} subtitle={content.subtitle} />

        <ul className="vsb-services__items">
          {items.map((item, index) => (
            <li key={index} className="vsb-service">
              <div className="vsb-service__body">
                <EditableText
                  as="h3"
                  className="vsb-service__title"
                  path={`items.${index}.title`}
                  value={item.title}
                  placeholder="Услуга"
                />
                <EditableText
                  as="p"
                  className="vsb-service__description"
                  path={`items.${index}.description`}
                  value={item.description}
                  multiline
                  placeholder="Описание услуги"
                />
              </div>
              <EditableText
                as="p"
                className="vsb-service__price"
                path={`items.${index}.price`}
                value={item.price}
                placeholder="Цена"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
