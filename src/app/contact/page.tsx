// src/app/contact/page.tsx
"use client";

import { useLang } from "../components/LangProvider";
import { useEffect, useMemo, useRef, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const MAX_FILE_MB = 5;
const ALLOWED_TYPES = ["application/pdf", "image/png", "image/jpeg", "image/webp"];

export default function ContactPage() {
  const { t, lang } = useLang();

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const mountedAtRef = useRef<number>(0);

  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    mountedAtRef.current = Date.now();
  }, []);

  const emailValid = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()),
    [email]
  );
  const subjectValid = subject.trim().length >= 3;
  const messageValid = message.trim().length >= 10;
  const formValid = emailValid && subjectValid && messageValid;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget as HTMLFormElement;

    // Dosyayı doğrudan input üzerinden al
    const fileInput = form.elements.namedItem("attachment") as HTMLInputElement | null;
    const file = fileInput?.files && fileInput.files.length > 0 ? fileInput.files[0] : null;

    // Dosya gerçekten seçilmişse doğrula
    if (file) {
      if (file.size === 0) {
        // 0-byte dosya: yok say
      } else {
        if (file.size > MAX_FILE_MB * 1024 * 1024) {
          setStatus("error");
          setErrorMsg(lang === "en" ? `File is too large (max ${MAX_FILE_MB}MB).` : `Dosya çok büyük (en fazla ${MAX_FILE_MB}MB).`);
          return;
        }
        if (!file.type || !ALLOWED_TYPES.includes(file.type)) {
          setStatus("error");
          setErrorMsg(lang === "en" ? "Unsupported file type." : "Desteklenmeyen dosya türü.");
          return;
        }
      }
    }

    const fd = new FormData(form);

    // Dosya yoksa/0 baytsa tamamen kaldır
    if (!file || file.size === 0) {
      fd.delete("attachment");
    }

    // Anti-spam sinyali
    fd.append("openedAt", String(mountedAtRef.current));

    try {
      const res = await fetch("/api/contact", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data?.error || (lang === "en" ? "Failed to send." : "Gönderilemedi."));
        return;
      }

      setStatus("success");
      form.reset();
      setEmail("");
      setSubject("");
      setMessage("");

      // Başarıdan sonra thanks'e gitmek istersen:
      // router.push("/thanks");
    } catch {
      setStatus("error");
      setErrorMsg(lang === "en" ? "Network error. Try again." : "Ağ hatası. Tekrar deneyin.");
    }
  }

  return (
    <main className="min-h-screen bg-neutral-50 pb-24 pt-28">
      <div className="mx-auto w-full max-w-[94%] sm:max-w-2xl lg:max-w-3xl">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center rounded-full bg-neutral-200 px-4 py-1 text-sm text-neutral-700">
            {t.contact.title.split(" ")[0]}
          </span>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            {lang === "en" ? (
              <>Reach <span className="font-serif italic">Out to Us</span></>
            ) : (
              <>Bizimle <span className="font-serif italic">İletişime Geç</span></>
            )}
          </h1>

          <p className="mt-2 text-neutral-600">{t.contact.desc}</p>
        </div>

        <form onSubmit={onSubmit} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8" noValidate>
          {/* Honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" />

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm text-neutral-700">
                {lang === "en" ? "Your Name" : "Adınız"}
              </label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                placeholder={lang === "en" ? "John" : "Ahmet"}
                className="w-full rounded-xl bg-neutral-100 px-4 py-2 outline-none ring-1 ring-transparent focus:bg-white focus:ring-neutral-300"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm text-neutral-700">
                {lang === "en" ? "Email Address" : "E-posta Adresi"}
              </label>
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder={lang === "en" ? "yourmail@mail.com" : "epostaniz@mail.com"}
                className={`w-full rounded-xl bg-neutral-100 px-4 py-2 outline-none ring-1 focus:bg-white ${
                  email.length === 0 ? "ring-transparent" : emailValid ? "ring-emerald-300" : "ring-rose-300"
                }`}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <p className="mt-1 text-xs text-neutral-500">
                {email && !emailValid ? (lang === "en" ? "Enter a valid email." : "Geçerli bir e-posta girin.") : " "}
              </p>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="subject" className="mb-2 block text-sm text-neutral-700">
                {lang === "en" ? "Subject" : "Konu"}
              </label>
              <input
                id="subject"
                name="subject"
                placeholder={lang === "en" ? "Sponsorship / Collaboration" : "Sponsorluk / İş Birliği"}
                className={`w-full rounded-xl bg-neutral-100 px-4 py-2 outline-none ring-1 focus:bg-white ${
                  subject.length === 0 ? "ring-transparent" : subjectValid ? "ring-emerald-300" : "ring-rose-300"
                }`}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="message" className="mb-2 block text-sm text-neutral-700">
                {lang === "en" ? "Message" : "Mesajınız"}
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder={lang === "en" ? "Your message..." : "Mesajınızı buraya yazın..."}
                className={`w-full resize-y rounded-xl bg-neutral-100 px-4 py-3 outline-none ring-1 focus:bg-white ${
                  message.length === 0 ? "ring-transparent" : messageValid ? "ring-emerald-300" : "ring-rose-300"
                }`}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <div className="mt-1 flex items-center justify-between text-xs text-neutral-500">
                <span>{lang === "en" ? "Min 10 characters" : "En az 10 karakter"}</span>
                <span>{message.length}</span>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="attachment" className="mb-2 block text-sm text-neutral-700">
                {lang === "en" ? "Attachment (optional)" : "Ek (opsiyonel)"}
              </label>
              <input
                id="attachment"
                type="file"
                name="attachment"
                accept="application/pdf,image/*"
                className="w-full rounded-xl bg-neutral-100 px-4 py-2 file:mr-4 file:rounded-lg file:border-0 file:bg-neutral-200 file:px-3 file:py-1.5 file:text-neutral-700"
              />
              <p className="mt-1 text-xs text-neutral-500">
                {lang === "en" ? "Max 5MB. Allowed: pdf, png, jpg, webp." : "En fazla 5MB. İzinli: pdf, png, jpg, webp."}
              </p>
            </div>
          </div>

          {status === "success" && (
            <div className="mt-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {lang === "en" ? "Your message has been sent. Thank you!" : "Mesajınız gönderildi. Teşekkürler!"}
            </div>
          )}
          {status === "error" && (
            <div className="mt-4 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">{errorMsg}</div>
          )}

          <button
            type="submit"
            disabled={status === "loading" || !formValid}
            className="mt-6 w-full rounded-full bg-black px-5 py-2.5 text-white transition hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-70"
            aria-busy={status === "loading"}
          >
            {status === "loading" ? (lang === "en" ? "Sending..." : "Gönderiliyor...") : t.contact.submit}
          </button>
        </form>
      </div>
    </main>
  );
}
