import { useEffect, useState } from "react";
import { planningRange } from "@/lib/r12/content";
import { briefText, loadScopes, saveScope, scopeSchema, type ScopeInput, type StoredScope } from "@/lib/r12/scopes";

const EMPTY: ScopeInput = {
  name: "",
  email: "",
  protocol: "",
  chain: "EVM",
  kind: "Formal verification",
  surface: "Contracts",
  stage: "Pre-launch",
  size: "1–5k",
  needed: "",
  invariants: "",
};

type FieldErrors = Partial<Record<keyof ScopeInput, string>>;

export function ScopeForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [saved, setSaved] = useState<StoredScope | null>(null);
  const [prior, setPrior] = useState<StoredScope[]>([]);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  useEffect(() => {
    setPrior(loadScopes());
  }, [saved]);

  const range = planningRange(values.size, values.surface);

  function update<K extends keyof ScopeInput>(key: K, value: ScopeInput[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const parsed = scopeSchema.safeParse(values);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !(key in next)) {
          next[key as keyof ScopeInput] = issue.message;
        }
      }
      setErrors(next);
      setSaved(null);
      return;
    }
    const row = saveScope(parsed.data);
    setSaved(row);
    setCopied(false);
    setValues(EMPTY);
  }

  async function copy(scope: StoredScope) {
    try {
      await navigator.clipboard.writeText(briefText(scope));
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
      <form className="border border-rule" onSubmit={onSubmit} noValidate>
        <div className="border-b border-rule px-4 py-3 font-mono text-xs tracking-widest text-muted uppercase sm:px-5">
          Scope brief — kept in this browser
        </div>
        <div className="grid gap-5 px-4 py-6 sm:px-5">
          <Field label="Name" error={errors.name}>
            <input
              className={inputClass}
              value={values.name}
              autoComplete="name"
              onChange={(e) => update("name", e.target.value)}
            />
          </Field>
          <Field label="Email" error={errors.email}>
            <input
              className={inputClass}
              type="email"
              value={values.email}
              autoComplete="email"
              onChange={(e) => update("email", e.target.value)}
            />
          </Field>
          <Field label="Protocol or repo" error={errors.protocol}>
            <input
              className={inputClass}
              value={values.protocol}
              onChange={(e) => update("protocol", e.target.value)}
            />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Select
              label="Engagement"
              value={values.kind}
              options={["Formal verification", "Security audit", "Research", "Not sure"] as const}
              onChange={(value) => update("kind", value)}
            />
            <Select
              label="Chain"
              value={values.chain}
              options={["EVM", "Solana", "Both", "Not sure"] as const}
              onChange={(value) => update("chain", value)}
            />
            <Select
              label="Stage"
              value={values.stage}
              options={["Design", "Pre-launch", "Live", "Incident"] as const}
              onChange={(value) => update("stage", value)}
            />
          </div>
          <Select
            label="Surface"
            value={values.surface}
            options={
              [
                "Contracts",
                "Solana program",
                "Upgrade diff",
                "Oracle and accounting",
                "Agent policy",
              ] as const
            }
            onChange={(value) => update("surface", value)}
          />
          <Select
            label="Approximate size"
            value={values.size}
            options={["Under 1k", "1–5k", "5–15k", "15k+", "Not sure"] as const}
            onChange={(value) => update("size", value)}
          />
          <Field label="When you need a first read" error={errors.needed}>
            <input
              className={inputClass}
              value={values.needed}
              placeholder="A date, or ‘before the upgrade’"
              onChange={(e) => update("needed", e.target.value)}
            />
          </Field>
          <Field label="What must not break" error={errors.invariants}>
            <textarea
              className="min-h-28 w-full resize-y border border-rule bg-bone px-3 py-3 font-serif text-ink outline-none focus:border-ink"
              value={values.invariants}
              onChange={(e) => update("invariants", e.target.value)}
            />
          </Field>
          <p className="border-l-2 border-signal pl-4 text-muted">{range}</p>
          <button
            type="submit"
            className="h-12 bg-signal text-sm font-medium text-on-signal"
          >
            Save brief
          </button>
          <p className="text-sm text-muted">
            Saving does not send this brief. It stays in this browser until you copy it or open it
            in your own mail client.
          </p>
        </div>
        {saved ? (
          <div className="border-t border-rule bg-panel px-4 py-5 sm:px-5" role="status">
            <p className="font-mono text-xs tracking-widest text-signal uppercase">
              Brief {saved.id} · not sent
            </p>
            <p className="mt-2 font-serif text-2xl">Saved on this device only.</p>
            <p className="mt-2 text-muted">
              {saved.protocol} · {saved.chain} · {saved.surface}. This page did not deliver it.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="h-11 border border-rule px-4 text-sm"
                onClick={() => copy(saved)}
              >
                {copied ? "Copied" : "Copy brief"}
              </button>
              <a
                className="inline-flex h-11 items-center justify-center bg-signal px-4 text-sm font-medium text-on-signal"
                href={`mailto:?subject=${encodeURIComponent(`R12 Labs scope brief ${saved.id}`)}&body=${encodeURIComponent(briefText(saved))}`}
              >
                Open in your mail client
              </a>
            </div>
            {copyError ? (
              <p className="mt-3 text-sm text-signal">
                Clipboard was blocked. Use the mail link, or select the brief from a saved draft.
              </p>
            ) : null}
          </div>
        ) : null}
      </form>
      <aside>
        <p className="font-mono text-xs tracking-widest text-muted uppercase">Drafts on this device</p>
        {prior.length === 0 ? (
          <p className="mt-4 text-muted">None yet. A saved brief stays in local storage.</p>
        ) : (
          <ul className="mt-4 border-t border-rule">
            {prior.map((row) => (
              <li key={row.id} className="border-b border-rule py-4">
                <p className="font-mono text-xs tracking-widest text-signal">{row.id}</p>
                <p className="mt-1 font-serif text-xl">{row.protocol}</p>
                <p className="text-sm text-muted">
                  {row.chain} · {row.stage} · {row.size}
                </p>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  );
}

const inputClass =
  "h-12 w-full border border-rule bg-bone px-3 font-serif text-ink outline-none focus:border-ink";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] tracking-widest text-muted uppercase">{label}</span>
      <span className="mt-2 block">{children}</span>
      {error ? <span className="mt-1 block text-sm text-signal">{error}</span> : null}
    </label>
  );
}

function Select<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] tracking-widest text-muted uppercase">{label}</span>
      <select
        className={`${inputClass} mt-2`}
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
