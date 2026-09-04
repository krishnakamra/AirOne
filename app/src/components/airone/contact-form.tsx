import { useEffect, useState } from "react";
import { submitTravelRequest } from "../../lib/api/contact.functions";
import { SendRequestSubmit } from "./cta";

type FormState = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * The request form. Labels sit above their inputs and errors below them, never
 * a placeholder standing in for a label. A fare or stay reference arriving in
 * the query string is read after mount and carried through with the request.
 */
export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [reference, setReference] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("fare") ?? params.get("stay") ?? "";
    if (ref) setReference(ref);
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const found: Errors = {};
    if (!values.name || values.name.trim().length < 2) {
      found.name = "Tell us who we are calling back.";
    }
    if (!values.email || !EMAIL.test(values.email.trim())) {
      found.email = "Enter an email address the desk can reply to.";
    }
    if (!values.message || values.message.trim().length < 4) {
      found.message = "A line about the trip is enough to start.";
    }
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setState("sending");
    try {
      await submitTravelRequest({
        data: {
          name: values.name ?? "",
          email: values.email ?? "",
          phone: values.phone ?? "",
          travelers: values.travelers ?? "1",
          window: values.window ?? "",
          destination: values.destination ?? "",
          reference: values.reference ?? "",
          message: values.message ?? "",
        },
      });
      setState("sent");
      form.reset();
    } catch {
      setState("error");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-7">
      {reference ? (
        <p className="border border-accent bg-accent/5 px-4 py-3 font-mono text-[12px] tracking-tight text-accent">
          Attached to reference {reference}
        </p>
      ) : null}
      <input type="hidden" name="reference" value={reference} readOnly />

      <div className="grid gap-7 md:grid-cols-2">
        <Field label="Your name" name="name" autoComplete="name" error={errors.name} required />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          error={errors.email}
          required
        />
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" hint="Optional" />
        <SelectField label="Travelers" name="travelers" options={["1", "2", "3", "4", "5", "6 or more"]} />
        <Field label="Where to" name="destination" hint="A city, a region, or undecided" />
        <Field label="When" name="window" hint="Exact dates, or the window you can move inside" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="ao-message" className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
          What are you looking for
        </label>
        <textarea
          id="ao-message"
          name="message"
          rows={5}
          required
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "ao-message-error" : undefined}
          className="w-full resize-y border border-line bg-paper px-4 py-3 text-[15px] leading-relaxed text-ink outline-none transition-colors duration-200 focus:border-accent"
        />
        {errors.message ? (
          <p id="ao-message-error" className="font-mono text-[12px] text-accent">
            {errors.message}
          </p>
        ) : null}
      </div>

      <SendRequestSubmit state={state} />
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  hint,
  error,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  hint?: string;
  error?: string;
  required?: boolean;
}) {
  const id = `ao-${name}`;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
        {label}
        {hint ? <span className="ml-2 normal-case tracking-normal text-ink-soft/80">{hint}</span> : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="w-full border border-line bg-paper px-4 py-3 text-[15px] text-ink outline-none transition-colors duration-200 focus:border-accent"
      />
      {error ? (
        <p id={`${id}-error`} className="font-mono text-[12px] text-accent">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  const id = `ao-${name}`;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
        {label}
      </label>
      <select
        id={id}
        name={name}
        defaultValue={options[0]}
        className="w-full appearance-none border border-line bg-paper px-4 py-3 text-[15px] text-ink outline-none transition-colors duration-200 focus:border-accent"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
