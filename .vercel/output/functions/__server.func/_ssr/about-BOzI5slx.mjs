import { a as LINKS, n as Shell, t as Kicker } from "./shell-DenqLIPB.mjs";
import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-BOzI5slx.js
var import_jsx_runtime = require_jsx_runtime();
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		page: "About",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-5 pt-14 pb-8 sm:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, { children: "About" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 max-w-3xl text-5xl leading-[1.05] sm:text-6xl",
					children: "A verification firm. Not an agency."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-2xl text-lg text-muted",
					children: "R12 Labs verifies EVM and Solana systems. Formal verification is the center; security review covers what a proof was not asked."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
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
						children: "Public work and code from the principal."
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
						className: "text-sm font-medium text-signal",
						children: "Working standard"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-serif text-3xl",
						children: "Precision before promotion."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 space-y-3 text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Credentials, engagement details, and client names appear only with explicit approval." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Private findings and security-sensitive context are never treated as marketing material." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Public statements are scoped to the evidence behind them." })
						]
					})
				]
			})]
		})]
	});
}
//#endregion
export { AboutPage as component };
