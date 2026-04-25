import Link from "next/link";

export default function AdminNotFound() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="max-w-md rounded-[2rem] border border-[#2d2d30] bg-[#2d2d30] p-8 text-center">
        <h2 className="text-2xl font-semibold text-white">Element introuvable</h2>
        <p className="mt-3 text-sm leading-7 text-white/65">
          Cette ressource admin n&apos;existe pas ou a deja ete supprimee.
        </p>
        <Link
          className="mt-6 inline-flex rounded-full border border-[#2d2d30] px-5 py-3 text-sm text-white/80 transition hover:bg-white/10"
          href="/admin/sites"
        >
          Retour a la liste
        </Link>
      </div>
    </div>
  );
}
