import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as OFFERINGS, c as REFUSALS, l as Shell, r as Kicker } from "./shell-C62o14z1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services-hjCZAQ-U.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var COMPARE = [
	[
		"Formal verification",
		"Does this property hold in the model?",
		"A proof or a counterexample, with assumptions."
	],
	[
		"Testing",
		"Did these inputs fail?",
		"Examples. Not a proof of the cases you skipped."
	],
	[
		"Static analysis",
		"Does this pattern appear?",
		"Alerts. Useful, and not a theorem."
	],
	[
		"Manual audit",
		"What can an attacker do in this code?",
		"Findings with a reproduction. Absence is not proved."
	]
];
function ServicesPage() {
	const [open, setOpen] = (0, import_react.useState)(OFFERINGS[0].index);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		page: "Services",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-5 pt-14 pb-8 sm:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, {
						index: "02",
						children: "Services"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 max-w-3xl text-5xl leading-[1.05] sm:text-6xl",
						children: "Verification first. Audits beside it."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-2xl text-lg text-muted",
						children: "The primary engagement is a formal verification of properties on EVM or Solana. A security audit is a separate question: an adversary reading the code. We do not describe one as the other."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/formal-verification",
						className: "mt-6 inline-flex text-sm text-signal",
						children: "Formal verification"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-6xl px-5 pb-12 sm:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto border border-rule",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[640px] text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "border-b border-rule font-mono text-xs tracking-widest text-muted uppercase",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Work"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Question"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "What it can return"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: COMPARE.map(([work, question, result]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-rule last:border-b-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-4 font-medium text-ink",
									children: work
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-4 text-muted",
									children: question
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-4 text-muted",
									children: result
								})
							]
						}, work)) })]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-5 pb-6 sm:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl",
					children: "Security audits"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-2xl text-muted",
					children: "Manual review, threat modeling, fuzzing, and static analysis. High and Critical findings ship with a way to trigger them. The fix is retested. This is not a mathematical proof."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-6xl px-5 pb-16 sm:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "border-t border-rule",
					children: OFFERINGS.map((item) => {
						const expanded = open === item.index;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "border-b border-rule",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "flex w-full items-start gap-4 py-5 text-left sm:items-center sm:gap-8",
								"aria-expanded": expanded,
								onClick: () => setOpen(expanded ? "" : item.index),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-10 shrink-0 pt-1 font-mono text-xs tracking-widest text-signal",
										children: item.index
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex-1 font-serif text-2xl sm:text-3xl",
										children: item.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-muted",
										children: expanded ? "Close" : "Open"
									})
								]
							}), expanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-6 pb-8 sm:grid-cols-3 sm:pl-14",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.detail }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[11px] tracking-widest text-muted uppercase",
										children: "Fits when"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-2 block",
										children: item.fits
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[11px] tracking-widest text-muted uppercase",
										children: "You leave with"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-2 block",
										children: item.leave
									})] })
								]
							}) : null]
						}, item.index);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-y border-rule bg-panel",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl",
						children: "What we will not do."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "border-t border-rule",
						children: REFUSALS.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "border-b border-rule py-4 text-lg",
							children: line
						}, line))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto flex max-w-6xl flex-col items-start gap-4 px-5 py-16 sm:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-4xl",
					children: "Start with the property, or with the code."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/contact",
					className: "inline-flex h-12 items-center bg-signal px-5 text-sm font-medium text-on-signal",
					children: "Discuss a verification project"
				})]
			})
		]
	});
}
//#endregion
export { ServicesPage as component };
