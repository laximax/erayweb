// src/app/api/lang/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { lang } = await request.json();

  if (lang !== "tr" && lang !== "en") {
    return new NextResponse("Invalid language", { status: 400 });
  }

  const res = NextResponse.json({ ok: true });
  // 1 yıl geçerli cookie
  res.cookies.set("lang", lang, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return res;
}
