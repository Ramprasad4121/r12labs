export type Chain = "EVM" | "Solana" | "Cross-chain" | "Agents";
export type Severity = "Critical" | "High" | "Medium";

export type BugClass = {
  id: string;
  title: string;
  chain: Chain;
  severity: Severity;
  assumption: string;
  impact: string;
  proof: string;
  check: string;
  lesson: string;
};

export const CLASSES: readonly BugClass[] = [
  {
    id: "C01",
    title: "Stale oracle read",
    chain: "EVM",
    severity: "High",
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
    assumption: "A failed read is a safe default, or a rare case that can be ignored.",
    impact: "Funds move because the check errored, not because the policy allowed it.",
    proof:
      "Take the read offline. The agent proceeds because the error path returns a default allow instead of a halt.",
    check: "Every external read has an explicit deny. Stale, missing, and reverted are the same outcome: do not move funds.",
    lesson: "Default to deny. Stale, missing, and reverted are one outcome.",
  },
];
