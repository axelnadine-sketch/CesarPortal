import { prisma } from "@/lib/db";

export async function getActiveProjects() {
  return prisma.project.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  });
}

export async function getAllProjects() {
  return prisma.project.findMany({
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  });
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({
    where: { slug },
  });
}

export async function getProjectById(id: string) {
  return prisma.project.findUnique({
    where: { id },
  });
}