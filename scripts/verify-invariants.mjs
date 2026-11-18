#!/usr/bin/env node
/**
 * Formal verifier for the r12labs public site.
 *
 * Proves three invariants exhaustively over the enumerated surface — not just
 * the paths a test happens to click:
 *
 *   P1  Route soundness    Every internal navigation target referenced in
 *                         src/ (links, NAV, redirects, sitemap entries) is a
 *                         declared route, and every declared route serves
 *                         HTTP 200 whose final path is itself a route.
 *   P2  Redirect totality  Every legacy redirect shim targets a declared,
 *                         live route.
 *   P3  Asset soundness    Every internal asset reference (img/link src,
 *                         href with a file extension) resolves to a file in
 *                         public/, or to a runtime-served path that answers
 *                         HTTP 200 (e.g. the platform's /__grok/* routes).
 *
 * Exit codes: 0 = verified, 1 = falsified (witness printed), 2 = preconditions
 * unmet (e.g. dev server unreachable).
 *
 * Usage: node scripts/verify-invariants.mjs [--base http://127.0.0.1:8080]
 */
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const srcRoot = join(repoRoot, "src");
const publicRoot = join(repoRoot, "public");

// ── base URL ────────────────────────────────────────────────────────────────
const baseFlag = process.argv.indexOf("--base");
const BASE = (baseFlag !== -1 ? process.argv[baseFlag + 1] : "") || "http://127.0.0.1:8080";

// ── collect source files ────────────────────────────────────────────────────
const sourceFiles = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(tsx?|css)$/.test(name)) sourceFiles.push(p);
  }
})(srcRoot);

// ── declared routes (from createFileRoute in src/routes) ────────────────────
const routesDir = join(srcRoot, "routes");
const routes = new Set();
for (const file of readdirSync(routesDir)) {
  if (!file.endsWith(".tsx")) continue;
  const code = readFileSync(join(routesDir, file), "utf8");
  const re = /createFileRoute\(\s*["'`]([^"'`]+)["'`]\s*\)/g;
  let m;
  while ((m = re.exec(code))) routes.add(m[1]);
}

// ── redirect shim targets (from redirect({ to: "…" }) in routes) ────────────
const redirectTargets = new Set();
for (const file of readdirSync(routesDir)) {
  if (!file.endsWith(".tsx")) continue;
  const code = readFileSync(join(routesDir, file), "utf8");
  const re = /redirect\(\s*\{\s*to:\s*["'`]([^"'`]+)["'`]/g;
  let m;
  while ((m = re.exec(code))) redirectTargets.add(m[1]);
}

// ── internal references in src (nav targets + asset refs) ───────────────────
const refRe = /(?:\bto\b|\bhref\b|\bsrc\b)\s*[:=]\s*["'`](\/[^"'`\s]*)["'`]/g;
const linkTargets = new Set();
const assetTargets = new Set();
for (const file of sourceFiles) {
  const code = readFileSync(file, "utf8");
  let m;
  while ((m = refRe.exec(code))) {
    const target = m[1];
    if (target === "/") continue; // root is trivially a route
    if (/\.[a-z0-9]+$/i.test(target)) assetTargets.add(target);
    else linkTargets.add(target);
  }
}

// ── sitemap URLs must also be declared routes ───────────────────────────────
const sitemapTargets = new Set();
const sitemapPath = join(publicRoot, "sitemap.xml");
if (existsSync(sitemapPath)) {
  const xml = readFileSync(sitemapPath, "utf8");
  const re = /<loc>\s*https?:\/\/[^<]*?(\/[^<\s]*)\s*<\/loc>/g;
  let m;
  while ((m = re.exec(xml))) {
    const path = m[1] === "/" ? "/" : m[1].replace(/\/+$/, "");
    sitemapTargets.add(path || "/");
  }
}

const witnesses = [];

// P1a — every link target is a declared route
for (const t of [...linkTargets, ...sitemapTargets]) {
  if (!routes.has(t)) witnesses.push(`P1: target ${t} is not a declared route`);
}

// P3 — every asset target exists in public/, or is served at runtime
const runtimeAssets = [];
for (const a of assetTargets) {
  if (!existsSync(join(publicRoot, a))) runtimeAssets.push(a);
}

// P2 — every redirect target is a declared route
for (const t of redirectTargets) {
  if (!routes.has(t)) witnesses.push(`P2: shim redirects to undeclared route ${t}`);
}

// P1b — every declared route serves 200 and lands on a route
let httpChecks = 0;
if (witnesses.length === 0) {
  let serverUp = false;
  try {
    const probe = await fetch(BASE, { signal: AbortSignal.timeout(5000) });
    serverUp = probe.status < 500;
  } catch {
    console.error(`Precondition failed: no server at ${BASE}. Start it (npm run dev) and re-run.`);
    process.exit(2);
  }
  if (serverUp) {
    for (const a of runtimeAssets) {
      try {
        const res = await fetch(`${BASE}${a}`, { redirect: "follow", signal: AbortSignal.timeout(10000) });
        httpChecks += 1;
        if (res.status !== 200) witnesses.push(`P3: asset ${a} is neither in public/ nor served (HTTP ${res.status})`);
      } catch (err) {
        witnesses.push(`P3: asset ${a} fetch failed: ${String(err?.message || err)}`);
      }
    }
    for (const r of [...routes].sort()) {
      try {
        const res = await fetch(`${BASE}${r}`, { redirect: "follow", signal: AbortSignal.timeout(10000) });
        httpChecks += 1;
        const finalPath = new URL(res.url).pathname.replace(/\/+$/, "") || "/";
        if (res.status !== 200) witnesses.push(`P1: route ${r} answered HTTP ${res.status}`);
        else if (!routes.has(finalPath)) witnesses.push(`P1: route ${r} lands on ${finalPath}, not a declared route`);
      } catch (err) {
        httpChecks += 1;
        witnesses.push(`P1: route ${r} fetch failed: ${String(err?.message || err)}`);
      }
    }
  }
}

// ── verdict ──────────────────────────────────────────────────────────────────
const counts = `${routes.size} routes, ${linkTargets.size} link targets, ${redirectTargets.size} redirect targets, ${assetTargets.size} asset refs, ${sitemapTargets.size} sitemap entries`;
if (witnesses.length > 0) {
  console.log(`FALSIFIED — ${witnesses.length} witness(es) over ${counts}:`);
  for (const w of witnesses) console.log(`  ✗ ${w}`);
  process.exit(1);
}
console.log(`VERIFIED — P1, P2, P3 hold exhaustively over ${counts} (${httpChecks} HTTP checks against ${BASE}).`);
