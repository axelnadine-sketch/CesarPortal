import Link from "next/link";
import { logoutAdmin } from "@/app/admin/actions";
import { cn } from "@/lib/utils";
import { CesarPortalLogo } from "@/components/branding/cesarportal-logo";

const navigation = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/sites", label: "Sites" },
  { href: "/admin/sites/new", label: "Ajouter" },
];

type AdminShellProps = {
  children: React.ReactNode;
};

export function AdminShell({ children }: AdminShellProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.07),transparent_30%),linear-gradient(180deg,#111111_0%,#050505_100%)] text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-5 rounded-[2rem] border border-[#2d2d30] bg-[#2d2d30] p-5 backdrop-blur md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-white/45">Administration</p>
            <div className="mt-2">
              <CesarPortalLogo href="/admin" variant="compact" />
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-2">
            {navigation.map((item) => (
              <Link
                className={cn(
                  "rounded-full border border-[#2d2d30] px-4 py-2 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/8 hover:text-white",
                )}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
            <form action={logoutAdmin}>
              <button
                className="rounded-full border border-[#2d2d30] px-4 py-2 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/8 hover:text-white"
                type="submit"
              >
                Deconnexion
              </button>
            </form>
          </nav>
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
