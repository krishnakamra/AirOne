import { useEffect, useState } from "react";
import { AGENCY, NAV } from "../../lib/site-data";
import { AirOneLockup, AirOneMark } from "./marks";

/**
 * Site header. One line at desktop, 72px tall, hairline ruled. The telephone
 * number rides at the right because on this site the phone is the product.
 */
export function SiteHeader({ active }: { active: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[72px] w-full max-w-[1400px] items-center justify-between gap-8 px-5 md:px-8">
        <a href="/" className="shrink-0" aria-label={`${AGENCY.name} home`}>
          <AirOneLockup />
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.to}
              href={item.to}
              aria-current={active === item.to ? "page" : undefined}
              className={`relative py-1 text-[14px] font-medium tracking-tight transition-colors duration-200 hover:text-accent ${
                active === item.to ? "text-accent" : "text-ink"
              }`}
            >
              {item.label}
              {active === item.to ? (
                <span className="absolute -bottom-0.5 left-0 h-px w-full bg-accent" />
              ) : null}
            </a>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-5 lg:flex">
          <a
            href={AGENCY.phoneHref}
            className="group/hdr flex flex-col items-end gap-1"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
              Call the desk
            </span>
            <span className="font-mono text-[14px] font-medium leading-none text-ink">
              {AGENCY.phone}
            </span>
            <span className="h-px w-0 bg-accent transition-[width] duration-500 ease-out group-hover/hdr:w-full" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="ao-mobile-nav"
          className="flex h-10 w-10 items-center justify-center border border-line text-ink lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
            {open ? (
              <path d="M4 4 L16 16 M16 4 L4 16" stroke="currentColor" strokeWidth="1.5" />
            ) : (
              <path d="M2 5 H18 M2 10 H18 M2 15 H18" stroke="currentColor" strokeWidth="1.5" />
            )}
          </svg>
        </button>
      </div>

      <div
        id="ao-mobile-nav"
        hidden={!open}
        className="border-t border-line bg-paper lg:hidden"
      >
        <nav className="flex flex-col divide-y divide-line" aria-label="Primary mobile">
          {NAV.map((item) => (
            <a
              key={item.to}
              href={item.to}
              className="px-5 py-4 text-[15px] font-medium tracking-tight text-ink"
            >
              {item.label}
            </a>
          ))}
          <a
            href={AGENCY.phoneHref}
            className="flex items-center justify-between px-5 py-4"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
              Call the desk
            </span>
            <span className="font-mono text-[14px] font-medium text-accent">{AGENCY.phone}</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const year = 2026;

  return (
    <footer className="border-t border-line bg-paper-deep">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <AirOneLockup />
            <p className="mt-5 max-w-[34ch] text-[14px] leading-relaxed text-ink-soft">
              A travel desk in Chicago booking discounted last minute flights and stays
              across North America.
            </p>
            <div className="mt-8 max-w-[280px]">
              <div className="ao-route-rule" />
              <div className="mt-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
                <span>{AGENCY.hub}</span>
                <span>North America</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
              Pages
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {NAV.map((item) => (
                <li key={item.to}>
                  <a
                    href={item.to}
                    className="text-[14px] text-ink transition-colors duration-200 hover:text-accent"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
              The desk
            </h3>
            <address className="mt-5 flex flex-col gap-3 not-italic text-[14px] leading-relaxed text-ink">
              <span className="text-ink-soft">
                {AGENCY.street}
                <br />
                {AGENCY.city}, {AGENCY.region} {AGENCY.postal}
                <br />
                {AGENCY.country}
              </span>
              <a
                href={AGENCY.phoneHref}
                className="font-mono transition-colors duration-200 hover:text-accent"
              >
                {AGENCY.phone}
              </a>
              <a
                href={`mailto:${AGENCY.email}`}
                className="font-mono transition-colors duration-200 hover:text-accent"
              >
                {AGENCY.email}
              </a>
              <span className="font-mono text-[13px] text-ink-soft">
                Open {AGENCY.hours}
              </span>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-7 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[11px] tracking-tight text-ink-soft">
            {year} {AGENCY.legalName}. Fares and rates shown are USD and subject to
            availability at the time of ticketing.
          </p>
          <div className="flex items-center gap-3">
            <AirOneMark className="h-4 w-4" />
            <p className="font-mono text-[11px] tracking-tight text-ink-soft">
              Made by surgelabs.ca
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * Writes the js-motion flag onto <html> once React has mounted. Everything the
 * site animates is visible without it, so a no-script render and a headless
 * screenshot both show finished content.
 */
export function MotionFlag() {
  useEffect(() => {
    document.documentElement.classList.add("js-motion");
    return () => document.documentElement.classList.remove("js-motion");
  }, []);
  return null;
}
