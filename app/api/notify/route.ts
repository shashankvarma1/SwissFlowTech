import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN  = "varma.shashank20@gmail.com";
const SITE   = process.env.NEXT_PUBLIC_SITE_URL || "https://swissflowtech.vercel.app";

const STATUS_LABELS: Record<string, string> = {
  reviewing: "Your application is being reviewed 🔍",
  interview: "You've been selected for an interview! 🎯",
  offer:     "We'd like to make you an offer! 🎉",
  rejected:  "Update on your application",
};

function base(content: string) {
  return `
    <div style="font-family:'Plus Jakarta Sans',sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;border-radius:16px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#1d4ed8,#6d28d9);padding:28px 32px">
        <h1 style="color:white;margin:0;font-size:1.3rem;font-family:Georgia,serif">Swiss Flow Tech</h1>
        <p style="color:rgba(255,255,255,0.7);margin:4px 0 0;font-size:0.82rem">Hyderabad, India · swissflowtech@gmail.com</p>
      </div>
      <div style="padding:32px">
        ${content}
        <p style="color:#94a3b8;font-size:0.75rem;margin-top:32px;padding-top:16px;border-top:1px solid #e2e8f0">
          Swiss Flow Tech · Hyderabad, Telangana, India<br/>
          <a href="mailto:swissflowtech@gmail.com" style="color:#2563eb">swissflowtech@gmail.com</a>
        </p>
      </div>
    </div>
  `;
}

export async function POST(req: NextRequest) {
  const { type, data } = await req.json();

  try {
    if (type === "contact") {
      await resend.emails.send({
        from: "Swiss Flow Tech <onboarding@resend.dev>",
        to: ADMIN,
        subject: `📬 New Contact: ${data.name} — ${data.service || "General"}`,
        html: base(`
          <h2 style="color:#1d4ed8;margin-top:0">New Contact Submission</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px;color:#64748b;width:130px">Name</td><td style="padding:8px;font-weight:600">${data.name}</td></tr>
            <tr style="background:#f1f5f9"><td style="padding:8px;color:#64748b">Email</td><td style="padding:8px"><a href="mailto:${data.email}" style="color:#2563eb">${data.email}</a></td></tr>
            <tr><td style="padding:8px;color:#64748b">Company</td><td style="padding:8px">${data.company || "—"}</td></tr>
            <tr style="background:#f1f5f9"><td style="padding:8px;color:#64748b">Service</td><td style="padding:8px">${data.service || "—"}</td></tr>
            <tr><td style="padding:8px;color:#64748b;vertical-align:top">Message</td><td style="padding:8px">${data.message}</td></tr>
          </table>
        `),
      });
    }

    if (type === "job") {
      await resend.emails.send({
        from: "Swiss Flow Tech <onboarding@resend.dev>",
        to: ADMIN,
        subject: `🧑‍💻 New Application: ${data.applicant_name} — ${data.job_title}`,
        html: base(`
          <h2 style="color:#1d4ed8;margin-top:0">New Job Application</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px;color:#64748b;width:130px">Position</td><td style="padding:8px;font-weight:600">${data.job_title}</td></tr>
            <tr style="background:#f1f5f9"><td style="padding:8px;color:#64748b">Name</td><td style="padding:8px">${data.applicant_name}</td></tr>
            <tr><td style="padding:8px;color:#64748b">Email</td><td style="padding:8px"><a href="mailto:${data.email}" style="color:#2563eb">${data.email}</a></td></tr>
            <tr style="background:#f1f5f9"><td style="padding:8px;color:#64748b">Resume File</td><td style="padding:8px">${data.resume_filename || "—"}</td></tr>
            <tr><td style="padding:8px;color:#64748b;vertical-align:top">Cover Letter</td><td style="padding:8px">${data.cover_letter || "—"}</td></tr>
          </table>

          ${data.resume_url ? `
          <div style="margin:24px 0;padding:16px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px">
            <p style="margin:0 0 10px;font-weight:600;color:#1d4ed8">📄 Resume Attached</p>
            <a href="${data.resume_url}"
               style="background:#1d4ed8;color:white;padding:10px 20px;text-decoration:none;border-radius:8px;font-weight:600;display:inline-block">
              Download / View Resume (${data.resume_filename || "file"})
            </a>
            <p style="margin:10px 0 0;font-size:0.75rem;color:#64748b">
              Link valid for 1 year. If expired, view from the admin dashboard.
            </p>
          </div>
          ` : `<p style="color:#64748b">No resume uploaded.</p>`}

          <p style="margin-top:16px">
            <a href="${data.portal_url || SITE + "/admin"}"
               style="background:#6d28d9;color:white;padding:10px 20px;text-decoration:none;border-radius:8px;font-weight:600;display:inline-block">
              View in Admin Dashboard →
            </a>
          </p>
        `),
      });
    }

    if (type === "welcome") {
      await resend.emails.send({
        from: "Swiss Flow Tech <noreply@yourdomain.com>",
        to: data.email,
        subject: "Welcome to Swiss Flow Tech! 👋",
        html: base(`
          <h2 style="color:#1d4ed8;margin-top:0">Welcome, ${data.name || "there"}! 👋</h2>
          <p style="color:#334155;line-height:1.7">
            Your account has been created. You can now browse our open roles and apply directly through our careers portal.
          </p>
          <p style="margin:24px 0">
            <a href="${SITE}/careers" style="background:#1d4ed8;color:white;padding:12px 24px;text-decoration:none;border-radius:8px;font-weight:600;display:inline-block">
              Browse Open Roles →
            </a>
          </p>
          <p style="color:#64748b;font-size:0.88rem">
            Once you apply, you can track your application status in real time from your
            <a href="${SITE}/portal" style="color:#2563eb">candidate portal</a>.
          </p>
        `),
      });
    }

    if (type === "application_confirmation") {
      await resend.emails.send({
        from: "Swiss Flow Tech <onboarding@resend.dev>",
        to: data.email,
        subject: `✅ Application Received — ${data.job_title}`,
        html: base(`
          <h2 style="color:#1d4ed8;margin-top:0">Application Received! ✅</h2>
          <p style="color:#334155;line-height:1.7">
            Hi ${data.name || "there"}, we've received your application for <strong>${data.job_title}</strong>.
            Our team will review it and get back to you within 3–5 business days.
          </p>
          <div style="background:white;border:1px solid #e2e8f0;border-radius:10px;padding:16px;margin:20px 0">
            <p style="margin:0;font-weight:600;color:#1d4ed8">What happens next?</p>
            <ol style="color:#334155;margin:12px 0;padding-left:20px;line-height:1.8">
              <li>Our team reviews your application</li>
              <li>If shortlisted, we'll reach out to schedule an interview</li>
              <li>You'll receive updates via email and your portal</li>
            </ol>
          </div>
          <p style="margin:24px 0">
            <a href="${SITE}/portal" style="background:#1d4ed8;color:white;padding:12px 24px;text-decoration:none;border-radius:8px;font-weight:600;display:inline-block">
              Track Your Application →
            </a>
          </p>
        `),
      });
    }

    if (type === "status_update") {
      const subject = STATUS_LABELS[data.status] || "Update on your application";
      const isOffer    = data.status === "offer";
      const isInterview = data.status === "interview";

      await resend.emails.send({
        from: "Swiss Flow Tech <onboarding@resend.dev>",
        to: data.email,
        subject: `Swiss Flow Tech: ${subject}`,
        html: base(`
          <h2 style="color:#1d4ed8;margin-top:0">${subject}</h2>
          <p style="color:#334155;line-height:1.7">
            Hi ${data.name || "there"}, we have an update on your application for <strong>${data.job_title}</strong>.
          </p>
          <div style="background:white;border:2px solid #2563eb;border-radius:10px;padding:20px;margin:20px 0;text-align:center">
            <p style="font-size:1.1rem;font-weight:700;color:#1d4ed8;margin:0">${subject}</p>
          </div>
          ${isInterview ? `
            <p style="color:#334155;line-height:1.7">
              Congratulations! Our team will be in touch shortly to schedule your interview.
              Please ensure your profile and contact details are up to date.
            </p>
          ` : ""}
          ${isOffer ? `
            <p style="color:#334155;line-height:1.7">
              🎉 Congratulations! We're excited to extend an offer to you.
              Our team will reach out with the full details very soon.
            </p>
          ` : ""}
          <p style="margin:24px 0">
            <a href="${SITE}/portal" style="background:#1d4ed8;color:white;padding:12px 24px;text-decoration:none;border-radius:8px;font-weight:600;display:inline-block">
              View My Portal →
            </a>
          </p>
        `),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Notify error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}