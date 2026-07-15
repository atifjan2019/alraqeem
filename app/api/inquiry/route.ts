import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { revalidatePath } from "next/cache";
import { addInquiry, updateInquiryAdminEmailStatus } from "@/lib/inquiriesStore";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type InquiryPayload = {
  name: string;
  phone: string;
  city?: string;
  email?: string;
  service: string;
  message?: string;
};

const MAX_LEN = 2000;

function asString(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, MAX_LEN) : "";
}

/** Escape user input before putting it inside notification-email HTML. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const BRAND = {
  deepGreen: "#0a211a",
  green: "#1c6b53",
  gold: "#c5a253",
  paper: "#f7f3ea",
  ink: "#17352c",
  muted: "#61736d",
};

function detailRow(label: string, value: string, href?: string): string {
  const safeLabel = escapeHtml(label);
  const safeValue = escapeHtml(value);
  const renderedValue = href
    ? `<a href="${escapeHtml(href)}" style="color:${BRAND.green};font-weight:700;text-decoration:none;">${safeValue}</a>`
    : safeValue;

  return `
    <tr>
      <td style="padding:13px 0;border-bottom:1px solid #e7e3d9;color:${BRAND.muted};font-size:13px;line-height:20px;vertical-align:top;width:116px;">${safeLabel}</td>
      <td style="padding:13px 0;border-bottom:1px solid #e7e3d9;color:${BRAND.ink};font-size:14px;font-weight:600;line-height:20px;vertical-align:top;">${renderedValue}</td>
    </tr>`;
}

function emailShell({
  preheader,
  eyebrow,
  title,
  intro,
  content,
  footerNote,
}: {
  preheader: string;
  eyebrow: string;
  title: string;
  intro: string;
  content: string;
  footerNote: string;
}): string {
  return `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="x-apple-disable-message-reformatting" />
      <title>${escapeHtml(title)}</title>
    </head>
    <body style="margin:0;padding:0;background:${BRAND.paper};font-family:Arial,'Helvetica Neue',sans-serif;color:${BRAND.ink};">
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preheader)}</div>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:${BRAND.paper};">
        <tr>
          <td align="center" style="padding:28px 12px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:620px;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 12px 34px rgba(10,33,26,.12);">
              <tr>
                <td style="height:5px;background:${BRAND.gold};font-size:0;line-height:0;">&nbsp;</td>
              </tr>
              <tr>
                <td style="background:${BRAND.deepGreen};padding:25px 30px;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                      <td valign="middle">
                        <img src="https://alraqeem.com.pk/logo.png" width="58" alt="Al Raqeem Travel &amp; Tours" style="display:block;width:58px;height:auto;border:0;" />
                      </td>
                      <td align="right" valign="middle" style="color:#ffffff;font-size:12px;font-weight:700;letter-spacing:1.4px;line-height:18px;text-transform:uppercase;">
                        Al Raqeem<br /><span style="color:${BRAND.gold};">Travel &amp; Tours</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:34px 30px 12px;">
                  <p style="margin:0 0 10px;color:${BRAND.gold};font-size:11px;font-weight:800;letter-spacing:1.8px;line-height:16px;text-transform:uppercase;">${escapeHtml(eyebrow)}</p>
                  <h1 style="margin:0;color:${BRAND.deepGreen};font-family:Georgia,'Times New Roman',serif;font-size:30px;font-weight:600;line-height:38px;">${escapeHtml(title)}</h1>
                  <p style="margin:14px 0 0;color:${BRAND.muted};font-size:15px;line-height:24px;">${escapeHtml(intro)}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 30px 34px;">${content}</td>
              </tr>
              <tr>
                <td style="background:#eef3f0;padding:22px 30px;text-align:center;">
                  <p style="margin:0 0 6px;color:${BRAND.deepGreen};font-size:13px;font-weight:700;line-height:20px;">Al Raqeem Travel &amp; Tours</p>
                  <p style="margin:0;color:${BRAND.muted};font-size:11px;line-height:18px;">${escapeHtml(footerNote)}</p>
                  <p style="margin:8px 0 0;font-size:11px;line-height:18px;"><a href="https://alraqeem.com.pk" style="color:${BRAND.green};text-decoration:none;">alraqeem.com.pk</a></p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function parsePayload(body: Record<string, unknown>): InquiryPayload | null {
  const payload: InquiryPayload = {
    name: asString(body.name),
    phone: asString(body.phone),
    city: asString(body.city),
    email: asString(body.email),
    service: asString(body.service),
    message: asString(body.message),
  };

  if (!payload.name || !payload.phone || !payload.service) {
    return null;
  }
  return payload;
}

function getTransport() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT ?? "2525");
  const secure = process.env.SMTP_SECURE === "true";

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    requireTLS: !secure,
    auth: { user, pass },
  });
}

// Best-effort in-memory rate limit (per warm serverless instance): at most
// RATE_MAX submissions per IP within RATE_WINDOW_MS.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 6;
const recentByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  // Bound memory: drop the whole map if it grows large (warm instance only).
  if (recentByIp.size > 5000) recentByIp.clear();
  const hits = (recentByIp.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  recentByIp.set(ip, hits);
  return hits.length > RATE_MAX;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const payload = parsePayload(body);
  if (!payload) {
    return NextResponse.json(
      { error: "Name, phone, and service are required." },
      { status: 400 }
    );
  }
  if (payload.email && !isValidEmail(payload.email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  // 1) Persist the lead FIRST so it is never lost, even if email is
  //    misconfigured or the mail server is down.
  let saved = false;
  let inquiryId: string | null = null;
  try {
    inquiryId = await addInquiry(payload);
    saved = true;
    revalidatePath("/admin");
    revalidatePath("/admin/inquiries");
  } catch (error) {
    console.error("[inquiry] save failed:", error);
  }

  // 2) Send notification + confirmation email (best effort).
  let emailed = false;
  const transport = getTransport();
  if (transport) {
    const to = process.env.INQUIRY_TO_EMAIL ?? "info@alraqeem.com.pk";
    const fromAddress = process.env.INQUIRY_FROM_EMAIL ?? "info@alraqeem.com.pk";
    const fromName = process.env.INQUIRY_FROM_NAME ?? "Al Raqeem Travel & Tours";
    const from = `${fromName} <${fromAddress}>`;

    const text = [
      "New website inquiry",
      "",
      `Name: ${payload.name}`,
      `Phone: ${payload.phone}`,
      payload.email ? `Email: ${payload.email}` : "",
      payload.city ? `City: ${payload.city}` : "",
      `Service: ${payload.service}`,
      payload.message ? `Message: ${payload.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const phoneHref = `tel:${payload.phone.replace(/[^+\d]/g, "")}`;
    const details = [
      detailRow("Name", payload.name),
      detailRow("Phone", payload.phone, phoneHref),
      payload.email ? detailRow("Email", payload.email, `mailto:${payload.email}`) : "",
      payload.city ? detailRow("City", payload.city) : "",
      detailRow("Service", payload.service),
    ].join("");
    const messageBlock = payload.message
      ? `<div style="margin-top:22px;padding:18px 20px;background:#f7f8f5;border-left:4px solid ${BRAND.gold};border-radius:8px;">
          <p style="margin:0 0 7px;color:${BRAND.muted};font-size:11px;font-weight:800;letter-spacing:1.3px;line-height:16px;text-transform:uppercase;">Customer message</p>
          <p style="margin:0;color:${BRAND.ink};font-size:14px;line-height:22px;">${escapeHtml(payload.message).replace(/\n/g, "<br />")}</p>
        </div>`
      : "";
    const html = emailShell({
      preheader: `${payload.name} requested help with ${payload.service}.`,
      eyebrow: "New website inquiry",
      title: "A new travel inquiry has arrived",
      intro: "The customer details are ready below. Contact them promptly while their travel plans are still fresh.",
      content: `
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;border-top:1px solid #e7e3d9;">${details}</table>
        ${messageBlock}
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:24px;">
          <tr>
            <td style="border-radius:999px;background:${BRAND.green};">
              <a href="${escapeHtml(phoneHref)}" style="display:inline-block;padding:13px 22px;color:#ffffff;font-size:13px;font-weight:800;line-height:18px;text-decoration:none;">Call customer</a>
            </td>
          </tr>
        </table>`,
      footerNote: "This notification was sent securely from the Al Raqeem website inquiry form.",
    });

    try {
      await transport.sendMail({
        from,
        to,
        subject: `New Inquiry: ${payload.service}`,
        text,
        html,
        replyTo: payload.email || fromAddress,
      });
      emailed = true;

      if (inquiryId) {
        try {
          await updateInquiryAdminEmailStatus(inquiryId, "sent");
        } catch (error) {
          console.error("[inquiry] email status update failed:", error);
        }
      }

      if (payload.email) {
        const userText = [
          `Assalam o Alaikum ${payload.name},`,
          "",
          "We received your inquiry and our team will contact you shortly.",
          "",
          `Service: ${payload.service}`,
          payload.city ? `City: ${payload.city}` : "",
          "",
          "Thanks,",
          "Al Raqeem Travel & Tours",
        ]
          .filter(Boolean)
          .join("\n");

        const userHtml = emailShell({
          preheader: "Your inquiry is safely with the Al Raqeem team.",
          eyebrow: "Inquiry received",
          title: `Assalam o Alaikum ${payload.name}`,
          intro: "Thank you for choosing Al Raqeem. Your inquiry is safely with our travel team, and we will contact you shortly.",
          content: `
            <div style="padding:20px;background:#f7f8f5;border:1px solid #e5ebe7;border-radius:12px;">
              <p style="margin:0 0 8px;color:${BRAND.muted};font-size:11px;font-weight:800;letter-spacing:1.3px;line-height:16px;text-transform:uppercase;">Your request</p>
              <p style="margin:0;color:${BRAND.deepGreen};font-family:Georgia,'Times New Roman',serif;font-size:21px;font-weight:600;line-height:29px;">${escapeHtml(payload.service)}</p>
              ${payload.city ? `<p style="margin:8px 0 0;color:${BRAND.muted};font-size:13px;line-height:20px;">Location: ${escapeHtml(payload.city)}</p>` : ""}
            </div>
            <p style="margin:22px 0 0;color:${BRAND.muted};font-size:14px;line-height:23px;">For anything urgent, reply directly to this email and our team will assist you.</p>
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:22px;">
              <tr>
                <td style="border-radius:999px;background:${BRAND.green};">
                  <a href="https://alraqeem.com.pk/packages" style="display:inline-block;padding:13px 22px;color:#ffffff;font-size:13px;font-weight:800;line-height:18px;text-decoration:none;">Explore travel packages</a>
                </td>
              </tr>
            </table>`,
          footerNote: "Umrah, Hajj, tours, tickets and visa assistance across Pakistan.",
        });

        // The customer confirmation is a bonus — don't fail the request if it bounces.
        try {
          await transport.sendMail({
            from,
            to: payload.email,
            subject: "We received your inquiry | Al Raqeem Travel & Tours",
            text: userText,
            html: userHtml,
            replyTo: to,
          });
        } catch (error) {
          console.error("[inquiry] confirmation email failed:", error);
        }
      }
    } catch (error) {
      console.error("[inquiry] notification email failed:", error);
      if (inquiryId) {
        try {
          await updateInquiryAdminEmailStatus(
            inquiryId,
            "failed",
            error instanceof Error ? error.message : "Mail server rejected the notification.",
          );
        } catch (statusError) {
          console.error("[inquiry] email status update failed:", statusError);
        }
      }
    }
  } else if (inquiryId) {
    try {
      await updateInquiryAdminEmailStatus(
        inquiryId,
        "not_configured",
        "SMTP settings are not configured.",
      );
    } catch (error) {
      console.error("[inquiry] email status update failed:", error);
    }
  }

  // Only a hard failure if the lead was neither saved nor emailed.
  if (!saved && !emailed) {
    return NextResponse.json(
      { error: "Could not submit your inquiry. Please contact us on WhatsApp." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
