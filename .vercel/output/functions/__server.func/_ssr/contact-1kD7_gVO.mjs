import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-1kD7_gVO.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
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
	if (!ENGAGEMENTS.includes(inquiry.engagement)) throw new Error("Please choose an engagement type.");
	if (inquiry.codeState && !CODE_STATES.includes(inquiry.codeState)) throw new Error("Invalid code availability.");
	if (inquiry.timing && !TIMEFRAMES.includes(inquiry.timing)) throw new Error("Invalid desired window.");
	return inquiry;
}
function emailText(inquiry) {
	return [
		"New R12 Labs engagement enquiry",
		"",
		`Name: ${inquiry.name}`,
		`Email: ${inquiry.email}`,
		`Organisation / protocol: ${inquiry.organization}`,
		`Engagement: ${inquiry.engagement}`,
		inquiry.system ? `System and scope: ${inquiry.system}` : "",
		inquiry.codeState ? `Code availability: ${inquiry.codeState}` : "",
		inquiry.timing ? `Timing: ${inquiry.timing}` : "",
		"",
		"Property or risk to understand:",
		inquiry.property
	].filter(Boolean).join("\n");
}
var sendContactInquiry_createServerFn_handler = createServerRpc({
	id: "497d8ee56a1c086622bf5efeb9634a57811154190199405cf4fcb76b4160ea2a",
	name: "sendContactInquiry",
	filename: "src/lib/r12/contact.ts"
}, (opts) => sendContactInquiry.__executeServer(opts));
var sendContactInquiry = createServerFn({ method: "POST" }).validator(validateInquiry).handler(sendContactInquiry_createServerFn_handler, async ({ data }) => {
	if (data.website) return { ok: true };
	const apiKey = process.env.RESEND_API_KEY;
	const from = process.env.RESEND_FROM_EMAIL;
	if (!apiKey || !from) return {
		ok: false,
		message: "The contact service is not configured yet. Please email the team directly."
	};
	try {
		const response = await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				from,
				to: [process.env.RESEND_CONTACT_TO || "ramprasadgoud34@gmail.com"],
				reply_to: data.email,
				subject: `R12 Labs enquiry — ${data.engagement} — ${data.organization}`,
				text: emailText(data)
			})
		});
		if (!response.ok) {
			console.error("Resend rejected a contact enquiry", response.status);
			return {
				ok: false,
				message: "We could not send your enquiry. Please email the team directly."
			};
		}
		return { ok: true };
	} catch (error) {
		console.error("Contact email delivery failed", error);
		return {
			ok: false,
			message: "We could not send your enquiry. Please email the team directly."
		};
	}
});
//#endregion
export { sendContactInquiry_createServerFn_handler };
