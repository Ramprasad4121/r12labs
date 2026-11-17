import { createServerFn } from "@tanstack/react-start";
import { INQUIRY_EMAIL } from "./content";

const ENGAGEMENTS = ["Formal verification", "Security review", "Verification strategy"] as const;
const CODE_STATES = ["Public repository", "Private repository", "Still in design", "Prefer to discuss first"] as const;
const TIMEFRAMES = ["Planning the work", "Within four weeks", "One to two months", "No fixed window"] as const;

export type ContactInquiry = {
  name: string;
  email: string;
  organization: string;
  engagement: (typeof ENGAGEMENTS)[number];
  system?: string;
  property: string;
  codeState?: (typeof CODE_STATES)[number];
  timing?: (typeof TIMEFRAMES)[number];
  website?: string;
};

export type ContactDelivery = { ok: true } | { ok: false; message: string };

const clean = (value: unknown, maxLength: number) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

function validateInquiry(input: unknown): ContactInquiry {
  if (!input || typeof input !== "object") throw new Error("Invalid enquiry.");
  const values = input as Record<string, unknown>;
  const inquiry = {
    name: clean(values.name, 120),
    email: clean(values.email, 254),
    organization: clean(values.organization, 160),
    engagement: clean(values.engagement, 80),
    system: clean(values.system, 500),
    property: clean(values.property, 4000),
    codeState: clean(values.codeState, 80),
    timing: clean(values.timing, 80),
    website: clean(values.website, 200),
  };

  if (!inquiry.name || !inquiry.organization || !inquiry.property) throw new Error("Please complete the required fields.");
  if (!/^\S+@\S+\.\S+$/.test(inquiry.email)) throw new Error("Please provide a valid work email.");
  if (!ENGAGEMENTS.includes(inquiry.engagement as ContactInquiry["engagement"])) throw new Error("Please choose an engagement type.");
  if (inquiry.codeState && !CODE_STATES.includes(inquiry.codeState as Exclude<ContactInquiry["codeState"], undefined>)) throw new Error("Invalid code availability.");
  if (inquiry.timing && !TIMEFRAMES.includes(inquiry.timing as Exclude<ContactInquiry["timing"], undefined>)) throw new Error("Invalid desired window.");
  return inquiry as ContactInquiry;
}

function emailText(inquiry: ContactInquiry) {
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
    inquiry.property,
  ].filter(Boolean).join("\n");
}

export const sendContactInquiry = createServerFn({ method: "POST" })
  .validator(validateInquiry)
  .handler(async ({ data }): Promise<ContactDelivery> => {
    // A hidden field absorbs basic scripted spam without ever notifying the inbox.
    if (data.website) return { ok: true };

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;
    if (!apiKey || !from) {
      return { ok: false, message: "The contact service is not configured yet. Please email the team directly." };
    }

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to: [process.env.RESEND_CONTACT_TO || INQUIRY_EMAIL],
          reply_to: data.email,
          subject: `R12 Labs enquiry — ${data.engagement} — ${data.organization}`,
          text: emailText(data),
        }),
      });
      if (!response.ok) {
        console.error("Resend rejected a contact enquiry", response.status);
        return { ok: false, message: "We could not send your enquiry. Please email the team directly." };
      }
      return { ok: true };
    } catch (error) {
      console.error("Contact email delivery failed", error);
      return { ok: false, message: "We could not send your enquiry. Please email the team directly." };
    }
  });
