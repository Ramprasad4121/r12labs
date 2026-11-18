import { Link, createRootRoute, HeadContent, Outlet, Scripts, useRouterState } from "@tanstack/react-router";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import appCss from "../styles.css?url";

const SITE_JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://r12labs.xyz/#organization",
      name: "R12 Labs",
      alternateName: ["R12Labs", "r12labs"],
      url: "https://r12labs.xyz/",
      logo: "https://r12labs.xyz/r12-mark.png",
      email: "ramprasadgoud34@gmail.com",
      description:
        "R12 Labs (R12Labs) is a formal verification firm for EVM and Solana protocols.",
    },
    {
      "@type": "WebSite",
      "@id": "https://r12labs.xyz/#website",
      url: "https://r12labs.xyz/",
      name: "R12Labs",
      alternateName: "R12 Labs",
      publisher: { "@id": "https://r12labs.xyz/#organization" },
    },
  ],
});

const FONT =
  "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600&display=swap";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "R12Labs" },
      {
        name: "description",
        content:
          "R12 Labs (R12Labs) verifies critical properties of EVM and Solana systems, and audits the code around them.",
      },
      { name: "theme-color", content: "#f7f5f0" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: FONT },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  const path = useRouterState({ select: (state) => state.location.pathname });
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
        <link rel="canonical" href={`https://r12labs.xyz${path === "/" ? "/" : path}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: SITE_JSON_LD }} />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Analytics path={path} route={path} />
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <main className="flex min-h-screen flex-col justify-center bg-bone px-6 text-ink">
      <p className="font-mono text-xs tracking-widest text-signal uppercase">404</p>
      <h1 className="mt-3 max-w-xl font-serif text-5xl leading-none">This page is not on the site.</h1>
      <Link to="/" className="mt-8 inline-flex h-12 items-center text-sm text-signal underline">
        Return home
      </Link>
    </main>
  );
}
