import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function AdminDashboardPage() {
  const [totalSites, activeSites, featuredSites] = await Promise.all([
    prisma.site.count(),
    prisma.site.count({ where: { isActive: true } }),
    prisma.site.count({ where: { isFeatured: true } }),
  ]);

  return (
    <div className="grid gap-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
        <p className="text-xs uppercase tracking-[0.32em] text-white/45">Dashboard</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">Pilotage centralise</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70">
          Retrouvez ici l&apos;etat du portail et accedez rapidement aux actions d&apos;administration.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Sites total", value: totalSites },
          { label: "Sites actifs", value: activeSites },
          { label: "Sites en avant", value: featuredSites },
        ].map((item) => (
          <article
            className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6"
            key={item.label}
          >
            <p className="text-sm text-white/55">{item.label}</p>
            <p className="mt-4 text-4xl font-semibold tracking-tight">{item.value}</p>
          </article>
        ))}
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">Actions rapides</h3>
            <p className="mt-2 text-sm text-white/65">
              Gerer les sites existants ou ajouter une nouvelle vitrine.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              className="rounded-full bg-white px-5 py-3 text-sm font-medium text-neutral-950 transition hover:bg-neutral-200"
              href="/admin/sites/new"
            >
              Ajouter un site
            </Link>
            <Link
              className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/80 transition hover:bg-white/10"
              href="/admin/sites"
            >
              Voir la liste
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
