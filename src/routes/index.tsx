import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { ProofGraph } from "@/components/r12/proof-graph";
import { Shell } from "@/components/r12/shell";
import type { RoutePath } from "@/lib/r12/nav";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "R12Labs — Formal verification for EVM and Solana" },
      {
        name: "description",
        content:
          "R12Labs is R12 Labs, a formal verification firm for EVM and Solana. We specify and check the protocol properties that must not break.",
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

function Home() {
  return (
    <Shell>
      <section className="mx-auto max-w-6xl px-5 pt-14 pb-16 sm:px-8 lg:pt-24 lg:pb-28">
        <div className="grid gap-12 lg:grid-cols-[1.06fr_0.94fr] lg:items-end">
          <div>
            <p className="text-sm font-medium text-signal">Formal verification for EVM and Solana</p>
            <h1 className="mt-5 max-w-3xl text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">
              Protect the rules your protocol depends on.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted">
              R12 Labs formalizes and verifies the rules that move value in EVM and Solana protocols.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/contact" className="inline-flex h-12 items-center gap-2 bg-signal px-5 text-sm font-medium text-on-signal transition-colors hover:bg-ink">
                Discuss an engagement <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
              <Link to="/methodology" className="site-link inline-flex h-12 items-center text-sm text-ink">
                How we work
              </Link>
            </div>
          </div>

          <figure className="relative overflow-hidden border border-rule bg-ink">
            <img
              src="/verification-lab.jpg"
              alt="A close view of an electronic circuit board"
              className="h-80 w-full object-cover opacity-70 grayscale sm:h-96"
            />
            <div className="hero-image-overlay absolute inset-0" />
            <figcaption className="absolute inset-x-0 bottom-0 p-6 text-on-signal sm:p-8">
              <p className="text-sm font-medium text-on-signal/65">A formal result is specific by design.</p>
              <p className="mt-3 max-w-md font-serif text-2xl leading-tight sm:text-3xl">
                It states the property, the model, and the conditions under which it holds.
              </p>
            </figcaption>
          </figure>
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
