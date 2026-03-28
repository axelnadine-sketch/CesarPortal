import { notFound } from "next/navigation";
import { SiteForm } from "@/components/admin/site-form";
import { updateSite } from "@/app/admin/(protected)/sites/actions";
import { getSiteById } from "@/lib/site-repository";
import { serializeSiteForForm } from "@/lib/site-service";

type EditSitePageProps = {
  params: Promise<{
    siteId: string;
  }>;
};

export default async function EditSitePage({ params }: EditSitePageProps) {
  const { siteId } = await params;
  const site = await getSiteById(siteId);

  if (!site) {
    notFound();
  }

  return (
    <div className="grid gap-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <p className="text-xs uppercase tracking-[0.32em] text-white/45">Edition</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">Modifier {site.name}</h2>
        <p className="mt-3 text-sm leading-7 text-white/70">
          Ajustez le contenu, l&apos;ordre d&apos;affichage ou la mise en avant du site.
        </p>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <SiteForm
          action={updateSite}
          initialState={{ success: false }}
          siteId={site.id}
          submitLabel="Enregistrer les modifications"
          values={serializeSiteForForm(site)}
        />
      </section>
    </div>
  );
}
