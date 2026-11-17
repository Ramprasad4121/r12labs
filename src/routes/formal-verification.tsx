import { Link, createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/r12/shell";

export const Route = createFileRoute("/formal-verification")({
  head: () => ({
    meta: [
      { title: "Formal verification — R12 Labs" },
      {
        name: "description",
        content:
          "Specification and property verification for Solidity and for Rust and Anchor programs. Proofs are limited to the model and the assumptions.",
      },
    ],
  }),
  component: VerificationPage,
});

const EVM = [
  "Solidity specifications for the functions that move value.",
  "State and protocol invariants.",
  "Arithmetic and accounting properties.",
  "Access-control and authorization properties.",
  "SMT-style checks where the property can be encoded and the model is honest about loops and calls.",
];

const SOLANA = [
  "Rust and Anchor properties across instructions, not a single handler in isolation.",
  "Account validation, ownership, and signer constraints.",
  "Authorization invariants.",
  "State-transition properties.",
  "Arithmetic and accounting, including decimals and rounding.",
];

const RECEIVE = [
  ["Scope", "The code, the properties, and what was left outside the model."],
  ["Specifications", "The properties as written, not as a slide."],
  ["Results", "Which properties held, and under which assumptions."],
  ["Counterexamples", "A trace when a property fails. Illustrative traces on this site are labeled as such."],
  ["Limits", "What the model does not cover. A proof is not a claim that the protocol is safe."],
];

function VerificationPage() {
  return (
    <Shell page="Verification">
      <section className="mx-auto max-w-6xl px-5 pt-14 pb-8 sm:px-8">
        <p className="font-mono text-xs tracking-widest text-signal uppercase">Primary service</p>
        <h1 className="mt-4 max-w-3xl text-5xl leading-[1.05] sm:text-6xl">
          Formal verification for EVM and Solana.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          We write the property, model the behavior that matters, and check it. The result is a
          proof or a counterexample. It is not a test run, and it is not an audit report with the
          word proof on the cover.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-px bg-rule px-5 pb-16 sm:px-8 md:grid-cols-2">
        <article className="bg-bone p-6 sm:p-8">
          <h2 className="text-3xl">EVM</h2>
          <ul className="mt-4 space-y-3 text-muted">
            {EVM.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="bg-panel p-6 sm:p-8">
          <h2 className="text-3xl">Solana</h2>
          <ul className="mt-4 space-y-3 text-muted">
            {SOLANA.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="border-y border-rule">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 className="text-3xl">What you receive</h2>
          <dl className="mt-8 border-t border-rule">
            {RECEIVE.map(([title, body]) => (
              <div key={title} className="grid gap-2 border-b border-rule py-4 md:grid-cols-[180px_1fr]">
                <dt className="font-medium">{title}</dt>
                <dd className="text-muted">{body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <h2 className="max-w-2xl text-3xl">What a proof is not.</h2>
        <div className="mt-6 max-w-2xl space-y-4 text-muted">
          <p>Testing shows behavior on the inputs you tried. It does not show the rest.</p>
          <p>Static analysis flags patterns. A flag is not a theorem.</p>
          <p>
            A manual audit can find an attack the specification never mentioned. That is why audits
            stay in the practice. They answer a different question.
          </p>
          <p>
            Verification proves the properties that were written, in the model that was built,
            under the assumptions that were stated. Change the code or the assumptions and the
            result does not travel with you.
          </p>
        </div>
        <Link
          to="/contact"
          className="mt-8 inline-flex h-12 items-center bg-signal px-5 text-sm font-medium text-on-signal"
        >
          Discuss a verification project
        </Link>
      </section>
    </Shell>
  );
}
