type CesarPortalLogoProps = {
  variant?: "header" | "compact";
};

function PortalIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-9 w-9 shrink-0"
      fill="none"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="24" cy="24" r="15" stroke="#0ea5e9" strokeWidth="2.5" />
      <path
        d="M28.5 17.5C26.8 16.3 24.8 15.8 22.7 16.2C18.9 17 16.4 20.2 16.4 24C16.4 27.8 19 31 22.8 31.8C25 32.2 27 31.7 28.7 30.4"
        stroke="#e5f3ff"
        strokeLinecap="round"
        strokeWidth="5"
      />
      <path
        d="M25.5 24H31.5"
        stroke="#22d3ee"
        strokeLinecap="round"
        strokeWidth="5"
      />
      <circle cx="24" cy="8" r="2.7" fill="#22d3ee" />
      <circle cx="24" cy="40" r="2.7" fill="#2563eb" />
      <circle cx="8" cy="24" r="2.7" fill="#22d3ee" />
      <circle cx="40" cy="24" r="2.7" fill="#2563eb" />
      <path d="M24 11V15" stroke="#38bdf8" strokeLinecap="round" strokeWidth="2" />
      <path d="M24 33V37" stroke="#2563eb" strokeLinecap="round" strokeWidth="2" />
      <path d="M11 24H15" stroke="#38bdf8" strokeLinecap="round" strokeWidth="2" />
      <path d="M33 24H37" stroke="#2563eb" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

export function CesarPortalLogo({ variant = "header" }: CesarPortalLogoProps) {
  const isCompact = variant === "compact";

  return (
    <div className="flex items-center gap-3">
      <div className="grid h-11 w-11 place-items-center rounded-2xl border border-sky-400/35 bg-sky-950/20 shadow-[0_0_24px_rgba(14,165,233,0.14)]">
        <PortalIcon />
      </div>

      <div className="leading-none">
        <p className={isCompact ? "text-lg font-semibold tracking-tight text-white" : "text-xl font-semibold tracking-tight text-white"}>
          Cesar<span className="text-sky-400">Portal</span>
        </p>
        <p className="mt-1 text-xs text-slate-400">Portail central de vos sites</p>
      </div>
    </div>
  );
}
