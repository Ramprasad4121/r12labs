import { useMemo, useState } from "react";
import { CLASSES, type Chain, type Severity } from "@/lib/r12/content";
import { Chip, severityTone } from "./finding-slip";

const CHAINS: Array<Chain | "All"> = ["All", "EVM", "Solana", "Cross-chain", "Agents"];
const SEVERITIES: Array<Severity | "All"> = ["All", "Critical", "High", "Medium"];

export function ClassBrowser() {
  const [chain, setChain] = useState<Chain | "All">("All");
  const [severity, setSeverity] = useState<Severity | "All">("All");
  const [open, setOpen] = useState<string | null>(CLASSES[0]?.id ?? null);

  const rows = useMemo(
    () =>
      CLASSES.filter(
        (item) =>
          (chain === "All" || item.chain === chain) &&
          (severity === "All" || item.severity === severity),
      ),
    [chain, severity],
  );

  return (
    <div>
      <p className="mb-3 border border-rule bg-panel px-4 py-3 text-sm text-muted">
        Educational examples. Not client findings, and not a measure of systems reviewed.
      </p>
      <div className="flex flex-col gap-3 border border-rule p-3 sm:flex-row sm:items-center sm:justify-between">
        <FilterRow label="Chain" value={chain} options={CHAINS} onChange={setChain} />
        <FilterRow label="Severity" value={severity} options={SEVERITIES} onChange={setSeverity} />
      </div>
      <p className="mt-3 font-mono text-xs tracking-widest text-muted uppercase">
        {rows.length} {rows.length === 1 ? "class" : "classes"} on the bench
      </p>
      <ul className="mt-3 border-t border-rule">
        {rows.length === 0 ? (
          <li className="border-b border-rule py-10 text-muted">Nothing in this cut. Clear a filter.</li>
        ) : (
          rows.map((item) => {
            const expanded = open === item.id;
            return (
              <li key={item.id} className="border-b border-rule">
                <button
                  type="button"
                  className="flex w-full flex-col gap-3 px-1 py-4 text-left sm:flex-row sm:items-center sm:gap-6"
                  aria-expanded={expanded}
                  onClick={() => setOpen(expanded ? null : item.id)}
                >
                  <span className="w-14 shrink-0 font-mono text-xs tracking-widest text-muted">
                    {item.id}
                  </span>
                  <span className="flex-1 font-serif text-2xl leading-tight">{item.title}</span>
                  <span className="flex flex-wrap gap-2">
                    <Chip>{item.chain}</Chip>
                    <Chip tone={severityTone(item.severity)}>{item.severity}</Chip>
                  </span>
                </button>
                {expanded ? (
                  <div className="grid gap-5 px-1 pb-6 sm:grid-cols-2 sm:pl-20">
                    <Block label="Affected assumption">{item.assumption}</Block>
                    <Block label="Impact">{item.impact}</Block>
                    <Block label="Proof outline" accent>
                      {item.proof}
                    </Block>
                    <Block label="What we check">{item.check}</Block>
                    <div className="sm:col-span-2">
                      <Block label="Mitigation">{item.lesson}</Block>
                    </div>
                  </div>
                ) : null}
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

function Block({
  label,
  children,
  accent = false,
}: {
  label: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div>
      <p className={`font-mono text-xs tracking-widest uppercase ${accent ? "text-signal" : "text-muted"}`}>
        {label}
      </p>
      <p className="mt-2">{children}</p>
    </div>
  );
}

function FilterRow<T extends string>({
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
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-mono text-[11px] tracking-widest text-muted uppercase">{label}</span>
      {options.map((option) => {
        const active = option === value;
        return (
          <button
            key={option}
            type="button"
            className={`h-9 px-3 text-sm ${active ? "bg-signal text-on-signal" : "text-muted hover:text-ink"}`}
            aria-pressed={active}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
