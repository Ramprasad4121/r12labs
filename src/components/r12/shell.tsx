import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { LINKS, NAV } from "@/lib/r12/content";
import { Mark } from "./mark";

export function Shell({
  page,
  children,
}: {
  page: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bone text-ink">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-signal focus:px-3 focus:py-2 focus:text-on-signal"
      >
        Skip to content
      </a>
      <Header />
      <main id="content">{children}</main>
      <Footer page={page} />
    </div>
  );
}

function Header() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-30 border-b border-rule bg-bone/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link to="/" className="flex items-center gap-2.5 text-ink">
          <Mark className="size-8 text-signal" />
          <span className="text-[15px] font-medium tracking-tight">
            R12 <span className="text-muted">Labs</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
          {NAV.filter((item) => item.to !== "/contact").map((item) => (
            <NavItem key={item.to} path={path} {...item} />
          ))}
          <Link
            to="/contact"
            className="inline-flex h-11 items-center bg-signal px-4 text-sm font-medium text-on-signal"
          >
            Discuss a verification project
          </Link>
        </nav>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center border border-rule lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-rule bg-bone px-5 py-4 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col">
            {NAV.map((item) => {
              const active = item.exact ? path === item.to : path === item.to || path.startsWith(`${item.to}/`);
              return (
                <li key={item.to} className="border-b border-rule">
                  <Link
                    to={item.to}
                    className={`flex h-14 items-center justify-between font-serif text-2xl ${active ? "text-ink" : "text-muted"}`}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                    <span className="font-mono text-xs tracking-widest">{active ? "●" : "→"}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

function NavItem({
  to,
  label,
  path,
}: {
  to: (typeof NAV)[number]["to"];
  label: string;
  exact: boolean;
  path: string;
}) {
  const active = path === to || path.startsWith(`${to}/`);
  return (
    <Link
      to={to}
      className={`text-sm ${active ? "text-ink" : "text-muted hover:text-ink"}`}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  );
}

function Footer({ page }: { page: string }) {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="flex items-center gap-2 text-ink">
            <Mark className="size-7 text-signal" />
            <span className="text-base font-medium tracking-tight">R12 Labs</span>
          </div>
          <p className="mt-3 max-w-sm text-muted">
            Formal verification and security engineering for EVM and Solana. Proof for the properties we specify. An audit when the question is adversarial, not mathematical.
          </p>
          <p className="mt-4 font-mono text-xs tracking-widest text-muted uppercase">{page}</p>
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm">
          <div className="flex flex-col gap-3">
            {NAV.map((item) => (
              <Link key={item.to} to={item.to} className="text-muted hover:text-ink">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <a className="text-muted hover:text-ink" href={LINKS.principal} rel="noreferrer" target="_blank">
              Principal
            </a>
            <a className="text-muted hover:text-ink" href={LINKS.github} rel="noreferrer" target="_blank">
              GitHub
            </a>
            <a className="text-muted hover:text-ink" href={LINKS.writing} rel="noreferrer" target="_blank">
              Writing
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Kicker({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs tracking-widest text-muted uppercase">
      <span className="text-signal">{index}</span>
      <span className="px-2">/</span>
      {children}
    </p>
  );
}
