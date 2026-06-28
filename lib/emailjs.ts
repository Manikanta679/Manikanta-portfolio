export const EMAILJS_NOT_CONFIGURED_MESSAGE =
  "EmailJS has not been configured yet. Please add your EmailJS credentials to .env.local.";

export class EmailJSNotConfiguredError extends Error {
  constructor() {
    super(EMAILJS_NOT_CONFIGURED_MESSAGE);
    this.name = "EmailJSNotConfiguredError";
  }
}

const EMAILJS_ENV_VARS = [
  {
    label: "EmailJS Public Key",
    get value() {
      return process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    },
  },
  {
    label: "EmailJS Service ID",
    get value() {
      return process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    },
  },
  {
    label: "EmailJS Template ID",
    get value() {
      return process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    },
  },
] as const;

export const emailjsConfig = {
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
} as const;

export type ContactFormPayload = {
  name: string;
  email: string;
  message: string;
};

export function isEmailjsConfigured(): boolean {
  const { publicKey, serviceId, templateId } = emailjsConfig;
  return Boolean(publicKey && serviceId && templateId);
}

export function logEmailjsConfigStatus(): void {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  for (const { label, value } of EMAILJS_ENV_VARS) {
    const status = value ? "loaded" : "missing";
    const symbol = value ? "✓" : "✗";
    console.log(`${symbol} ${label} ${status}`);
  }
}

export async function sendContactEmail(
  payload: ContactFormPayload
): Promise<void> {
  if (!isEmailjsConfigured()) {
    throw new EmailJSNotConfiguredError();
  }

  const { publicKey, serviceId, templateId } = emailjsConfig;
  const emailjs = (await import("@emailjs/browser")).default;

  emailjs.init({ publicKey });

  try {
    await emailjs.send(serviceId, templateId, {
      from_name: payload.name,
      from_email: payload.email,
      message: payload.message,
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[EmailJS] send failed:", error);
    }
    throw error;
  }
}
