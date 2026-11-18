import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Kicker, Shell } from "@/components/r12/shell";
import { OFFERINGS } from "@/lib/r12/offerings";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — R12Labs" },
      {
        name: "description",
        content:
          "Formal verification is the primary service. Security audits cover manual review, fuzzing, and static analysis, and are not sold as proofs.",
      },
    ],
  }),
  component: ServicesPage,
});

const COMPARE = [
  ["Formal verification", "Does this property hold in the model?", "A proof or a counterexample, with assumptions."],
  ["Testing", "Did these inputs fail?", "Examples. Not a proof of the cases you skipped."],
  ["Static analysis", "Does this pattern appear?", "Alerts. Useful, and not a theorem."],
  ["Manual audit", "What can an attacker do in this code?", "Findings with a reproduction. Absence is not proved."],
];

function ServicesPage() {
  const [open, setOpen] = useState<string>(OFFERINGS[0].index);

  return (
    <Shell>
      <section className="mx-auto max-w-6xl px-5 pt-14 pb-8 sm:px-8">
        <Kicker>Services</Kicker>
        <h1 className="mt-4 max-w-3xl text-5xl leading-[1.05] sm:text-6xl">
          Verification first. Audits beside it.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Formal verification checks written properties. Security review looks for adversarial failure modes.
        </p>
        <Link to="/formal-verification" className="mt-6 inline-flex text-sm text-signal">
          Formal verification
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-12 sm:px-8">
        <div className="overflow-x-auto border border-rule">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-rule font-mono text-xs tracking-widest text-muted uppercase">
              <tr>
                <th className="px-4 py-3 font-medium">Work</th>
                <th className="px-4 py-3 font-medium">Question</th>
                <th className="px-4 py-3 font-medium">What it can return</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map(([work, question, result]) => (
                <tr key={work} className="border-b border-rule last:border-b-0">
                  <th className="px-4 py-4 font-medium text-ink">{work}</th>
                  <td className="px-4 py-4 text-muted">{question}</td>
                  <td className="px-4 py-4 text-muted">{result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
        <ul className="border-t border-rule">
          {OFFERINGS.map((item) => {
            const expanded = open === item.index;
            return (
              <li key={item.index} className="border-b border-rule">
                <button
                  type="button"
                  className="flex w-full items-start gap-4 py-5 text-left sm:items-center sm:gap-8"
                  aria-expanded={expanded}
                  onClick={() => setOpen(expanded ? "" : item.index)}
                >
                  <span className="flex-1 font-serif text-2xl sm:text-3xl">{item.title}</span>
                  <span className="text-sm text-muted">{expanded ? "Close" : "Open"}</span>
                </button>
                {expanded ? (
                  <div className="grid gap-6 pb-8 sm:grid-cols-3">
                    <p>{item.detail}</p>
                    <p>
                      <span className="font-mono text-[11px] tracking-widest text-muted uppercase">Fits when</span>
                      <span className="mt-2 block">{item.fits}</span>
                    </p>
                    <p>
                      <span className="font-mono text-[11px] tracking-widest text-muted uppercase">You leave with</span>
                      <span className="mt-2 block">{item.leave}</span>
                    </p>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-5 py-16 sm:px-8">
        <h2 className="text-4xl">Start with the property, or with the code.</h2>
        <Link
          to="/contact"
          className="inline-flex h-12 items-center bg-signal px-5 text-sm font-medium text-on-signal"
        >
          Discuss a verification project
        </Link>
      </section>
    </Shell>
  );
}
