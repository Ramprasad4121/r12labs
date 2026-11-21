import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { ProofGraph } from "@/components/r12/proof-graph";
import { Shell } from "@/components/r12/shell";
import { VerificationRun } from "@/components/r12/verification-run";
import type { RoutePath } from "@/lib/r12/nav";
import { LINKS, REPORTS } from "@/lib/r12/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "R12 Labs | Smart contract audits and formal verification" },
      {
        name: "description",
        content:
          "R12 Labs does smart contract audits and formal verification for EVM and Solana protocols. Public reports, clear evidence, and the properties that must not break.",
      },
    ],
  }),
  component: Home,
});

const SERVICES: { title: string; body: string; to: RoutePath }[] = [
  {
    title: "Formal verification",
    body: "Machine-checkable properties for protocol behavior, with assumptions and proof boundaries stated plainly.",
    to: "/formal-verification",
  },
  {
    title: "Security review",
    body: "Manual adversarial review for code paths and system boundaries a formal specification may not name.",
    to: "/services",
  },
  {
    title: "Verification strategy",
    body: "Engagement design for teams that need the right properties before critical code hardens.",
    to: "/methodology",
  },
];

const WORK = [
  {
    name: "TimbSwap",
    chain: "EVM · DeFi exchange, governance, vaults",
    body: "Governance and release vault review with a proof of concept for every finding.",
    result: "1 High, 2 Medium",
    href: REPORTS.timbswap,
    cta: "Read the report",
  },
  {
    name: "MetaLend",
    chain: "Solana · Lending and flash loans",
    body: "Lending protocol with cTokens, liquidations, and flash loans, plus a fix review.",
    result: "13 findings: 2 Critical, 9 High, 2 Medium",
    href: REPORTS.metalend,
    cta: "Read the report",
  },
  {
    name: "Anchor-Sentinel",
    chain: "Solana · Open-source tooling",
    body: "Static analyzer that flags common Anchor security mistakes before review starts.",
    result: "Open source",
    href: LINKS.sentinel,
    cta: "View on GitHub",
  },
];

const STEPS = [
  { title: "Scope", body: "Share the repo or commit. We agree what is in scope and which properties matter most." },
  { title: "Review and verify", body: "Manual review, fuzzing, and formal checks where they pay off. Findings come with a proof of concept." },
  { title: "Report and fix review", body: "A written report with severity and fixes, then a check of your patches before launch." },
];

function Home() {
  return (
    <Shell>
      <section className="mx-auto max-w-6xl px-5 pt-14 pb-16 sm:px-8 lg:pt-24 lg:pb-28">
        <div className="grid gap-12 lg:grid-cols-[1.06fr_0.94fr] lg:items-center">
          <div>
            <p className="text-sm font-medium text-signal">Smart contract audits and formal verification for EVM and Solana</p>
            <h1 className="mt-5 max-w-3xl text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">
              Protect the rules your protocol depends on.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted">
              R12 Labs audits and formally verifies the rules that move value in EVM and Solana protocols.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/contact" className="inline-flex h-12 items-center gap-2 bg-signal px-5 text-sm font-medium text-on-signal transition-colors hover:bg-ink">
                Discuss an engagement <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
              <a href={LINKS.calendly} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center border border-ink px-5 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-on-signal">
                Book a 30 min call
              </a>
              <Link to="/methodology" className="site-link inline-flex h-12 items-center text-sm text-ink">
                How we work
              </Link>
            </div>
          </div>

          <VerificationRun />
        </div>
      </section>

      <section className="border-y border-rule bg-panel">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:py-20">
          <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <p className="text-sm font-medium text-signal">What verification changes</p>
              <h2 className="mt-4 text-4xl leading-[1.04] sm:text-5xl">A property is not a promise until it can fail.</h2>
              <p className="mt-5 max-w-md text-muted">
                Tests search for examples. Verification checks a written rule across the modeled transitions.
              </p>
            </div>
            <ProofGraph />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-signal">Capabilities</p>
          <h2 className="mt-4 text-4xl sm:text-5xl">Security work with a clear standard of evidence.</h2>
        </div>
        <div className="mt-10 border-t border-rule">
          {SERVICES.map((service) => (
            <Link
              key={service.title}
              to={service.to}
              className="group grid gap-4 border-b border-rule py-6 sm:grid-cols-[0.75fr_1.25fr_auto] sm:items-center sm:gap-8"
            >
              <h3 className="font-serif text-2xl sm:text-3xl">{service.title}</h3>
              <p className="max-w-xl text-muted">{service.body}</p>
              <ArrowUpRight className="size-5 text-signal transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-signal">Selected work</p>
            <h2 className="mt-4 text-4xl sm:text-5xl">Public reports. Read what you would get.</h2>
          </div>
          <div className="mt-10 grid gap-px bg-rule md:grid-cols-3">
            {WORK.map((item) => (
              <a key={item.name} href={item.href} target="_blank" rel="noreferrer" className="group flex flex-col bg-bone p-6 transition-colors hover:bg-panel sm:p-8">
                <p className="text-sm text-muted">{item.chain}</p>
                <h3 className="mt-2 font-serif text-2xl">{item.name}</h3>
                <p className="mt-3 text-muted">{item.body}</p>
                <p className="mt-5 text-sm font-medium text-ink">{item.result}</p>
                <span className="mt-auto pt-6 text-sm text-signal">{item.cta}</span>
              </a>
            ))}
          </div>
          <a className="mt-6 inline-block text-sm text-signal" href={LINKS.reports} target="_blank" rel="noreferrer">All public reports on GitHub</a>
        </div>
      </section>

      <section className="border-t border-rule bg-panel">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:py-20">
          <div>
            <p className="text-sm font-medium text-signal">Who does the work</p>
            <h2 className="mt-4 text-4xl sm:text-5xl">Ramprasad Edigi</h2>
            <p className="mt-3 text-muted">Principal, R12 Labs</p>
          </div>
          <div>
            <ul className="space-y-3 text-lg">
              <li>Solana Foundation certified Security Researcher.</li>
              <li>8 security audits across EVM and Solana, reports public where clients allow.</li>
              <li>Built Anchor-Sentinel, an open-source static analyzer for Anchor programs.</li>
            </ul>
            <p className="mt-6 text-muted">You talk to the person reading your code, from scoping to the fix review.</p>
            <div className="mt-6 flex flex-wrap gap-5 text-sm">
              <a className="text-signal" href={LINKS.principal} target="_blank" rel="noreferrer">Principal site</a>
              <a className="text-signal" href={LINKS.github} target="_blank" rel="noreferrer">GitHub</a>
              <a className="text-signal" href={LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
          <p className="text-sm font-medium text-signal">How an engagement starts</p>
          <ol className="mt-8 grid gap-px bg-rule md:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title} className="bg-bone p-6 sm:p-8">
                <p className="font-serif text-3xl text-signal">0{i + 1}</p>
                <h3 className="mt-3 font-serif text-2xl">{step.title}</h3>
                <p className="mt-3 text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-rule bg-panel">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="text-sm font-medium text-signal">Partner</p>
          <p className="max-w-2xl text-muted">
            R12 Labs is partnered with{" "}
            <a className="text-signal" href="https://www.bevor.io" target="_blank" rel="noreferrer">
              Bevor
            </a>
            , the smart contract security workspace that keeps findings linked to the code across reviews.
          </p>
        </div>
      </section>

      <section className="border-t border-rule bg-ink text-on-signal">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:py-20">
          <div>
            <p className="text-sm font-medium text-on-signal/60">An engagement starts with precision.</p>
            <h2 className="mt-4 max-w-2xl text-4xl leading-tight sm:text-5xl">Bring the property that cannot be wrong.</h2>
          </div>
          <div>
            <Link to="/contact" className="inline-flex h-12 items-center bg-bone px-5 text-sm font-medium text-ink transition-colors hover:bg-panel">
              Start a conversation
            </Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}
