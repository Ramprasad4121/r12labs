export type Offering = {
  index: string;
  title: string;
  fits: string;
  leave: string;
  detail: string;
};

export const OFFERINGS: readonly Offering[] = [
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
];
