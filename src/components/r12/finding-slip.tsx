import { useState } from "react";
import { CLASSES, type Severity } from "@/lib/r12/content";

export function FindingSlip() {
  const [index, setIndex] = useState(0);
  const item = CLASSES[index] ?? CLASSES[0];

  return (
    <article className="border border-rule bg-panel">
      <header className="flex items-center justify-between gap-3 border-b border-rule px-4 py-3 sm:px-5">
        <p className="font-mono text-xs tracking-widest text-muted uppercase">
          Educational · {item.id}
        </p>
        <p className="font-mono text-xs tracking-widest text-muted uppercase">
          {String(index + 1).padStart(2, "0")} / {String(CLASSES.length).padStart(2, "0")}
        </p>
      </header>
      <div className="px-4 py-6 sm:px-5">
        <div className="flex flex-wrap items-center gap-2">
          <Chip>{item.chain}</Chip>
          <Chip tone={item.severity === "Critical" ? "signal" : "ink"}>{item.severity}</Chip>
          <Chip>{item.surface}</Chip>
        </div>
        <h2 className="mt-4 font-serif text-3xl leading-tight">{item.title}</h2>
        <p className="mt-3 max-w-xl text-muted">{item.summary}</p>
        <p className="mt-5 border-l-2 border-signal pl-4 leading-relaxed">{item.proof}</p>
      </div>
      <div className="flex border-t border-rule">
        <button
          type="button"
          className="h-12 flex-1 border-r border-rule text-sm hover:bg-bone"
          onClick={() => setIndex((i) => (i === 0 ? CLASSES.length - 1 : i - 1))}
        >
          Previous
        </button>
        <button
          type="button"
          className="h-12 flex-1 text-sm hover:bg-bone"
          onClick={() => setIndex((i) => (i + 1) % CLASSES.length)}
        >
          Next class
        </button>
      </div>
    </article>
  );
}

export function severityTone(severity: Severity): "signal" | "ink" | "muted" {
  if (severity === "Critical" || severity === "High") return "signal";
  return "muted";
}

export function Chip({
  children,
  tone = "muted",
}: {
  children: React.ReactNode;
  tone?: "signal" | "ink" | "muted";
}) {
  const toneClass =
    tone === "signal" ? "text-signal" : tone === "ink" ? "text-ink" : "text-muted";
  return (
    <span className={`border border-rule px-2 py-1 font-mono text-[11px] tracking-widest uppercase ${toneClass}`}>
      {children}
    </span>
  );
}
