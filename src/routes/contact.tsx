import { LINKS } from "@/lib/r12/site";
import { createFileRoute } from "@tanstack/react-router";
import { ScopeForm } from "@/components/r12/scope-form";
import { Shell } from "@/components/r12/shell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | R12 Labs" },
      {
        name: "description",
        content:
          "Contact R12 Labs about formal verification or security review.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <Shell>
      <section className="mx-auto max-w-6xl px-5 pt-14 pb-12 sm:px-8">
        <p className="text-sm font-medium text-signal">Contact</p>
        <h1 className="mt-4 max-w-4xl text-5xl leading-[1.02] sm:text-6xl">Contact R12 Labs.</h1>
        <p className="mt-5 max-w-xl text-lg text-muted">Tell us what you need verified or reviewed.</p>
        <a href={LINKS.calendly} target="_blank" rel="noreferrer" className="mt-6 inline-flex h-12 items-center border border-ink px-5 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-on-signal">
          Or book a 30 min call
        </a>
      </section>
      <section className="border-y border-rule bg-panel">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
          <ScopeForm />
        </div>
      </section>
    </Shell>
  );
}
