"use client";

import { useState } from "react";
import Image from "next/image";

type SiteCardImageProps = {
  src: string;
  alt: string;
};

export function SiteCardImage({ src, alt }: SiteCardImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <Image
      alt={alt}
      className="object-cover transition duration-500 group-hover:scale-105"
      fill
      onError={() => setCurrentSrc("/site-placeholder.svg")}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      src={currentSrc || "/site-placeholder.svg"}
    />
  );
}
