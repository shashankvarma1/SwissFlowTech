import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN = 'swissflowtech@gmail.com';

const STATUS_LABELS: Record<string, string> = {
  reviewing: "Your application is being reviewed",
  interview: "You've been selected for an interview! 🎯",
  offer:     "We'd like to make you an offer! 🎉",
  rejected:  "Update on your application",
};

export async function POST(req: NextRequest) {
  const { type, data } = await req.json();

  if (type === 'contact') {
    await resend.emails.send({
      from: 'Swiss Flow Tech <onboarding@resend.dev>',
      to: ADMIN,
      subject: `📬 New Contact: ${data.name} — ${data.service || 'General'}`,
      html: `<div style="font-family:sans-serif;max-width:600px"><h2 style="color:#2563eb">New Contact Submission</h2><table style="width:100%;border-collapse:collapse"><tr><td style="padding:8px;color:#666;width:130px">Name</td><td style="padding:8px;font-weight:600">${data.name}</td></tr><tr style="background:#f9f9f9"><td style="padding:8px;color:#666">Email</td><td style="padding:8px"><a href="mailto:${data.email}">${data.email}</a></td></tr><tr><td style="padding:8px;color:#666">Company</td><td style="padding:8px">${data.company||'—'}</td></tr><tr style="background:#f9f9f9"><td style="padding:8px;color:#666">Service</td><td style="padding:8px">${data.service||'—'}</td></tr><tr><td style="padding:8px;color:#666;vertical-align:top">Message</td><td style="padding:8px">${data.message}</td></tr></table></div>`,
    });
  }

  if (type === 'job') {
    await resend.emails.send({
      from: 'Swiss Flow Tech <onboarding@resend.dev>',
      to: ADMIN,
      subject: `🧑‍💻 New Application: ${data.applicant_name} — ${data.job_title}`,
      html: `<div style="font-family:sans-serif;max-width:600px"><h2 style="color:#2563eb">New Job Application</h2><table style="width:100%;border-collapse:collapse"><tr><td style="padding:8px;color:#666;width:130px">Position</td><td style="padding:8px;font-weight:600">${data.job_title}</td></tr><tr style="background:#f9f9f9"><td style="padding:8px;color:#666">Name</td><td style="padding:8px">${data.applicant_name}</td></tr><tr><td style="padding:8px;color:#666">Email</td><td style="padding:8px"><a href="mailto:${data.email}">${data.email}</a></td></tr><tr style="background:#f9f9f9"><td style="padding:8px;color:#666">Resume</td><td style="padding:8px">${data.resume_url ? `<a href="${data.resume_url}">View Resume</a>` : '—'}</td></tr><tr><td style="padding:8px;color:#666;vertical-align:top">Cover Letter</td><td style="padding:8px">${data.cover_letter||'—'}</td></tr></table><p style="margin-top:20px"><a href="https://yoursite.vercel.app/admin" style="background:#2563eb;color:white;padding:10px 20px;text-decoration:none;border-radius:8px">View in Admin Dashboard →</a></p></div>`,
    });
  }

  if (type === 'status_update') {
    const subject = STATUS_LABELS[data.status] || "Update on your application";
    await resend.emails.send({
      from: 'Swiss Flow Tech <onboarding@resend.dev>',
      to: data.email,
      subject: `Swiss Flow Tech: ${subject}`,
      html: `<div style="font-family:sans-serif;max-width:600px"><div style="background:#1d4ed8;padding:24px;border-radius:12px 12px 0 0"><h1 style="color:white;margin:0;font-size:1.4rem">Swiss Flow Tech</h1></div><div style="background:#f8fafc;padding:28px;border-radius:0 0 12px 12px"><p>Hi ${data.name || 'there'},</p><p style="margin:16px 0">We have an update on your application for <strong>${data.job_title}</strong>.</p><div style="background:white;border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin:20px 0;text-align:center"><p style="font-size:1.1rem;font-weight:600;color:#1d4ed8;margin:0">${subject}</p></div><p>Log in to your candidate portal to see your full application status and next steps.</p><p style="margin-top:24px"><a href="https://yoursite.vercel.app/portal" style="background:#2563eb;color:white;padding:12px 24px;text-decoration:none;border-radius:8px;font-weight:600">View My Portal →</a></p><p style="color:#94a3b8;font-size:0.8rem;margin-top:24px">Swiss Flow Tech · Hyderabad, India · swissflowtech@gmail.com</p></div></div>`,
    });
  }

  return NextResponse.json({ success: true });
}