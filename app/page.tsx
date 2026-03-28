import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { SiteCard } from "@/components/site/site-card";
import { getPublicSites } from "@/lib/site-repository";

export default async function HomePage() {
  const sites = await getPublicSites();

  return (
    <main className="pb-20 pt-8 text-neutral-100">
      <Container>
        <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.045] px-6 py-10 shadow-[0_20px_80px_rgba(0,0,0,0.28)] md:px-10 md:py-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_28%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[1.35fr_0.95fr] lg:items-end">
            <div className="max-w-3xl">
              <Badge>Portail central de vos sites</Badge>
              <h1 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                Une entree unique, elegante et rapide pour tout votre ecosysteme web.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
                Retrouvez vos sites actifs dans une landing premium, claire et maintenable, avec
                une administration integree pour piloter le catalogue en quelques secondes.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="#sites">Voir les sites</ButtonLink>
                <ButtonLink href="/admin/login" variant="secondary">
                  Acces admin
                </ButtonLink>
              </div>
            </div>

            <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-black/20 p-6">
              <p className="text-xs uppercase tracking-[0.32em] text-white/45">Vue d&apos;ensemble</p>
              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
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
                    className="rounded-[1.5rem] border border-white/8 bg-white/6 p-4"
                    key={item.label}
                  >
                    <p className="text-sm text-white/55">{item.label}</p>
                    <p className="mt-3 text-3xl font-semibold tracking-tight">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:grid-cols-3">
          {[
            "Affichage automatique des sites actifs",
            "Tri gere depuis l'administration",
            "Base prete pour automatisation n8n",
          ].map((item) => (
            <div className="rounded-[1.5rem] border border-white/8 bg-black/10 px-4 py-5 text-sm text-white/65" key={item}>
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
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {sites.map((site) => (
                <SiteCard key={site.id} site={site} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-[2rem] border border-dashed border-white/12 bg-white/[0.03] p-8 text-center text-sm text-white/60">
              Aucun site actif pour le moment. Ajoutez-en un depuis l&apos;interface admin.
            </div>
          )}
        </section>
      </Container>
    </main>
  );
}
