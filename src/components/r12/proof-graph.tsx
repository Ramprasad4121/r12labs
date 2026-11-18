import { useState } from "react";

type SketchNode = { label: string; x: number; y: number; bad?: boolean };
type SketchEdge = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
  lx: number;
  ly: number;
  hot?: boolean;
};

const BOX_W = 108;
const BOX_H = 52;

function placed(index: number, y: number) {
  return { x: 20 + index * 168, y };
}

function across(from: number, y: number, label: string, hot = false): SketchEdge {
  const x1 = placed(from, y).x + BOX_W;
  const x2 = placed(from + 1, y).x;
  const mid = y + BOX_H / 2;
  return { x1, y1: mid, x2, y2: mid, label, lx: x1 + 8, ly: mid - 10, hot };
}

function down(from: number, label: string, hot = false): SketchEdge {
  const top = placed(from, 36);
  const bottom = placed(from, 150);
  const x = top.x + BOX_W / 2;
  return {
    x1: x,
    y1: top.y + BOX_H,
    x2: x,
    y2: bottom.y,
    label,
    lx: x + 10,
    ly: top.y + BOX_H + 28,
    hot,
  };
}

const PROPERTIES = [
  {
    id: "solvency",
    name: "Solvency",
    spec: "assets ≥ liabilities",
    status: "holds" as const,
    trace:
      "Illustrative sketch, not a discharged proof. Deposit, borrow, and repay each keep assets at least equal to liabilities.",
    nodes: [
      { ...placed(0, 36), label: "Init" },
      { ...placed(1, 36), label: "Funded" },
      { ...placed(2, 36), label: "Active" },
      { ...placed(3, 36), label: "Settled" },
    ] satisfies SketchNode[],
    edges: [across(0, 36, "deposit"), across(1, 36, "borrow"), across(2, 36, "repay")],
  },
  {
    id: "auth",
    name: "Authorization",
    spec: "only admin writes parameters",
    status: "holds" as const,
    trace:
      "Illustrative sketch. The admin edge writes. The other-caller edge is rejected and does not change state.",
    nodes: [
      { ...placed(0, 36), label: "Idle" },
      { ...placed(1, 36), label: "Pending" },
      { ...placed(2, 36), label: "Written" },
      { ...placed(1, 150), label: "Rejected" },
    ] satisfies SketchNode[],
    edges: [across(0, 36, "propose"), across(1, 36, "admin"), down(1, "other")],
  },
  {
    id: "accounting",
    name: "Accounting",
    spec: "shares × rate = assets",
    status: "counterexample" as const,
    trace:
      "Illustrative trace, not a client finding. Mint 1 share into an empty vault, donate assets to inflate the rate, and the next deposit rounds down to zero shares.",
    nodes: [
      { ...placed(0, 36), label: "Empty" },
      { ...placed(1, 36), label: "Seeded" },
      { ...placed(2, 36), label: "Inflated" },
      { ...placed(2, 150), label: "Zero", bad: true },
    ] satisfies SketchNode[],
    edges: [across(0, 36, "mint 1"), across(1, 36, "donate"), down(2, "deposit", true)],
  },
];

export function ProofGraph() {
  const [active, setActive] = useState(PROPERTIES[0].id);
  const property = PROPERTIES.find((item) => item.id === active) ?? PROPERTIES[0];
  const broken = property.status === "counterexample";

  return (
    <figure className="border border-ink bg-ink text-on-signal">
      <figcaption className="flex items-center justify-between gap-3 border-b border-on-signal/20 px-4 py-3 sm:px-5">
        <span className="text-xs font-medium text-on-signal/65">Property explorer</span>
        <span className={`text-xs font-medium ${broken ? "text-on-signal" : "text-on-signal/65"}`}>
          {broken ? "Counterexample" : "Holds"}
        </span>
      </figcaption>
      <div className="px-3 py-4 sm:px-5">
        <svg viewBox="0 0 680 230" role="img" aria-labelledby="proof-title proof-desc" className="w-full">
          <title id="proof-title">Sketch of states checked against a property</title>
          <desc id="proof-desc">
            {property.spec}. {property.trace}
          </desc>
          {property.edges.map((edge) => (
            <Edge key={`${edge.label}-${edge.x1}`} {...edge} />
          ))}
          {property.nodes.map((node) => (
            <Node key={`${node.label}-${node.x}-${node.y}`} {...node} />
          ))}
        </svg>
        <div className="mt-2 flex flex-wrap gap-2">
          {PROPERTIES.map((item) => {
            const on = item.id === active;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={on}
                className={`h-9 px-3 text-sm ${on ? "bg-on-signal text-ink" : "text-on-signal/65 hover:text-on-signal"}`}
                onClick={() => setActive(item.id)}
              >
                {item.name}
              </button>
            );
          })}
        </div>
        <p className="mt-4 font-mono text-sm text-on-signal">{property.spec}</p>
        <p className="mt-2 text-sm text-on-signal/65">{property.trace}</p>
      </div>
    </figure>
  );
}

function Node({ x, y, label, bad = false }: SketchNode) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={BOX_W}
        height={BOX_H}
        fill="#05060a"
        stroke={bad ? "#3d7eff" : "#e7eef8"}
        strokeWidth={bad ? 1.5 : 1}
      />
      <text
        x={x + BOX_W / 2}
        y={y + 32}
        textAnchor="middle"
        fill={bad ? "#3d7eff" : "#e7eef8"}
        fontSize="14"
        fontFamily="IBM Plex Mono, ui-monospace, monospace"
      >
        {label}
      </text>
    </g>
  );
}

function Edge({ x1, y1, x2, y2, label, lx, ly, hot = false }: SketchEdge) {
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={hot ? "#3d7eff" : "#93a0b5"}
        strokeWidth={hot ? 2 : 1.5}
      />
      <text x={lx} y={ly} fill={hot ? "#3d7eff" : "#93a0b5"} fontSize="12" fontFamily="IBM Plex Mono, ui-monospace, monospace">
        {label}
      </text>
    </g>
  );
}
