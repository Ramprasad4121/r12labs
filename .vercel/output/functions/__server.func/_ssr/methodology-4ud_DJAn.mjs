import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Shell } from "./shell-DjWdkspT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/methodology-4ud_DJAn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PHASES = [
	{
		index: "01",
		title: "Architecture",
		body: "The protocol as it actually moves value: who calls, what is stored, and which external systems are trusted."
	},
	{
		index: "02",
		title: "Properties",
		body: "The few statements that matter. Solvency, authorization, accounting, and the transitions that must be impossible."
	},
	{
		index: "03",
		title: "Specification",
		body: "Those statements written tightly enough that a failure produces a trace. Vague goals do not verify."
	},
	{
		index: "04",
		title: "Model",
		body: "The behavior we will reason about, including what is abstracted. An abstraction that hides the bug is called out, not hidden."
	},
	{
		index: "05",
		title: "Check",
		body: "The property is proved or it fails. Tooling follows the property. We do not pick a tool and hope the question fits."
	},
	{
		index: "06",
		title: "Counterexamples",
		body: "A failed property comes back as a trace. We read it before anyone calls it a bug, a model error, or a spec error."
	},
	{
		index: "07",
		title: "Fix",
		body: "After the code or the spec changes, the same property is checked again. A green status from a different question does not count."
	},
	{
		index: "08",
		title: "Delivery",
		body: "Scope, specifications, results, traces, findings from any audit work in the same engagement, and the limits in writing."
	}
];
var CLIENT = [
	"The verification scope and the code it covers.",
	"The formal specifications.",
	"Which properties held, and the assumptions around them.",
	"Counterexamples or failure traces, when a property does not hold.",
	"Security findings, if an audit is part of the same engagement.",
	"Recommendations, and an explicit list of limitations."
];
function MethodologyPage() {
	const [active, setActive] = (0, import_react.useState)(0);
	const phase = PHASES[active] ?? PHASES[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		page: "Method",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-5 pt-14 pb-8 sm:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs tracking-widest text-signal uppercase",
						children: "Methodology"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 max-w-3xl text-5xl leading-[1.05] sm:text-6xl",
						children: "Specify the property. Then check it."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-2xl text-lg text-muted",
						children: "The order is fixed. Architecture, then the property, then a model, then a result you can argue with. A tool does not come first."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto grid max-w-6xl gap-8 px-5 pb-16 sm:px-8 lg:grid-cols-[280px_minmax(0,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "border-t border-rule",
					children: PHASES.map((item, index) => {
						const on = index === active;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "border-b border-rule",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: `flex h-12 w-full items-center gap-4 text-left ${on ? "text-ink" : "text-muted"}`,
								"aria-current": on ? "step" : void 0,
								onClick: () => setActive(index),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `w-8 font-mono text-xs ${on ? "text-signal" : ""}`,
									children: item.index
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.title })]
							})
						}, item.index);
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "border border-rule bg-panel p-6 sm:p-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-xs tracking-widest text-signal uppercase",
							children: ["Step ", phase.index]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 text-4xl",
							children: phase.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-xl text-lg",
							children: phase.body
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "h-11 border border-rule px-4 text-sm disabled:opacity-40",
								disabled: active === 0,
								onClick: () => setActive((n) => Math.max(0, n - 1)),
								children: "Back"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "h-11 bg-signal px-4 text-sm font-medium text-on-signal disabled:opacity-40",
								disabled: active === PHASES.length - 1,
								onClick: () => setActive((n) => Math.min(PHASES.length - 1, n + 1)),
								children: "Next"
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "border-t border-rule",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-8 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl",
						children: "What the engagement returns."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "border-t border-rule",
						children: CLIENT.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "border-b border-rule py-3 text-muted",
							children: item
						}, item))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-5 pb-14 sm:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-2xl text-muted",
						children: "Verification proves only the specified properties, under the stated assumptions, in the model we actually built. That sentence is part of the delivery, not a footnote we hope nobody reads."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						className: "mt-8 inline-flex h-12 items-center bg-signal px-5 text-sm font-medium text-on-signal",
						children: "Discuss a verification project"
					})]
				})]
			})
		]
	});
}
//#endregion
export { MethodologyPage as component };
