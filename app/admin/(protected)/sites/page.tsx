import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { SiteCardImage } from "@/components/site/site-card-image";
import { SiteRowActions } from "@/components/admin/site-row-actions";
import { getAllSites } from "@/lib/site-repository";

type SitesPageProps = {
  searchParams: Promise<{
    status?: string;
  }>;
};

const statusMessages: Record<string, string> = {
  created: "Site créé avec succès.",
  updated: "Site mis à jour avec succès.",
  deleted: "Site supprimé avec succès.",
  toggled: "Mise à jour effectuée.",
  invalid: "Action refusée : identifiant invalide.",
  missing: "Le site cible est introuvable.",
  error: "Une erreur est survenue pendant l'action.",
};

function getTags(tags: string | null) {
  return tags
    ? tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];
}

export default async function AdminSitesPage({ searchParams }: SitesPageProps) {
  const params = await searchParams;
  const sites = await getAllSites();
  const statusMessage = params.status ? statusMessages[params.status] : null;

  return (
    <div className="grid gap-7">
      <section className="flex flex-col gap-5 rounded-[2rem] border border-[#27476a] bg-[linear-gradient(135deg,rgba(10,15,25,0.86),rgba(37,39,46,0.92))] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.24)] md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-[#60a5fa]">Gestion des sites</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Catalogue admin</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
            Ajoutez, classez, activez et mettez en avant vos sites depuis une interface unique.
          </p>
        </div>

        <Link
          className="inline-flex items-center justify-center rounded-full border border-[#60a5fa]/45 bg-[#0ea5e9]/18 px-6 py-3 text-sm font-semibold text-[#dbeafe] transition hover:border-[#60a5fa] hover:bg-[#0ea5e9]/28"
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

      <section className="grid gap-5">
        {sites.length ? (
          sites.map((site) => {
            const tags = getTags(site.tags);

            return (
              <article
                className="group overflow-hidden rounded-[2rem] border border-[#27476a] bg-[linear-gradient(180deg,rgba(37,39,46,0.98),rgba(31,33,40,0.98))] shadow-[0_18px_60px_rgba(0,0,0,0.18)] transition hover:border-[#60a5fa]/75"
                key={site.id}
              >
                <div className="grid gap-0 xl:grid-cols-[280px_1fr_320px]">
                  <a
                    aria-label={`Ouvrir ${site.name}`}
                    className="relative block aspect-[16/10] overflow-hidden border-b border-[#24384f] bg-[#0b1220] xl:border-b-0 xl:border-r"
                    href={site.url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <SiteCardImage alt={site.name} src={site.imageUrl} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    <div className="pointer-events-none absolute left-4 top-4 flex flex-wrap gap-2">
                      <Badge>{site.category}</Badge>
                      {site.isFeatured ? (
                        <Badge className="bg-white text-neutral-950">En avant</Badge>
                      ) : null}
                      {!site.isActive ? (
                        <Badge className="border-rose-300/20 text-rose-200">Inactif</Badge>
                      ) : null}
                    </div>
                  </a>

                  <div className="flex flex-col gap-5 p-6">
                    <div>
                      <h3 className="text-2xl font-semibold tracking-tight text-white">
                        <a
                          className="transition hover:text-[#60a5fa]"
                          href={site.url}
                          rel="noreferrer"
                          target="_blank"
                        >
                          {site.name}
                        </a>
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-slate-300">
                        {site.shortDescription}
                      </p>

                      <a
                        className="mt-2 inline-block break-all text-xs text-[#93c5fd] underline-offset-4 transition hover:text-[#60a5fa] hover:underline"
                        href={site.url}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {site.url}
                      </a>
                    </div>

                    {tags.length ? (
                      <div className="flex flex-wrap items-center gap-2 self-start">
                        {tags.map((tag) => (
                          <span
                            className="inline-flex h-fit items-center rounded-full border border-[#314861] bg-[#20242c] px-3 py-1 text-xs leading-none text-white/60"
                            key={tag}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500">Aucun tag renseigné.</p>
                    )}
                  </div>

                  <div className="grid gap-5 border-t border-[#24384f] p-6 xl:border-l xl:border-t-0">
                    <div className="grid gap-3 text-sm text-slate-300">
                      <div className="rounded-2xl border border-[#30435d] bg-[#0b1220]/55 p-4">
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Slug</p>
                        <p className="mt-2 font-medium text-white">{site.slug}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-[#30435d] bg-[#0b1220]/55 p-4">
                          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Ordre</p>
                          <p className="mt-2 text-xl font-semibold text-white">{site.sortOrder}</p>
                        </div>

                        <div className="rounded-2xl border border-[#30435d] bg-[#0b1220]/55 p-4">
                          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Statut</p>
                          <p className="mt-2 font-medium text-white">
                            {site.isActive ? "Actif" : "Inactif"}
                          </p>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-[#30435d] bg-[#0b1220]/55 p-4">
                        <p>Créé le {site.createdAt.toLocaleDateString("fr-FR")}</p>
                        <p className="mt-1">Maj le {site.updatedAt.toLocaleDateString("fr-FR")}</p>
                      </div>
                    </div>

                    <SiteRowActions
                      isActive={site.isActive}
                      isFeatured={site.isFeatured}
                      siteId={site.id}
                    />
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <div className="rounded-[2rem] border border-dashed border-[#30435d] bg-[#0b1220]/60 p-8 text-center text-sm text-slate-400">
            Aucun site en base pour le moment. Créez la première entrée depuis l&apos;admin.
          </div>
        )}
      </section>
    </div>
  );
}
