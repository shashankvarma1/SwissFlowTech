import { NextRequest, NextResponse } from "next/server";

const rateMap = new Map<string, { count: number; reset: number }>();

function rateLimit(ip: string, limit: number, windowMs: number): boolean {
  const now  = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + windowMs });
    return true;
  }

  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

export function middleware(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

  // Rate limit API routes: 20 requests per minute
  if (req.nextUrl.pathname.startsWith("/api/")) {
    const allowed = rateLimit(ip, 20, 60_000);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};