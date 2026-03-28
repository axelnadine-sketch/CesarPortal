"use client";

import { useEffect } from "react";

type AdminErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function AdminError({ error, reset }: AdminErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="max-w-lg rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center">
        <p className="text-xs uppercase tracking-[0.32em] text-white/45">Erreur admin</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
          Action interrompue
        </h2>
        <p className="mt-4 text-sm leading-7 text-white/65">
          Une erreur inattendue est survenue dans le back-office. Reessayez, puis verifiez la base
          ou les variables d&apos;environnement si besoin.
        </p>
        <button
          className="mt-6 rounded-full bg-white px-5 py-3 text-sm font-medium text-neutral-950 transition hover:bg-neutral-200"
          onClick={() => reset()}
          type="button"
        >
          Reessayer
        </button>
      </div>
    </div>
  );
}
