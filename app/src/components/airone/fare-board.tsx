import type { Fare } from "../../lib/site-data";
import { HoldFareLink } from "./cta";
import { RouteArrow } from "./marks";

/**
 * The fare board. Full width data rows divided by hairlines, no cards: this is
 * the departure board the whole brand is built on, and the mono column is what
 * makes it read as inventory rather than marketing.
 */
export function FareBoard({ fares }: { fares: Fare[] }) {
  return (
    <div className="w-full">
      <div className="hidden grid-cols-12 gap-4 border-b border-ink pb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft lg:grid">
        <span className="col-span-4">Route</span>
        <span className="col-span-2">Departs</span>
        <span className="col-span-2">Duration</span>
        <span className="col-span-2">Seats left</span>
        <span className="col-span-2 text-right">One way from</span>
      </div>

      <ul className="divide-y divide-line border-b border-line">
        {fares.map((fare) => (
          <li key={fare.id}>
            <div className="grid grid-cols-2 items-center gap-x-4 gap-y-4 py-6 transition-colors duration-200 hover:bg-paper-deep/60 lg:grid-cols-12 lg:gap-4">
              <div className="col-span-2 lg:col-span-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xl font-medium tracking-tight text-ink">
                    {fare.from}
                  </span>
                  <RouteArrow className="h-2 w-5 text-accent" />
                  <span className="font-mono text-xl font-medium tracking-tight text-ink">
                    {fare.to}
                  </span>
                </div>
                <p className="mt-1.5 text-[13px] text-ink-soft">
                  {fare.fromCity} to {fare.toCity}
                </p>
              </div>

              <Cell label="Departs" value={fare.depart} />
              <Cell label="Duration" value={`${fare.duration}, ${fare.stops}`} />
              <Cell
                label="Seats left"
                value={`${fare.seats} left`}
                emphasis={fare.seats <= 4}
              />

              <div className="col-span-2 flex items-end justify-between gap-4 lg:col-span-2 lg:flex-col lg:items-end">
                <span className="font-mono text-2xl font-medium leading-none tracking-tight text-ink">
                  ${fare.price}
                </span>
                <HoldFareLink href={`/contact?fare=${fare.id}`} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Cell({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div className="lg:col-span-2">
      <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft lg:hidden">
        {label}
      </span>
      <span
        className={`font-mono text-[13px] tracking-tight ${
          emphasis ? "text-accent" : "text-ink-soft"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
