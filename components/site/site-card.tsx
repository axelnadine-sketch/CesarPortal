import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { getSiteTags } from "@/lib/site-service";
import type { Site } from "@prisma/client";

type SiteCardProps = {
  site: Site;
};

export function SiteCard({ site }: SiteCardProps) {
  const tags = getSiteTags(site);

  return (
    <article className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] shadow-[0_18px_60px_rgba(0,0,0,0.24)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08]">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          alt={site.name}
          className="object-cover transition duration-500 group-hover:scale-105"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={site.imageUrl}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="absolute left-4 top-4 flex gap-2">
          <Badge>{site.category}</Badge>
          {site.isFeatured ? <Badge className="bg-white text-neutral-950">En avant</Badge> : null}
        </div>
      </div>

      <div className="grid gap-5 p-6">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-white">{site.name}</h3>
          <p className="mt-3 text-sm leading-7 text-white/68">{site.shortDescription}</p>
        </div>

        {tags.length ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                className="rounded-full border border-white/8 bg-white/5 px-3 py-1 text-xs text-white/55"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <ButtonLink className="w-fit" href={site.url} variant="secondary">
          Visiter le site
        </ButtonLink>
      </div>
    </article>
  );
}
