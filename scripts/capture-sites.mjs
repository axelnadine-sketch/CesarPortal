import { chromium } from "playwright";
import nextEnv from "@next/env";
const { loadEnvConfig } = nextEnv;
import { PrismaClient } from "@prisma/client";
import path from "node:path";

loadEnvConfig(process.cwd());

const prisma = new PrismaClient();

function safeSlug(slug) {
  return slug.toLowerCase().replace(/[^a-z0-9-]/g, "-");
}

async function main() {
  const sites = await prisma.site.findMany({
    where: { isActive: true },
    select: {
      id: true,
      name: true,
      slug: true,
      url: true,
    },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox"],
  });

  const page = await browser.newPage({
    viewport: { width: 1200, height: 750 },
  });

  for (const site of sites) {
    const filename = `${safeSlug(site.slug)}.jpg`;
    const publicPath = `/site-cards/${filename}`;
    const outputPath = path.join(process.cwd(), "public", "site-cards", filename);

    console.log(`Capture : ${site.name} -> ${site.url}`);

    try {
      await page.goto(site.url, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });

      await page.waitForTimeout(2000);

      await page.screenshot({
        path: outputPath,
        type: "jpeg",
        quality: 82,
        fullPage: false,
      });

      await prisma.site.update({
        where: { id: site.id },
        data: { imageUrl: publicPath },
      });

      console.log(`OK : ${publicPath}`);
    } catch (error) {
      console.error(`ERREUR ${site.name} :`, error.message);
    }
  }

  await browser.close();
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
