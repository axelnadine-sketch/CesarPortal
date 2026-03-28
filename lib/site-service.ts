import type { Site } from "@prisma/client";

export function getSiteTags(site: Pick<Site, "tags">) {
  return site.tags
    ?.split(",")
    .map((tag) => tag.trim())
    .filter(Boolean) ?? [];
}

export function serializeSiteForForm(site: Pick<
  Site,
  | "name"
  | "slug"
  | "url"
  | "shortDescription"
  | "longDescription"
  | "category"
  | "tags"
  | "imageUrl"
  | "isActive"
  | "isFeatured"
  | "sortOrder"
>) {
  return {
    name: site.name,
    slug: site.slug,
    url: site.url,
    shortDescription: site.shortDescription,
    longDescription: site.longDescription ?? "",
    category: site.category,
    tags: site.tags ?? "",
    imageUrl: site.imageUrl,
    isActive: site.isActive,
    isFeatured: site.isFeatured,
    sortOrder: site.sortOrder,
  };
}
