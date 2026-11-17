import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as LINKS, l as Shell, t as CLASSES } from "./shell-C62o14z1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/research-CP60Ao0-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function severityTone(severity) {
	if (severity === "Critical" || severity === "High") return "signal";
	return "muted";
}
function Chip({ children, tone = "muted" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `border border-rule px-2 py-1 font-mono text-[11px] tracking-widest uppercase ${tone === "signal" ? "text-signal" : tone === "ink" ? "text-ink" : "text-muted"}`,
		children
	});
}
var CHAINS = [
	"All",
	"EVM",
	"Solana",
	"Cross-chain",
	"Agents"
];
var SEVERITIES = [
	"All",
	"Critical",
	"High",
	"Medium"
];
function ClassBrowser() {
	const [chain, setChain] = (0, import_react.useState)("All");
	const [severity, setSeverity] = (0, import_react.useState)("All");
	const [open, setOpen] = (0, import_react.useState)(CLASSES[0]?.id ?? null);
	const rows = (0, import_react.useMemo)(() => CLASSES.filter((item) => (chain === "All" || item.chain === chain) && (severity === "All" || item.severity === severity)), [chain, severity]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-3 border border-rule bg-panel px-4 py-3 text-sm text-muted",
			children: "Educational examples. Not client findings, and not a measure of systems reviewed."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3 border border-rule p-3 sm:flex-row sm:items-center sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterRow, {
				label: "Chain",
				value: chain,
				options: CHAINS,
				onChange: setChain
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterRow, {
				label: "Severity",
				value: severity,
				options: SEVERITIES,
				onChange: setSeverity
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 font-mono text-xs tracking-widest text-muted uppercase",
			children: [
				rows.length,
				" ",
				rows.length === 1 ? "class" : "classes",
				" in this set"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 border-t border-rule",
			children: rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "border-b border-rule py-10 text-muted",
				children: "Nothing in this cut. Clear a filter."
			}) : rows.map((item) => {
				const expanded = open === item.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "border-b border-rule",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "flex w-full flex-col gap-3 px-1 py-4 text-left sm:flex-row sm:items-center sm:gap-6",
						"aria-expanded": expanded,
						onClick: () => setOpen(expanded ? null : item.id),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-14 shrink-0 font-mono text-xs tracking-widest text-muted",
								children: item.id
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex-1 font-serif text-2xl leading-tight",
								children: item.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: item.chain }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
									tone: severityTone(item.severity),
									children: item.severity
								})]
							})
						]
					}), expanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-5 px-1 pb-6 sm:grid-cols-2 sm:pl-20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
								label: "Affected assumption",
								children: item.assumption
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
								label: "Impact",
								children: item.impact
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
								label: "Proof outline",
								accent: true,
								children: item.proof
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
								label: "What we check",
								children: item.check
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "sm:col-span-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
									label: "Mitigation",
									children: item.lesson
								})
							})
						]
					}) : null]
				}, item.id);
			})
		})
	] });
}
function Block({ label, children, accent = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: `font-mono text-xs tracking-widest uppercase ${accent ? "text-signal" : "text-muted"}`,
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-2",
		children
	})] });
}
function FilterRow({ label, value, options, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono text-[11px] tracking-widest text-muted uppercase",
			children: label
		}), options.map((option) => {
			const active = option === value;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: `h-9 px-3 text-sm ${active ? "bg-signal text-on-signal" : "text-muted hover:text-ink"}`,
				"aria-pressed": active,
				"aria-label": `${label} ${option}`,
				onClick: () => onChange(option),
				children: option
			}, option);
		})]
	});
}
var CONCEPTS = [
	["Specification", "The property, written so a checker can accept it or return a trace."],
	["Invariant", "A statement that should hold at the points you claim, usually after every transition."],
	["Assumption", "What the proof borrows and does not establish. Oracles, admin honesty, and bounded loops live here."],
	["Counterexample", "A concrete trace that breaks the property. It can be a bug, a bad spec, or a model that was too loose."]
];
function ResearchPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		page: "Research",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-5 pt-14 pb-8 sm:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs tracking-widest text-signal uppercase",
						children: "Research"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 max-w-3xl text-5xl leading-[1.05] sm:text-6xl",
						children: "The vocabulary, then the classes."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-2xl text-lg text-muted",
						children: "Nothing on this page is a client result. The specification is a shape. The classes below are educational examples from audit work, not verified engagements."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto grid max-w-6xl gap-8 px-5 pb-12 sm:px-8 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "border-t border-rule",
					children: CONCEPTS.map(([title, body]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-b border-rule py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "font-medium",
							children: title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 text-muted",
							children: body
						})]
					}, title))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border border-rule bg-panel p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs tracking-widest text-signal uppercase",
							children: "Illustrative spec"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
							className: "mt-4 overflow-x-auto font-mono text-sm leading-relaxed text-ink",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: `property solvency:
  forall s in Reachable.
    assets(s) >= liabilities(s)

assumes
  oracle_fresh(s)
  admin_key_uncompromised` })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm text-muted",
							children: "A sketch of the shape. Not a property we have discharged for a protocol, and not a tool transcript."
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-5 pb-16 sm:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl",
						children: "Audit classes, for the work that is not a proof."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-muted",
						children: "These are the shapes a manual review looks for. Each one is an example. None of them is a finding from a named system."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClassBrowser, {})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-rule",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col items-start gap-3 px-5 py-12 text-sm sm:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "text-signal",
						href: LINKS.writing,
						target: "_blank",
						rel: "noreferrer",
						children: "Public writing"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "text-signal",
						href: LINKS.sentinel,
						target: "_blank",
						rel: "noreferrer",
						children: "Anchor-Sentinel"
					})]
				})
			})
		]
	});
}
//#endregion
export { ResearchPage as component };
