import { prisma } from "@/lib/db";

export async function getPublicSites() {
  return prisma.site.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
}

export async function getAllSites() {
  return prisma.site.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
}

export async function getSiteBySlug(slug: string) {
  return prisma.site.findUnique({
    where: { slug },
  });
}

export async function getSiteById(id: string) {
  return prisma.site.findUnique({
    where: { id },
  });
}
