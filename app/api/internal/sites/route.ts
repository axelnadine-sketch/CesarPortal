import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { env } from "@/lib/env";
import { slugify } from "@/lib/utils";
import { siteApiSchema } from "@/lib/validations/site";

function isAuthorized(request: Request) {
  const authorizationHeader = request.headers.get("authorization");
  const bearerToken = authorizationHeader?.startsWith("Bearer ")
    ? authorizationHeader.slice(7)
    : null;

  return bearerToken === env.INTERNAL_API_TOKEN;
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    return NextResponse.json({ error: "Content-Type must be application/json" }, { status: 415 });
  }

  const body = await request.json().catch(() => null);
  const parsed = siteApiSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const slug = parsed.data.slug ? slugify(parsed.data.slug) : slugify(parsed.data.name);

  const existingSite = await prisma.site.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (existingSite) {
    return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
  }

  try {
    const site = await prisma.site.create({
      data: {
        name: parsed.data.name,
        slug,
        url: parsed.data.url,
        shortDescription: parsed.data.shortDescription,
        longDescription: parsed.data.longDescription || null,
        category: parsed.data.category,
        tags: parsed.data.tags?.join(", ") ?? "",
        imageUrl: parsed.data.imageUrl,
        isActive: parsed.data.isActive ?? true,
        isFeatured: parsed.data.isFeatured ?? false,
        sortOrder: parsed.data.sortOrder ?? 0,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/sites");

    return NextResponse.json(
      {
        id: site.id,
        slug: site.slug,
        message: "Site created",
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }

    return NextResponse.json({ error: "Unable to create site" }, { status: 500 });
  }
}
