import { NextRequest, NextResponse } from "next/server";

const rateMap = new Map<string, { count: number; reset: number }>();

function rateLimit(ip: string, limit: number, windowMs: number): boolean {
  const now   = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

function cleanup() {
  const now = Date.now();
  for (const [key, val] of rateMap.entries()) {
    if (now > val.reset) rateMap.delete(key);
  }
}

export function middleware(req: NextRequest) {
  if (Math.random() < 0.01) cleanup();

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";

  if (req.nextUrl.pathname.startsWith("/api/")) {
    if (req.nextUrl.pathname === "/api/export") return NextResponse.next();
    const allowed = rateLimit(ip, 20, 60_000);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please slow down." },
        { status: 429 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};