import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  const { data, error } = await resend.emails.send({
    from: "Swiss Flow Tech <onboarding@resend.dev>",
    to: "swissflowtech@gmail.com",
    subject: "Test Email from Swiss Flow Tech",
    html: "<h1>Test email works!</h1><p>If you see this, Resend is configured correctly.</p>",
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}