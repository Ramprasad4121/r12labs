import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Shell, n as Kicker, r as LINKS } from "./shell-DjWdkspT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-p8hNwDko.js
var import_jsx_runtime = require_jsx_runtime();
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		page: "About",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-5 pt-14 pb-8 sm:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, {
						index: "05",
						children: "About"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 max-w-3xl text-5xl leading-[1.05] sm:text-6xl",
						children: "A verification firm. Not an agency."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-2xl text-lg text-muted",
						children: "R12 Labs works on the properties of EVM and Solana systems. Formal verification is the center. Security audits answer the questions a proof was never asked. A person signs the result. A model can help search. It does not sign."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto grid max-w-6xl gap-px bg-rule px-5 pb-16 sm:px-8 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "bg-bone p-6 sm:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-serif text-3xl",
							children: "Who does the work"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-muted",
							children: "The principal’s public site and code are linked here because those pages already exist. Named reviewers, certifications, and a client list are not on this site."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-col items-start gap-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									className: "text-signal",
									href: LINKS.principal,
									target: "_blank",
									rel: "noreferrer",
									children: "Principal site"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									className: "text-signal",
									href: LINKS.github,
									target: "_blank",
									rel: "noreferrer",
									children: "GitHub"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									className: "text-signal",
									href: LINKS.sentinel,
									target: "_blank",
									rel: "noreferrer",
									children: "Anchor-Sentinel"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									className: "text-signal",
									href: LINKS.writing,
									target: "_blank",
									rel: "noreferrer",
									children: "Public writing"
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "bg-panel p-6 sm:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs tracking-widest text-signal uppercase",
							children: "Placeholder"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-serif text-3xl",
							children: "Not yet approved for this page"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-4 space-y-3 text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "A biography with credentials we are willing to stand behind in public." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "A responsible-disclosure inbox." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Selected engagements. None are listed, because none are approved to name." })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-sm text-muted",
							children: "Empty on purpose. A missing line is not a claim."
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-rule",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-5 py-14 sm:px-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-serif text-3xl",
							children: "Responsible disclosure"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-2xl text-muted",
							children: "Private findings stay with the team that commissioned the review. This site does not publish them, and it does not yet publish a disclosure address. Until that address is approved, do not send vulnerability reports through the scope form and expect a security response. The form is for scoping a review."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact",
							className: "mt-8 inline-flex h-12 items-center bg-signal px-5 text-sm font-medium text-on-signal",
							children: "Discuss a verification project"
						})
					]
				})
			})
		]
	});
}
//#endregion
export { AboutPage as component };
