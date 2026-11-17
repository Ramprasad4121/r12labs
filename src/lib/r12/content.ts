export type Chain = "EVM" | "Solana" | "Cross-chain" | "Agents";
export type Severity = "Critical" | "High" | "Medium";

export type BugClass = {
  id: string;
  title: string;
  chain: Chain;
  severity: Severity;
  surface: string;
  summary: string;
  assumption: string;
  impact: string;
  proof: string;
  check: string;
  lesson: string;
};

export const NAV = [
  { to: "/formal-verification", label: "Verification", exact: false },
  { to: "/services", label: "Services", exact: false },
  { to: "/methodology", label: "Method", exact: false },
  { to: "/research", label: "Research", exact: false },
  { to: "/about", label: "About", exact: false },
  { to: "/contact", label: "Contact", exact: false },
] as const;

export const RULES = [
  {
    index: "01",
    title: "Invariants before lines",
    body: "We write what must stay true — balances, authority, accounting — before we read for style. A pretty contract with a broken invariant is still broken.",
  },
  {
    index: "02",
    title: "A proof for every High",
    body: "Severity without a way to break it is an opinion. High and Critical findings ship with a reproduction, or they do not ship.",
  },
  {
    index: "03",
    title: "The review ends at the fix",
    body: "A PDF is not the end of the work. We re-read the patch against the original proof and say whether the break is gone.",
  },
] as const;

export const OFFERINGS = [
  {
    index: "01",
    title: "EVM and Solidity reviews",
    fits: "Contracts that will hold value, or already do, including proxies and upgrade diffs.",
    leave: "A report ordered by invariant, with proofs, and a fix-verification pass.",
    detail:
      "Manual review of Solidity against the properties you cannot afford to violate. Storage layout and initializer re-entry are in scope when the system upgrades. Fuzzing only where a property earns it.",
  },
  {
    index: "02",
    title: "Solana and Anchor reviews",
    fits: "Programs where accounts, PDAs, and CPIs are the attack surface.",
    leave: "Account-constraint findings with a transaction that demonstrates the break.",
    detail:
      "Signer checks, account substitution, PDA derivation, remaining accounts, and token-2022 extensions. The difference between an account that looks like an oracle and one that is.",
  },
  {
    index: "03",
    title: "DeFi protocol reviews",
    fits: "Lending, vaults, AMMs, and other systems where value moves through accounting.",
    leave: "A value-flow map and the reads that can be stale, substituted, or rounded against the protocol.",
    detail:
      "Share inflation, donation attacks, rounding direction, and the economic path an attacker actually takes. This is a code and accounting review, not a promise about market risk.",
  },
  {
    index: "04",
    title: "Oracle, bridge, and integration reviews",
    fits: "A price, a message, or a foreign contract sits on the trust boundary.",
    leave: "The specific check that was missing, and what the system should do when the read fails.",
    detail:
      "Heartbeat and min/max answers, domain separation, replay, and cross-chain messages that can be reordered. Offered when that boundary is actually in the repos under review.",
  },
  {
    index: "05",
    title: "Agent permissions and session keys",
    fits: "A wallet, session key, or agent that can spend, sign, or call on a person’s behalf.",
    leave: "A policy review: what it may touch, what happens when a feed is stale, and how a human revokes it.",
    detail:
      "Allowlists, spend caps, and fail-closed behavior. The gap between “the prompt said not to” and “the chain will not allow it.” Offered only for systems that actually delegate authority.",
  },
] as const;

export const PHASES = [
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
] as const;

export const PREP = [
  "Repository access, or a note that the code is not ready to share yet.",
  "Deployed addresses, if anything is already live.",
  "Who can upgrade, pause, or move funds.",
  "Prior reviews, and what they did not cover.",
  "The date you need a first read, and what is explicitly out of scope.",
] as const;

export const CLASSES: BugClass[] = [
  {
    id: "C01",
    title: "Stale oracle read",
    chain: "EVM",
    severity: "High",
    surface: "Price feeds",
    summary:
      "latestRoundData() is treated as a price. No heartbeat, no min answer, no check that the round is complete.",
    assumption: "The latest round is a current, complete price.",
    impact: "Borrowing or minting can clear against a price the feed no longer stands behind.",
    proof:
      "Freeze or stall the feed past the heartbeat the protocol claims to tolerate. Borrow or mint against a price that no longer exists. The transaction succeeds because the code never asked how old the answer was.",
    check:
      "Heartbeat, answeredInRound, min/max bounds, and what the protocol does when the feed is down — pause, or proceed.",
    lesson: "Treat a missing, stale, or partial round as a halt, not as a price.",
  },
  {
    id: "C02",
    title: "Substituted oracle account",
    chain: "Solana",
    severity: "Critical",
    surface: "Lending programs",
    summary:
      "The program trusts an account because it has the right shape, not because it is the oracle the protocol deployed.",
    assumption: "Any account with the oracle layout is the protocol’s oracle.",
    impact: "An attacker-set price can back a borrow the real feed would refuse.",
    proof:
      "Pass an attacker-owned account where the oracle belongs. Write a price. Borrow against it. The constraint that should have been an address check was a type check.",
    check:
      "Address constraints, PDA seeds, and whether a remaining account can stand in for a feed, a reserve, or a mint.",
    lesson: "Bind the feed by address or derivation, not by struct shape.",
  },
  {
    id: "C03",
    title: "Upgrade layout collision",
    chain: "EVM",
    severity: "High",
    surface: "Proxies",
    summary:
      "A new variable lands on top of an old one, or an initializer can run again after the upgrade.",
    assumption: "Appending a variable, or shipping a new implementation, leaves old state meaningful.",
    impact: "An admin, a pause flag, or an accounting slot can decode as something else after the upgrade.",
    proof:
      "Upgrade on a fork. Read the slot that used to be an admin or a pause flag. It now decodes as something else, and the new initializer is still callable.",
    check: "Storage gaps, inheritance order, initializer modifiers, and who can call upgradeTo.",
    lesson: "Diff the storage layout and the initializer path, not just the new functions.",
  },
  {
    id: "C04",
    title: "CPI with a borrowed signer",
    chain: "Solana",
    severity: "High",
    surface: "Anchor programs",
    summary:
      "A CPI signs with a PDA the attacker can aim, or it forwards remaining accounts the program never validated.",
    assumption: "A PDA signer implies the destination account is the one the program intended.",
    impact: "Tokens or mint authority can move because the seeds match, not because the target is correct.",
    proof:
      "Build a transaction that lands the PDA signer on a token account the program did not intend. The privilege is real because the seeds match, not because the destination is correct.",
    check: "Signer seeds, program id on the CPI, and every account that can move tokens or change a mint authority.",
    lesson: "Validate the destination and the program id on every privileged CPI.",
  },
  {
    id: "C05",
    title: "Share inflation",
    chain: "EVM",
    severity: "Medium",
    surface: "Vaults",
    summary:
      "The first depositor, or a direct token donation, moves the exchange rate so the next depositor’s shares round to zero.",
    assumption: "The exchange rate stays fair when the vault is empty or nearly empty.",
    impact: "A later depositor can receive zero shares while the donated assets stay with the attacker.",
    proof:
      "Donate to an empty or near-empty vault, then deposit the minimum. Shares mint to zero and the donation stays with the attacker.",
    check: "Virtual offset, minimum liquidity lock, and rounding direction on both mint and redeem.",
    lesson: "Lock dead shares or offset the rate before the first real deposit.",
  },
  {
    id: "C06",
    title: "Session key without a fence",
    chain: "Agents",
    severity: "High",
    surface: "Smart wallets",
    summary:
      "A session key can call any contract, for any amount, until a timestamp. The policy lives in a prompt.",
    assumption: "The agent will only call what it was told to call.",
    impact: "The key can spend up to the wallet, not up to a cap, against contracts nobody allowlisted.",
    proof:
      "Use the session key against a contract that was never on the allowlist. Drain up to the implicit maximum, which is the wallet.",
    check:
      "Contract allowlist, function selector, spend cap, expiry, and a revoke that does not depend on the agent cooperating.",
    lesson: "Enforce the policy on-chain. A prompt is not an allowlist.",
  },
  {
    id: "C07",
    title: "Cross-chain replay",
    chain: "Cross-chain",
    severity: "High",
    surface: "Bridges and messaging",
    summary:
      "A message is valid, and it is valid again. Nonce, chain id, or source address was never bound into the proof.",
    assumption: "A valid attestation can be consumed only once, on one domain.",
    impact: "The same payload can mint, release, or execute again.",
    proof:
      "Submit the same attested payload on the destination twice, or on a second chain that shares the verifier.",
    check: "Domain separation, consumed-message bitmaps, and who is allowed to be the sender on the source.",
    lesson: "Bind chain, contract, and nonce into the signed payload, then mark it consumed.",
  },
  {
    id: "C08",
    title: "Fail-open on a dead feed",
    chain: "Agents",
    severity: "High",
    surface: "Agent payments",
    summary:
      "An agent is allowed to pay when the price, the policy oracle, or the kill switch cannot be read.",
    assumption: "A failed read is a safe default, or a rare case that can be ignored.",
    impact: "Funds move because the check errored, not because the policy allowed it.",
    proof:
      "Take the read offline. The agent proceeds because the error path returns a default allow instead of a halt.",
    check: "Every external read has an explicit deny. Stale, missing, and reverted are the same outcome: do not move funds.",
    lesson: "Default to deny. Stale, missing, and reverted are one outcome.",
  },
];

export const REFUSALS = [
  "We do not sell an audit badge for a launch announcement.",
  "We do not review code we did not read.",
  "We do not publish private findings.",
  "We do not staff a model and call the output a review. Search can be assisted. A person signs the report.",
] as const;

export const QUESTIONS = [
  "What must not break, in one sentence?",
  "What is already deployed, and at which addresses?",
  "Who can upgrade, pause, or move funds?",
  "What did the last review miss, or never cover?",
  "What is explicitly out of scope?",
] as const;

export const LINKS = {
  principal: "https://www.ramprasadgoud.dev",
  writing: "https://www.ramprasadgoud.dev/blog",
  github: "https://github.com/Ramprasad4121",
  sentinel: "https://github.com/Ramprasad4121/anchor-sentinel",
} as const;

export function planningRange(size: string, surface: string): string {
  if (size === "15k+" || size === "Not sure") {
    return "We will not invent a week count. The range comes after the repo is actually opened.";
  }
  if (surface === "Upgrade diff" && (size === "Under 1k" || size === "1–5k")) {
    return "A diff of this size is often one to two weeks, including the fix check.";
  }
  if (size === "Under 1k") return "Often about a week, including the fix check. Not a quote.";
  if (size === "1–5k") return "Often two to three weeks, including the fix check. Not a quote.";
  if (surface === "Solana program" && size === "5–15k") {
    return "Often three to five weeks, including the fix check. Not a quote.";
  }
  return "Often three to five weeks, including the fix check. Not a quote.";
}
