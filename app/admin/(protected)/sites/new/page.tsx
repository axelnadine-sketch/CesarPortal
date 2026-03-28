import { SiteForm } from "@/components/admin/site-form";
import { createSite } from "@/app/admin/(protected)/sites/actions";

const defaultValues = {
  name: "",
  slug: "",
  url: "",
  shortDescription: "",
  longDescription: "",
  category: "",
  tags: "",
  imageUrl: "",
  isActive: true,
  isFeatured: false,
  sortOrder: 0,
};

export default function NewSitePage() {
  return (
    <div className="grid gap-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <p className="text-xs uppercase tracking-[0.32em] text-white/45">Nouveau site</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">Ajouter une nouvelle entree</h2>
        <p className="mt-3 text-sm leading-7 text-white/70">
          Remplissez les informations principales. Le site apparaitra automatiquement sur la
          landing s&apos;il est actif.
        </p>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <SiteForm
          action={createSite}
          initialState={{ success: false }}
          submitLabel="Creer le site"
          values={defaultValues}
        />
      </section>
    </div>
  );
}
