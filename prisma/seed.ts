import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sites = [
  {
    name: "Studio Atlas",
    slug: "studio-atlas",
    url: "https://atlas.example.com",
    shortDescription: "Studio vitrine premium pour presenter des offres et capter des leads.",
    longDescription:
      "Une experience sobre et rapide orientee presentation de services, branding et conversion.",
    category: "Business",
    tags: "branding, services, leadgen",
    imageUrl:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    isActive: true,
    isFeatured: true,
    sortOrder: 1,
  },
  {
    name: "Journal Horizon",
    slug: "journal-horizon",
    url: "https://horizon.example.com",
    shortDescription: "Media editorial avec mise en avant des contenus et des categories.",
    longDescription:
      "Un site concu pour publier, organiser et valoriser des contenus avec une lecture claire.",
    category: "Media",
    tags: "blog, editorial",
    imageUrl:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    isActive: true,
    isFeatured: false,
    sortOrder: 2,
  },
  {
    name: "Boutique Nacre",
    slug: "boutique-nacre",
    url: "https://nacre.example.com",
    shortDescription: "Boutique elegante pour presenter une marque et son univers produit.",
    longDescription:
      "Positionnement premium, storytelling visuel et navigation simple pour un catalogue inspire.",
    category: "E-commerce",
    tags: "retail, catalogue",
    imageUrl:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    isActive: true,
    isFeatured: true,
    sortOrder: 3,
  },
];

async function main() {
  for (const site of sites) {
    await prisma.site.upsert({
      where: { slug: site.slug },
      update: site,
      create: site,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
