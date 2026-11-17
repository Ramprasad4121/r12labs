import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as PREP, c as Shell, l as planningRange, n as Kicker, o as QUESTIONS } from "./shell-DjWdkspT.mjs";
import { a as string, i as object, t as _enum } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-BmLhVISg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var scopeSchema = object({
	name: string().trim().min(2, "Name is required."),
	email: string().trim().email("Use an email a reply can reach."),
	protocol: string().trim().min(2, "Name the protocol or the repo."),
	chain: _enum([
		"EVM",
		"Solana",
		"Both",
		"Not sure"
	]),
	kind: _enum([
		"Formal verification",
		"Security audit",
		"Research",
		"Not sure"
	]),
	surface: _enum([
		"Contracts",
		"Solana program",
		"Upgrade diff",
		"Oracle and accounting",
		"Agent policy"
	]),
	stage: _enum([
		"Design",
		"Pre-launch",
		"Live",
		"Incident"
	]),
	size: _enum([
		"Under 1k",
		"1–5k",
		"5–15k",
		"15k+",
		"Not sure"
	]),
	needed: string().trim().min(2, "Say when you need a first read."),
	invariants: string().trim().min(12, "Name one thing that must not break.")
});
var KEY = "r12-scopes";
function loadScopes() {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.filter(isStored);
	} catch {
		return [];
	}
}
function saveScope(input) {
	const next = {
		...input,
		id: makeId(),
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	const all = [next, ...loadScopes()].slice(0, 12);
	window.localStorage.setItem(KEY, JSON.stringify(all));
	return next;
}
function briefText(scope) {
	return [
		"R12 Labs — scope brief",
		`Name: ${scope.name}`,
		`Email: ${scope.email}`,
		`Protocol: ${scope.protocol}`,
		`Chain: ${scope.chain}`,
		`Engagement: ${scope.kind}`,
		`Surface: ${scope.surface}`,
		`Stage: ${scope.stage}`,
		`Size: ${scope.size}`,
		`Needed: ${scope.needed}`,
		`Must not break: ${scope.invariants}`
	].join("\n");
}
function makeId() {
	const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	const bytes = /* @__PURE__ */ new Uint8Array(4);
	crypto.getRandomValues(bytes);
	let body = "";
	for (const byte of bytes) body += alphabet[byte % 32];
	return `R12-${body}`;
}
function isStored(value) {
	if (!value || typeof value !== "object") return false;
	const row = value;
	return typeof row.id === "string" && typeof row.protocol === "string";
}
var EMPTY = {
	name: "",
	email: "",
	protocol: "",
	chain: "EVM",
	kind: "Formal verification",
	surface: "Contracts",
	stage: "Pre-launch",
	size: "1–5k",
	needed: "",
	invariants: ""
};
function ScopeForm() {
	const [values, setValues] = (0, import_react.useState)(EMPTY);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [saved, setSaved] = (0, import_react.useState)(null);
	const [prior, setPrior] = (0, import_react.useState)([]);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [copyError, setCopyError] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setPrior(loadScopes());
	}, [saved]);
	const range = planningRange(values.size, values.surface);
	function update(key, value) {
		setValues((current) => ({
			...current,
			[key]: value
		}));
		setErrors((current) => ({
			...current,
			[key]: void 0
		}));
	}
	function onSubmit(event) {
		event.preventDefault();
		const parsed = scopeSchema.safeParse(values);
		if (!parsed.success) {
			const next = {};
			for (const issue of parsed.error.issues) {
				const key = issue.path[0];
				if (typeof key === "string" && !(key in next)) next[key] = issue.message;
			}
			setErrors(next);
			setSaved(null);
			return;
		}
		const row = saveScope(parsed.data);
		setSaved(row);
		setCopied(false);
		setValues(EMPTY);
	}
	async function copy(scope) {
		try {
			await navigator.clipboard.writeText(briefText(scope));
			setCopied(true);
			setCopyError(false);
		} catch {
			setCopied(false);
			setCopyError(true);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "border border-rule",
			onSubmit,
			noValidate: true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-b border-rule px-4 py-3 font-mono text-xs tracking-widest text-muted uppercase sm:px-5",
					children: "Scope brief — kept in this browser"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-5 px-4 py-6 sm:px-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Name",
							error: errors.name,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								value: values.name,
								autoComplete: "name",
								onChange: (e) => update("name", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Email",
							error: errors.email,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								type: "email",
								value: values.email,
								autoComplete: "email",
								onChange: (e) => update("email", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Protocol or repo",
							error: errors.protocol,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								value: values.protocol,
								onChange: (e) => update("protocol", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-5 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									label: "Engagement",
									value: values.kind,
									options: [
										"Formal verification",
										"Security audit",
										"Research",
										"Not sure"
									],
									onChange: (value) => update("kind", value)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									label: "Chain",
									value: values.chain,
									options: [
										"EVM",
										"Solana",
										"Both",
										"Not sure"
									],
									onChange: (value) => update("chain", value)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									label: "Stage",
									value: values.stage,
									options: [
										"Design",
										"Pre-launch",
										"Live",
										"Incident"
									],
									onChange: (value) => update("stage", value)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							label: "Surface",
							value: values.surface,
							options: [
								"Contracts",
								"Solana program",
								"Upgrade diff",
								"Oracle and accounting",
								"Agent policy"
							],
							onChange: (value) => update("surface", value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							label: "Approximate size",
							value: values.size,
							options: [
								"Under 1k",
								"1–5k",
								"5–15k",
								"15k+",
								"Not sure"
							],
							onChange: (value) => update("size", value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "When you need a first read",
							error: errors.needed,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								value: values.needed,
								placeholder: "A date, or ‘before the upgrade’",
								onChange: (e) => update("needed", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "What must not break",
							error: errors.invariants,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								className: "min-h-28 w-full resize-y border border-rule bg-bone px-3 py-3 font-serif text-ink outline-none focus:border-ink",
								value: values.invariants,
								onChange: (e) => update("invariants", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "border-l-2 border-signal pl-4 text-muted",
							children: range
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "h-12 bg-signal text-sm font-medium text-on-signal",
							children: "Save brief"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Saving does not send this brief. It stays in this browser until you copy it or open it in your own mail client."
						})
					]
				}),
				saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-rule bg-panel px-4 py-5 sm:px-5",
					role: "status",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-xs tracking-widest text-signal uppercase",
							children: [
								"Brief ",
								saved.id,
								" · not sent"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-serif text-2xl",
							children: "Saved on this device only."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-muted",
							children: [
								saved.protocol,
								" · ",
								saved.chain,
								" · ",
								saved.surface,
								". This page did not deliver it."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-col gap-3 sm:flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "h-11 border border-rule px-4 text-sm",
								onClick: () => copy(saved),
								children: copied ? "Copied" : "Copy brief"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "inline-flex h-11 items-center justify-center bg-signal px-4 text-sm font-medium text-on-signal",
								href: `mailto:?subject=${encodeURIComponent(`R12 Labs scope brief ${saved.id}`)}&body=${encodeURIComponent(briefText(saved))}`,
								children: "Open in your mail client"
							})]
						}),
						copyError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-signal",
							children: "Clipboard was blocked. Use the mail link, or select the brief from a saved draft."
						}) : null
					]
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-xs tracking-widest text-muted uppercase",
			children: "Drafts on this device"
		}), prior.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-muted",
			children: "None yet. A saved brief stays in local storage."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 border-t border-rule",
			children: prior.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "border-b border-rule py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs tracking-widest text-signal",
						children: row.id
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-serif text-xl",
						children: row.protocol
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							row.chain,
							" · ",
							row.stage,
							" · ",
							row.size
						]
					})
				]
			}, row.id))
		})] })]
	});
}
var inputClass = "h-12 w-full border border-rule bg-bone px-3 font-serif text-ink outline-none focus:border-ink";
function Field({ label, error, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-[11px] tracking-widest text-muted uppercase",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-2 block",
				children
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 block text-sm text-signal",
				children: error
			}) : null
		]
	});
}
function Select({ label, value, options, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono text-[11px] tracking-widest text-muted uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			className: `${inputClass} mt-2`,
			value,
			onChange: (event) => onChange(event.target.value),
			children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: option,
				children: option
			}, option))
		})]
	});
}
function ContactPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		page: "Contact",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-5 pt-14 pb-8 sm:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, {
						index: "06",
						children: "Contact"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 max-w-3xl text-5xl leading-[1.05] sm:text-6xl",
						children: "Discuss a verification project."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-2xl text-lg text-muted",
						children: "Use this for a formal verification, a security audit, a research conversation, or a technical partnership. No public inbox is configured. Saving a brief keeps it in this browser. It is not delivered. Copy it, or open it in your own mail client and choose the recipient."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-6xl px-5 pb-12 sm:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScopeForm, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-rule",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-serif text-3xl",
							children: "What happens next"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
							className: "mt-4 space-y-3 text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "1. You send the brief. We do not receive it from this page." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "2. If the surface is in scope, we reply with what is in and what is out." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "3. The week range in the form is a planning hint, not a quote or a start date." })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-sm text-muted",
							children: "Confidentiality starts when a review is agreed, not when a draft sits in local storage. Do not paste exploits or keys into the brief."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-3xl",
						children: "Have this ready"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 border-t border-rule",
						children: PREP.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "border-b border-rule py-3 text-muted",
							children: item
						}, item))
					})] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-rule bg-panel",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-8 md:grid-cols-[0.7fr_1.3fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-3xl",
						children: "We will ask these if the brief skips them."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "border-t border-rule",
						children: QUESTIONS.map((question, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-4 border-b border-rule py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-signal",
								children: String(index + 1).padStart(2, "0")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-serif text-xl",
								children: question
							})]
						}, question))
					})]
				})
			})
		]
	});
}
//#endregion
export { ContactPage as component };
