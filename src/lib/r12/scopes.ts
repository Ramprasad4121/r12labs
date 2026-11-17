import { z } from "zod";

export const scopeSchema = z.object({
  name: z.string().trim().min(2, "Name is required."),
  email: z.string().trim().email("Use an email a reply can reach."),
  protocol: z.string().trim().min(2, "Name the protocol or the repo."),
  chain: z.enum(["EVM", "Solana", "Both", "Not sure"]),
  kind: z.enum(["Formal verification", "Security audit", "Research", "Not sure"]),
  surface: z.enum([
    "Contracts",
    "Solana program",
    "Upgrade diff",
    "Oracle and accounting",
    "Agent policy",
  ]),
  stage: z.enum(["Design", "Pre-launch", "Live", "Incident"]),
  size: z.enum(["Under 1k", "1–5k", "5–15k", "15k+", "Not sure"]),
  needed: z.string().trim().min(2, "Say when you need a first read."),
  invariants: z.string().trim().min(12, "Name one thing that must not break."),
});

export type ScopeInput = z.infer<typeof scopeSchema>;

export type StoredScope = ScopeInput & {
  id: string;
  createdAt: string;
};

const KEY = "r12-scopes";

export function loadScopes(): StoredScope[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isStored);
  } catch {
    return [];
  }
}

export function saveScope(input: ScopeInput): StoredScope {
  const next: StoredScope = {
    ...input,
    id: makeId(),
    createdAt: new Date().toISOString(),
  };
  const all = [next, ...loadScopes()].slice(0, 12);
  window.localStorage.setItem(KEY, JSON.stringify(all));
  return next;
}

export function briefText(scope: StoredScope | ScopeInput): string {
  return [
    "R12 Labs — scope brief",
    `Name: ${scope.name}`,
    `Email: ${scope.email}`,
    `Protocol: ${scope.protocol}`,
    `Chain: ${scope.chain}`,
    `Engagement: ${scope.kind}`,
    `Surface: ${scope.surface}`,
    `Stage: ${scope.stage}`,
    `Size: ${scope.size}`,
    `Needed: ${scope.needed}`,
    `Must not break: ${scope.invariants}`,
  ].join("\n");
}

function makeId(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = new Uint8Array(4);
  crypto.getRandomValues(bytes);
  let body = "";
  for (const byte of bytes) body += alphabet[byte % alphabet.length];
  return `R12-${body}`;
}

function isStored(value: unknown): value is StoredScope {
  if (!value || typeof value !== "object") return false;
  const row = value as Record<string, unknown>;
  return typeof row.id === "string" && typeof row.protocol === "string";
}
