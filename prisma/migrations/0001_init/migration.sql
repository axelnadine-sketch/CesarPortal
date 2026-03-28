CREATE TABLE "Site" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "slug" VARCHAR(140) NOT NULL,
    "url" VARCHAR(512) NOT NULL,
    "shortDescription" VARCHAR(240) NOT NULL,
    "longDescription" TEXT,
    "category" VARCHAR(80) NOT NULL,
    "tags" TEXT,
    "imageUrl" VARCHAR(512) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Site_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Site_slug_key" ON "Site"("slug");
CREATE INDEX "Site_isActive_sortOrder_idx" ON "Site"("isActive", "sortOrder");
CREATE INDEX "Site_category_idx" ON "Site"("category");
