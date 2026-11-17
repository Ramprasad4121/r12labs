import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as Shell } from "./shell-C62o14z1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DRaukF83.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var BOX_W = 108;
var BOX_H = 52;
function placed(index, y) {
	return {
		x: 20 + index * 168,
		y
	};
}
function across(from, y, label, hot = false) {
	const x1 = placed(from, y).x + BOX_W;
	const x2 = placed(from + 1, y).x;
	const mid = y + BOX_H / 2;
	return {
		x1,
		y1: mid,
		x2,
		y2: mid,
		label,
		lx: x1 + 8,
		ly: mid - 10,
		hot
	};
}
function down(from, label, hot = false) {
	const top = placed(from, 36);
	const bottom = placed(from, 150);
	const x = top.x + BOX_W / 2;
	return {
		x1: x,
		y1: top.y + BOX_H,
		x2: x,
		y2: bottom.y,
		label,
		lx: x + 10,
		ly: top.y + BOX_H + 28,
		hot
	};
}
var PROPERTIES = [
	{
		id: "solvency",
		name: "Solvency",
		spec: "assets ≥ liabilities",
		status: "holds",
		trace: "Illustrative sketch, not a discharged proof. Deposit, borrow, and repay each keep assets at least equal to liabilities.",
		nodes: [
			{
				...placed(0, 36),
				label: "Init"
			},
			{
				...placed(1, 36),
				label: "Funded"
			},
			{
				...placed(2, 36),
				label: "Active"
			},
			{
				...placed(3, 36),
				label: "Settled"
			}
		],
		edges: [
			across(0, 36, "deposit"),
			across(1, 36, "borrow"),
			across(2, 36, "repay")
		]
	},
	{
		id: "auth",
		name: "Authorization",
		spec: "only admin writes parameters",
		status: "holds",
		trace: "Illustrative sketch. The admin edge writes. The other-caller edge is rejected and does not change state.",
		nodes: [
			{
				...placed(0, 36),
				label: "Idle"
			},
			{
				...placed(1, 36),
				label: "Pending"
			},
			{
				...placed(2, 36),
				label: "Written"
			},
			{
				...placed(1, 150),
				label: "Rejected"
			}
		],
		edges: [
			across(0, 36, "propose"),
			across(1, 36, "admin"),
			down(1, "other")
		]
	},
	{
		id: "accounting",
		name: "Accounting",
		spec: "shares × rate = assets",
		status: "counterexample",
		trace: "Illustrative trace, not a client finding. Mint 1 share into an empty vault, donate assets to inflate the rate, and the next deposit rounds down to zero shares.",
		nodes: [
			{
				...placed(0, 36),
				label: "Empty"
			},
			{
				...placed(1, 36),
				label: "Seeded"
			},
			{
				...placed(2, 36),
				label: "Inflated"
			},
			{
				...placed(2, 150),
				label: "Zero",
				bad: true
			}
		],
		edges: [
			across(0, 36, "mint 1"),
			across(1, 36, "donate"),
			down(2, "deposit", true)
		]
	}
];
function ProofGraph() {
	const [active, setActive] = (0, import_react.useState)(PROPERTIES[0].id);
	const property = PROPERTIES.find((item) => item.id === active) ?? PROPERTIES[0];
	const broken = property.status === "counterexample";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: "border border-rule bg-panel",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
			className: "flex items-center justify-between gap-3 border-b border-rule px-4 py-3 sm:px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-xs tracking-widest text-muted uppercase",
				children: "Property sketch"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `font-mono text-xs tracking-widest uppercase ${broken ? "text-signal" : "text-muted"}`,
				children: broken ? "Counterexample" : "Holds"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-3 py-4 sm:px-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					viewBox: "0 0 680 230",
					role: "img",
					"aria-labelledby": "proof-title proof-desc",
					className: "w-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", {
							id: "proof-title",
							children: "Sketch of states checked against a property"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("desc", {
							id: "proof-desc",
							children: [
								property.spec,
								". ",
								property.trace
							]
						}),
						property.edges.map((edge) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Edge, { ...edge }, `${edge.label}-${edge.x1}`)),
						property.nodes.map((node) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Node, { ...node }, `${node.label}-${node.x}-${node.y}`))
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex flex-wrap gap-2",
					children: PROPERTIES.map((item) => {
						const on = item.id === active;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-pressed": on,
							className: `h-9 px-3 text-sm ${on ? "bg-signal text-on-signal" : "text-muted"}`,
							onClick: () => setActive(item.id),
							children: item.name
						}, item.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 font-mono text-sm text-ink",
					children: property.spec
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: property.trace
				})
			]
		})]
	});
}
function Node({ x, y, label, bad = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
		x,
		y,
		width: BOX_W,
		height: BOX_H,
		fill: "#05060a",
		stroke: bad ? "#3d7eff" : "#e7eef8",
		strokeWidth: bad ? 1.5 : 1
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
		x: x + BOX_W / 2,
		y: y + 32,
		textAnchor: "middle",
		fill: bad ? "#3d7eff" : "#e7eef8",
		fontSize: "14",
		fontFamily: "IBM Plex Mono, ui-monospace, monospace",
		children: label
	})] });
}
function Edge({ x1, y1, x2, y2, label, lx, ly, hot = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
		x1,
		y1,
		x2,
		y2,
		stroke: hot ? "#3d7eff" : "#93a0b5",
		strokeWidth: hot ? 2 : 1.5
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
		x: lx,
		y: ly,
		fill: hot ? "#3d7eff" : "#93a0b5",
		fontSize: "12",
		fontFamily: "IBM Plex Mono, ui-monospace, monospace",
		children: label
	})] });
}
var VERIFY = [
	["Invariants", "Balances, solvency, and conservation across every modeled transition."],
	["Authorization", "Who may move funds, upgrade, or change a parameter."],
	["Accounting", "Shares, rates, decimals, and rounding, as properties rather than examples."],
	["State transitions", "Which moves are legal, and which must be unreachable."]
];
var CHAINS = [{
	name: "EVM",
	body: "Solidity specifications. Function properties. Arithmetic. Access control. SMT-style workflows where the property and the model support them."
}, {
	name: "Solana",
	body: "Rust and Anchor properties. Account ownership, signer intent, and state transitions across instructions. Same standard of assumption and result."
}];
var STEPS = [
	[
		"01",
		"Properties",
		"Name what must hold before anyone picks a tool."
	],
	[
		"02",
		"Specification",
		"Write it so a failed check is a trace, not a vibe."
	],
	[
		"03",
		"Verification",
		"Prove the property, or return the counterexample."
	],
	[
		"04",
		"Limits",
		"State the model, the assumptions, and what was not proved."
	]
];
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		page: "Home",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto grid max-w-6xl items-start gap-12 px-5 pt-14 pb-16 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:pt-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs tracking-widest text-signal uppercase",
						children: "Formal verification · EVM · Solana"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 max-w-xl text-5xl leading-[1.02] sm:text-6xl",
						children: "Security through proof."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-xl text-lg text-muted",
						children: "We help blockchain teams verify critical system properties and strengthen protocol security through formal verification and rigorous security engineering."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-col gap-3 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact",
							className: "inline-flex h-12 items-center justify-center bg-signal px-5 text-sm font-medium text-on-signal",
							children: "Discuss a verification project"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/methodology",
							className: "inline-flex h-12 items-center justify-center border border-rule px-5 text-sm",
							children: "Explore our methodology"
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProofGraph, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-y border-rule",
				"aria-label": "What we verify",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-5 py-14 sm:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl",
						children: "What we verify"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "mt-8 grid gap-px bg-rule sm:grid-cols-2",
						children: VERIFY.map(([title, body]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-bone p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "font-serif text-xl",
								children: title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-2 text-muted",
								children: body
							})]
						}, title))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs tracking-widest text-signal uppercase",
						children: "Primary work"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 text-4xl",
						children: "Formal verification, on both chains we take."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-muted",
						children: "An audit looks for bugs. Verification asks whether a stated property holds in the model. We do both. Verification is the center of the firm."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/formal-verification",
						className: "mt-6 inline-flex text-sm text-signal",
						children: "How verification is scoped"
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-px bg-rule sm:grid-cols-2",
					children: CHAINS.map((chain) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "bg-panel p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-mono text-xs tracking-widest text-signal uppercase",
							children: chain.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-muted",
							children: chain.body
						})]
					}, chain.name))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-y border-rule bg-panel",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-8 md:grid-cols-[1fr_1fr] md:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs tracking-widest text-muted uppercase",
							children: "Also in scope"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 text-3xl",
							children: "Security audits, when you need an adversary."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-muted",
							children: "Manual review, fuzzing, and static analysis sit next to verification. They are not a proof. A passing test suite is not a proof. We say which one you are buying."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/services",
						className: "inline-flex h-12 items-center border border-rule px-5 text-sm",
						children: "Services"
					}) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-5 py-16 sm:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl",
						children: "From a property to a result."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/methodology",
						className: "text-sm text-signal",
						children: "Full method"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-8 grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-4",
					children: STEPS.map(([index, title, body]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "bg-bone p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs text-signal",
								children: index
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 text-xl",
								children: title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: body
							})
						]
					}, index))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-rule",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-6 px-5 py-16 sm:px-8 md:grid-cols-[1.2fr_0.8fr] md:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "max-w-xl text-4xl",
						children: "A proof covers the properties you wrote down. Nothing else."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xl text-muted",
						children: "Results are scoped to a model and a set of assumptions. If that is the engagement you want, start with the property that must not fail."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						className: "inline-flex h-12 w-fit items-center bg-signal px-5 text-sm font-medium text-on-signal",
						children: "Discuss a verification project"
					})]
				})
			})
		]
	});
}
//#endregion
export { Home as component };
