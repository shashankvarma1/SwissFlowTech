import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const token = req.nextUrl.searchParams.get("token");
  if (!token || token !== process.env.EXPORT_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceKey
  );

  const { data, error } = await supabase
    .from("applications")
    .select("*, profiles(full_name,email,phone,linkedin_url), job_postings(title,department,type)")
    .order("applied_at", { ascending: false });

  if (error || !data) {
    return NextResponse.json({ error: error?.message || "No data" }, { status: 500 });
  }

  const headers = ["Name","Email","Phone","LinkedIn","Job Title","Department","Type","Status","Applied At","Resume URL"];
  const rows = data.map((a: Record<string, unknown>) => {
    const p = a.profiles as Record<string, string> | null;
    const j = a.job_postings as Record<string, string> | null;
    return [
      p?.full_name    || "",
      p?.email        || "",
      p?.phone        || "",
      p?.linkedin_url || "",
      j?.title        || "",
      j?.department   || "",
      j?.type         || "",
      String(a.status      || ""),
      String(a.applied_at  || ""),
      String(a.resume_url  || ""),
    ].map(v => `"${v.replace(/"/g, '""')}"`).join(",");
  });

  const csv = [headers.join(","), ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="applications-${new Date().toISOString().split("T")[0]}.csv"`,
    },
  });
}