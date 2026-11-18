export type Phase = {
  index: string;
  title: string;
  time: string;
  body: string;
};

export const PHASES: readonly Phase[] = [
  {
    index: "01",
    title: "Scope",
    time: "A few days",
    body: "Repos, deployed addresses, prior reviews, and the invariants in your words. What is out of scope is written down before anyone is surprised by an invoice or a missing file.",
  },
  {
    index: "02",
    title: "Threat model",
    time: "With the scope",
    body: "Who can call what, which accounts are trusted, and which failures are fatal. If we cannot name the attacker, we are not ready to read.",
  },
  {
    index: "03",
    title: "Manual review",
    time: "The bulk of the work",
    body: "Line by line, against the invariants. Tools search. They do not sign the report. A human does.",
  },
  {
    index: "04",
    title: "Adversarial checks",
    time: "Where a harness pays",
    body: "Foundry invariant tests, fuzzing, or a differential check when the bug is a property, not a typo. We do not bolt on a fuzzer to look thorough.",
  },
  {
    index: "05",
    title: "Proofs",
    time: "Before severity is assigned",
    body: "A High or Critical finding includes a way to trigger it. If we cannot build the proof, the finding is downgraded or dropped.",
  },
  {
    index: "06",
    title: "Report",
    time: "When the proofs are stable",
    body: "Findings, assumptions, what we did not review, and what we would re-open if the code moves. Written so an engineer can fix it without a call.",
  },
  {
    index: "07",
    title: "Fix check",
    time: "After your patch",
    body: "We re-run the original proof against the fix. “Addressed” is a claim we test, not a status typed into a spreadsheet.",
  },
];
