import { createFileRoute } from "@tanstack/react-router";

import { CallBanner, FactsBand, IconRow, PageHead } from "../components/airone/blocks";
import { AGENCY, TEAM } from "../lib/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | AirOne" },
      {
        name: "description",
        content:
          "AirOne is a travel agency on North Michigan Avenue in Chicago, booking discounted last minute flights and stays across North America since 2016.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHead
        crumb="About"
        title="A desk, twelve floors above Michigan Avenue"
        lede={`AirOne has booked last minute travel out of Chicago since ${AGENCY.founded}. We are small on purpose: a handful of agents who know the routes, read the fare rules, and pick up the telephone.`}
      />

      <section className="bg-paper">
        <div className="mx-auto grid w-full max-w-[1400px] gap-12 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
          <div className="md:col-span-7">
            <img
              src="/assets/office-chicago.jpg"
              alt="The AirOne office in Chicago, looking out onto the city"
              loading="lazy"
              decoding="async"
              className="w-full"
            />
          </div>
          <div className="flex flex-col justify-center md:col-span-5">
            <h2 className="max-w-[16ch] text-3xl font-semibold leading-[1.05] tracking-tighter md:text-4xl">
              Why a telephone still beats a search box
            </h2>
            <p className="mt-6 max-w-[46ch] text-[15px] leading-relaxed text-ink-soft">
              A results page shows you what its cache had a moment ago. Inside twenty one
              days that is not the same thing as what is bookable. An agent watching live
              inventory can see a seat open, hold it under your name, and tell you what it
              will actually cost once the bag and the seat assignment are on it.
            </p>
            <p className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-ink-soft">
              That is the whole business. No membership, no booking fee, and no fare
              quoted that we have not checked ourselves.
            </p>
            <div className="mt-10 max-w-[300px]">
              <div className="ao-route-rule" />
              <div className="mt-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
                <span>Est. {AGENCY.founded}</span>
                <span>{AGENCY.city}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper-deep">
        <div className="mx-auto grid w-full max-w-[1400px] gap-12 px-5 py-20 md:grid-cols-12 md:px-8 md:py-24">
          <div className="flex flex-col justify-center md:col-span-5">
            <h2 className="max-w-[14ch] text-3xl font-semibold leading-[1.05] tracking-tighter md:text-4xl">
              What the desk covers
            </h2>
            <div className="mt-8">
              <IconRow icon="plane" title="North America, gate to gate">
                The United States, Canada, Mexico and the Caribbean, on scheduled
                carriers out of every major hub. We do not sell long haul we cannot
                service properly.
              </IconRow>
              <IconRow icon="ticket" title="Ticketed through our partners">
                Inventory is searched and ticketed across the platforms listed on the
                home page. AirOne is paid by them, which is why there is no fee on your
                side.
              </IconRow>
              <IconRow icon="pin" title="One office, one time zone">
                Everyone works from the Chicago room. When you call back, the person who
                quoted you is the person who answers.
              </IconRow>
            </div>
          </div>
          <div className="md:col-span-7">
            <img
              src="/assets/route-map.jpg"
              alt="A schematic map of AirOne routes across North America"
              loading="lazy"
              decoding="async"
              className="w-full border border-line"
            />
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto w-full max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
          <h2 className="max-w-[16ch] text-3xl font-semibold leading-[1.05] tracking-tighter md:text-4xl">
            The people who answer
          </h2>

          <ul className="mt-14 grid gap-px bg-line sm:grid-cols-3">
            {TEAM.map((person) => (
              <li key={person.name} className="bg-paper p-7">
                <img
                  src={person.image}
                  alt={person.name}
                  loading="lazy"
                  decoding="async"
                  className="aspect-square w-full max-w-[220px] object-cover grayscale"
                />
                <h3 className="mt-7 text-xl font-semibold tracking-tight">{person.name}</h3>
                <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                  {person.role}
                </p>
                <p className="mt-4 max-w-[34ch] text-[14px] leading-relaxed text-ink-soft">
                  {person.note}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FactsBand />

      <CallBanner
        title="Talk to the desk before you book."
        body="It costs nothing to ask, and it takes about four minutes to know whether we can beat what you are looking at."
      />
    </>
  );
}
