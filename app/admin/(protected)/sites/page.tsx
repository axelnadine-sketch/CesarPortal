import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getAllSites } from "@/lib/site-repository";
import { formatTags } from "@/lib/utils";
import { SiteRowActions } from "@/components/admin/site-row-actions";

type SitesPageProps = {
  searchParams: Promise<{
    status?: string;
  }>;
};

const statusMessages: Record<string, string> = {
  created: "Site cree avec succes.",
  updated: "Site mis a jour avec succes.",
  deleted: "Site supprime avec succes.",
};

export default async function AdminSitesPage({ searchParams }: SitesPageProps) {
  const [sites, params] = await Promise.all([getAllSites(), searchParams]);
  const statusMessage = params.status ? statusMessages[params.status] : undefined;

  return (
    <div className="grid gap-6">
      <section className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-white/45">Gestion des sites</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Catalogue admin</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/70">
            Ajoutez, classez, activez et mettez en avant vos sites depuis une interface unique.
          </p>
        </div>

        <Link
          className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-medium text-neutral-950 transition hover:bg-neutral-200"
          href="/admin/sites/new"
        >
          Ajouter un site
        </Link>
      </section>

      {statusMessage ? (
        <div className="rounded-[1.5rem] border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-100">
          {statusMessage}
        </div>
      ) : null}

      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
        <div className="grid gap-px bg-white/8">
          {sites.map((site) => (
            <article
              className="grid gap-4 bg-neutral-950/85 p-5 xl:grid-cols-[1.5fr_1fr_1fr_auto]"
              key={site.id}
            >
              <div className="grid gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold text-white">{site.name}</h3>
                  <Badge>{site.category}</Badge>
                  {site.isFeatured ? <Badge className="bg-white text-neutral-950">En avant</Badge> : null}
                  {!site.isActive ? <Badge className="border-rose-300/20 text-rose-200">Inactif</Badge> : null}
                </div>
                <p className="text-sm text-white/65">{site.shortDescription}</p>
                <p className="text-xs text-white/45">{site.url}</p>
              </div>

              <div className="grid gap-2 text-sm text-white/70">
                <p>Slug: {site.slug}</p>
                <p>Ordre: {site.sortOrder}</p>
                <p>Tags: {formatTags(site.tags) || "Aucun"}</p>
              </div>

              <div className="grid gap-1 text-sm text-white/60">
                <p>Cree le {site.createdAt.toLocaleDateString("fr-FR")}</p>
                <p>Maj le {site.updatedAt.toLocaleDateString("fr-FR")}</p>
              </div>

              <SiteRowActions isActive={site.isActive} isFeatured={site.isFeatured} siteId={site.id} />
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
