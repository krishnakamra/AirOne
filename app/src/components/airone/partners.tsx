import { PARTNERS } from "./partner-marks";

/**
 * The platforms the desk searches. Grayscale, one optical weight, no captions
 * under the marks. Three of these brands publish no open mark, so they run as
 * wordmarks at the same cap height rather than as invented glyphs.
 */
export function PartnerStrip() {
  return (
    <div className="border-y border-line py-10">
      <p className="text-center text-[13px] text-ink-soft">
        Every quote is searched across the platforms travelers already use
      </p>

      <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-7 md:gap-x-14">
        {PARTNERS.map((partner) => (
          <li key={partner.name} className="flex items-center gap-2.5">
            {partner.path ? (
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 shrink-0 fill-ink-soft"
                aria-hidden="true"
                focusable="false"
              >
                <path d={partner.path} />
              </svg>
            ) : null}
            <span className="text-[15px] font-semibold tracking-tight text-ink-soft">
              {partner.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
