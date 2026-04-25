import { Badge } from "@/components/ui/badge";
import { SiteCardImage } from "@/components/site/site-card-image";

export type SiteCardData = {
  id: string;
  name: string;
  slug: string;
  url: string;
  shortDescription: string;
  category: string;
  tags: string | null;
  imageUrl: string;
  isFeatured: boolean;
  sortOrder?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

type SiteCardProps = {
  site: SiteCardData;
};

function getTags(site: SiteCardData) {
  return site.tags
    ? site.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];
}

export function SiteCard({ site }: SiteCardProps) {
  const tags = getTags(site);

  return (
    <article className="group relative overflow-hidden rounded-[2rem] border border-[#27476a] bg-[linear-gradient(180deg,rgba(37,39,46,0.98),rgba(31,33,40,0.98))] shadow-[0_18px_60px_rgba(0,0,0,0.24)] transition duration-300 hover:-translate-y-1 hover:border-[#60a5fa]/80 hover:shadow-[0_0_0_1px_rgba(96,165,250,0.18),0_18px_70px_rgba(37,99,235,0.12)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.10),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.06),transparent_28%)] opacity-80" />

      <div className="relative h-48 overflow-hidden border-b border-[#24384f] bg-[#0b1220] sm:h-56">
        <SiteCardImage alt={site.name} src={site.imageUrl} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <Badge>{site.category}</Badge>
          {site.isFeatured ? <Badge className="bg-white text-neutral-950">En avant</Badge> : null}
        </div>
      </div>

      <div className="relative grid gap-5 p-6">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-white">{site.name}</h3>
          <p className="mt-3 text-sm leading-7 text-white/68">{site.shortDescription}</p>
        </div>

        {tags.length ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                className="rounded-full border border-[#314861] bg-[#20242c] px-3 py-1 text-xs text-white/60"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <a
          className="inline-flex w-fit items-center justify-center rounded-full border border-[#39506a] bg-[#2b3038] px-5 py-3 text-sm font-medium text-white transition duration-200 hover:border-[#60a5fa]/70 hover:bg-[#313846]"
          href={site.url}
          rel="noreferrer"
          target="_blank"
        >
          Visiter le site
        </a>
      </div>
    </article>
  );
}
