"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";

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
    <img
      alt={alt}
      className="absolute inset-0 h-full w-full object-contain p-3"
      decoding="async"
      loading="lazy"
      onError={() => {
        if (currentSrc !== FALLBACK_SRC) {
          setCurrentSrc(FALLBACK_SRC);
        }
      }}
      src={currentSrc}
    />
  );
}
