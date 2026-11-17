import { createFileRoute } from "@tanstack/react-router";
import { Kicker, Shell } from "@/components/r12/shell";
import { LINKS } from "@/lib/r12/content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — R12 Labs" },
      {
        name: "description",
        content:
          "Who does the work at R12 Labs. Formal verification first. Credentials are listed only when approved.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <Shell page="About">
      <section className="mx-auto max-w-6xl px-5 pt-14 pb-8 sm:px-8">
        <Kicker>About</Kicker>
        <h1 className="mt-4 max-w-3xl text-5xl leading-[1.05] sm:text-6xl">
          A verification firm. Not an agency.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          R12 Labs verifies EVM and Solana systems. Formal verification is the center; security review covers what a proof was not asked.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-px bg-rule px-5 pb-16 sm:px-8 md:grid-cols-2">
        <article className="bg-bone p-6 sm:p-8">
          <h2 className="font-serif text-3xl">Who does the work</h2>
          <p className="mt-4 text-muted">
            Public work and code from the principal.
          </p>
          <div className="mt-6 flex flex-col items-start gap-3 text-sm">
            <a className="text-signal" href={LINKS.principal} target="_blank" rel="noreferrer">
              Principal site
            </a>
            <a className="text-signal" href={LINKS.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="text-signal" href={LINKS.sentinel} target="_blank" rel="noreferrer">
              Anchor-Sentinel
            </a>
            <a className="text-signal" href={LINKS.writing} target="_blank" rel="noreferrer">
              Public writing
            </a>
          </div>
        </article>
        <article className="bg-panel p-6 sm:p-8">
          <p className="text-sm font-medium text-signal">Working standard</p>
          <h2 className="mt-3 font-serif text-3xl">Precision before promotion.</h2>
          <ul className="mt-4 space-y-3 text-muted">
            <li>Credentials, engagement details, and client names appear only with explicit approval.</li>
            <li>Private findings and security-sensitive context are never treated as marketing material.</li>
            <li>Public statements are scoped to the evidence behind them.</li>
          </ul>
        </article>
      </section>
    </Shell>
  );
}
