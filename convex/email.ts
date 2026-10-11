import Mailgun from "mailgun.js";
import formData from "form-data";

type SendEmailOptions = {
  to: string;
  subject: string;
  html: string;
};

async function sendViaSpecodeRelay({
  to,
  subject,
  html,
}: Pick<SendEmailOptions, "to" | "subject" | "html">) {
  const relayUrl = process.env.SPECODE_EMAIL_RELAY_URL;
  const relayToken = process.env.SPECODE_EMAIL_RELAY_TOKEN;

  if (!relayUrl || !relayToken) {
    throw new Error("Specode relay is not configured for this project.");
  }

  try {
    const response = await fetch(relayUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${relayToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to, subject, html }),
    });

    if (!response.ok) {
      throw new Error("Specode managed email failed.");
    }
  } catch {
    // External errors may contain message content or credentials. Never forward them.
    throw new Error("Specode managed email failed.");
  }
}

export async function sendEmail({
  to,
  subject,
  html,
}: SendEmailOptions) {
  const apiKey = process.env.MAILGUN_API_KEY;
  const domain = process.env.MAILGUN_DOMAIN;
  const fromEmail = process.env.AUTH_EMAIL;
  const hasCustomMailgunConfig = Boolean(apiKey && domain && fromEmail);
  const hasPartialCustomMailgunConfig = Boolean(apiKey || domain || fromEmail);
  const useSpecodeRelay = process.env.SPECODE_EMAIL_MODE === "platform";

  if (hasCustomMailgunConfig) {
    if (!apiKey || !domain || !fromEmail) {
      throw new Error("Custom Mailgun config is incomplete.");
    }

    const fromName = process.env.AUTH_EMAIL_NAME;
    const fromAddress = fromName ? `${fromName} <${fromEmail}>` : fromEmail;
    try {
      const mailgun = new Mailgun(formData);
      const client = mailgun.client({ username: "api", key: apiKey });

      await client.messages.create(domain, {
        from: fromAddress,
        to,
        subject,
        html,
      });
    } catch {
      // Discard provider exceptions without logging or attaching their details.
      throw new Error("Custom email delivery failed.");
    }
    return;
  }

  if (useSpecodeRelay) {
    if (hasPartialCustomMailgunConfig) {
      console.warn(
        "Incomplete custom Mailgun config detected. Falling back to Specode managed email."
      );
    }

    await sendViaSpecodeRelay({ to, subject, html });
    return;
  }

  // No delivery method configured. Do NOT fall back to logging the OTP code,
  // magic link, or recipient address: those are sensitive auth credentials and
  // (for the address) PHI under HIPAA, and console output is retained in server
  // logs outside the app's access controls. Emit a non-sensitive notice with
  // setup guidance instead — configure Mailgun or Specode managed email to
  // deliver auth emails (including in local development).
  if (!apiKey || !domain || !fromEmail) {
    const setupHint = !apiKey
      ? "Set Mailgun credentials, or provision this project through Specode managed email."
      : !domain
        ? "Set MAILGUN_DOMAIN to your Mailgun sending domain."
        : "Set AUTH_EMAIL to a verified Mailgun sender address.";
    console.warn(`Email not sent: no delivery method configured. ${setupHint}`);
    return;
  }
}
