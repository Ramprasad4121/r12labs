import { n as Shell } from "./shell-DenqLIPB.mjs";
import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/formal-verification-CRxf3tuQ.js
var import_jsx_runtime = require_jsx_runtime();
var EVM = [
	"Solidity specifications for the functions that move value.",
	"State and protocol invariants.",
	"Arithmetic and accounting properties.",
	"Access-control and authorization properties.",
	"SMT-style checks where the property can be encoded and the model is honest about loops and calls."
];
var SOLANA = [
	"Rust and Anchor properties across instructions, not a single handler in isolation.",
	"Account validation, ownership, and signer constraints.",
	"Authorization invariants.",
	"State-transition properties.",
	"Arithmetic and accounting, including decimals and rounding."
];
var RECEIVE = [
	["Scope", "The code, the properties, and what was left outside the model."],
	["Specifications", "The properties as written, not as a slide."],
	["Results", "Which properties held, and under which assumptions."],
	["Counterexamples", "A trace when a property fails. Illustrative traces on this site are labeled as such."],
	["Limits", "What the model does not cover. A proof is not a claim that the protocol is safe."]
];
function VerificationPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		page: "Verification",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-5 pt-14 pb-8 sm:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs tracking-widest text-signal uppercase",
						children: "Primary service"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 max-w-3xl text-5xl leading-[1.05] sm:text-6xl",
						children: "Formal verification for EVM and Solana."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-2xl text-lg text-muted",
						children: "We write the property, model the behavior that matters, and return a proof or counterexample."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto grid max-w-6xl gap-px bg-rule px-5 pb-16 sm:px-8 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "bg-bone p-6 sm:p-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl",
						children: "EVM"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-3 text-muted",
						children: EVM.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "bg-panel p-6 sm:p-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl",
						children: "Solana"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-3 text-muted",
						children: SOLANA.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-y border-rule",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-5 py-14 sm:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl",
						children: "What you receive"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "mt-8 border-t border-rule",
						children: RECEIVE.map(([title, body]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 border-b border-rule py-4 md:grid-cols-[180px_1fr]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "font-medium",
								children: title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-muted",
								children: body
							})]
						}, title))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-5 py-14 sm:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "max-w-2xl text-3xl",
						children: "What a proof is not."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 max-w-2xl space-y-4 text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Testing covers inputs. Static analysis flags patterns. Audits find attacks a specification may not name." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A proof applies only to the written property, stated assumptions, and model." })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						className: "mt-8 inline-flex h-12 items-center bg-signal px-5 text-sm font-medium text-on-signal",
						children: "Discuss a verification project"
					})
				]
			})
		]
	});
}
//#endregion
export { VerificationPage as component };
