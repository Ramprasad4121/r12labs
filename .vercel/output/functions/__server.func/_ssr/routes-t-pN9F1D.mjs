import { i as __toESM } from "../_runtime.mjs";
import { n as Shell } from "./shell-DenqLIPB.mjs";
import { S as require_jsx_runtime, X as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as ArrowUpRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-t-pN9F1D.js
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
		className: "border border-ink bg-ink text-on-signal",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
			className: "flex items-center justify-between gap-3 border-b border-on-signal/20 px-4 py-3 sm:px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-medium text-on-signal/65",
				children: "Property explorer"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `text-xs font-medium ${broken ? "text-on-signal" : "text-on-signal/65"}`,
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
							className: `h-9 px-3 text-sm ${on ? "bg-on-signal text-ink" : "text-on-signal/65 hover:text-on-signal"}`,
							onClick: () => setActive(item.id),
							children: item.name
						}, item.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 font-mono text-sm text-on-signal",
					children: property.spec
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-on-signal/65",
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
var SERVICES = [
	{
		title: "Formal verification",
		body: "Machine-checkable properties for protocol behavior, with assumptions and proof boundaries stated plainly.",
		to: "/formal-verification"
	},
	{
		title: "Security review",
		body: "Manual adversarial review for code paths and system boundaries a formal specification may not name.",
		to: "/services"
	},
	{
		title: "Verification strategy",
		body: "Engagement design for teams that need the right properties before critical code hardens.",
		to: "/methodology"
	}
];
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		page: "Home",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-6xl px-5 pt-14 pb-16 sm:px-8 lg:pt-24 lg:pb-28",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-12 lg:grid-cols-[1.06fr_0.94fr] lg:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-signal",
							children: "Formal verification for EVM and Solana"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-5 max-w-3xl text-5xl leading-[0.98] sm:text-6xl lg:text-7xl",
							children: "Protect the rules your protocol depends on."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-7 max-w-2xl text-lg leading-8 text-muted",
							children: "R12 Labs formalizes and verifies the rules that move value in EVM and Solana protocols."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-9 flex flex-wrap gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/contact",
								className: "inline-flex h-12 items-center gap-2 bg-signal px-5 text-sm font-medium text-on-signal transition-colors hover:bg-ink",
								children: ["Discuss an engagement ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
									className: "size-4",
									"aria-hidden": "true"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/methodology",
								className: "site-link inline-flex h-12 items-center text-sm text-ink",
								children: "How we work"
							})]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
						className: "relative overflow-hidden border border-rule bg-ink",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/verification-lab.jpg",
								alt: "A close view of an electronic circuit board",
								className: "h-80 w-full object-cover opacity-70 grayscale sm:h-96"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-image-overlay absolute inset-0" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
								className: "absolute inset-x-0 bottom-0 p-6 text-on-signal sm:p-8",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-on-signal/65",
										children: "A formal result is specific by design."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 max-w-md font-serif text-2xl leading-tight sm:text-3xl",
										children: "It states the property, the model, and the conditions under which it holds."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "https://unsplash.com/@alexkixa?utm_source=r12labs&utm_medium=referral",
										target: "_blank",
										rel: "noreferrer",
										className: "mt-5 inline-block text-xs text-on-signal/60 hover:text-on-signal",
										children: "Photo by Alexandre Debiève / Unsplash"
									})
								]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-y border-rule bg-panel",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:py-20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium text-signal",
								children: "What verification changes"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-4 text-4xl leading-[1.04] sm:text-5xl",
								children: "A property is not a promise until it can fail."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 max-w-md text-muted",
								children: "Tests search for examples. Verification checks a written rule across the modeled transitions."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProofGraph, {})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-signal",
						children: "Capabilities"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 text-4xl sm:text-5xl",
						children: "Security work with a clear standard of evidence."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 border-t border-rule",
					children: SERVICES.map((service) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: service.to,
						className: "group grid gap-4 border-b border-rule py-6 sm:grid-cols-[0.75fr_1.25fr_auto] sm:items-center sm:gap-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-serif text-2xl sm:text-3xl",
								children: service.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-xl text-muted",
								children: service.body
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
								className: "size-5 text-signal transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
								"aria-hidden": "true"
							})
						]
					}, service.title))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-rule bg-ink text-on-signal",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:py-20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-on-signal/60",
						children: "An engagement starts with precision."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 max-w-2xl text-4xl leading-tight sm:text-5xl",
						children: "Bring the property that cannot be wrong."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						className: "inline-flex h-12 items-center bg-bone px-5 text-sm font-medium text-ink transition-colors hover:bg-panel",
						children: "Start a conversation"
					}) })]
				})
			})
		]
	});
}
//#endregion
export { Home as component };
