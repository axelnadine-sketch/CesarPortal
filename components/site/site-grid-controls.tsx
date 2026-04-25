"use client";

import { useMemo, useState } from "react";
import { SiteCard, type SiteCardData } from "@/components/site/site-card";

type SortMode = "admin" | "popular" | "recent" | "old" | "az" | "random";

type SiteGridControlsProps = {
  sites: SiteCardData[];
};

const sortModes: { value: SortMode; label: string }[] = [
  { value: "admin", label: "Ordre admin" },
  { value: "popular", label: "Populaires" },
  { value: "recent", label: "Récents" },
  { value: "old", label: "Anciens" },
  { value: "az", label: "A-Z" },
  { value: "random", label: "Aléatoire" },
];

function getTime(value: SiteCardData["createdAt"]) {
  if (!value) return 0;
  const time = new Date(value).getTime();
  return Number.isNaN(time) ? 0 : time;
}

function shuffleSites(sites: SiteCardData[]) {
  const copy = [...sites];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }

  return copy;
}

export function SiteGridControls({ sites }: SiteGridControlsProps) {
  const [sortMode, setSortMode] = useState<SortMode>("admin");
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [randomKey, setRandomKey] = useState(0);

  const categories = useMemo(() => {
    return Array.from(new Set(sites.map((site) => site.category))).sort((a, b) =>
      a.localeCompare(b, "fr"),
    );
  }, [sites]);

  const visibleSites = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = sites.filter((site) => {
      const matchesCategory = category === "all" || site.category === category;

      const searchableText = [
        site.name,
        site.shortDescription,
        site.category,
        site.tags ?? "",
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });

    if (sortMode === "random") {
      randomKey;
      return shuffleSites(filtered);
    }

    return [...filtered].sort((a, b) => {
      if (sortMode === "popular") {
        return Number(b.isFeatured) - Number(a.isFeatured) || (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
      }

      if (sortMode === "recent") {
        return getTime(b.createdAt) - getTime(a.createdAt);
      }

      if (sortMode === "old") {
        return getTime(a.createdAt) - getTime(b.createdAt);
      }

      if (sortMode === "az") {
        return a.name.localeCompare(b.name, "fr");
      }

      return (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
    });
  }, [sites, sortMode, category, query, randomKey]);

  return (
    <div className="mt-8 grid gap-6">
      <div className="rounded-[2rem] border border-[#27476a] bg-[#0b1220]/70 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="grid gap-3">
            <p className="text-xs uppercase tracking-[0.28em] text-[#60a5fa]">
              Choix d&apos;affichage
            </p>

            <div className="flex flex-wrap gap-2">
              {sortModes.map((mode) => (
                <button
                  className={[
                    "rounded-full border px-4 py-2 text-sm transition",
                    sortMode === mode.value
                      ? "border-[#60a5fa] bg-[#1d4ed8]/35 text-white"
                      : "border-[#30435d] bg-[#111b2a] text-slate-300 hover:border-[#60a5fa]/70 hover:text-white",
                  ].join(" ")}
                  key={mode.value}
                  onClick={() => {
                    setSortMode(mode.value);
                    if (mode.value === "random") {
                      setRandomKey((value) => value + 1);
                    }
                  }}
                  type="button"
                >
                  {mode.label}
                </button>
              ))}

              {sortMode === "random" ? (
                <button
                  className="rounded-full border border-[#60a5fa]/70 bg-[#0b1220] px-4 py-2 text-sm text-[#bfdbfe] transition hover:bg-[#1d4ed8]/30"
                  onClick={() => setRandomKey((value) => value + 1)}
                  type="button"
                >
                  Relancer
                </button>
              ) : null}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-2 text-sm text-slate-300">
              Catégorie
              <select
                className="h-11 rounded-full border border-[#30435d] bg-[#111b2a] px-4 text-sm text-white outline-none transition focus:border-[#60a5fa]"
                onChange={(event) => setCategory(event.target.value)}
                value={category}
              >
                <option value="all">Toutes</option>
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm text-slate-300">
              Recherche
              <input
                className="h-11 rounded-full border border-[#30435d] bg-[#111b2a] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#60a5fa]"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Nom, tag, catégorie..."
                value={query}
              />
            </label>
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-500">
          {visibleSites.length} site{visibleSites.length > 1 ? "s" : ""} affiché
          {visibleSites.length > 1 ? "s" : ""}. Le mode “Populaires” utilise les sites mis en avant.
        </p>
      </div>

      {visibleSites.length ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleSites.map((site) => (
            <SiteCard key={site.id} site={site} />
          ))}
        </div>
      ) : (
        <div className="rounded-[2rem] border border-dashed border-[#30435d] bg-[#0b1220]/60 p-8 text-center text-sm text-slate-400">
          Aucun site ne correspond à ce filtre.
        </div>
      )}
    </div>
  );
}
