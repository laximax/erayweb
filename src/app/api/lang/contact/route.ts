// src/app/api/contact/route.ts
import { NextResponse } from "next/server";

const FORMSPREE_ID = "f/xqagblgj"; // ör: "f/xyzabcd"
const FORMSPREE_ENDPOINT = `https://formspree.io/${FORMSPREE_ID}`;

// Basit boyut/uzantı koruması (isteğe bağlı)
const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "application/pdf",
  "image/webp",
]);

export async function POST(req: Request) {
  try {
    const incoming = await req.formData();

    // Honeypot: 'company' alanı dolu ise spam say
    const honey = (incoming.get("company") || "").toString().trim();
    if (honey) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // Dosya kontrolleri (opsiyonel ama önerilir)
    const file = incoming.get("attachment") as File | null;
    if (file) {
      if (file.size > MAX_FILE_BYTES) {
        return NextResponse.json(
          { ok: false, error: "File too large. (max 5MB)" },
          { status: 400 }
        );
      }
      if (!ALLOWED_TYPES.has(file.type)) {
        return NextResponse.json(
          { ok: false, error: "Unsupported file type." },
          { status: 400 }
        );
      }
    }

    // Formspree'e forward: multipart/form-data'yı aynen gönderiyoruz
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      body: incoming,
      headers: {
        Accept: "application/json",
      },
      // Formspree CORS uyumlu, ek ayar gerekmiyor
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: data?.error || "Failed to send." },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unexpected error." },
      { status: 500 }
    );
  }
}
