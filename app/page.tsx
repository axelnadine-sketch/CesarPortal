export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 py-24 text-neutral-100">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.32em] text-neutral-400">
          Portail sites
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Base Next.js 15 initialisee
        </h1>
        <p className="mt-6 text-base leading-7 text-neutral-300 sm:text-lg">
          La structure du projet est en place. La landing publique, l&apos;admin, Prisma et
          l&apos;authentification vont etre construits dans les phases suivantes.
        </p>
      </div>
    </main>
  );
}
