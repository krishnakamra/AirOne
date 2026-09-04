import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { CallBanner, IconRow, PageHead } from "../components/airone/blocks";
import { StayLink } from "../components/airone/cta";
import { DESTINATIONS, STAYS, STAY_CITIES } from "../lib/site-data";

export const Route = createFileRoute("/stays")({
  head: () => ({
    meta: [
      { title: "Stays | AirOne" },
      {
        name: "description",
        content:
          "Hotels, lodges and apartments booked by the AirOne desk across North America, held on the same 48 hour clock as your flight.",
      },
    ],
  }),
  component: Stays,
});

function Stays() {
  const [city, setCity] = useState<string>(STAY_CITIES[0]);
  const shown = city === STAY_CITIES[0] ? STAYS : STAYS.filter((s) => s.city === city);

  return (
    <>
      <PageHead
        crumb="Stays"
        title="Rooms held on the same clock"
        lede="The desk books the room as well as the seat. Every property here is one we have put people into, priced per night before tax, and held for forty eight hours alongside the fare."
      />

      <section className="bg-paper">
        <div className="mx-auto w-full max-w-[1400px] px-5 py-16 md:px-8 md:py-20">
          <div className="flex flex-wrap items-center gap-3">
            {STAY_CITIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCity(c)}
                aria-pressed={city === c}
                className={`border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-200 ${
                  city === c
                    ? "border-accent bg-accent text-paper"
                    : "border-line bg-paper text-ink-soft hover:border-ink hover:text-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-14 flex flex-col">
            {shown.map((stay, i) => (
              <article
                key={stay.id}
                className="grid gap-8 border-t border-line py-12 md:grid-cols-12 md:gap-12"
              >
                <div className={`md:col-span-6 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                  <img
                    src={stay.image}
                    alt={`${stay.name}, ${stay.city}`}
                    loading="lazy"
                    decoding="async"
                    className="h-[300px] w-full object-cover md:h-[380px]"
                  />
                </div>

                <div
                  className={`flex flex-col justify-center md:col-span-5 ${
                    i % 2 === 1 ? "md:order-1 md:col-start-2" : "md:col-start-8"
                  }`}
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                    {stay.city}, {stay.region}
                  </span>
                  <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tighter md:text-4xl">
                    {stay.name}
                  </h2>
                  <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-ink-soft">
                    {stay.blurb}
                  </p>

                  <dl className="mt-8 grid grid-cols-2 gap-y-5 border-t border-line pt-6">
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                        Nightly rate
                      </dt>
                      <dd className="mt-1.5 font-mono text-xl tracking-tight text-ink">
                        ${stay.rate}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                        Property type
                      </dt>
                      <dd className="mt-1.5 font-mono text-[14px] tracking-tight text-ink">
                        {stay.kind}
                      </dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                        Booking terms
                      </dt>
                      <dd className="mt-1.5 font-mono text-[14px] tracking-tight text-ink">
                        {stay.nights}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-8">
                    <StayLink href={`/contact?stay=${stay.id}`} label="Ask the desk" />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {shown.length === 0 ? (
            <p className="border border-line px-8 py-16 text-[15px] leading-relaxed text-ink-soft">
              Nothing listed in that city this week. The desk books far more than it
              lists, so call and we will search it properly.
            </p>
          ) : null}
        </div>
      </section>

      <section className="bg-paper-deep">
        <div className="mx-auto w-full max-w-[1400px] px-5 py-20 md:px-8 md:py-24">
          <h2 className="max-w-[18ch] text-3xl font-semibold leading-[1.05] tracking-tighter md:text-4xl">
            Where the desk books rooms
          </h2>
          <p className="mt-5 max-w-[54ch] text-[15px] leading-relaxed text-ink-soft">
            Nineteen cities across the United States, Canada, Mexico and the Caribbean.
            These six are the ones people ask for most.
          </p>

          <ul className="mt-12 grid grid-cols-2 gap-px bg-line md:grid-cols-3">
            {DESTINATIONS.map((place) => (
              <li key={place.code} className="group/city relative overflow-hidden bg-paper">
                <img
                  src={place.image}
                  alt={`${place.city}, ${place.region}`}
                  loading="lazy"
                  decoding="async"
                  className="h-[240px] w-full object-cover transition-transform duration-700 ease-out group-hover/city:scale-[1.04] md:h-[300px]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent"
                />
                <span className="absolute inset-x-0 bottom-0 p-5">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-paper/70">
                    {place.code}
                  </span>
                  <span className="mt-1.5 block text-lg font-semibold tracking-tight text-paper">
                    {place.city}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid w-full max-w-[1000px] gap-10 px-5 py-20 md:grid-cols-2 md:px-8 md:py-24">
          <h2 className="text-3xl font-semibold leading-[1.05] tracking-tighter md:text-4xl">
            How stays are booked
          </h2>
          <div>
            <IconRow icon="bed" title="Rooms, lodges and whole apartments">
              The desk books hotel rooms, lodges and self contained apartments, and will
              tell you plainly which one suits the trip rather than defaulting to
              whichever pays best.
            </IconRow>
            <IconRow icon="clock" title="Held beside the flight">
              A stay quoted with a fare sits on the same forty eight hour hold, so you
              are never holding one half of a trip.
            </IconRow>
          </div>
        </div>
      </section>

      <CallBanner
        title="Booking a room and a seat together?"
        body="Tell the desk both and it will hold them on one clock, under one reference."
      />
    </>
  );
}
