import { createFileRoute } from "@tanstack/react-router";

import { StructuredData } from "../components/StructuredData";
import { CallBanner, DeskSteps, FactsBand } from "../components/airone/blocks";
import { SectionHead } from "../components/airone/cta";
import { DestinationRail } from "../components/airone/destination-rail";
import { FareBoard } from "../components/airone/fare-board";
import { FareSearch } from "../components/airone/fare-search";
import { PartnerStrip } from "../components/airone/partners";
import { StayBento } from "../components/airone/stay-grid";
import { AGENCY, DESTINATIONS, FARES, STAYS } from "../lib/site-data";

const AGENCY_JSONLD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: AGENCY.legalName,
  description: AGENCY.tagline,
  telephone: AGENCY.phone,
  email: AGENCY.email,
  areaServed: "North America",
  address: {
    "@type": "PostalAddress",
    streetAddress: AGENCY.street,
    addressLocality: AGENCY.city,
    addressRegion: AGENCY.region,
    postalCode: AGENCY.postal,
    addressCountry: "US",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
});

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <StructuredData json={AGENCY_JSONLD} />

      {/* 1. Hero. Full bleed image, text anchored bottom left, the search
          instrument docked across the seam below it. */}
      <section className="relative">
        <div className="relative min-h-[88dvh] w-full overflow-hidden">
          <img
            src="/assets/hero-wing.jpg"
            alt="The wing of an airliner above a North American coastline at sunrise"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-tr from-ink/90 via-ink/45 to-ink/5"
          />
          <div className="relative mx-auto flex min-h-[88dvh] w-full max-w-[1400px] flex-col justify-end px-5 pb-24 pt-24 md:px-8">
            <h1 className="ao-rise max-w-[13ch] text-5xl font-semibold leading-[0.98] tracking-tighter text-paper md:text-7xl">
              Last minute seats. Real prices.
            </h1>
            <p className="ao-rise ao-d1 mt-6 max-w-[46ch] text-[16px] leading-relaxed text-paper/80 md:text-[17px]">
              A Chicago travel desk holding discounted flights and stays across North
              America. A person answers the phone.
            </p>
          </div>
        </div>

        <div className="relative z-10 mx-auto -mt-12 w-full max-w-[1400px] px-5 md:px-8">
          <div className="ao-rise ao-d2">
            <FareSearch />
          </div>
        </div>
      </section>

      {/* 2. The platforms the desk searches. */}
      <section className="mx-auto w-full max-w-[1400px] px-5 pt-20 md:px-8 md:pt-24">
        <PartnerStrip />
      </section>

      {/* 3. The fare board. */}
      <section className="bg-paper">
        <div className="mx-auto w-full max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
          <div className="relative">
            {/* Second read: one narrow ultramarine side rail, placed once on the
                whole site, running the height of the board. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-10 top-0 hidden h-full w-px bg-accent xl:block"
            >
              <span className="absolute left-1/2 top-10 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.3em] text-accent [writing-mode:vertical-rl]">
                Live inventory, held 48 hours
              </span>
            </div>

            <div className="ao-rise flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <SectionHead
                eyebrow="Last minute"
                title="This week from Chicago"
                lede="Real seats the desk is holding right now, priced one way and quoted before tax. Call and we will put your name on one."
              />
              <a
                href="/flights"
                className="group/all shrink-0 self-start font-mono text-[12px] uppercase tracking-[0.18em] text-ink md:self-end"
              >
                <span className="relative">
                  All fares
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover/all:scale-x-100" />
                </span>
              </a>
            </div>

            <div className="ao-rise ao-d1 mt-12">
              <FareBoard fares={FARES.slice(0, 6)} />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Tier-1: the horizontal cinema rail. */}
      <DestinationRail destinations={DESTINATIONS} />

      {/* 5. Stays. */}
      <section className="bg-paper">
        <div className="mx-auto w-full max-w-[1400px] px-5 pt-20 md:px-8 md:pt-28">
          <div className="ao-rise md:pl-[16%]">
            <SectionHead
              eyebrow="Stays"
              title="Somewhere to land"
              lede="The desk books the room as well as the seat, and holds both on the same clock."
            />
          </div>
        </div>
        <div className="mt-12 md:mt-16">
          <StayBento stays={STAYS} />
        </div>
      </section>

      {/* 6, 7, 8. */}
      <DeskSteps />
      <FactsBand />
      <CallBanner />
    </>
  );
}
