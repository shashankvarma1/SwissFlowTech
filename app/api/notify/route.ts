import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = 'swissflowtech@gmail.com';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { type, data } = body;

  let subject = '';
  let html = '';

  if (type === 'contact') {
    subject = `📬 New Contact: ${data.name} — ${data.service || 'General Inquiry'}`;
    html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#2563eb">New Contact Form Submission</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px;color:#666;width:140px">Name</td><td style="padding:8px;font-weight:600">${data.name}</td></tr>
          <tr style="background:#f9f9f9"><td style="padding:8px;color:#666">Email</td><td style="padding:8px"><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td style="padding:8px;color:#666">Company</td><td style="padding:8px">${data.company || '—'}</td></tr>
          <tr style="background:#f9f9f9"><td style="padding:8px;color:#666">Service</td><td style="padding:8px">${data.service || '—'}</td></tr>
          <tr><td style="padding:8px;color:#666;vertical-align:top">Message</td><td style="padding:8px">${data.message}</td></tr>
        </table>
        <p style="color:#999;font-size:12px;margin-top:24px">Swiss Flow Tech — swissflowtech@gmail.com</p>
      </div>
    `;
  }

  if (type === 'job') {
    subject = `🧑‍💻 New Application: ${data.applicant_name} — ${data.job_title}`;
    html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#2563eb">New Job Application</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px;color:#666;width:140px">Position</td><td style="padding:8px;font-weight:600">${data.job_title}</td></tr>
          <tr style="background:#f9f9f9"><td style="padding:8px;color:#666">Name</td><td style="padding:8px">${data.applicant_name}</td></tr>
          <tr><td style="padding:8px;color:#666">Email</td><td style="padding:8px"><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr style="background:#f9f9f9"><td style="padding:8px;color:#666">LinkedIn</td><td style="padding:8px">${data.linkedin_url ? `<a href="${data.linkedin_url}">${data.linkedin_url}</a>` : '—'}</td></tr>
          <tr><td style="padding:8px;color:#666;vertical-align:top">Cover Letter</td><td style="padding:8px">${data.cover_letter || '—'}</td></tr>
        </table>
        <p style="color:#999;font-size:12px;margin-top:24px">Swiss Flow Tech — swissflowtech@gmail.com</p>
      </div>
    `;
  }

  const { error } = await resend.emails.send({
    from: 'Swiss Flow Tech <onboarding@resend.dev>',
    to: TO,
    subject,
    html,
  });

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ success: true });
}