import { createFileRoute } from "@tanstack/react-router";
import { ClassBrowser } from "@/components/r12/class-browser";
import { Shell } from "@/components/r12/shell";
import { LINKS } from "@/lib/r12/content";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research — R12 Labs" },
      {
        name: "description",
        content:
          "How R12 Labs talks about specifications, invariants, and counterexamples. Illustrative examples are marked. They are not client results.",
      },
    ],
  }),
  component: ResearchPage,
});

const CONCEPTS = [
  ["Specification", "The property, written so a checker can accept it or return a trace."],
  ["Invariant", "A statement that should hold at the points you claim, usually after every transition."],
  ["Assumption", "What the proof borrows and does not establish. Oracles, admin honesty, and bounded loops live here."],
  ["Counterexample", "A concrete trace that breaks the property. It can be a bug, a bad spec, or a model that was too loose."],
];

function ResearchPage() {
  return (
    <Shell page="Research">
      <section className="mx-auto max-w-6xl px-5 pt-14 pb-8 sm:px-8">
        <p className="font-mono text-xs tracking-widest text-signal uppercase">Research</p>
        <h1 className="mt-4 max-w-3xl text-5xl leading-[1.05] sm:text-6xl">
          The vocabulary, then the classes.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Educational examples, not client results.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 pb-12 sm:px-8 lg:grid-cols-2">
        <dl className="border-t border-rule">
          {CONCEPTS.map(([title, body]) => (
            <div key={title} className="border-b border-rule py-4">
              <dt className="font-medium">{title}</dt>
              <dd className="mt-1 text-muted">{body}</dd>
            </div>
          ))}
        </dl>
        <div className="border border-rule bg-panel p-5">
          <p className="font-mono text-xs tracking-widest text-signal uppercase">Illustrative spec</p>
          <pre className="mt-4 overflow-x-auto font-mono text-sm leading-relaxed text-ink">
            <code>{`property solvency:
  forall s in Reachable.
    assets(s) >= liabilities(s)

assumes
  oracle_fresh(s)
  admin_key_uncompromised`}</code>
          </pre>
          <p className="mt-4 text-sm text-muted">
            Illustrative specification. Not a protocol result.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
        <h2 className="text-3xl">Audit classes, for the work that is not a proof.</h2>
        <p className="mt-3 max-w-2xl text-muted">
          Examples of what a manual review looks for; not findings from a named system.
        </p>
        <div className="mt-8">
          <ClassBrowser />
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-3 px-5 py-12 text-sm sm:px-8">
          <a className="text-signal" href={LINKS.writing} target="_blank" rel="noreferrer">
            Public writing
          </a>
          <a className="text-signal" href={LINKS.sentinel} target="_blank" rel="noreferrer">
            Anchor-Sentinel
          </a>
        </div>
      </section>
    </Shell>
  );
}
