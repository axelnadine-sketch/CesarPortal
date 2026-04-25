"use client";

import { useState } from "react";
import Image from "next/image";

type SiteCardImageProps = {
  src: string;
  alt: string;
};

const FALLBACK_SRC = "/site-placeholder.svg";

function isValidImageUrl(src: string) {
  return /\.(jpg|jpeg|png|webp|gif|svg)(\?.*)?$/i.test(src);
}

export function SiteCardImage({ src, alt }: SiteCardImageProps) {
  const initialSrc = src && isValidImageUrl(src) ? src : FALLBACK_SRC;
  const [currentSrc, setCurrentSrc] = useState(initialSrc);

  return (
    <Image
      alt={alt}
      className="object-cover transition duration-500 group-hover:scale-105"
      fill
      onError={() => setCurrentSrc(FALLBACK_SRC)}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      src={currentSrc}
    />
  );
}
