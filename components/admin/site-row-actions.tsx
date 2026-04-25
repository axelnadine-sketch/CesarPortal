import Link from "next/link";
import {
  deleteSite,
  toggleSiteActive,
  toggleSiteFeatured,
} from "@/app/admin/(protected)/sites/actions";

type SiteRowActionsProps = {
  siteId: string;
  isActive: boolean;
  isFeatured: boolean;
};

export function SiteRowActions({ siteId, isActive, isFeatured }: SiteRowActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link
        className="rounded-full border border-[#2d2d30] px-3 py-2 text-xs text-white/80 transition hover:bg-white/10"
        href={`/admin/sites/${siteId}/edit`}
      >
        Modifier
      </Link>

      <form action={toggleSiteActive}>
        <input name="siteId" type="hidden" value={siteId} />
        <button
          className="rounded-full border border-[#2d2d30] px-3 py-2 text-xs text-white/80 transition hover:bg-white/10"
          type="submit"
        >
          {isActive ? "Desactiver" : "Activer"}
        </button>
      </form>

      <form action={toggleSiteFeatured}>
        <input name="siteId" type="hidden" value={siteId} />
        <button
          className="rounded-full border border-[#2d2d30] px-3 py-2 text-xs text-white/80 transition hover:bg-white/10"
          type="submit"
        >
          {isFeatured ? "Retirer la mise en avant" : "Mettre en avant"}
        </button>
      </form>

      <form action={deleteSite}>
        <input name="siteId" type="hidden" value={siteId} />
        <button
          className="rounded-full border border-rose-300/20 px-3 py-2 text-xs text-rose-200 transition hover:bg-rose-300/10"
          type="submit"
        >
          Supprimer
        </button>
      </form>
    </div>
  );
}
