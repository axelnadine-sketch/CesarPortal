CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(140) NOT NULL,
    "slug" VARCHAR(160) NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'A_REPRENDRE',
    "priority" VARCHAR(40) NOT NULL DEFAULT 'MOYENNE',
    "shortDescription" VARCHAR(280) NOT NULL,
    "nextAction" TEXT,
    "usefulLinks" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
CREATE INDEX "Project_status_idx" ON "Project"("status");
CREATE INDEX "Project_priority_idx" ON "Project"("priority");
CREATE INDEX "Project_isActive_sortOrder_idx" ON "Project"("isActive", "sortOrder");
