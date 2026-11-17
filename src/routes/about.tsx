import { Link, createFileRoute } from "@tanstack/react-router";
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
        <Kicker index="05">About</Kicker>
        <h1 className="mt-4 max-w-3xl text-5xl leading-[1.05] sm:text-6xl">
          A verification firm. Not an agency.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          R12 Labs works on the properties of EVM and Solana systems. Formal verification is the
          center. Security audits answer the questions a proof was never asked. A person signs the
          result. A model can help search. It does not sign.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-px bg-rule px-5 pb-16 sm:px-8 md:grid-cols-2">
        <article className="bg-bone p-6 sm:p-8">
          <h2 className="font-serif text-3xl">Who does the work</h2>
          <p className="mt-4 text-muted">
            The principal’s public site and code are linked here because those pages already exist.
            Named reviewers, certifications, and a client list are not on this site.
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
          <p className="font-mono text-xs tracking-widest text-signal uppercase">Placeholder</p>
          <h2 className="mt-3 font-serif text-3xl">Not yet approved for this page</h2>
          <ul className="mt-4 space-y-3 text-muted">
            <li>A biography with credentials we are willing to stand behind in public.</li>
            <li>A responsible-disclosure inbox.</li>
            <li>Selected engagements. None are listed, because none are approved to name.</li>
          </ul>
          <p className="mt-6 text-sm text-muted">
            Empty on purpose. A missing line is not a claim.
          </p>
        </article>
      </section>

      <section className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 className="font-serif text-3xl">Responsible disclosure</h2>
          <p className="mt-4 max-w-2xl text-muted">
            Private findings stay with the team that commissioned the review. This site does not
            publish them, and it does not yet publish a disclosure address. Until that address is
            approved, do not send vulnerability reports through the scope form and expect a
            security response. The form is for scoping a review.
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
