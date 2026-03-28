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
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">Un probleme est survenu</h1>
          <p className="mt-4 text-sm leading-7 text-white/65">
            L&apos;application a rencontre une erreur inattendue. Vous pouvez reessayer
            immediatement.
          </p>
          <button
            className="mt-6 rounded-full bg-white px-5 py-3 text-sm font-medium text-neutral-950 transition hover:bg-neutral-200"
            onClick={() => reset()}
            type="button"
          >
            Reessayer
          </button>
        </div>
      </body>
    </html>
  );
}
