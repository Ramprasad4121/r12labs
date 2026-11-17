import { Link, createFileRoute } from "@tanstack/react-router";
import { ProofGraph } from "@/components/r12/proof-graph";
import { Shell } from "@/components/r12/shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "R12 Labs — Security through proof" },
      {
        name: "description",
        content:
          "Formal verification and security engineering for EVM and Solana. Security audits when the question is adversarial, not a proof.",
      },
    ],
  }),
  component: Home,
});

const VERIFY = [
  ["Invariants", "Balances, solvency, and conservation across every modeled transition."],
  ["Authorization", "Who may move funds, upgrade, or change a parameter."],
  ["Accounting", "Shares, rates, decimals, and rounding, as properties rather than examples."],
  ["State transitions", "Which moves are legal, and which must be unreachable."],
];

const CHAINS = [
  {
    name: "EVM",
    body: "Solidity specifications. Function properties. Arithmetic. Access control. SMT-style workflows where the property and the model support them.",
  },
  {
    name: "Solana",
    body: "Rust and Anchor properties. Account ownership, signer intent, and state transitions across instructions. Same standard of assumption and result.",
  },
];

const STEPS = [
  ["01", "Properties", "Name what must hold before anyone picks a tool."],
  ["02", "Specification", "Write it so a failed check is a trace, not a vibe."],
  ["03", "Verification", "Prove the property, or return the counterexample."],
  ["04", "Limits", "State the model, the assumptions, and what was not proved."],
];

function Home() {
  return (
    <Shell page="Home">
      <section className="mx-auto grid max-w-6xl items-start gap-12 px-5 pt-14 pb-16 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:pt-20">
        <div>
          <p className="font-mono text-xs tracking-widest text-signal uppercase">
            Formal verification · EVM · Solana
          </p>
          <h1 className="mt-4 max-w-xl text-5xl leading-[1.02] sm:text-6xl">Security through proof.</h1>
          <p className="mt-5 max-w-xl text-lg text-muted">
            We help blockchain teams verify critical system properties and strengthen protocol
            security through formal verification and rigorous security engineering.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex h-12 items-center justify-center bg-signal px-5 text-sm font-medium text-on-signal"
            >
              Discuss a verification project
            </Link>
            <Link
              to="/methodology"
              className="inline-flex h-12 items-center justify-center border border-rule px-5 text-sm"
            >
              Explore our methodology
            </Link>
          </div>
        </div>
        <ProofGraph />
      </section>

      <section className="border-y border-rule" aria-label="What we verify">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 className="text-3xl">What we verify</h2>
          <dl className="mt-8 grid gap-px bg-rule sm:grid-cols-2">
            {VERIFY.map(([title, body]) => (
              <div key={title} className="bg-bone p-6">
                <dt className="font-serif text-xl">{title}</dt>
                <dd className="mt-2 text-muted">{body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="font-mono text-xs tracking-widest text-signal uppercase">Primary work</p>
          <h2 className="mt-3 text-4xl">Formal verification, on both chains we take.</h2>
          <p className="mt-4 text-muted">
            An audit looks for bugs. Verification asks whether a stated property holds in the
            model. We do both. Verification is the center of the firm.
          </p>
          <Link to="/formal-verification" className="mt-6 inline-flex text-sm text-signal">
            How verification is scoped
          </Link>
        </div>
        <div className="grid gap-px bg-rule sm:grid-cols-2">
          {CHAINS.map((chain) => (
            <article key={chain.name} className="bg-panel p-6">
              <h3 className="font-mono text-xs tracking-widest text-signal uppercase">{chain.name}</h3>
              <p className="mt-3 text-muted">{chain.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-rule bg-panel">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-8 md:grid-cols-[1fr_1fr] md:items-center">
          <div>
            <p className="font-mono text-xs tracking-widest text-muted uppercase">Also in scope</p>
            <h2 className="mt-3 text-3xl">Security audits, when you need an adversary.</h2>
            <p className="mt-4 text-muted">
              Manual review, fuzzing, and static analysis sit next to verification. They are not a
              proof. A passing test suite is not a proof. We say which one you are buying.
            </p>
          </div>
          <div>
            <Link
              to="/services"
              className="inline-flex h-12 items-center border border-rule px-5 text-sm"
            >
              Services
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl">From a property to a result.</h2>
          <Link to="/methodology" className="text-sm text-signal">
            Full method
          </Link>
        </div>
        <ol className="mt-8 grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(([index, title, body]) => (
            <li key={index} className="bg-bone p-5">
              <p className="font-mono text-xs text-signal">{index}</p>
              <h3 className="mt-3 text-xl">{title}</h3>
              <p className="mt-2 text-sm text-muted">{body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-rule">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-16 sm:px-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <h2 className="max-w-xl text-4xl">A proof covers the properties you wrote down. Nothing else.</h2>
            <p className="mt-4 max-w-xl text-muted">
              Results are scoped to a model and a set of assumptions. If that is the engagement you
              want, start with the property that must not fail.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex h-12 w-fit items-center bg-signal px-5 text-sm font-medium text-on-signal"
          >
            Discuss a verification project
          </Link>
        </div>
      </section>
    </Shell>
  );
}
