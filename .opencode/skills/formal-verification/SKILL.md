---
name: r12labs-formal-verification
description: Prove r12labs' site invariants exhaustively — routes, internal links, redirect shims, and asset references. Runs scripts/verify-invariants.mjs against the dev server. Trigger on "verify invariants", "formal verification", "prove links/routes", "before landing", or after editing any route, nav entry, link, or public asset in r12labs.
---

# r12labs formal verification

This project is a marketing site for a formal-verification firm. The code
should be held to the standard the company sells: key properties are *proved*
over the full enumerated surface, not sampled the way tests sample.

## The properties

The verifier (`scripts/verify-invariants.mjs`) enumerates the entire surface
from source and proves:

- **P1 — Route soundness.** Every internal navigation target referenced
  anywhere in `src/` (`to=`, `href=` in JSX, `NAV` entries, `redirect({ to })`
  targets, `sitemap.xml` entries) is a declared `createFileRoute` path; and
  every declared route answers HTTP 200 whose final path is itself a declared
  route (covers SPA redirect behavior end-to-end).
- **P2 — Redirect totality.** Every legacy URL shim (`/practice`, `/bench`,
  `/engage`, `/method`) targets a declared route. These shims are SEO
  continuity, not dead code — never delete one without removing its old URL
  from publication.
- **P3 — Asset soundness.** Every internal asset reference (`src=`, `href=`
  with a file extension) resolves to a file in `public/`, or to a
  runtime-served path answering HTTP 200 (the platform's dynamic `/__grok/*`
  namespace lives here, not on disk).

`VERIFIED` means: for all targets t in the enumerated sets, the property holds.
Any single counterexample is printed as a witness and the run exits 1.

## How to run

```sh
# dev server must be up (npm run dev), then:
node scripts/verify-invariants.mjs
# against a different origin (e.g. preview build on :8081):
node scripts/verify-invariants.mjs --base http://127.0.0.1:8081
```

Exit codes: `0` verified · `1` falsified (witness printed) · `2` preconditions
unmet (server down — start `npm run dev`, do not silence the check).

## When to run

- After adding, renaming, or removing **any** route, nav entry, link, or
  public asset — before committing.
- Before landing a PR or pushing: run it alongside `npm run typecheck` and
  `npm test` as the landing gate.
- The verifier is exhaustive over the enumerated surface, but render
  soundness (does the page actually paint?) is a separate property — chain the
  browser QA flow (`qa-only` skill / browser smoke with screenshots in
  `screenshots/`) after a `VERIFIED` result when visuals changed.

## On falsification

A falsified run is a bug in the site **or** a stale assumption in the
verifier's extraction. Fix the site, not the verifier. Only widen the
verifier's model when the system legitimately changed (e.g. a new
runtime-served namespace joins `/__grok/`), and say so in the commit that does
it. Never delete a property or special-case a target to make a run green.
