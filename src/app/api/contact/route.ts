import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { validateContactForm } from "@/lib/contactValidation";
import {
  buildNotificationEmail,
  buildNotificationEmailText,
  buildAutoReplyEmail,
  buildAutoReplyEmailText,
} from "@/lib/emailTemplates";

const OWNER_EMAIL = "yudiyahrian712@gmail.com";
const FROM_NAME = "Yudiya Portfolio";

// Lazy-init so the module loads fine even without RESEND_API_KEY at build time
function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Resend } = require("resend") as typeof import("resend");
  return new Resend(key);
}

export async function POST(request: NextRequest) {
  // ── 1. Rate limiting — max 3 per IP per hour ──────────────────────────────
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const { allowed, remaining, resetAfterMs } = rateLimit(ip, 3, 60 * 60 * 1000);

  if (!allowed) {
    const mins = Math.ceil(resetAfterMs / 60_000);
    return NextResponse.json(
      {
        success: false,
        error: `Too many submissions. Please try again in ${mins} minute${mins !== 1 ? "s" : ""}.`,
        field: null,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(resetAfterMs / 1000)),
          "X-RateLimit-Remaining": "0",
        },
      },
    );
  }

  // ── 2. Parse body ─────────────────────────────────────────────────────────
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body.", field: null },
      { status: 400 },
    );
  }

  // ── 3. Validate + honeypot ────────────────────────────────────────────────
  const result = validateContactForm(body);

  if (!result.valid) {
    // Empty errors = honeypot triggered — respond 200 to fool the bot
    if (result.errors.length === 0) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json(
      {
        success: false,
        error: result.errors[0].message,
        field: result.errors[0].field,
        errors: result.errors,
      },
      { status: 422 },
    );
  }

  const data = result.data!;

  // ── 4. Check Resend is configured ────────────────────────────────────────
  const resend = getResend();
  if (!resend) {
    console.error("[contact] RESEND_API_KEY is not set");
    return NextResponse.json(
      {
        success: false,
        error:
          "Email service is not configured. Please contact me directly at yudiyaahrian@gmail.com.",
        field: null,
      },
      { status: 503 },
    );
  }

  const FROM_EMAIL = process.env.FROM_EMAIL ?? "onboarding@resend.dev";

  // ── 5. Send both emails ───────────────────────────────────────────────────
  try {
    // , autoReplyResult include on array
    const [notifyResult] = await Promise.allSettled([
      // Notification to Yudiya
      resend.emails.send({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: [OWNER_EMAIL],
        replyTo: data.email,
        subject: `[Portfolio] ${data.subject} — from ${data.name}`,
        html: buildNotificationEmail(data),
        text: buildNotificationEmailText(data),
        tags: [
          { name: "category", value: "contact-form" },
          {
            name: "subject",
            value: data.subject.toLowerCase().replace(/\s+/g, "-"),
          },
        ],
      }),

      // Auto-reply to sender
      // resend.emails.send({
      //   from: `${FROM_NAME} <${FROM_EMAIL}>`,
      //   to: [data.email],
      //   subject: `Got your message, ${data.name}! — Yudiya Ahrian`,
      //   html: buildAutoReplyEmail({ name: data.name, subject: data.subject }),
      //   text: buildAutoReplyEmailText({
      //     name: data.name,
      //     subject: data.subject,
      //   }),
      //   tags: [{ name: "category", value: "auto-reply" }],
      // }),
    ]);

    // Notification is critical — fail if it didn't send
    if (notifyResult.status === "rejected") {
      throw notifyResult.reason;
    }

    // Auto-reply failure is non-critical — just log it
    // if (autoReplyResult.status === "rejected") {
    //   console.warn(
    //     "[contact] Auto-reply failed (non-critical):",
    //     autoReplyResult.reason,
    //   );
    // }

    return NextResponse.json(
      { success: true, remaining },
      {
        status: 200,
        headers: { "X-RateLimit-Remaining": String(remaining) },
      },
    );
  } catch (err) {
    console.error("[contact] Resend error:", err);
    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to send your message. Please email me directly at yudiyaahrian@gmail.com.",
        field: null,
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
