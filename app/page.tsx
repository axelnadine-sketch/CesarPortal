import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/layout/site-footer";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { SiteGridControls } from "@/components/site/site-grid-controls";
import { getPublicSites } from "@/lib/site-repository";

export default async function HomePage() {
  const sites = await getPublicSites();

  return (
    <main className="pb-20 pt-8 text-neutral-100">
      <Container>
        <section className="relative overflow-hidden rounded-[2.5rem] border border-[#2c3e55] bg-[linear-gradient(135deg,rgba(10,15,25,0.96),rgba(16,24,38,0.94))] px-6 py-8 shadow-[0_20px_80px_rgba(0,0,0,0.30)] md:px-10 md:py-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.20),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(96,165,250,0.14),transparent_30%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(59,130,246,0.06),transparent)]" />

          <div className="relative grid gap-6 lg:grid-cols-[1.3fr_0.9fr] lg:items-end">
            <div className="max-w-3xl">
              <Badge className="border-[#3b82f6]/30 bg-[#3b82f6]/12 text-[#bfdbfe]">
                Portail central de vos sites
              </Badge>

              <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Une entree unique pour votre ecosysteme web.
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Retrouvez vos sites actifs dans une interface claire, rapide et elegante,
                avec un acces direct et une administration integree.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="#sites">Voir les sites</ButtonLink>
                <ButtonLink href="/admin/login" variant="secondary">
                  Acces admin
                </ButtonLink>
              </div>
            </div>

            <div className="grid gap-3 rounded-[1.75rem] border border-[#30435d] bg-[#0b1220]/65 p-5 backdrop-blur">
              <p className="text-[11px] uppercase tracking-[0.32em] text-slate-400">
                Vue d&apos;ensemble
              </p>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  { label: "Sites actifs", value: sites.length },
                  {
                    label: "Mises en avant",
                    value: sites.filter((site) => site.isFeatured).length,
                  },
                  {
                    label: "Categories",
                    value: new Set(sites.map((site) => site.category)).size,
                  },
                ].map((item) => (
                  <div
                    className="rounded-[1.25rem] border border-[#314761] bg-[#111b2a]/80 px-4 py-3"
                    key={item.label}
                  >
                    <p className="text-xs text-slate-400">{item.label}</p>
                    <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-3 rounded-[2rem] border border-[#2b3d56] bg-[linear-gradient(135deg,rgba(10,15,25,0.72),rgba(16,24,38,0.68))] p-4 md:grid-cols-3 md:p-5">
          {[
            "Affichage automatique des sites actifs",
            "Tri gere depuis l'administration",
            "Base prete pour automatisation n8n",
          ].map((item) => (
            <div
              className="rounded-[1.25rem] border border-[#30435d] bg-[#0e1624]/70 px-4 py-4 text-sm text-slate-300"
              key={item}
            >
              {item}
            </div>
          ))}
        </section>

        <section className="mt-14" id="sites">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-white/45">Selection active</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                Tous vos sites dans une seule page
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-white/65">
              La grille est alimentee automatiquement depuis la base, triee par ordre defini dans
              l&apos;admin et limitee aux sites actifs.
            </p>
          </div>

          {sites.length ? (
            <SiteGridControls
              sites={sites.map((site) => ({
                id: site.id,
                name: site.name,
                slug: site.slug,
                url: site.url,
                shortDescription: site.shortDescription,
                category: site.category,
                tags: site.tags,
                imageUrl: site.imageUrl,
                isFeatured: site.isFeatured,
                sortOrder: site.sortOrder,
                createdAt: site.createdAt.toISOString(),
                updatedAt: site.updatedAt.toISOString(),
              }))}
            />
          ) : (
            <div className="mt-8 rounded-[2rem] border border-dashed border-white/12 bg-white/[0.03] p-8 text-center text-sm text-white/60">
              Aucun site actif pour le moment. Ajoutez-en un depuis l&apos;interface admin.
            </div>
          )}
        </section>
      </Container>
      <SiteFooter />
    </main>
  );
}