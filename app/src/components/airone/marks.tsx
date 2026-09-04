/**
 * The AirOne mark: one ultramarine field carrying a climbing flight path that
 * terminates in a filled waypoint node. It is the journey spine reduced to its
 * smallest possible statement, and it reappears as the route rule across the
 * site.
 */
export function AirOneMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <rect width="32" height="32" fill="var(--color-accent)" />
      <path d="M7 24 L21 10" stroke="var(--color-paper)" strokeWidth="2.5" fill="none" />
      <circle cx="22.5" cy="8.5" r="3.5" fill="var(--color-paper)" />
      <path d="M7 24 L12.5 24" stroke="var(--color-paper)" strokeWidth="2.5" fill="none" opacity="0.55" />
    </svg>
  );
}

export function AirOneLockup({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <AirOneMark className="h-7 w-7 shrink-0" />
      <span className="text-[19px] font-semibold leading-none tracking-tight">AirOne</span>
    </span>
  );
}

/** The short arrow that ends every route in the fare board. */
export function RouteArrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 8" className={className} aria-hidden="true" focusable="false">
      <path d="M0 4 H21" stroke="currentColor" strokeWidth="1.25" fill="none" />
      <path d="M18 1 L22 4 L18 7" stroke="currentColor" strokeWidth="1.25" fill="none" />
    </svg>
  );
}
