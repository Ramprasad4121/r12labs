import { useState } from "react";

const PROPERTIES = [
  {
    id: "solvency",
    name: "Solvency",
    spec: "assets ≥ liabilities",
    status: "holds" as const,
    trace: "Every modeled transition keeps the inequality. No violating state is reachable.",
  },
  {
    id: "auth",
    name: "Authorization",
    spec: "only admin changes parameters",
    status: "holds" as const,
    trace: "A non-admin call is rejected before state changes. The admin edge is the only writer.",
  },
  {
    id: "accounting",
    name: "Accounting",
    spec: "shares × rate = assets",
    status: "counterexample" as const,
    trace: "Illustrative trace, not a client finding: donate before the first deposit, then the next mint rounds to zero.",
  },
];

export function ProofGraph() {
  const [active, setActive] = useState(PROPERTIES[2].id);
  const property = PROPERTIES.find((item) => item.id === active) ?? PROPERTIES[0];
  const broken = property.status === "counterexample";

  return (
    <figure className="border border-rule bg-panel">
      <figcaption className="flex items-center justify-between gap-3 border-b border-rule px-4 py-3 sm:px-5">
        <span className="font-mono text-xs tracking-widest text-muted uppercase">Property check</span>
        <span className={`font-mono text-xs tracking-widest uppercase ${broken ? "text-signal" : "text-muted"}`}>
          {broken ? "Counterexample" : "Holds"}
        </span>
      </figcaption>
      <div className="px-3 py-4 sm:px-5">
        <svg viewBox="0 0 560 250" role="img" aria-labelledby="proof-title proof-desc" className="w-full">
          <title id="proof-title">State transitions checked against a property</title>
          <desc id="proof-desc">{property.spec}. {property.trace}</desc>
          <Edge x1={132} y1={70} x2={200} y2={70} />
          <Edge x1={292} y1={70} x2={360} y2={70} />
          <Edge x1={406} y1={108} x2={406} y2={156} hot={broken} />
          <Node x={40} y={40} label="Init" />
          <Node x={200} y={40} label="Funded" />
          <Node x={360} y={40} label="Active" hot />
          <Node x={360} y={156} label={broken ? "Violated" : "Settled"} hot={broken} warn={broken} />
          <text x={138} y={58} fill="#93a0b5" fontSize="11" fontFamily="IBM Plex Mono, ui-monospace, monospace">
            deposit
          </text>
          <text x={298} y={58} fill="#93a0b5" fontSize="11" fontFamily="IBM Plex Mono, ui-monospace, monospace">
            borrow
          </text>
          <text x={416} y={138} fill={broken ? "#3d7eff" : "#93a0b5"} fontSize="11" fontFamily="IBM Plex Mono, ui-monospace, monospace">
            {broken ? "break" : "repay"}
          </text>
        </svg>
        <div className="mt-2 flex flex-wrap gap-2" role="tablist" aria-label="Property">
          {PROPERTIES.map((item) => {
            const on = item.id === active;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={on}
                className={`h-9 px-3 text-sm ${on ? "bg-signal text-on-signal" : "text-muted"}`}
                onClick={() => setActive(item.id)}
              >
                {item.name}
              </button>
            );
          })}
        </div>
        <p className="mt-4 font-mono text-sm text-ink">{property.spec}</p>
        <p className="mt-2 text-sm text-muted">{property.trace}</p>
      </div>
    </figure>
  );
}

function Node({
  x,
  y,
  label,
  hot = false,
  warn = false,
}: {
  x: number;
  y: number;
  label: string;
  hot?: boolean;
  warn?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={80}
        height={60}
        fill="#05060a"
        stroke={warn ? "#3d7eff" : hot ? "#e7eef8" : "#1a2130"}
        strokeWidth={warn ? 1.5 : 1}
      />
      <text
        x={x + 40}
        y={y + 35}
        textAnchor="middle"
        fill={warn ? "#3d7eff" : "#e7eef8"}
        fontSize="13"
        fontFamily="IBM Plex Sans, sans-serif"
      >
        {label}
      </text>
    </g>
  );
}

function Edge({
  x1,
  y1,
  x2,
  y2,
  hot = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  hot?: boolean;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={hot ? "#3d7eff" : "#1a2130"}
      strokeWidth={hot ? 2 : 1.5}
    />
  );
}
