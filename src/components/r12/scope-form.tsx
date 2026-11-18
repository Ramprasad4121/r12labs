import { cloneElement, useId, useState } from "react";
import { INQUIRY_EMAIL } from "@/lib/r12/site";
import { sendContactInquiry } from "@/lib/r12/contact";
import { CODE_STATES, ENGAGEMENTS, TIMEFRAMES } from "@/lib/r12/inquiry";

type Inquiry = {
  name: string;
  email: string;
  organization: string;
  engagement: (typeof ENGAGEMENTS)[number] | "";
  property: string;
  system: string;
  codeState: (typeof CODE_STATES)[number] | "";
  timing: (typeof TIMEFRAMES)[number] | "";
  website: string;
};

const EMPTY: Inquiry = {
  name: "",
  email: "",
  organization: "",
  engagement: "",
  property: "",
  system: "",
  codeState: "",
  timing: "",
  website: "",
};

type Errors = Partial<Record<keyof Inquiry, string>>;

export function ScopeForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  function update<T extends keyof Inquiry>(field: T, value: Inquiry[T]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (status === "error") setStatus("idle");
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = "Enter a valid work email.";
    if (!values.organization.trim()) next.organization = "Enter the company or protocol.";
    if (!values.property.trim()) next.property = "Describe the property or risk.";
    if (values.engagement === "") {
      next.engagement = "Choose one.";
      setErrors(next);
      return;
    }
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    setMessage("");
    try {
      const result = await sendContactInquiry({
        data: {
          ...values,
          engagement: values.engagement,
          codeState: values.codeState || undefined,
          timing: values.timing || undefined,
        },
      });
      if (result.ok) {
        setStatus("sent");
        return;
      }
      setStatus("error");
      setMessage(result.message);
    } catch {
      setStatus("error");
      setMessage("We could not send your enquiry. Please email the team directly.");
    }
  }

  if (status === "sent") {
    return (
      <div className="max-w-2xl border-t border-ink pt-6">
        <p className="text-sm font-medium text-signal">Enquiry sent</p>
        <h2 className="mt-3 text-3xl">We will reply by email.</h2>
        <button type="button" onClick={() => { setValues(EMPTY); setStatus("idle"); }} className="mt-7 site-link text-sm text-ink">
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="max-w-2xl">
      <div className="border-b border-rule pb-6">
        <p className="text-sm font-medium text-signal">Engagement enquiry</p>
        <p className="mt-3 text-muted">Do not include private keys, credentials, or unpublished vulnerability details.</p>
      </div>
      <div className="mt-7 grid gap-6 sm:grid-cols-2">
        <Field label="Your name" error={errors.name}>
          <input value={values.name} autoComplete="name" onChange={(event) => update("name", event.target.value)} />
        </Field>
        <Field label="Work email" error={errors.email}>
          <input type="email" value={values.email} autoComplete="email" onChange={(event) => update("email", event.target.value)} />
        </Field>
      </div>
      <div className="mt-6">
        <Field label="Company or protocol" error={errors.organization}>
          <input value={values.organization} onChange={(event) => update("organization", event.target.value)} />
        </Field>
      </div>
      <fieldset className="mt-7">
        <legend className="text-sm font-medium text-ink">Engagement</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {ENGAGEMENTS.map((engagement) => {
            const selected = values.engagement === engagement;
            return (
              <button key={engagement} type="button" aria-pressed={selected} onClick={() => update("engagement", engagement)} className={`min-h-10 border px-3 text-sm transition-colors ${selected ? "border-ink bg-ink text-on-signal" : "border-rule bg-bone text-ink hover:border-ink"}`}>
                {engagement}
              </button>
            );
          })}
        </div>
        {errors.engagement ? <p className="mt-2 text-sm text-signal">{errors.engagement}</p> : null}
      </fieldset>
      <div className="mt-7">
        <Field label="What must remain true?" error={errors.property}>
          <textarea rows={5} value={values.property} placeholder="For example: collateral remains solvent across an upgrade." onChange={(event) => update("property", event.target.value)} />
        </Field>
      </div>
      <div className="mt-6">
        <Field label="System and scope" optional>
          <input value={values.system} placeholder="Chain, component, release, or change set" onChange={(event) => update("system", event.target.value)} />
        </Field>
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <Field label="Code availability" optional>
          <select value={values.codeState} onChange={(event) => update("codeState", event.target.value as Inquiry["codeState"])}>
            <option value="">Select one</option>
            {CODE_STATES.map((state) => <option key={state}>{state}</option>)}
          </select>
        </Field>
        <Field label="Desired window" optional>
          <select value={values.timing} onChange={(event) => update("timing", event.target.value as Inquiry["timing"])}>
            <option value="">Select one</option>
            {TIMEFRAMES.map((timeframe) => <option key={timeframe}>{timeframe}</option>)}
          </select>
        </Field>
      </div>
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(event) => update("website", event.target.value)} />
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === "sending"} className="h-12 bg-signal px-5 text-sm font-medium text-on-signal transition-colors hover:bg-ink disabled:cursor-wait disabled:opacity-70">
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </button>
        {status === "error" ? <a href={`mailto:${INQUIRY_EMAIL}`} className="site-link text-sm text-ink">Email the team directly</a> : null}
      </div>
      {status === "error" ? <p className="mt-4 text-sm text-signal" role="alert">{message}</p> : null}
    </form>
  );
}

function Field({ label, optional = false, error, children }: { label: string; optional?: boolean; error?: string; children: React.ReactElement<{ id?: string; className?: string; "aria-invalid"?: boolean; "aria-describedby"?: string }> }) {
  const id = useId();
  const errorId = `${id}-error`;
  const control = cloneElement(children, {
    id,
    className: "w-full border-b border-rule bg-transparent py-3 text-base text-ink outline-none placeholder:text-muted focus:border-signal",
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
  });
  return <div><label htmlFor={id} className="text-sm font-medium text-ink">{label}{optional ? <span className="pl-1 text-muted">(optional)</span> : null}</label><div className="mt-1">{control}</div>{error ? <p id={errorId} className="mt-2 text-sm text-signal">{error}</p> : null}</div>;
}
