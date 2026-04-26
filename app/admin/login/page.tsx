import { LoginForm } from "@/components/auth/login-form";

type AdminLoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_30%),linear-gradient(180deg,#111111_0%,#050505_100%)]" />

      <section className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/6 p-8 shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur">
        <p className="text-xs uppercase tracking-[0.34em] text-white/45">Admin</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white">Connexion sécurisée</h1>
        <p className="mt-3 text-sm leading-6 text-white/65">
          Accédez au back-office pour gérer les sites, leur ordre d&apos;affichage et leur
          activation.
        </p>

        <div className="mt-8">
          <LoginForm error={params.error === "invalid"} />
        </div>
      </section>
    </main>
  );
}
