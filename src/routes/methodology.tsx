import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/r12/shell";

export const Route = createFileRoute("/methodology")({
  head: () => ({
    meta: [
      { title: "Methodology — R12 Labs" },
      {
        name: "description",
        content:
          "How an R12 Labs verification runs: architecture, properties, specification, model, check, counterexamples, and a stated limit.",
      },
    ],
  }),
  component: MethodologyPage,
});

const PHASES = [
  {
    title: "Architecture",
    body: "The protocol as it actually moves value: who calls, what is stored, and which external systems are trusted.",
  },
  {
    title: "Properties",
    body: "The few statements that matter. Solvency, authorization, accounting, and the transitions that must be impossible.",
  },
  {
    title: "Specification",
    body: "Those statements written tightly enough that a failure produces a trace. Vague goals do not verify.",
  },
  {
    title: "Model",
    body: "The behavior we will reason about, including what is abstracted. An abstraction that hides the bug is called out, not hidden.",
  },
  {
    title: "Check",
    body: "The property is proved or it fails. Tooling follows the property. We do not pick a tool and hope the question fits.",
  },
  {
    title: "Counterexamples",
    body: "A failed property comes back as a trace. We read it before anyone calls it a bug, a model error, or a spec error.",
  },
  {
    title: "Fix",
    body: "After the code or the spec changes, the same property is checked again. A green status from a different question does not count.",
  },
  {
    title: "Delivery",
    body: "Scope, specifications, results, traces, findings from any audit work in the same engagement, and the limits in writing.",
  },
];

const CLIENT = [
  "The verification scope and the code it covers.",
  "The formal specifications.",
  "Which properties held, and the assumptions around them.",
  "Counterexamples or failure traces, when a property does not hold.",
  "Security findings, if an audit is part of the same engagement.",
  "Recommendations, and an explicit list of limitations.",
];

function MethodologyPage() {
  const [active, setActive] = useState(0);
  const phase = PHASES[active] ?? PHASES[0];

  return (
    <Shell page="Method">
      <section className="mx-auto max-w-6xl px-5 pt-14 pb-8 sm:px-8">
        <p className="font-mono text-xs tracking-widest text-signal uppercase">Methodology</p>
        <h1 className="mt-4 max-w-3xl text-5xl leading-[1.05] sm:text-6xl">
          Specify the property. Then check it.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Architecture, property, model, result. The tool follows the question.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 pb-16 sm:px-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        <ol className="border-t border-rule">
          {PHASES.map((item, index) => {
            const on = index === active;
            return (
              <li key={item.title} className="border-b border-rule">
                <button
                  type="button"
                  className={`flex h-12 w-full items-center text-left ${on ? "text-ink" : "text-muted"}`}
                  aria-current={on ? "step" : undefined}
                  onClick={() => setActive(index)}
                >
                  <span>{item.title}</span>
                </button>
              </li>
            );
          })}
        </ol>
        <article className="border border-rule bg-panel p-6 sm:p-10">
          <p className="text-sm font-medium text-signal">Method</p>
          <h2 className="mt-3 text-4xl">{phase.title}</h2>
          <p className="mt-5 max-w-xl text-lg">{phase.body}</p>
          <div className="mt-8 flex gap-3">
            <button
              type="button"
              className="h-11 border border-rule px-4 text-sm disabled:opacity-40"
              disabled={active === 0}
              onClick={() => setActive((n) => Math.max(0, n - 1))}
            >
              Back
            </button>
            <button
              type="button"
              className="h-11 bg-signal px-4 text-sm font-medium text-on-signal disabled:opacity-40"
              disabled={active === PHASES.length - 1}
              onClick={() => setActive((n) => Math.min(PHASES.length - 1, n + 1))}
            >
              Next
            </button>
          </div>
        </article>
      </section>

      <section className="border-t border-rule">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-8 md:grid-cols-2">
          <h2 className="text-3xl">What the engagement returns.</h2>
          <ul className="border-t border-rule">
            {CLIENT.map((item) => (
              <li key={item} className="border-b border-rule py-3 text-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="mx-auto max-w-6xl px-5 pb-14 sm:px-8">
          <p className="max-w-2xl text-muted">
            Results apply only to the specified properties, stated assumptions, and model.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex h-12 items-center bg-signal px-5 text-sm font-medium text-on-signal"
          >
            Discuss a verification project
          </Link>
        </div>
      </section>
    </Shell>
  );
}
