import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as Shell } from "./shell-C62o14z1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/formal-verification-Ch8xaJa8.js
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
						children: "We write the property, model the behavior that matters, and check it. The result is a proof or a counterexample. It is not a test run, and it is not an audit report with the word proof on the cover."
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
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Testing shows behavior on the inputs you tried. It does not show the rest." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Static analysis flags patterns. A flag is not a theorem." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A manual audit can find an attack the specification never mentioned. That is why audits stay in the practice. They answer a different question." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Verification proves the properties that were written, in the model that was built, under the assumptions that were stated. Change the code or the assumptions and the result does not travel with you." })
						]
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
