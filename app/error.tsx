"use client";

import { useEffect } from "react";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="fr">
      <body className="grid min-h-screen place-items-center bg-neutral-950 px-6 text-white">
        <div className="max-w-lg rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center">
          <p className="text-xs uppercase tracking-[0.32em] text-white/45">Erreur</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">
            Un problème est survenu
          </h1>
          <p className="mt-4 text-sm leading-7 text-white/65">
            L&apos;application a rencontré une erreur inattendue. Vous pouvez réessayer
            immédiatement.
          </p>
          <button
            className="mt-6 rounded-full border border-sky-400/40 bg-sky-500/15 px-5 py-3 text-sm font-medium text-sky-100 transition hover:bg-sky-500/25"
            onClick={() => reset()}
            type="button"
          >
            Réessayer
          </button>
        </div>
      </body>
    </html>
  );
}