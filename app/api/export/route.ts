import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data } = await supabase
    .from("applications")
    .select("*, profiles(full_name,email,phone,linkedin_url), job_postings(title,department,type)")
    .order("applied_at", { ascending: false });

  if (!data) return NextResponse.json({ error: "No data" }, { status: 500 });

  const headers = ["Name", "Email", "Phone", "LinkedIn", "Job Title", "Department", "Status", "Applied At", "Resume URL"];
  const rows = data.map((a: Record<string, unknown>) => {
    const p = a.profiles as Record<string, string> | null;
    const j = a.job_postings as Record<string, string> | null;
    return [
      p?.full_name || "",
      p?.email || "",
      p?.phone || "",
      p?.linkedin_url || "",
      j?.title || "",
      j?.department || "",
      a.status as string || "",
      a.applied_at as string || "",
      a.resume_url as string || "",
    ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(",");
  });

  const csv = [headers.join(","), ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="applications-${new Date().toISOString().split("T")[0]}.csv"`,
    },
  });
}