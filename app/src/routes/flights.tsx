import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { AoIcon, CallBanner, IconRow, PageHead } from "../components/airone/blocks";
import { FareBoard } from "../components/airone/fare-board";
import { FareSearch } from "../components/airone/fare-search";
import { PartnerStrip } from "../components/airone/partners";
import { FARES, FARE_REGIONS, FLIGHT_FAQ } from "../lib/site-data";

export const Route = createFileRoute("/flights")({
  head: () => ({
    meta: [
      { title: "Flights | AirOne" },
      {
        name: "description",
        content:
          "Discounted last minute flights from AirOne across the United States, Canada, Mexico and the Caribbean. Fares held for 48 hours, no booking fee.",
      },
    ],
  }),
  component: Flights,
});

function Flights() {
  const [region, setRegion] = useState<string>("all");
  const shown = region === "all" ? FARES : FARES.filter((f) => f.region === region);

  return (
    <>
      <PageHead
        crumb="Flights"
        title="Fares inside twenty one days"
        lede="Carriers release unsold seats close to departure. The desk watches for them across our partner platforms, then calls you with what is actually bookable rather than what a results page hopes is still there."
      >
        <FareSearch variant="page" />
      </PageHead>

      <section className="bg-paper">
        <div className="mx-auto w-full max-w-[1400px] px-5 py-16 md:px-8 md:py-20">
          <div className="flex flex-wrap items-center gap-3">
            {FARE_REGIONS.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRegion(r.id)}
                aria-pressed={region === r.id}
                className={`border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-200 ${
                  region === r.id
                    ? "border-accent bg-accent text-paper"
                    : "border-line bg-paper text-ink-soft hover:border-ink hover:text-ink"
                }`}
              >
                {r.label}
              </button>
            ))}
            <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">
              {shown.length} {shown.length === 1 ? "fare" : "fares"}
            </span>
          </div>

          <div className="mt-12">
            {shown.length > 0 ? (
              <FareBoard fares={shown} />
            ) : (
              <div className="flex flex-col items-start gap-5 border border-line px-8 py-16">
                <AoIcon name="calendar" className="h-8 w-8" />
                <p className="max-w-[46ch] text-[15px] leading-relaxed text-ink-soft">
                  Nothing is on hold for that region this week. The desk can still find
                  something: tell us the dates and we will search it live.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="relative h-[46vh] min-h-[320px] w-full overflow-hidden">
          <img
            src="/assets/terminal-dawn.jpg"
            alt="An airport terminal window at dawn with an aircraft on stand beyond it"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-ink/55" />
          <div className="relative mx-auto flex h-full w-full max-w-[1400px] items-center px-5 md:px-8">
            <p className="max-w-[24ch] text-2xl font-semibold leading-tight tracking-tighter text-paper md:text-4xl">
              Every quote is read to you before anything is ticketed.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid w-full max-w-[1400px] gap-14 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
          <div className="md:col-span-5">
            <h2 className="max-w-[14ch] text-3xl font-semibold leading-[1.05] tracking-tighter md:text-4xl">
              What comes with the fare
            </h2>
            <img
              src="/assets/boarding-pass.jpg"
              alt="A boarding pass and passport on a desk"
              loading="lazy"
              decoding="async"
              className="mt-10 w-full border border-line"
            />
          </div>

          <div className="md:col-span-7">
            <IconRow icon="calendar" title="Departures inside twenty one days">
              That is the window where last minute inventory actually moves. Outside it,
              the desk will still quote you, but the saving is usually smaller and we
              will say so.
            </IconRow>
            <IconRow icon="suitcase" title="The baggage allowance, in writing">
              Every quote states the carry on and checked allowance for that specific
              ticket. If a bag is not included we price it before you confirm.
            </IconRow>
            <IconRow icon="shield" title="Fare rules read out loud">
              Change fees, cancellation terms and fare class are read to you before
              ticketing. Most discounted last minute fares are changeable for a
              difference and are not refundable.
            </IconRow>
            <IconRow icon="ticket" title="One itinerary, one email">
              Flights, seats and any stay you booked with them arrive as a single
              confirmation rather than four separate ones.
            </IconRow>
          </div>
        </div>
      </section>

      <section className="bg-paper-deep">
        <div className="mx-auto w-full max-w-[880px] px-5 py-20 md:px-8 md:py-28">
          <h2 className="text-3xl font-semibold leading-[1.05] tracking-tighter md:text-4xl">
            Questions the desk gets daily
          </h2>
          <div className="mt-10 border-t border-line">
            {FLIGHT_FAQ.map((item) => (
              <details key={item.q} className="group/faq border-b border-line py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[16px] font-semibold tracking-tight text-ink marker:hidden">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="relative h-3 w-3 shrink-0 text-accent"
                  >
                    <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-current" />
                    <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-current transition-transform duration-300 group-open/faq:scale-y-0" />
                  </span>
                </summary>
                <p className="mt-4 max-w-[68ch] text-[15px] leading-relaxed text-ink-soft">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-5 py-16 md:px-8">
        <PartnerStrip />
      </section>

      <CallBanner
        title="Give us the dates. We will work the fare."
        body="Tell the desk where you need to be and when, and an agent searches it live while you are on the line."
      />
    </>
  );
}
