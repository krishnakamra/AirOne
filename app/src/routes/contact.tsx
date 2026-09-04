import { createFileRoute } from "@tanstack/react-router";

import { CallBanner, IconRow, PageHead } from "../components/airone/blocks";
import { ContactForm } from "../components/airone/contact-form";
import { AGENCY } from "../lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | AirOne" },
      {
        name: "description",
        content:
          "Call the AirOne desk on +1 (942) 388-2017, email info@airone.ca, or send your dates and we will call you back. Open 24 hours from Chicago.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHead
        crumb="Contact"
        title="Send the dates. We will call you."
        lede="The fastest route is the telephone, and the desk is staffed around the clock. If it is easier to write it down, the form below reaches the same three people."
      />

      <section className="bg-paper">
        <div className="mx-auto grid w-full max-w-[1400px] gap-14 px-5 py-16 md:grid-cols-12 md:gap-16 md:px-8 md:py-24">
          <div className="md:col-span-4">
            <h2 className="text-2xl font-semibold leading-tight tracking-tighter">
              The desk
            </h2>

            <div className="mt-8 border-t border-line">
              <IconRow icon="phone" title="By telephone">
                <a
                  href={AGENCY.phoneHref}
                  className="font-mono text-ink transition-colors duration-200 hover:text-accent"
                >
                  {AGENCY.phone}
                </a>
                <br />
                The quickest way to get a fare held.
              </IconRow>
              <IconRow icon="clock" title="Opening hours">
                Open {AGENCY.hours}. Calls after 22:00 Central are answered by the
                overnight agent, who can quote and hold but not ticket.
              </IconRow>
              <IconRow icon="pin" title="The office">
                {AGENCY.street}
                <br />
                {AGENCY.city}, {AGENCY.region} {AGENCY.postal}
                <br />
                {AGENCY.country}
                <br />
                <a
                  href={`mailto:${AGENCY.email}`}
                  className="font-mono text-ink transition-colors duration-200 hover:text-accent"
                >
                  {AGENCY.email}
                </a>
              </IconRow>
            </div>

            <img
              src="/assets/office-chicago.jpg"
              alt="The AirOne office in Chicago"
              loading="lazy"
              decoding="async"
              className="mt-10 w-full"
            />
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <h2 className="text-2xl font-semibold leading-tight tracking-tighter">
              Send a request
            </h2>
            <p className="mt-3 max-w-[54ch] text-[15px] leading-relaxed text-ink-soft">
              Rough dates are fine. If you can move inside a window we will usually find
              you a better fare than a fixed date allows.
            </p>
            <div className="mt-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <CallBanner
        title="Prefer to just talk it through?"
        body="An agent can quote, hold and ticket a whole trip while you are on the line."
      />
    </>
  );
}
