import { i as __toESM } from "../_runtime.mjs";
import { i as INQUIRY_EMAIL, n as Shell } from "./shell-DenqLIPB.mjs";
import { S as require_jsx_runtime, X as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-CZ_7Z4qO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var ENGAGEMENTS$1 = [
	"Formal verification",
	"Security review",
	"Verification strategy"
];
var CODE_STATES$1 = [
	"Public repository",
	"Private repository",
	"Still in design",
	"Prefer to discuss first"
];
var TIMEFRAMES$1 = [
	"Planning the work",
	"Within four weeks",
	"One to two months",
	"No fixed window"
];
var clean = (value, maxLength) => typeof value === "string" ? value.trim().slice(0, maxLength) : "";
function validateInquiry(input) {
	if (!input || typeof input !== "object") throw new Error("Invalid enquiry.");
	const values = input;
	const inquiry = {
		name: clean(values.name, 120),
		email: clean(values.email, 254),
		organization: clean(values.organization, 160),
		engagement: clean(values.engagement, 80),
		system: clean(values.system, 500),
		property: clean(values.property, 4e3),
		codeState: clean(values.codeState, 80),
		timing: clean(values.timing, 80),
		website: clean(values.website, 200)
	};
	if (!inquiry.name || !inquiry.organization || !inquiry.property) throw new Error("Please complete the required fields.");
	if (!/^\S+@\S+\.\S+$/.test(inquiry.email)) throw new Error("Please provide a valid work email.");
	if (!ENGAGEMENTS$1.includes(inquiry.engagement)) throw new Error("Please choose an engagement type.");
	if (inquiry.codeState && !CODE_STATES$1.includes(inquiry.codeState)) throw new Error("Invalid code availability.");
	if (inquiry.timing && !TIMEFRAMES$1.includes(inquiry.timing)) throw new Error("Invalid desired window.");
	return inquiry;
}
var sendContactInquiry = createServerFn({ method: "POST" }).validator(validateInquiry).handler(createSsrRpc("497d8ee56a1c086622bf5efeb9634a57811154190199405cf4fcb76b4160ea2a"));
var ENGAGEMENTS = [
	"Formal verification",
	"Security review",
	"Verification strategy"
];
var CODE_STATES = [
	"Public repository",
	"Private repository",
	"Still in design",
	"Prefer to discuss first"
];
var TIMEFRAMES = [
	"Planning the work",
	"Within four weeks",
	"One to two months",
	"No fixed window"
];
var EMPTY = {
	name: "",
	email: "",
	organization: "",
	engagement: "",
	property: "",
	system: "",
	codeState: "",
	timing: "",
	website: ""
};
function ScopeForm() {
	const [values, setValues] = (0, import_react.useState)(EMPTY);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [message, setMessage] = (0, import_react.useState)("");
	function update(field, value) {
		setValues((current) => ({
			...current,
			[field]: value
		}));
		setErrors((current) => ({
			...current,
			[field]: void 0
		}));
		if (status === "error") setStatus("idle");
	}
	async function submit(event) {
		event.preventDefault();
		const next = {};
		if (!values.name.trim()) next.name = "Enter your name.";
		if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = "Enter a valid work email.";
		if (!values.organization.trim()) next.organization = "Enter the company or protocol.";
		if (!values.engagement) next.engagement = "Choose one.";
		if (!values.property.trim()) next.property = "Describe the property or risk.";
		setErrors(next);
		if (Object.keys(next).length) return;
		setStatus("sending");
		setMessage("");
		try {
			const result = await sendContactInquiry({ data: {
				...values,
				engagement: values.engagement,
				codeState: values.codeState || void 0,
				timing: values.timing || void 0
			} });
			if (result.ok) {
				setStatus("sent");
				return;
			}
			setStatus("error");
			setMessage(result.message);
		} catch {
			setStatus("error");
			setMessage("We could not send your enquiry. Please email the team directly.");
		}
	}
	if (status === "sent") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-2xl border-t border-ink pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-signal",
				children: "Enquiry sent"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 text-3xl",
				children: "We will reply by email."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => {
					setValues(EMPTY);
					setStatus("idle");
				},
				className: "mt-7 site-link text-sm text-ink",
				children: "Send another enquiry"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		noValidate: true,
		className: "max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-rule pb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-signal",
					children: "Engagement enquiry"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-muted",
					children: "Do not include private keys, credentials, or unpublished vulnerability details."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-7 grid gap-6 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Your name",
					error: errors.name,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: values.name,
						autoComplete: "name",
						onChange: (event) => update("name", event.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Work email",
					error: errors.email,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "email",
						value: values.email,
						autoComplete: "email",
						onChange: (event) => update("email", event.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Company or protocol",
					error: errors.organization,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: values.organization,
						onChange: (event) => update("organization", event.target.value)
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				className: "mt-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "text-sm font-medium text-ink",
						children: "Engagement"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: ENGAGEMENTS.map((engagement) => {
							const selected = values.engagement === engagement;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": selected,
								onClick: () => update("engagement", engagement),
								className: `min-h-10 border px-3 text-sm transition-colors ${selected ? "border-ink bg-ink text-on-signal" : "border-rule bg-bone text-ink hover:border-ink"}`,
								children: engagement
							}, engagement);
						})
					}),
					errors.engagement ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-signal",
						children: errors.engagement
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-7",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "What must remain true?",
					error: errors.property,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						rows: 5,
						value: values.property,
						placeholder: "For example: collateral remains solvent across an upgrade.",
						onChange: (event) => update("property", event.target.value)
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "System and scope",
					optional: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: values.system,
						placeholder: "Chain, component, release, or change set",
						onChange: (event) => update("system", event.target.value)
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-6 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Code availability",
					optional: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: values.codeState,
						onChange: (event) => update("codeState", event.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Select one"
						}), CODE_STATES.map((state) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: state }, state))]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Desired window",
					optional: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: values.timing,
						onChange: (event) => update("timing", event.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Select one"
						}), TIMEFRAMES.map((timeframe) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: timeframe }, timeframe))]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sr-only",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: "website",
					children: "Website"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "website",
					tabIndex: -1,
					autoComplete: "off",
					value: values.website,
					onChange: (event) => update("website", event.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: status === "sending",
					className: "h-12 bg-signal px-5 text-sm font-medium text-on-signal transition-colors hover:bg-ink disabled:cursor-wait disabled:opacity-70",
					children: status === "sending" ? "Sending…" : "Send enquiry"
				}), status === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: `mailto:${INQUIRY_EMAIL}`,
					className: "site-link text-sm text-ink",
					children: "Email the team directly"
				}) : null]
			}),
			status === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-signal",
				role: "alert",
				children: message
			}) : null
		]
	});
}
function Field({ label, optional = false, error, children }) {
	const id = (0, import_react.useId)();
	const errorId = `${id}-error`;
	const control = (0, import_react.cloneElement)(children, {
		id,
		className: "w-full border-b border-rule bg-transparent py-3 text-base text-ink outline-none placeholder:text-muted focus:border-signal",
		"aria-invalid": error ? true : void 0,
		"aria-describedby": error ? errorId : void 0
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			htmlFor: id,
			className: "text-sm font-medium text-ink",
			children: [label, optional ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "pl-1 text-muted",
				children: "(optional)"
			}) : null]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1",
			children: control
		}),
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			id: errorId,
			className: "mt-2 text-sm text-signal",
			children: error
		}) : null
	] });
}
function ContactPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		page: "Contact",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-5 pt-14 pb-12 sm:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-signal",
					children: "Contact"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 max-w-4xl text-5xl leading-[1.02] sm:text-6xl",
					children: "Contact R12 Labs."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-xl text-lg text-muted",
					children: "Tell us what you need verified or reviewed."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-rule bg-panel",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-6xl px-5 py-12 sm:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScopeForm, {})
			})
		})]
	});
}
//#endregion
export { ContactPage as component };
