import { ContactFormData } from "./contactValidation";

export function buildNotificationEmail(data: ContactFormData): string {
  const { name, email, subject, message } = data;
  const receivedAt = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
    dateStyle: "full",
    timeStyle: "short",
  });

  // Escape HTML entities to prevent XSS in the rendered email
  const esc = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  // Convert newlines to <br> for the message body
  const messageHtml = esc(message).replace(/\n/g, "<br>");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Message — ${esc(subject)}</title>
  <!--[if mso]>
  <noscript>
    <xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#0F172A;font-family:'Courier New',Courier,monospace;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0F172A;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:600px;">

          <!-- ── HEADER ── -->
          <tr>
            <td style="background-color:#1E293B;border:3px solid #3B82F6;padding:0;">
              <!-- Pixel title bar -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#334155;padding:10px 16px;border-bottom:3px solid #3B82F6;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:12px;height:12px;background-color:#EF4444;margin-right:6px;display:inline-block;"></td>
                        <td style="width:6px;"></td>
                        <td style="width:12px;height:12px;background-color:#EAB308;display:inline-block;"></td>
                        <td style="width:6px;"></td>
                        <td style="width:12px;height:12px;background-color:#22C55E;display:inline-block;"></td>
                        <td style="width:12px;"></td>
                        <td style="font-family:'Courier New',monospace;font-size:10px;color:#94A3B8;letter-spacing:1px;">
                          NEW_MESSAGE.EXE
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- Logo area -->
                <tr>
                  <td style="padding:32px 32px 24px;text-align:center;">
                    <div style="display:inline-block;background-color:#3B82F6;border:2px solid #60A5FA;padding:8px 16px;margin-bottom:16px;">
                      <span style="font-family:'Courier New',monospace;font-size:14px;color:#ffffff;letter-spacing:2px;font-weight:bold;">
                        YUDIYA DEV
                      </span>
                    </div>
                    <p style="margin:0;font-family:'Courier New',monospace;font-size:11px;color:#64748B;letter-spacing:1px;">
                      ▓▓▓ PORTFOLIO CONTACT SYSTEM ▓▓▓
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── ALERT BANNER ── -->
          <tr>
            <td style="background-color:#1E3A5F;border-left:3px solid #3B82F6;border-right:3px solid #3B82F6;padding:14px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="width:10px;height:10px;background-color:#22C55E;" align="left"></td>
                  <td style="padding-left:10px;">
                    <span style="font-family:'Courier New',monospace;font-size:11px;color:#22C55E;letter-spacing:1px;font-weight:bold;">
                      ✓ NEW CONTACT FORM SUBMISSION RECEIVED
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── BODY ── -->
          <tr>
            <td style="background-color:#1E293B;border:3px solid #3B82F6;border-top:none;padding:32px;">

              <!-- Sender info block -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                     style="background-color:#0F172A;border:2px solid #334155;margin-bottom:24px;">
                <tr>
                  <td style="padding:12px 16px;border-bottom:1px solid #334155;background-color:#162032;">
                    <span style="font-family:'Courier New',monospace;font-size:10px;color:#3B82F6;letter-spacing:2px;">
                      // SENDER_INFO
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:6px 0;width:80px;vertical-align:top;">
                          <span style="font-family:'Courier New',monospace;font-size:11px;color:#64748B;">FROM</span>
                        </td>
                        <td style="padding:6px 0;">
                          <span style="font-family:'Courier New',monospace;font-size:13px;color:#E2E8F0;font-weight:bold;">
                            ${esc(name)}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;vertical-align:top;">
                          <span style="font-family:'Courier New',monospace;font-size:11px;color:#64748B;">EMAIL</span>
                        </td>
                        <td style="padding:6px 0;">
                          <a href="mailto:${esc(email)}"
                             style="font-family:'Courier New',monospace;font-size:13px;color:#3B82F6;text-decoration:none;">
                            ${esc(email)}
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;vertical-align:top;">
                          <span style="font-family:'Courier New',monospace;font-size:11px;color:#64748B;">RE</span>
                        </td>
                        <td style="padding:6px 0;">
                          <span style="font-family:'Courier New',monospace;font-size:13px;color:#A855F7;">
                            ${esc(subject)}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;vertical-align:top;">
                          <span style="font-family:'Courier New',monospace;font-size:11px;color:#64748B;">TIME</span>
                        </td>
                        <td style="padding:6px 0;">
                          <span style="font-family:'Courier New',monospace;font-size:11px;color:#64748B;">
                            ${esc(receivedAt)} (WIB)
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message block -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                     style="background-color:#0F172A;border:2px solid #334155;margin-bottom:24px;">
                <tr>
                  <td style="padding:12px 16px;border-bottom:1px solid #334155;background-color:#162032;">
                    <span style="font-family:'Courier New',monospace;font-size:10px;color:#3B82F6;letter-spacing:2px;">
                      // MESSAGE_BODY
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 16px;">
                    <p style="margin:0;font-family:'Courier New',monospace;font-size:13px;color:#CBD5E1;line-height:1.8;">
                      ${messageHtml}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Reply CTA -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                     style="margin-bottom:24px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${esc(email)}?subject=Re: ${esc(subject)}&body=Hi ${esc(name)},%0A%0A"
                       style="display:inline-block;background-color:#3B82F6;border:3px solid #1D4ED8;
                              padding:12px 28px;font-family:'Courier New',monospace;font-size:12px;
                              color:#ffffff;text-decoration:none;font-weight:bold;letter-spacing:1px;
                              box-shadow:4px 4px 0px #1D4ED8;">
                      ▶ REPLY TO ${esc(name.toUpperCase())}
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                     style="margin-bottom:20px;">
                <tr>
                  <td style="height:3px;background-image:repeating-linear-gradient(90deg,#3B82F6 0px,#3B82F6 8px,transparent 8px,transparent 12px);">
                  </td>
                </tr>
              </table>

              <!-- Footer note -->
              <p style="margin:0;font-family:'Courier New',monospace;font-size:10px;color:#475569;
                         text-align:center;letter-spacing:1px;line-height:1.8;">
                THIS MESSAGE WAS SENT VIA YOUR PORTFOLIO CONTACT FORM<br/>
                yudiya-porto.vercel.app&nbsp;·&nbsp; Depok, West Java, Indonesia<br/><br/>
                <span style="color:#334155;">▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░</span>
              </p>

            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Plain-text fallback for email clients that don't render HTML.
 */
export function buildNotificationEmailText(data: ContactFormData): string {
  const { name, email, subject, message } = data;
  const receivedAt = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
    dateStyle: "full",
    timeStyle: "short",
  });

  return `
NEW CONTACT FORM SUBMISSION — yudiyaahrian.dev
==============================================

FROM    : ${name}
EMAIL   : ${email}
SUBJECT : ${subject}
TIME    : ${receivedAt} (WIB)

MESSAGE
-------
${message}

---
Reply directly to this email to respond to ${name}.
`.trim();
}

/**
 * Auto-reply email sent back to the person who contacted Yudiya.
 */
export function buildAutoReplyEmail(data: Pick<ContactFormData, "name" | "subject">): string {
  const { name, subject } = data;

  const esc = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Got your message!</title>
</head>
<body style="margin:0;padding:0;background-color:#0F172A;font-family:'Courier New',Courier,monospace;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0F172A;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:600px;">

          <!-- HEADER -->
          <tr>
            <td style="background-color:#1E293B;border:3px solid #3B82F6;padding:0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#334155;padding:10px 16px;border-bottom:3px solid #3B82F6;">
                    <span style="font-family:'Courier New',monospace;font-size:10px;color:#94A3B8;letter-spacing:1px;">
                      MESSAGE_RECEIVED.EXE
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:32px;text-align:center;">
                    <div style="display:inline-block;background-color:#3B82F6;border:2px solid #60A5FA;padding:8px 16px;margin-bottom:16px;">
                      <span style="font-family:'Courier New',monospace;font-size:14px;color:#ffffff;letter-spacing:2px;font-weight:bold;">
                        YUDIYA DEV
                      </span>
                    </div>
                    <h1 style="margin:16px 0 8px;font-family:'Courier New',monospace;font-size:16px;
                                color:#E2E8F0;letter-spacing:1px;">
                      MESSAGE RECEIVED ✓
                    </h1>
                    <p style="margin:0;font-family:'Courier New',monospace;font-size:11px;color:#64748B;">
                      Hi ${esc(name)}, I'll get back to you soon.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background-color:#1E293B;border:3px solid #3B82F6;border-top:none;padding:32px;">

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                     style="background-color:#0F172A;border:2px solid #22C55E;margin-bottom:24px;">
                <tr>
                  <td style="padding:20px;">
                    <p style="margin:0 0 12px;font-family:'Courier New',monospace;font-size:13px;color:#22C55E;letter-spacing:1px;">
                      ✓ Your message about "${esc(subject)}" has been received.
                    </p>
                    <p style="margin:0;font-family:'Courier New',monospace;font-size:12px;color:#94A3B8;line-height:1.8;">
                      I typically respond within <strong style="color:#E2E8F0;">24 hours</strong>.
                      If it's urgent, you can also reach me directly at
                      <a href="mailto:yudiyaahrian@gmail.com"
                         style="color:#3B82F6;text-decoration:none;">yudiyaahrian@gmail.com</a>.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- What to expect -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                     style="background-color:#0F172A;border:2px solid #334155;margin-bottom:24px;">
                <tr>
                  <td style="padding:12px 16px;border-bottom:1px solid #334155;background-color:#162032;">
                    <span style="font-family:'Courier New',monospace;font-size:10px;color:#3B82F6;letter-spacing:2px;">
                      // WHAT_HAPPENS_NEXT
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      ${["I'll review your message carefully.",
                         "I'll reply to this email address.",
                         "Response time: usually within 24h."]
                        .map((step, i) => `
                      <tr>
                        <td style="padding:6px 0;width:28px;vertical-align:top;">
                          <span style="font-family:'Courier New',monospace;font-size:11px;color:#3B82F6;">[${i + 1}]</span>
                        </td>
                        <td style="padding:6px 0;">
                          <span style="font-family:'Courier New',monospace;font-size:12px;color:#CBD5E1;">${step}</span>
                        </td>
                      </tr>`).join("")}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Links -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                     style="margin-bottom:24px;">
                <tr>
                  <td align="center">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:0 8px;">
                          <a href="https://github.com/yudiyahrian"
                             style="display:inline-block;border:2px solid #334155;padding:8px 16px;
                                    font-family:'Courier New',monospace;font-size:11px;color:#94A3B8;
                                    text-decoration:none;letter-spacing:1px;">
                            GITHUB
                          </a>
                        </td>
                        <td style="padding:0 8px;">
                          <a href="https://yudiyaahrian.dev/projects"
                             style="display:inline-block;border:2px solid #334155;padding:8px 16px;
                                    font-family:'Courier New',monospace;font-size:11px;color:#94A3B8;
                                    text-decoration:none;letter-spacing:1px;">
                            PROJECTS
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                <tr>
                  <td style="height:3px;background-image:repeating-linear-gradient(90deg,#3B82F6 0px,#3B82F6 8px,transparent 8px,transparent 12px);"></td>
                </tr>
              </table>

              <p style="margin:0;font-family:'Courier New',monospace;font-size:10px;color:#475569;text-align:center;letter-spacing:1px;line-height:1.8;">
                YOU'RE RECEIVING THIS BECAUSE YOU CONTACTED YUDIYA AHRIAN<br/>
                VIA THE PORTFOLIO CONTACT FORM AT yudiya-porto.vercel.app<br/><br/>
                <span style="color:#334155;">▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░</span>
              </p>

            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildAutoReplyEmailText(data: Pick<ContactFormData, "name" | "subject">): string {
  return `
Hi ${data.name},

Thanks for reaching out! I received your message about "${data.subject}".

I'll get back to you within 24 hours. If it's urgent, email me directly at yudiyaahrian@gmail.com.

---
Yudiya Ahrian
Flutter Developer & Fullstack Engineer
yudiya-porto.vercel.app
`.trim();
}
