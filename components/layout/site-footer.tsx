import Link from "next/link";
import { Container } from "@/components/layout/container";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-[#1f3550] bg-[#070b12]/70 py-10 text-slate-300">
      <Container>
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <p className="text-sm font-semibold tracking-[0.24em] text-[#60a5fa]">
              CESARPORTAL
            </p>

            <p className="mt-3 max-w-xl text-xl font-semibold tracking-tight text-white">
              Portail central de votre écosystème web.
            </p>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
              Une interface unique pour accéder rapidement à vos applications,
              sites métiers, outils internes et projets numériques.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm md:items-end">
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link
                className="rounded-full border border-[#2f527a] bg-[#0b1220] px-4 py-2 text-slate-200 transition hover:border-[#60a5fa] hover:text-white"
                href="#sites"
              >
                Voir les sites
              </Link>

              <Link
                className="rounded-full border border-[#2f527a] bg-[#0b1220] px-4 py-2 text-slate-200 transition hover:border-[#60a5fa] hover:text-white"
                href="/admin/login"
              >
                Administration
              </Link>
            </div>

            <p className="text-slate-500">
              © {year} CesarPortal — Propulsé par César Balachandar.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
