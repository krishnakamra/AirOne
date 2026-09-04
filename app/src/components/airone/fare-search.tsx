import { AGENCY } from "../../lib/site-data";
import { SearchSubmit } from "./cta";

/**
 * The search instrument. A real GET form that posts to /flights, so it works
 * with script disabled and the resulting page is linkable. Labels sit above
 * their inputs; the whole panel is one hairline ruled block with no radius,
 * which is the boarding pass language the rest of the site runs on.
 */
export function FareSearch({
  variant = "hero",
  defaultTo = "",
}: {
  variant?: "hero" | "page";
  defaultTo?: string;
}) {
  const onHero = variant === "hero";

  return (
    <form
      method="get"
      action="/flights"
      className={`w-full border ${
        onHero ? "border-transparent bg-paper shadow-[0_1px_0_0_rgba(14,26,36,0.08)]" : "border-line bg-paper"
      }`}
    >
      <div className="flex flex-col lg:flex-row">
        <Field
          label="From"
          name="from"
          defaultValue={AGENCY.hub}
          placeholder="City or airport"
          className="lg:flex-1"
        />
        <Field
          label="To"
          name="to"
          defaultValue={defaultTo}
          placeholder="Anywhere in North America"
          className="lg:flex-[1.3]"
        />
        <Field label="Depart" name="depart" type="date" className="lg:w-[168px]" />
        <Field label="Return" name="return" type="date" className="lg:w-[168px]" />

        <div className="flex flex-col gap-1.5 border-b border-line px-5 py-4 lg:w-[132px] lg:border-b-0 lg:border-r">
          <label
            htmlFor="ao-travellers"
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft"
          >
            Travelers
          </label>
          <select
            id="ao-travellers"
            name="travelers"
            defaultValue="1"
            className="w-full appearance-none bg-transparent text-[15px] font-medium tracking-tight text-ink outline-none"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "traveler" : "travelers"}
              </option>
            ))}
          </select>
        </div>

        <SearchSubmit />
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  defaultValue,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}) {
  const id = `ao-${name}`;
  return (
    <div
      className={`flex flex-col gap-1.5 border-b border-line px-5 py-4 lg:border-b-0 lg:border-r ${className}`}
    >
      <label
        htmlFor={id}
        className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full bg-transparent text-[15px] font-medium tracking-tight text-ink outline-none placeholder:text-ink-soft/70"
      />
    </div>
  );
}
