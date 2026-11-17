import type { ErrorComponentProps } from "@tanstack/react-router";

const FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return FALLBACK_MESSAGE;
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="flex min-h-screen flex-col items-start justify-center gap-3 bg-bone px-6 text-ink">
      <p className="font-mono text-xs tracking-widest text-signal uppercase">Error</p>
      <h1 className="font-serif text-4xl">The page failed to render.</h1>
      <p className="max-w-md text-sm break-words text-muted">{errorMessage(error)}</p>
    </main>
  );
}
