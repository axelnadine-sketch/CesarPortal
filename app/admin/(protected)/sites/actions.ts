"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { parseTags } from "@/lib/utils";
import { siteFormSchema } from "@/lib/validations/site";

type SiteFormActionState = {
  success: boolean;
  message?: string;
  errors?: Partial<Record<keyof ReturnType<typeof buildSitePayload>, string>> & {
    _form?: string;
  };
};

function buildSitePayload(formData: FormData) {
  return {
    name: formData.get("name"),
    slug: formData.get("slug"),
    url: formData.get("url"),
    shortDescription: formData.get("shortDescription"),
    longDescription: formData.get("longDescription"),
    category: formData.get("category"),
    tags: formData.get("tags"),
    imageUrl: formData.get("imageUrl"),
    isActive: formData.get("isActive") === "on",
    isFeatured: formData.get("isFeatured") === "on",
    sortOrder: formData.get("sortOrder"),
  };
}

function mapValidationErrors(formData: FormData) {
  const parsed = siteFormSchema.safeParse(buildSitePayload(formData));

  if (parsed.success) {
    return { data: parsed.data };
  }

  const fieldErrors = parsed.error.flatten().fieldErrors;

  return {
    errors: {
      name: fieldErrors.name?.[0],
      slug: fieldErrors.slug?.[0],
      url: fieldErrors.url?.[0],
      shortDescription: fieldErrors.shortDescription?.[0],
      longDescription: fieldErrors.longDescription?.[0],
      category: fieldErrors.category?.[0],
      tags: fieldErrors.tags?.[0],
      imageUrl: fieldErrors.imageUrl?.[0],
      sortOrder: fieldErrors.sortOrder?.[0],
    },
  };
}

async function assertUniqueSlug(slug: string, siteId?: string) {
  const existingSite = await prisma.site.findUnique({
    where: { slug },
  });

  if (existingSite && existingSite.id !== siteId) {
    return "Ce slug est deja utilise.";
  }

  return null;
}

function persistSuccess() {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/sites");
}

export async function createSite(
  _prevState: SiteFormActionState,
  formData: FormData,
): Promise<SiteFormActionState> {
  await requireAdminSession();

  const parsed = mapValidationErrors(formData);

  if ("errors" in parsed) {
    return { success: false, errors: parsed.errors };
  }

  const slugError = await assertUniqueSlug(parsed.data.slug);

  if (slugError) {
    return {
      success: false,
      errors: { slug: slugError },
    };
  }

  await prisma.site.create({
    data: {
      ...parsed.data,
      longDescription: parsed.data.longDescription || null,
      tags: parseTags(parsed.data.tags ?? "").join(", "),
    },
  });

  persistSuccess();
  redirect("/admin/sites?status=created");
}

export async function updateSite(
  _prevState: SiteFormActionState,
  formData: FormData,
): Promise<SiteFormActionState> {
  await requireAdminSession();

  const siteId = String(formData.get("siteId") ?? "");

  if (!siteId) {
    return {
      success: false,
      errors: { _form: "Identifiant de site introuvable." },
    };
  }

  const parsed = mapValidationErrors(formData);

  if ("errors" in parsed) {
    return { success: false, errors: parsed.errors };
  }

  const slugError = await assertUniqueSlug(parsed.data.slug, siteId);

  if (slugError) {
    return {
      success: false,
      errors: { slug: slugError },
    };
  }

  await prisma.site.update({
    where: { id: siteId },
    data: {
      ...parsed.data,
      longDescription: parsed.data.longDescription || null,
      tags: parseTags(parsed.data.tags ?? "").join(", "),
    },
  });

  persistSuccess();
  redirect("/admin/sites?status=updated");
}

export async function deleteSite(formData: FormData) {
  await requireAdminSession();

  const siteId = String(formData.get("siteId") ?? "");

  if (!siteId) {
    return;
  }

  await prisma.site.delete({
    where: { id: siteId },
  });

  persistSuccess();
  redirect("/admin/sites?status=deleted");
}

export async function toggleSiteActive(formData: FormData) {
  await requireAdminSession();

  const siteId = String(formData.get("siteId") ?? "");

  if (!siteId) {
    return;
  }

  const site = await prisma.site.findUnique({
    where: { id: siteId },
    select: { isActive: true },
  });

  if (!site) {
    return;
  }

  await prisma.site.update({
    where: { id: siteId },
    data: { isActive: !site.isActive },
  });

  persistSuccess();
  redirect("/admin/sites");
}

export async function toggleSiteFeatured(formData: FormData) {
  await requireAdminSession();

  const siteId = String(formData.get("siteId") ?? "");

  if (!siteId) {
    return;
  }

  const site = await prisma.site.findUnique({
    where: { id: siteId },
    select: { isFeatured: true },
  });

  if (!site) {
    return;
  }

  await prisma.site.update({
    where: { id: siteId },
    data: { isFeatured: !site.isFeatured },
  });

  persistSuccess();
  redirect("/admin/sites");
}

export type { SiteFormActionState };
