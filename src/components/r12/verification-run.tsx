const CHECKS = [
  { rule: "assets >= liabilities", scope: "deposit, borrow, repay", ok: true },
  { rule: "only owner can set oracle", scope: "all entry points", ok: true },
  { rule: "shares map 1:1 to assets", scope: "deposit, withdraw", ok: true },
  { rule: "liquidation never adds debt", scope: "liquidate", ok: false },
];

export function VerificationRun() {
  return (
    <figure className="overflow-hidden border border-ink bg-ink text-on-signal shadow-[0_24px_60px_-30px_rgba(24,35,44,0.6)]">
      <div className="flex items-center justify-between border-b border-on-signal/15 px-5 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-on-signal/25" />
          <span className="size-2.5 rounded-full bg-on-signal/25" />
          <span className="size-2.5 rounded-full bg-on-signal/25" />
        </div>
        <p className="font-mono text-xs text-on-signal/55">LendingVault.sol</p>
      </div>
      <div className="px-5 py-6 font-mono text-[13px] leading-6 sm:px-7 sm:text-sm">
        <p className="text-on-signal/55">$ verify --properties lending.spec</p>
        <ul className="mt-4 space-y-2.5">
          {CHECKS.map((c) => (
            <li key={c.rule} className="grid grid-cols-[auto_1fr] gap-x-3">
              <span className={c.ok ? "text-[#7fc8a9]" : "text-[#f08a7e]"}>{c.ok ? "holds" : "fails"}</span>
              <span>
                {c.rule}
                <span className="block text-xs text-on-signal/45">{c.scope}</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-5 border-l-2 border-[#f08a7e] bg-on-signal/5 px-4 py-3 text-xs leading-5 sm:text-[13px]">
          <p className="text-[#f08a7e]">counterexample, 3 steps</p>
          <p className="mt-1 text-on-signal/80">borrow(100) &rarr; price drops 40% &rarr; liquidate(50)</p>
          <p className="text-on-signal/80">debt after: 112, expected at most 100</p>
        </div>
      </div>
      <figcaption className="border-t border-on-signal/15 px-5 py-4 text-sm text-on-signal/70 sm:px-7">
        Tests passed this code. The property did not. That gap is what we close.
        <span className="mt-1 block text-xs text-on-signal/40">Illustrative run, not a client finding.</span>
      </figcaption>
    </figure>
  );
}
