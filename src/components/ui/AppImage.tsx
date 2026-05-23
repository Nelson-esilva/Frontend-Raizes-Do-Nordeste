import { useEffect, useState } from "react";
import { IMAGES } from "@/constants/images";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
};

export function AppImage({
  src,
  alt,
  fallbackSrc = IMAGES.fallback,
  className,
  onError,
  ...rest
}: Props) {
  const [currentSrc, setCurrentSrc] = useState(src ?? fallbackSrc);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setCurrentSrc(src ?? fallbackSrc);
    setFailed(false);
  }, [src, fallbackSrc]);

  return (
    <img
      {...rest}
      src={failed ? fallbackSrc : currentSrc}
      alt={alt ?? ""}
      decoding="async"
      className={className}
      onError={(e) => {
        if (!failed && currentSrc !== fallbackSrc) {
          setFailed(true);
          setCurrentSrc(fallbackSrc);
        }
        onError?.(e);
      }}
    />
  );
}
