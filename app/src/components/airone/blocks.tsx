import type { ReactNode } from "react";
import { AGENCY, DESK_FACTS, DESK_STEPS } from "../../lib/site-data";
import { CallTheDesk } from "./cta";

/**
 * The generated icon set. One sheet, one 2px stroke, one optical grid, keyed
 * out of its chroma ground so the glyphs composite onto any surface here.
 */
export type IconName =
  | "plane"
  | "calendar"
  | "suitcase"
  | "phone"
  | "bed"
  | "shield"
  | "clock"
  | "pin"
  | "ticket";

export function AoIcon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  return (
    <img
      src={`/assets/icon-${name}.png`}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
}

/** Section 6. Three process steps as hairline ruled rows, no cards, no boxed icons. */
export function DeskSteps() {
  return (
    <section className="bg-paper-deep">
      <div className="mx-auto w-full max-w-[1100px] px-5 py-20 md:px-8 md:py-28">
        <h2 className="ao-rise mx-auto max-w-[16ch] text-center text-3xl font-semibold leading-[1.05] tracking-tighter text-ink md:text-5xl">
          How the desk works
        </h2>

        <div className="mt-14 border-t border-line">
          {DESK_STEPS.map((step, i) => (
            <div
              key={step.n}
              className={`ao-rise ao-d${i + 1} grid grid-cols-1 gap-4 border-b border-line py-9 md:grid-cols-12 md:items-baseline md:gap-8`}
            >
              <span className="font-mono text-2xl font-medium leading-none tracking-tight text-accent md:col-span-2">
                {step.n}
              </span>
              <h3 className="text-xl font-semibold tracking-tight text-ink md:col-span-4">
                {step.title}
              </h3>
              <p className="max-w-[52ch] text-[15px] leading-relaxed text-ink-soft md:col-span-6">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Section 7. The one inverted band on the page. Desk policy, not social proof. */
export function FactsBand() {
  return (
    <section className="bg-ink">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-16 md:px-8 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {DESK_FACTS.map((fact, i) => (
            <div
              key={fact.label}
              className={`flex flex-col gap-3 py-6 md:py-0 ${
                i > 0 ? "md:border-l md:border-paper/15 md:pl-8" : ""
              } ${i % 2 === 1 ? "border-l border-paper/15 pl-6 md:pl-8" : ""}`}
            >
              <span className="font-mono text-4xl font-medium leading-none tracking-tight text-paper md:text-5xl">
                {fact.value}
              </span>
              <span className="h-px w-8 bg-accent" />
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper/60">
                {fact.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Section 8. The closing banner: one ultramarine field, the number is the CTA. */
export function CallBanner({
  title = "Tell us the window. We will find the seat.",
  body = "The desk is open around the clock. Call it, or send the dates and we will call you.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-accent">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-20 text-center md:px-8 md:py-28">
        <h2 className="ao-rise mx-auto max-w-[20ch] text-3xl font-semibold leading-[1.05] tracking-tighter text-paper md:text-5xl">
          {title}
        </h2>
        <p className="ao-rise ao-d1 mx-auto mt-5 max-w-[54ch] text-[15px] leading-relaxed text-paper/75">
          {body}
        </p>

        <div className="ao-rise ao-d2 mt-12 flex flex-col items-center gap-8">
          <CallTheDesk phone={AGENCY.phone} href={AGENCY.phoneHref} tone="onAccent" size="lg" />
          <a
            href={`mailto:${AGENCY.email}`}
            className="font-mono text-[13px] text-paper/75 underline-offset-4 transition-colors duration-200 hover:text-paper hover:underline"
          >
            {AGENCY.email}
          </a>
        </div>
      </div>
    </section>
  );
}

/** A hairline ruled fact row with one generated glyph. Used on interior pages. */
export function IconRow({
  icon,
  title,
  children,
}: {
  icon: IconName;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-5 border-b border-line py-7">
      <AoIcon name={icon} className="mt-0.5 h-7 w-7 shrink-0" />
      <div>
        <h3 className="text-[16px] font-semibold tracking-tight text-ink">{title}</h3>
        <p className="mt-2 max-w-[58ch] text-[14px] leading-relaxed text-ink-soft">{children}</p>
      </div>
    </div>
  );
}

/** Interior page header. Shared by the four secondary routes. */
export function PageHead({
  crumb,
  title,
  lede,
  children,
}: {
  crumb: string;
  title: string;
  lede: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-line bg-paper">
      <div className="mx-auto w-full max-w-[1400px] px-5 pb-14 pt-14 md:px-8 md:pb-16 md:pt-20">
        <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
          {crumb}
        </span>
        <h1 className="ao-rise mt-5 max-w-[15ch] text-4xl font-semibold leading-[1.02] tracking-tighter text-ink md:text-6xl">
          {title}
        </h1>
        <p className="ao-rise ao-d1 mt-6 max-w-[58ch] text-[16px] leading-relaxed text-ink-soft">
          {lede}
        </p>
        {children ? <div className="ao-rise ao-d2 mt-10">{children}</div> : null}
      </div>
    </section>
  );
}
