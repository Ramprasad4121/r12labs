export const ROUTE_PATHS = [
  "/",
  "/formal-verification",
  "/services",
  "/methodology",
  "/research",
  "/about",
  "/contact",
] as const;

export type RoutePath = (typeof ROUTE_PATHS)[number];

export type NavEntry = { to: RoutePath; label: string };

export const NAV: readonly NavEntry[] = [
  { to: "/formal-verification", label: "Verification" },
  { to: "/services", label: "Services" },
  { to: "/methodology", label: "Method" },
  { to: "/research", label: "Research" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function isRouteActive(path: string, to: RoutePath): boolean {
  return path === to || path.startsWith(`${to}/`);
}
