"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Link as LinkIcon,
  Globe,
  Instagram,
  Youtube,
  ShoppingBag,
  Copy,
  Check,
} from "lucide-react";
// ✅ Import yolları düzeltildi: src/app/links -> src/components için ../../ kullanıldı
import { useLang } from "../components/LangProvider"; 
import Container from "../components/Container";
import TopNavPill from "../components/TopNavPill";

// TikTok ikonu Lucide'de olmadığı için özel SVG
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.65-1.55-1.09-.01 3.05-.03 6.1.02 9.15.03 1.68-.49 3.39-1.5 4.74-1.22 1.65-3.21 2.67-5.26 2.64-3.13-.05-5.83-2.3-6.52-5.35-.69-3.04 1.05-6.22 3.97-7.23.51-.18 1.06-.28 1.61-.28v4.22c-1.23.06-2.36.98-2.58 2.2-.24 1.34.61 2.73 1.91 3.12 1.48.45 3.06-.44 3.42-1.92.1-1.39.06-2.78.06-4.18V.02z" />
  </svg>
);

type LinkItem = {
  id: string; // Çeviri için anahtar
  labelFallback?: string; // Sosyal medya isimleri için
  href: string;
  icon?: React.ReactNode;
  chip?: string;
};

// Veri setleri
const LINKS_DATA: LinkItem[] = [
  { id: "website", href: "https://eraytechs.com", icon: <Globe className="h-4 w-4" /> },
];

const SOCIAL_DATA: LinkItem[] = [
  { id: "instagram", labelFallback: "Instagram", href: "https://instagram.com/eraytechs", icon: <Instagram className="h-4 w-4" /> },
  { id: "tiktok", labelFallback: "TikTok", href: "https://tiktok.com/@eraytechs", icon: <TikTokIcon className="h-4 w-4" /> }, // ✅ Yeni İkon
  { id: "youtube", labelFallback: "YouTube", href: "https://youtube.com/@eraytechs", icon: <Youtube className="h-4 w-4" /> },
];

const SHOP_DATA: LinkItem[] = [
  { id: "gear", href: "", icon: <ShoppingBag className="h-4 w-4" />, chip: "New" },
  { id: "presets", href: "", icon: <ShoppingBag className="h-4 w-4" /> },
];

export default function LinksBoard() {
  const { t } = useLang();
  const [tab, setTab] = useState<"links" | "social" | "shop">("links"); // ✅ 3. Tab eklendi
  const [copied, setCopied] = useState(false);

  // Aktif veriyi seç
  const data = 
    tab === "links" ? LINKS_DATA :
    tab === "social" ? SOCIAL_DATA : 
    SHOP_DATA;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("https://eraytechs.com/links");
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  // Dinamik Label Çözücü
  // Sosyal medya isimleri sabit kalırken, Website/Shop isimleri dile göre değişir
  const getLabel = (item: LinkItem) => {
    if (item.labelFallback) return item.labelFallback;
    // i18n dosyasındaki items altındaki anahtarı çekiyoruz
    return t.linksPage?.items?.[item.id as keyof typeof t.linksPage.items] || item.id;
  };

  return (
    <main
      className="
        relative min-h-screen pb-20 pt-24 sm:pb-24 sm:pt-28
        bg-neutral-100
        before:absolute before:inset-0 before:-z-10
        before:bg-[radial-gradient(60%_40%_at_50%_0%,rgba(255,255,255,0.85),rgba(255,255,255,0)_60%)]
        after:absolute after:inset-0 after:-z-10
        after:bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0))]
      "
    >
      <TopNavPill />

      <Container>
         <div className="mx-auto w-full max-w-3xl rounded-[28px] bg-white/80 p-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] ring-1 ring-black/10 backdrop-blur-sm sm:p-8 lg:p-10">
          {/* --- PROFIL BLOĞU --- */}
          <div className="mx-auto max-w-md text-center">
            <div className="relative mx-auto h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-full ring-4 ring-white shadow-lg aspect-square">
              <Image
                src="/eraytechs.png" // Logoyu buraya koy
                alt="ErayTechs"
                fill
                sizes="112px"
                className="object-cover"
                priority
              />
            </div>

            <h1 className="mt-4 text-[clamp(1.8rem,4vw,2.2rem)] font-semibold text-neutral-900">ErayTechs</h1>
            <p className="text-sm text-neutral-600">@eraytechs</p>
          </div>

          {/* --- TABS --- */}
          <div className="mt-6 flex justify-center">
            <div className="inline-flex rounded-full bg-neutral-100 p-1 ring-1 ring-black/10">
              {/* Links Tab */}
              <button
                onClick={() => setTab("links")}
                className={`px-4 py-1.5 text-sm rounded-full transition-all ${
                  tab === "links" ? "bg-white shadow text-black" : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {t.linksPage?.tabs?.links || "Links"}
              </button>

              {/* Social Tab (YENİ) */}
              <button
                onClick={() => setTab("social")}
                className={`px-4 py-1.5 text-sm rounded-full transition-all ${
                  tab === "social" ? "bg-white shadow text-black" : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {t.linksPage?.tabs?.social || "Social"}
              </button>

              {/* Shop Tab */}
              <button
                onClick={() => setTab("shop")}
                className={`px-4 py-1.5 text-sm rounded-full transition-all ${
                  tab === "shop" ? "bg-white shadow text-black" : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {t.linksPage?.tabs?.shop || "Shop"}
              </button>
            </div>
          </div>

          {/* --- LISTE --- */}
          <ul className="mt-6 space-y-4">
            {data.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  target="_blank"
                  className="
                     group flex items-center justify-between gap-3 flex-wrap
                    rounded-2xl border border-neutral-200/70 bg-white/90 p-4
                    shadow-sm ring-1 ring-black/5 backdrop-blur
                    transition
                    hover:-translate-y-[2px] hover:shadow-lg hover:ring-black/10
                  "
                >
                   <span className="flex items-center gap-3 min-w-[200px] flex-1">
                    <span
                      className="
                        flex h-10 w-10 items-center justify-center flex-shrink-0
                        rounded-xl bg-neutral-100 text-neutral-900
                        transition group-hover:bg-black group-hover:text-white
                      "
                    >
                      {item.icon ?? <LinkIcon className="h-5 w-5" />}
                    </span>
                    <span className="text-[15px] font-medium text-neutral-900">
                      {getLabel(item)}
                    </span>
                    {item.chip ? (
                      <span className="rounded-full bg-neutral-100 px-2 py-[2px] text-[11px] text-neutral-700">
                        {item.chip}
                      </span>
                    ) : null}
                  </span>
                  <span className="text-sm text-neutral-500 transition group-hover:text-neutral-700 ml-auto">
                    {t.linksPage?.cta?.open || "Open"}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* --- ALT ÇUBUK --- */}
          <div className="mt-6 flex items-center justify-between rounded-2xl bg-neutral-50 px-4 py-3 text-xs text-neutral-600 ring-1 ring-neutral-200">
            <span>{t.linksPage.footerText}</span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-neutral-900 ring-1 ring-neutral-300 transition hover:bg-neutral-100"
              title="Copy page link"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? (t.linksPage?.cta?.copied || "Copied") : (t.linksPage?.cta?.copy || "Copy")}
            </button>
          </div>
        </div>
      </Container>
    </main>
  );
}