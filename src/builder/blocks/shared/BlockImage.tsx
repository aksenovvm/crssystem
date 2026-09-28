import { ImageIcon } from "lucide-react";

interface BlockImageProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * Изображение внутри блока. Обычный `<img>`, а не `next/image`,
 * потому что тот же renderer будет использоваться для статического экспорта.
 */
export function BlockImage({ src, alt, className }: BlockImageProps) {
  return (
    <div className={`vsb-image ${className ?? ""}`}>
      {src ? (
        <img src={src} alt={alt} loading="lazy" />
      ) : (
        <ImageIcon className="vsb-image__placeholder" aria-hidden />
      )}
    </div>
  );
}
