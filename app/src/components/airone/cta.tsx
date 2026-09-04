/**
 * Bespoke chrome. Every call to action on this site is its own component with
 * its own interaction identity: there is deliberately no shared button class,
 * because a page of identical pills is what a template looks like.
 */
import type { ReactNode } from "react";
import { RouteArrow } from "./marks";

/** CTA 1. The search instrument submit: a solid ultramarine block that presses. */
export function SearchSubmit({ label = "Find fares" }: { label?: string }) {
  return (
    <button
      type="submit"
      className="group flex h-full w-full flex-col items-center justify-center gap-1 bg-accent px-8 py-4 text-paper transition-colors duration-200 hover:bg-accent-deep active:translate-y-px lg:w-auto"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/70">
        Search
      </span>
      <span className="text-[15px] font-semibold leading-none tracking-tight">{label}</span>
    </button>
  );
}

/** CTA 2. Fare rows: an inline link whose underline draws in and whose route arrow extends. */
export function HoldFareLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      className="group/hold inline-flex items-center gap-2 text-[13px] font-medium text-ink transition-colors duration-200 hover:text-accent"
    >
      <span className="relative">
        Hold this fare
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-[width] duration-300 ease-out group-hover/hold:w-full" />
      </span>
      <RouteArrow className="h-2 w-4 transition-transform duration-300 ease-out group-hover/hold:translate-x-1" />
    </a>
  );
}

/** CTA 4. Stays: a hairline frame that floods with ink and inverts its label. */
export function StayLink({
  href,
  label = "See stay",
  tone = "ink",
}: {
  href: string;
  label?: string;
  tone?: "ink" | "paper";
}) {
  const onPaper = tone === "paper";
  return (
    <a
      href={href}
      className={`group/stay relative inline-flex items-center overflow-hidden border px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] ${
        onPaper ? "border-paper text-paper" : "border-ink text-ink"
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 -translate-y-full transition-transform duration-300 ease-out group-hover/stay:translate-y-0 ${
          onPaper ? "bg-paper" : "bg-ink"
        }`}
      />
      <span
        className={`relative transition-colors duration-300 ${
          onPaper ? "group-hover/stay:text-ink" : "group-hover/stay:text-paper"
        }`}
      >
        {label}
      </span>
    </a>
  );
}

/**
 * CTA 5. The desk telephone number is itself the call to action: no pill, just
 * the number at display size with a rule that draws in beneath it. Used in the
 * closing banner and, at small size, in the header. One label per intent.
 */
export function CallTheDesk({
  phone,
  href,
  tone = "onAccent",
  size = "lg",
}: {
  phone: string;
  href: string;
  tone?: "onAccent" | "onPaper";
  size?: "lg" | "sm";
}) {
  const onAccent = tone === "onAccent";
  return (
    <a href={href} className="group/call inline-flex flex-col items-start gap-2">
      <span
        className={`font-mono uppercase tracking-[0.22em] ${
          size === "lg" ? "text-[11px]" : "text-[10px]"
        } ${onAccent ? "text-paper/70" : "text-ink-soft"}`}
      >
        Call the desk
      </span>
      <span
        className={`font-mono font-medium leading-none tracking-tight ${
          size === "lg" ? "text-3xl md:text-5xl" : "text-[15px]"
        } ${onAccent ? "text-paper" : "text-ink"}`}
      >
        {phone}
      </span>
      <span
        aria-hidden="true"
        className={`h-px w-0 transition-[width] duration-500 ease-out group-hover/call:w-full ${
          onAccent ? "bg-paper" : "bg-accent"
        }`}
      />
    </a>
  );
}

/** CTA 6. Contact submit: a full width ink block with its own mono state line. */
export function SendRequestSubmit({
  state,
}: {
  state: "idle" | "sending" | "sent" | "error";
}) {
  const stateLine: Record<typeof state, string> = {
    idle: "The desk replies within one hour",
    sending: "Sending your request",
    sent: "Request received. The desk will call you back.",
    error: "That did not send. Try again, or call the desk.",
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        type="submit"
        disabled={state === "sending"}
        className="w-full bg-ink px-6 py-4 text-[14px] font-semibold tracking-tight text-paper transition-colors duration-200 hover:bg-accent active:translate-y-px disabled:cursor-not-allowed disabled:bg-ink-soft"
      >
        {state === "sent" ? "Request sent" : "Send request"}
      </button>
      <p
        className={`font-mono text-[11px] tracking-tight ${
          state === "error" ? "text-accent" : "text-ink-soft"
        }`}
        role="status"
      >
        {stateLine[state]}
      </p>
    </div>
  );
}

/** Shared section scaffolding. Not a CTA: a heading rhythm used page wide. */
export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "left",
  tone = "onPaper",
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  tone?: "onPaper" | "onInk";
  children?: ReactNode;
}) {
  const onInk = tone === "onInk";
  return (
    <div
      className={`flex flex-col gap-4 ${align === "center" ? "items-center text-center" : "items-start"}`}
    >
      {eyebrow ? (
        <span
          className={`font-mono text-[11px] uppercase tracking-[0.24em] ${
            onInk ? "text-paper/60" : "text-accent"
          }`}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={`max-w-[18ch] text-3xl font-semibold leading-[1.05] tracking-tighter md:text-5xl ${
          onInk ? "text-paper" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className={`max-w-[52ch] text-[15px] leading-relaxed ${
            onInk ? "text-paper/70" : "text-ink-soft"
          }`}
        >
          {lede}
        </p>
      ) : null}
      {children}
    </div>
  );
}
