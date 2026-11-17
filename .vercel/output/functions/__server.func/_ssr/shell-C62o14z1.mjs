import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react, b as Link, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Menu, t as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-C62o14z1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		to: "/formal-verification",
		label: "Verification",
		exact: false
	},
	{
		to: "/services",
		label: "Services",
		exact: false
	},
	{
		to: "/methodology",
		label: "Method",
		exact: false
	},
	{
		to: "/research",
		label: "Research",
		exact: false
	},
	{
		to: "/about",
		label: "About",
		exact: false
	},
	{
		to: "/contact",
		label: "Contact",
		exact: false
	}
];
var OFFERINGS = [
	{
		index: "01",
		title: "EVM and Solidity reviews",
		fits: "Contracts that will hold value, or already do, including proxies and upgrade diffs.",
		leave: "A report ordered by invariant, with proofs, and a fix-verification pass.",
		detail: "Manual review of Solidity against the properties you cannot afford to violate. Storage layout and initializer re-entry are in scope when the system upgrades. Fuzzing only where a property earns it."
	},
	{
		index: "02",
		title: "Solana and Anchor reviews",
		fits: "Programs where accounts, PDAs, and CPIs are the attack surface.",
		leave: "Account-constraint findings with a transaction that demonstrates the break.",
		detail: "Signer checks, account substitution, PDA derivation, remaining accounts, and token-2022 extensions. The difference between an account that looks like an oracle and one that is."
	},
	{
		index: "03",
		title: "DeFi protocol reviews",
		fits: "Lending, vaults, AMMs, and other systems where value moves through accounting.",
		leave: "A value-flow map and the reads that can be stale, substituted, or rounded against the protocol.",
		detail: "Share inflation, donation attacks, rounding direction, and the economic path an attacker actually takes. This is a code and accounting review, not a promise about market risk."
	},
	{
		index: "04",
		title: "Oracle, bridge, and integration reviews",
		fits: "A price, a message, or a foreign contract sits on the trust boundary.",
		leave: "The specific check that was missing, and what the system should do when the read fails.",
		detail: "Heartbeat and min/max answers, domain separation, replay, and cross-chain messages that can be reordered. Offered when that boundary is actually in the repos under review."
	},
	{
		index: "05",
		title: "Agent permissions and session keys",
		fits: "A wallet, session key, or agent that can spend, sign, or call on a person’s behalf.",
		leave: "A policy review: what it may touch, what happens when a feed is stale, and how a human revokes it.",
		detail: "Allowlists, spend caps, and fail-closed behavior. The gap between “the prompt said not to” and “the chain will not allow it.” Offered only for systems that actually delegate authority."
	}
];
var PREP = [
	"Repository access, or a note that the code is not ready to share yet.",
	"Deployed addresses, if anything is already live.",
	"Who can upgrade, pause, or move funds.",
	"Prior reviews, and what they did not cover.",
	"The date you need a first read, and what is explicitly out of scope."
];
var CLASSES = [
	{
		id: "C01",
		title: "Stale oracle read",
		chain: "EVM",
		severity: "High",
		surface: "Price feeds",
		summary: "latestRoundData() is treated as a price. No heartbeat, no min answer, no check that the round is complete.",
		assumption: "The latest round is a current, complete price.",
		impact: "Borrowing or minting can clear against a price the feed no longer stands behind.",
		proof: "Freeze or stall the feed past the heartbeat the protocol claims to tolerate. Borrow or mint against a price that no longer exists. The transaction succeeds because the code never asked how old the answer was.",
		check: "Heartbeat, answeredInRound, min/max bounds, and what the protocol does when the feed is down — pause, or proceed.",
		lesson: "Treat a missing, stale, or partial round as a halt, not as a price."
	},
	{
		id: "C02",
		title: "Substituted oracle account",
		chain: "Solana",
		severity: "Critical",
		surface: "Lending programs",
		summary: "The program trusts an account because it has the right shape, not because it is the oracle the protocol deployed.",
		assumption: "Any account with the oracle layout is the protocol’s oracle.",
		impact: "An attacker-set price can back a borrow the real feed would refuse.",
		proof: "Pass an attacker-owned account where the oracle belongs. Write a price. Borrow against it. The constraint that should have been an address check was a type check.",
		check: "Address constraints, PDA seeds, and whether a remaining account can stand in for a feed, a reserve, or a mint.",
		lesson: "Bind the feed by address or derivation, not by struct shape."
	},
	{
		id: "C03",
		title: "Upgrade layout collision",
		chain: "EVM",
		severity: "High",
		surface: "Proxies",
		summary: "A new variable lands on top of an old one, or an initializer can run again after the upgrade.",
		assumption: "Appending a variable, or shipping a new implementation, leaves old state meaningful.",
		impact: "An admin, a pause flag, or an accounting slot can decode as something else after the upgrade.",
		proof: "Upgrade on a fork. Read the slot that used to be an admin or a pause flag. It now decodes as something else, and the new initializer is still callable.",
		check: "Storage gaps, inheritance order, initializer modifiers, and who can call upgradeTo.",
		lesson: "Diff the storage layout and the initializer path, not just the new functions."
	},
	{
		id: "C04",
		title: "CPI with a borrowed signer",
		chain: "Solana",
		severity: "High",
		surface: "Anchor programs",
		summary: "A CPI signs with a PDA the attacker can aim, or it forwards remaining accounts the program never validated.",
		assumption: "A PDA signer implies the destination account is the one the program intended.",
		impact: "Tokens or mint authority can move because the seeds match, not because the target is correct.",
		proof: "Build a transaction that lands the PDA signer on a token account the program did not intend. The privilege is real because the seeds match, not because the destination is correct.",
		check: "Signer seeds, program id on the CPI, and every account that can move tokens or change a mint authority.",
		lesson: "Validate the destination and the program id on every privileged CPI."
	},
	{
		id: "C05",
		title: "Share inflation",
		chain: "EVM",
		severity: "Medium",
		surface: "Vaults",
		summary: "The first depositor, or a direct token donation, moves the exchange rate so the next depositor’s shares round to zero.",
		assumption: "The exchange rate stays fair when the vault is empty or nearly empty.",
		impact: "A later depositor can receive zero shares while the donated assets stay with the attacker.",
		proof: "Donate to an empty or near-empty vault, then deposit the minimum. Shares mint to zero and the donation stays with the attacker.",
		check: "Virtual offset, minimum liquidity lock, and rounding direction on both mint and redeem.",
		lesson: "Lock dead shares or offset the rate before the first real deposit."
	},
	{
		id: "C06",
		title: "Session key without a fence",
		chain: "Agents",
		severity: "High",
		surface: "Smart wallets",
		summary: "A session key can call any contract, for any amount, until a timestamp. The policy lives in a prompt.",
		assumption: "The agent will only call what it was told to call.",
		impact: "The key can spend up to the wallet, not up to a cap, against contracts nobody allowlisted.",
		proof: "Use the session key against a contract that was never on the allowlist. Drain up to the implicit maximum, which is the wallet.",
		check: "Contract allowlist, function selector, spend cap, expiry, and a revoke that does not depend on the agent cooperating.",
		lesson: "Enforce the policy on-chain. A prompt is not an allowlist."
	},
	{
		id: "C07",
		title: "Cross-chain replay",
		chain: "Cross-chain",
		severity: "High",
		surface: "Bridges and messaging",
		summary: "A message is valid, and it is valid again. Nonce, chain id, or source address was never bound into the proof.",
		assumption: "A valid attestation can be consumed only once, on one domain.",
		impact: "The same payload can mint, release, or execute again.",
		proof: "Submit the same attested payload on the destination twice, or on a second chain that shares the verifier.",
		check: "Domain separation, consumed-message bitmaps, and who is allowed to be the sender on the source.",
		lesson: "Bind chain, contract, and nonce into the signed payload, then mark it consumed."
	},
	{
		id: "C08",
		title: "Fail-open on a dead feed",
		chain: "Agents",
		severity: "High",
		surface: "Agent payments",
		summary: "An agent is allowed to pay when the price, the policy oracle, or the kill switch cannot be read.",
		assumption: "A failed read is a safe default, or a rare case that can be ignored.",
		impact: "Funds move because the check errored, not because the policy allowed it.",
		proof: "Take the read offline. The agent proceeds because the error path returns a default allow instead of a halt.",
		check: "Every external read has an explicit deny. Stale, missing, and reverted are the same outcome: do not move funds.",
		lesson: "Default to deny. Stale, missing, and reverted are one outcome."
	}
];
var REFUSALS = [
	"We do not sell an audit badge for a launch announcement.",
	"We do not review code we did not read.",
	"We do not publish private findings.",
	"We do not staff a model and call the output a review. Search can be assisted. A person signs the report."
];
var QUESTIONS = [
	"What must not break, in one sentence?",
	"What is already deployed, and at which addresses?",
	"Who can upgrade, pause, or move funds?",
	"What did the last review miss, or never cover?",
	"What is explicitly out of scope?"
];
var INQUIRY_EMAIL = "ramprasadgoud34@gmail.com";
function inquiryMailto(subject, body) {
	const params = new URLSearchParams();
	params.set("subject", subject);
	if (body) params.set("body", body);
	return `mailto:${INQUIRY_EMAIL}?${params.toString()}`;
}
var LINKS = {
	principal: "https://www.ramprasadgoud.dev",
	writing: "https://www.ramprasadgoud.dev/blog",
	github: "https://github.com/Ramprasad4121",
	sentinel: "https://github.com/Ramprasad4121/anchor-sentinel"
};
function planningRange(size, surface) {
	if (size === "15k+" || size === "Not sure") return "We will not invent a week count. The range comes after the repo is actually opened.";
	if (surface === "Upgrade diff" && (size === "Under 1k" || size === "1–5k")) return "A diff of this size is often one to two weeks, including the fix check.";
	if (size === "Under 1k") return "Often about a week, including the fix check. Not a quote.";
	if (size === "1–5k") return "Often two to three weeks, including the fix check. Not a quote.";
	if (surface === "Solana program" && size === "5–15k") return "Often three to five weeks, including the fix check. Not a quote.";
	return "Often three to five weeks, including the fix check. Not a quote.";
}
function Mark({ className = "size-8" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: "/favicon.svg",
		alt: "",
		className
	});
}
function Shell({ page, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-bone text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#content",
				className: "sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-signal focus:px-3 focus:py-2 focus:text-on-signal",
				children: "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "content",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, { page })
		]
	});
}
function Header() {
	const path = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [path]);
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-30 border-b border-rule bg-bone/95 backdrop-blur-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2.5 text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "size-8 text-signal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[15px] font-medium tracking-tight",
						children: ["R12 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "Labs"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "hidden items-center gap-5 lg:flex",
					"aria-label": "Primary",
					children: [NAV.filter((item) => item.to !== "/contact").map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavItem, {
						path,
						...item
					}, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						className: "inline-flex h-11 items-center bg-signal px-4 text-sm font-medium text-on-signal",
						children: "Discuss a project"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "inline-flex size-11 items-center justify-center border border-rule lg:hidden",
					"aria-expanded": open,
					"aria-controls": "mobile-nav",
					onClick: () => setOpen((v) => !v),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: open ? "Close menu" : "Open menu"
					}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })]
				})
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			id: "mobile-nav",
			className: "border-t border-rule bg-bone px-5 py-4 lg:hidden",
			"aria-label": "Mobile",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col",
				children: NAV.map((item) => {
					const active = item.exact ? path === item.to : path === item.to || path.startsWith(`${item.to}/`);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "border-b border-rule",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: `flex h-14 items-center justify-between font-serif text-2xl ${active ? "text-ink" : "text-muted"}`,
							"aria-current": active ? "page" : void 0,
							children: [item.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs tracking-widest",
								children: active ? "●" : "→"
							})]
						})
					}, item.to);
				})
			})
		}) : null]
	});
}
function NavItem({ to, label, path }) {
	const active = path === to || path.startsWith(`${to}/`);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		className: `text-sm ${active ? "text-ink" : "text-muted hover:text-ink"}`,
		"aria-current": active ? "page" : void 0,
		children: label
	});
}
function Footer({ page }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-rule",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.2fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "size-7 text-signal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-base font-medium tracking-tight",
						children: "R12 Labs"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-sm text-muted",
					children: "Formal verification and security engineering for EVM and Solana. Proof for the properties we specify. An audit when the question is adversarial, not mathematical."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 font-mono text-xs tracking-widest text-muted uppercase",
					children: page
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-8 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-3",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						className: "text-muted hover:text-ink",
						children: item.label
					}, item.to))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "text-muted hover:text-ink",
							href: LINKS.principal,
							rel: "noreferrer",
							target: "_blank",
							children: "Principal"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "text-muted hover:text-ink",
							href: LINKS.github,
							rel: "noreferrer",
							target: "_blank",
							children: "GitHub"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "text-muted hover:text-ink",
							href: LINKS.writing,
							rel: "noreferrer",
							target: "_blank",
							children: "Writing"
						})
					]
				})]
			})]
		})
	});
}
function Kicker({ index, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "font-mono text-xs tracking-widest text-muted uppercase",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-signal",
				children: index
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "px-2",
				children: "/"
			}),
			children
		]
	});
}
//#endregion
export { OFFERINGS as a, REFUSALS as c, planningRange as d, LINKS as i, Shell as l, INQUIRY_EMAIL as n, PREP as o, Kicker as r, QUESTIONS as s, CLASSES as t, inquiryMailto as u };
