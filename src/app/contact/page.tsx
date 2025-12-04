"use client";

import { useState } from "react";
import { Copy, Check, Mail, ArrowUpRight } from "lucide-react";
 import { useLang } from "../components/LangProvider";

// ⚠️ ÖNEMLİ: Kendi projenizde aşağıdaki "MOCK VERİLER" bloğunu tamamen SİLİN.
// --- MOCK VERİLER BAŞLANGICI ---


// Bu fonksiyon sadece önizlemenin çalışması içindir.
// Gerçek projede 'LangProvider'dan gelen hook kullanılacak.


export default function ContactPage() {
  // useLang hem 'lang' bilgisini hem de 't' çeviri objesini getirir.
  const { lang, t } = useLang();
  
  const [copied, setCopied] = useState(false);
  const email = "eray@eraytechs.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-neutral-50 px-4 pt-20 sm:pt-0">
      {/* Arka plan dokusu */}
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg text-center">
        {/* Üst Badge */}
        <div className="mb-6 animate-fade-in-up">
          <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white/50 px-3 py-1 text-xs font-medium text-neutral-500 backdrop-blur-sm">
            {t.contact.badge}
            <span className="ml-2 relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </span>
        </div>

        {/* Ana Başlık */}
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-neutral-900 sm:text-6xl">
          {t.contact.titlePart1} <br />
          <span className="font-serif italic text-neutral-500">
            {t.contact.titlePart2}
          </span>
        </h1>

        <p className="mx-auto mb-10 max-w-sm text-neutral-600 sm:text-lg">
          {t.contact.desc}
        </p>

        {/* E-posta Kartı */}
        <div className="group relative mx-auto mb-8 w-full max-w-sm cursor-pointer" onClick={handleCopy}>
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-neutral-200 to-neutral-100 opacity-50 blur transition duration-500 group-hover:opacity-100" />
          
          <div className="relative flex items-center justify-between rounded-2xl border border-neutral-200 bg-white p-2 pl-5 shadow-sm transition-all duration-300 hover:shadow-md active:scale-[0.98]">
            <div className="flex flex-col items-start overflow-hidden">
              <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                {t.contact.emailLabel}
              </span>
              <span className="text-lg font-semibold text-neutral-900 sm:text-xl truncate w-full">
                {email}
              </span>
            </div>

            <button
              className={`flex h-12 w-12 flex-none items-center justify-center rounded-xl transition-all duration-300 ${
                copied 
                  ? "bg-emerald-500 text-white rotate-0" 
                  : "bg-neutral-100 text-neutral-600 hover:bg-black hover:text-white rotate-0"
              }`}
              aria-label="Copy Email"
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
            </button>
          </div>
          
          {/* Kopyalandı Bildirimi */}
          <div className={`absolute -top-10 left-1/2 -translate-x-1/2 transform rounded-full bg-black px-3 py-1 text-xs text-white transition-all duration-300 ${copied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            {t.contact.copied}
          </div>
        </div>

        {/* Mail Uygulamasında Aç */}
        <div className="flex justify-center">
          <a 
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-black"
          >
            <Mail size={16} />
            <span>{t.contact.openMail}</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
      
      {/* Footer Yıl Bilgisi */}
      <div className="absolute bottom-8 text-center text-xs text-neutral-400">
        <p>Istanbul, TR • {new Date().getFullYear()}</p>
      </div>
    </main>
  );
}