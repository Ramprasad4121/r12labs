import { createFileRoute } from "@tanstack/react-router";
import { ScopeForm } from "@/components/r12/scope-form";
import { Kicker, Shell } from "@/components/r12/shell";
import { PREP, QUESTIONS } from "@/lib/r12/content";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — R12 Labs" },
      {
        name: "description",
        content:
          "Discuss a formal verification, a security audit, or a research collaboration. This page does not send the brief.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <Shell page="Contact">
      <section className="mx-auto max-w-6xl px-5 pt-14 pb-8 sm:px-8">
        <Kicker index="06">Contact</Kicker>
        <h1 className="mt-4 max-w-3xl text-5xl leading-[1.05] sm:text-6xl">Discuss a verification project.</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Use this for a formal verification, a security audit, a research conversation, or a
          technical partnership. No public inbox is configured. Saving a brief keeps it in this
          browser. It is not delivered. Copy it, or open it in your own mail client and choose the
          recipient.
        </p>
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-12 sm:px-8">
        <ScopeForm />
      </section>
      <section className="border-t border-rule">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl">What happens next</h2>
            <ol className="mt-4 space-y-3 text-muted">
              <li>1. You send the brief. We do not receive it from this page.</li>
              <li>2. If the surface is in scope, we reply with what is in and what is out.</li>
              <li>3. The week range in the form is a planning hint, not a quote or a start date.</li>
            </ol>
            <p className="mt-6 text-sm text-muted">
              Confidentiality starts when a review is agreed, not when a draft sits in local
              storage. Do not paste exploits or keys into the brief.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-3xl">Have this ready</h2>
            <ul className="mt-4 border-t border-rule">
              {PREP.map((item) => (
                <li key={item} className="border-b border-rule py-3 text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="border-t border-rule bg-panel">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-8 md:grid-cols-[0.7fr_1.3fr]">
          <h2 className="font-serif text-3xl">We will ask these if the brief skips them.</h2>
          <ol className="border-t border-rule">
            {QUESTIONS.map((question, index) => (
              <li key={question} className="flex gap-4 border-b border-rule py-4">
                <span className="font-mono text-xs text-signal">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-xl">{question}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </Shell>
  );
}
