import { useEffect, useRef, useState } from "react";
import type { Destination } from "../../lib/site-data";

/**
 * The Tier-1 mechanic: a horizontal cinema rail. On a wide screen the section
 * pins and the visitor's vertical scroll drives the strip westward, so scrolling
 * literally becomes travelling across the continent, which is the site's spine.
 *
 * Everything degrades on purpose. Small screens and anyone who asks for reduced
 * motion get a native swipe rail with scroll snapping and no pin, and that same
 * rail is what renders on the server and before hydration, so first paint is
 * always a finished, readable section.
 */
export function DestinationRail({ destinations }: { destinations: Destination[] }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [pinned, setPinned] = useState(false);
  const [travel, setTravel] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => setPinned(wide.matches && !reduce.matches);
    decide();
    wide.addEventListener("change", decide);
    reduce.addEventListener("change", decide);
    return () => {
      wide.removeEventListener("change", decide);
      reduce.removeEventListener("change", decide);
    };
  }, []);

  useEffect(() => {
    if (!pinned) {
      setTravel(0);
      setProgress(0);
      return;
    }
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setTravel(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pinned, destinations.length]);

  useEffect(() => {
    if (!pinned || travel <= 0) return;
    let frame = 0;
    const read = () => {
      frame = 0;
      const el = sectionRef.current;
      if (!el) return;
      const span = el.offsetHeight - window.innerHeight;
      const passed = -el.getBoundingClientRect().top;
      setProgress(span <= 0 ? 0 : Math.min(1, Math.max(0, passed / span)));
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pinned, travel]);

  const active = pinned && travel > 0;

  return (
    <section
      ref={sectionRef}
      aria-label="Destinations across North America"
      style={active ? { height: `calc(100dvh + ${travel}px)` } : undefined}
      className="relative bg-paper"
    >
      <div className={active ? "sticky top-0 flex h-dvh flex-col overflow-hidden" : "flex flex-col"}>
        <div className="mx-auto flex w-full max-w-[1400px] shrink-0 items-end justify-between gap-6 px-5 py-10 md:px-8">
          <h2 className="max-w-[16ch] text-3xl font-semibold leading-[1.05] tracking-tighter text-ink md:text-5xl">
            Where we are sending people
          </h2>
          <p className="hidden max-w-[30ch] text-[14px] leading-relaxed text-ink-soft md:block">
            Six places the desk is holding seats for this month, from the home gate at
            Chicago outward.
          </p>
        </div>

        <div
          className={
            active
              ? "relative min-h-0 flex-1 overflow-hidden bg-ink"
              : "ao-swipe relative overflow-x-auto bg-ink"
          }
        >
          <div
            ref={trackRef}
            className="flex h-full will-change-transform"
            style={active ? { transform: `translate3d(${-progress * travel}px, 0, 0)` } : undefined}
          >
            {destinations.map((place) => (
              <RailPlate key={place.code} place={place} />
            ))}
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[1400px] shrink-0 items-center gap-5 px-5 py-6 md:px-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
            {active ? "Scroll" : "Swipe"}
          </span>
          <span className="relative h-px flex-1 bg-line">
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 bg-accent"
              style={{ width: `${(active ? progress : 0) * 100 || 6}%` }}
            />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
            {destinations.length} destinations
          </span>
        </div>
      </div>
    </section>
  );
}

function RailPlate({ place }: { place: Destination }) {
  return (
    <a
      href="/stays"
      className="group/plate relative block h-[62vh] w-[80vw] shrink-0 overflow-hidden sm:w-[58vw] lg:h-full lg:w-[42vw]"
    >
      <img
        src={place.image}
        alt={`${place.city}, ${place.region}`}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/plate:scale-[1.03]"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent"
      />

      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
        <span className="block">
          <span className="block font-mono text-[11px] uppercase tracking-[0.24em] text-paper/70">
            {place.code}
          </span>
          <span className="mt-2 block text-2xl font-semibold leading-tight tracking-tight text-paper md:text-3xl">
            {place.city}
          </span>
          <span className="mt-2 block max-w-[30ch] text-[13px] leading-relaxed text-paper/75">
            {place.note}
          </span>
          {place.from > 0 ? (
            <span className="mt-3 block font-mono text-[13px] text-paper">
              from ${place.from} one way
            </span>
          ) : (
            <span className="mt-3 block font-mono text-[13px] text-paper/80">
              the desk itself
            </span>
          )}
        </span>

        <span className="flex h-11 w-11 shrink-0 translate-x-3 items-center justify-center bg-accent opacity-0 transition-all duration-300 ease-out group-hover/plate:translate-x-0 group-hover/plate:opacity-100">
          <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
            <path d="M3 10 H15 M11 6 L16 10 L11 14" stroke="var(--color-paper)" strokeWidth="1.5" fill="none" />
          </svg>
        </span>
      </span>
    </a>
  );
}
