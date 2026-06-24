import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { serverEnv, isContactConfigured } from "@/lib/env";

const bodySchema = z.object({
  name: z.string().min(2).max(120),
  email: z.email(),
  subject: z.string().min(2).max(160),
  message: z.string().min(10).max(4000),
  website: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form fields and try again." },
      { status: 400 },
    );
  }

  const { name, email, subject, message, website } = parsed.data;

  if (website && website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (!isContactConfigured) {
    console.warn(
      "[contact] Resend not configured — message logged but not delivered.",
      { name, email, subject },
    );
    return NextResponse.json({
      ok: true,
      delivery: "logged",
    });
  }

  try {
    const resend = new Resend(serverEnv.RESEND_API_KEY);

    const text = [
      `New message from ${name} <${email}>`,
      `Subject: ${subject}`,
      "",
      message,
    ].join("\n");

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #0d5c63; margin: 0 0 8px;">New Cajun Collectibles message</h2>
        <p style="color: #1f1f1f; margin: 0 0 16px;"><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
        <p style="color: #1f1f1f; margin: 0 0 16px;"><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <hr style="border: 0; border-top: 1px solid #e5e5e5; margin: 16px 0;" />
        <p style="color: #1f1f1f; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message)}</p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: serverEnv.CONTACT_FROM_EMAIL,
      to: serverEnv.CONTACT_TO_EMAIL!,
      replyTo: email,
      subject: `[Cajun Collectibles] ${subject}`,
      text,
      html,
    });

    if (error) {
      console.error("[contact] Resend error", error);
      return NextResponse.json(
        { error: "Email service rejected the message. Please try again later." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, delivery: "sent" });
  } catch (err) {
    console.error("[contact] unexpected error", err);
    return NextResponse.json(
      { error: "Unexpected error. Please try again later." },
      { status: 500 },
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
