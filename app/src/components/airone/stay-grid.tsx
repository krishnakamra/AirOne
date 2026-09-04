import type { Stay } from "../../lib/site-data";
import { StayLink } from "./cta";

/**
 * Gapless bento. One dominant plate carries the lead stay, three smaller plates
 * carry the rest, and the eighth cell is a solid ultramarine block rather than a
 * filler tile: every cell is a content item.
 */
export function StayBento({ stays }: { stays: Stay[] }) {
  const [lead, ...rest] = stays;
  if (!lead) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-2">
      <StayCell stay={lead} className="lg:col-span-2 lg:row-span-2" lead />
      {rest.map((stay) => (
        <StayCell key={stay.id} stay={stay} />
      ))}

      <div className="flex flex-col justify-between gap-8 bg-accent p-7 lg:p-8">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/70">
            Everywhere else
          </span>
          <p className="mt-4 text-xl font-semibold leading-tight tracking-tight text-paper">
            Rooms, lodges and apartments in nineteen North American cities.
          </p>
        </div>
        <a
          href="/stays"
          className="group/all inline-flex items-center gap-2 self-start text-[13px] font-semibold text-paper"
        >
          <span className="relative">
            See all stays
            <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-paper transition-transform duration-300 ease-out group-hover/all:scale-x-100" />
          </span>
          <svg viewBox="0 0 24 8" className="h-2 w-5 transition-transform duration-300 group-hover/all:translate-x-1" aria-hidden="true">
            <path d="M0 4 H21 M18 1 L22 4 L18 7" stroke="currentColor" strokeWidth="1.25" fill="none" />
          </svg>
        </a>
      </div>
    </div>
  );
}

function StayCell({
  stay,
  className = "",
  lead = false,
}: {
  stay: Stay;
  className?: string;
  lead?: boolean;
}) {
  return (
    <article className={`group/cell relative overflow-hidden ${className}`}>
      <img
        src={stay.image}
        alt={`${stay.name}, ${stay.city}`}
        loading="lazy"
        decoding="async"
        className={`w-full object-cover transition-transform duration-700 ease-out group-hover/cell:scale-[1.03] ${
          lead ? "h-[380px] lg:h-full" : "h-[260px] lg:h-full"
        }`}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent"
      />

      <div className="absolute inset-x-0 bottom-0 p-6 lg:p-7">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/70">
          {stay.city}, {stay.region}
        </span>
        <h3
          className={`mt-2 font-semibold leading-tight tracking-tight text-paper ${
            lead ? "text-2xl lg:text-4xl" : "text-lg"
          }`}
        >
          {stay.name}
        </h3>
        {lead ? (
          <p className="mt-3 max-w-[40ch] text-[14px] leading-relaxed text-paper/75">
            {stay.blurb}
          </p>
        ) : null}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[12px] text-paper/85">
          <span>${stay.rate} a night</span>
          <span className="h-3 w-px bg-paper/30" />
          <span>{stay.kind}</span>
        </div>
        {lead ? (
          <div className="mt-6">
            <StayLink href={`/contact?stay=${stay.id}`} tone="paper" />
          </div>
        ) : null}
      </div>
    </article>
  );
}
