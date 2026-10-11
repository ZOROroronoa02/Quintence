/**
 * @file app/api/contact/route.ts
 * @description Contact inquiry endpoint wired to Gmail SMTP (nodemailer).
 * Validates against the shared contactSchema, silently drops honeypot bots,
 * then sends a staff notification (Reply-To = sender) plus an inquirer
 * auto-reply. Needs a Gmail address + App Password (Google Account → Security
 * → 2-Step Verification → App passwords).
 *
 * Contract: 200 {ok:true} · 422 {ok:false, errors} · 502 Gmail failure ·
 * 503 email service unconfigured. No rate limiting in v1 (honeypot only —
 * serverless in-memory limits lie; see README).
 */

import { NextRequest, NextResponse } from "next/server";
import { createElement } from "react";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { contactSchema } from "@/lib/validators";
import { InquiryNotification } from "@/components/emails/InquiryNotification";
import { InquiryAutoreply } from "@/components/emails/InquiryAutoreply";
import { siteConfig } from "@/lib/config";

type SuccessBody = { ok: true };
type ErrorBody = { ok: false; message?: string; errors?: Record<string, string> };

const FAILURE_MESSAGE = `Something went wrong sending your inquiry. Please email us directly at ${siteConfig.contactEmail}.`;

export async function POST(request: NextRequest): Promise<NextResponse<SuccessBody | ErrorBody>> {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 422 });
  }

  // Honeypot first: bots fill `website`; humans never see it. Silent 200,
  // server-side log only ~ never tip off the bot.
  if (typeof raw === "object" && raw !== null) {
    const trap = (raw as Record<string, unknown>).website;
    if (typeof trap === "string" && trap.length > 0) {
      console.warn("[contact] honeypot hit ~ bot submission dropped silently");
      return NextResponse.json({ ok: true }, { status: 200 });
    }
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0] ?? "form");
      errors[field] ??= issue.message;
    }
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!gmailUser || !gmailAppPassword || !to) {
    console.error("[contact] email service unconfigured — missing GMAIL_USER, GMAIL_APP_PASSWORD, or CONTACT_TO_EMAIL");
    return NextResponse.json({ ok: false, message: FAILURE_MESSAGE }, { status: 503 });
  }

  const { name, email, company, budget, message } = parsed.data;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: gmailUser, pass: gmailAppPassword },
  });
  const sender = `"${siteConfig.name} Studio" <${gmailUser}>`;

  try {
    const notificationHtml = await render(
      createElement(InquiryNotification, {
        name,
        email,
        company: company || undefined,
        budget,
        message,
        siteUrl: siteConfig.url,
      }),
    );
    await transporter.sendMail({
      from: sender,
      to,
      replyTo: email,
      subject: `New inquiry — ${name} (${budget})`,
      html: notificationHtml,
    });
  } catch (error) {
    console.error("[contact] notification send failed:", error);
    return NextResponse.json({ ok: false, message: FAILURE_MESSAGE }, { status: 502 });
  }

  // Auto-reply is best-effort: the inquiry is already captured, so a failure
  // here logs loudly but still returns success to the sender.
  try {
    const replyHtml = await render(
      createElement(InquiryAutoreply, {
        name,
        contactEmail: siteConfig.contactEmail,
        siteUrl: siteConfig.url,
      }),
    );
    await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Got it — we'll reply within one business day",
      html: replyHtml,
    });
  } catch (error) {
    console.error("[contact] auto-reply send failed (inquiry was captured):", error);
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
