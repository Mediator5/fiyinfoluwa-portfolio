import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  business?: string;
  website?: string;
  service?: string;
  pkg?: string;
  budget?: string;
  timeline?: string;
  contactMethod?: string;
  message?: string;
  hp?: string;
};

// Very small in-memory rate limiter (per server instance)
const hits = new Map<string, { count: number; ts: number }>();
const LIMIT = 5;
const WINDOW = 10 * 60 * 1000;

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.ts > WINDOW) {
    hits.set(ip, { count: 1, ts: now });
    return false;
  }
  entry.count++;
  return entry.count > LIMIT;
}

const esc = (s = "") =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const clip = (s: unknown, n = 2000) => (typeof s === "string" ? s.trim().slice(0, n) : "");

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");
  if (!user || !pass || pass === "your-16-character-app-password") return null;
  const port = Number(process.env.SMTP_PORT || 465);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

function row(label: string, value: string) {
  if (!value) return "";
  return `<tr><td style="padding:10px 14px;border-bottom:1px solid #eee;color:#6b6b66;font-size:13px;width:150px;vertical-align:top">${label}</td><td style="padding:10px 14px;border-bottom:1px solid #eee;font-size:15px;color:#0e0e0c">${value}</td></tr>`;
}

function shell(inner: string) {
  return `<!doctype html><html><body style="margin:0;background:#f4f3ee;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif">
  <div style="max-width:620px;margin:0 auto;padding:32px 16px">
    <div style="background:#0e0e0c;color:#f4f3ee;border-radius:20px 20px 0 0;padding:28px 32px">
      <div style="display:inline-block;background:#c9f23a;color:#0e0e0c;font-weight:700;border-radius:999px;padding:4px 12px;font-size:12px;letter-spacing:.08em">FIYINFOLUWA IKUYAJOLU</div>
    </div>
    <div style="background:#ffffff;border-radius:0 0 20px 20px;padding:28px 32px">${inner}</div>
  </div></body></html>`;
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots fill hidden fields — pretend success
  if (body.hp) return NextResponse.json({ ok: true });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again in a few minutes." }, { status: 429 });
  }

  const data = {
    name: clip(body.name, 120),
    email: clip(body.email, 200),
    phone: clip(body.phone, 60),
    business: clip(body.business, 160),
    website: clip(body.website, 200),
    service: clip(body.service, 120),
    pkg: clip(body.pkg, 60),
    budget: clip(body.budget, 60),
    timeline: clip(body.timeline, 60),
    contactMethod: clip(body.contactMethod, 40),
    message: clip(body.message, 5000),
  };

  if (!data.name || !data.email || !data.message) {
    return NextResponse.json({ error: "Please fill in your name, email and project details." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const transporter = getTransporter();
  if (!transporter) {
    console.error("[contact] Email is not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD in .env.local");
    return NextResponse.json(
      { error: "Email isn’t set up on this site yet. Please reach me on WhatsApp or email directly." },
      { status: 500 },
    );
  }

  const to = process.env.CONTACT_TO_EMAIL || process.env.GMAIL_USER!;
  const fromName = process.env.CONTACT_FROM_NAME || "Portfolio";
  const from = `"${fromName}" <${process.env.GMAIL_USER}>`;
  const waDigits = data.phone.replace(/[^\d]/g, "");

  const ownerHtml = shell(`
    <h1 style="margin:0 0 6px;font-size:24px;color:#0e0e0c">New project request 🎉</h1>
    <p style="margin:0 0 22px;color:#6b6b66;font-size:14px">From your portfolio booking form</p>
    <table style="width:100%;border-collapse:collapse;border:1px solid #eee;border-radius:12px;overflow:hidden">
      ${row("Name", esc(data.name))}
      ${row("Email", `<a href="mailto:${esc(data.email)}">${esc(data.email)}</a>`)}
      ${row("Phone / WhatsApp", esc(data.phone))}
      ${row("Business", esc(data.business))}
      ${row("Current website", esc(data.website))}
      ${row("Service", esc(data.service))}
      ${row("Package", esc(data.pkg))}
      ${row("Budget", esc(data.budget))}
      ${row("Timeline", esc(data.timeline))}
      ${row("Preferred contact", esc(data.contactMethod))}
    </table>
    <h2 style="margin:26px 0 8px;font-size:16px">Project details</h2>
    <p style="white-space:pre-wrap;line-height:1.6;font-size:15px;color:#0e0e0c;background:#f4f3ee;border-radius:12px;padding:16px">${esc(data.message)}</p>
    <p style="margin-top:24px">
      <a href="mailto:${esc(data.email)}?subject=${encodeURIComponent("Re: your website project")}" style="display:inline-block;background:#0e0e0c;color:#fff;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:600;font-size:14px">Reply by email</a>
      ${waDigits ? `<a href="https://wa.me/${waDigits}" style="display:inline-block;margin-left:8px;background:#25D366;color:#fff;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:600;font-size:14px">Open WhatsApp</a>` : ""}
    </p>`);

  const firstName = esc(data.name.split(" ")[0]);
  const clientHtml = shell(`
    <h1 style="margin:0 0 12px;font-size:24px;color:#0e0e0c">Thanks, ${firstName}! 👋</h1>
    <p style="font-size:15px;line-height:1.7;color:#333">I’ve received your request for <strong>${esc(data.service || "a new website")}</strong> and I’m already looking forward to learning more about ${esc(data.business || "your business")}.</p>
    <p style="font-size:15px;line-height:1.7;color:#333">I’ll get back to you within <strong>24 hours</strong> with next steps and a time for a quick strategy call.</p>
    <p style="font-size:15px;line-height:1.7;color:#333">Need a faster reply? Message me on WhatsApp:</p>
    <p><a href="https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2348145488504"}" style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:600;font-size:14px">Chat on WhatsApp</a></p>
    <p style="margin-top:28px;font-size:15px;color:#333">Talk soon,<br/><strong>Fiyinfoluwa Tomiwa Ikuyajolu</strong><br/><span style="color:#6b6b66">Web Designer & Developer</span></p>`);

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: `"${data.name.replace(/"/g, "")}" <${data.email}>`,
      subject: `New project request — ${data.name}${data.business ? ` (${data.business})` : ""}`,
      html: ownerHtml,
      text: Object.entries(data)
        .filter(([, v]) => v)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n"),
    });

    // Auto-reply to the client (awaited so it completes on serverless, but never fails the request)
    await transporter
      .sendMail({
        from,
        to: data.email,
        replyTo: to,
        subject: "Got your project request — Fiyinfoluwa Ikuyajolu",
        html: clientHtml,
        text: `Thanks ${data.name}! I've received your request and will reply within 24 hours.\n\nFiyinfoluwa Tomiwa Ikuyajolu`,
      })
      .catch((e) => console.error("[contact] auto-reply failed", e));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed", err);
    return NextResponse.json({ error: "Couldn’t send your message right now. Please try WhatsApp or email instead." }, { status: 500 });
  }
}
