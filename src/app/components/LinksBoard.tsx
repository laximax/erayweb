"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Link as LinkIcon,
  Globe,
  Instagram,
  Music,
  Youtube,
  ShoppingBag,
  Copy,
  Check,
} from "lucide-react";
import { useLang } from "./LangProvider";
import Container from "./Container";
import TopNavPill from "./TopNavPill"; // Back To Home

type LinkItem = {
  label: string;
  href: string;
  icon?: React.ReactNode;
  chip?: string;
};

const LINKS: LinkItem[] = [
  { label: "Website",   href: "https://eraytechs.com",           icon: <Globe className="h-4 w-4" /> },
  { label: "Instagram", href: "https://instagram.com/eraytechs", icon: <Instagram className="h-4 w-4" /> },
  { label: "TikTok",    href: "https://tiktok.com/@eraytechs",   icon: <Music className="h-4 w-4" /> },
  { label: "YouTube",   href: "https://youtube.com/@eraytechs",  icon: <Youtube className="h-4 w-4" /> },
];

const SHOP: LinkItem[] = [
  { label: "Creator Gear List",   href: "https://example.com/gear",    icon: <ShoppingBag className="h-4 w-4" />, chip: "New" },
  { label: "PC Optimize Presets", href: "https://example.com/presets", icon: <ShoppingBag className="h-4 w-4" /> },
];

export default function LinksBoard() {
  const { t } = useLang();
  const [tab, setTab] = useState<"links" | "shop">("links");
  const [copied, setCopied] = useState(false);

  const data = tab === "links" ? LINKS : SHOP;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("https://eraytechs.com/links");
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <main
      className="
        relative min-h-screen pb-24 pt-28
        bg-neutral-100
        before:absolute before:inset-0 before:-z-10
        before:bg-[radial-gradient(60%_40%_at_50%_0%,rgba(255,255,255,0.85),rgba(255,255,255,0)_60%)]
        after:absolute after:inset-0 after:-z-10
        after:bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0))]
      "
    >
      {/* Back To Home butonlu navbar */}
      <TopNavPill />

      <Container>
        {/* Dış kart */}
        <div className="mx-auto w-full max-w-3xl rounded-[28px] bg-white/80 p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] ring-1 ring-black/10 backdrop-blur-sm sm:p-8 lg:p-10">
          {/* --- PROFIL BLOĞU (kartın içinde) --- */}
          <div className="mx-auto max-w-md text-center">
          <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full ring-4 ring-white shadow-lg aspect-square">
  <Image
    src="/hero.png"   // mümkünse /public/logo.png kare (1:1) kullan
    alt="ErayTechs"
    fill
    sizes="112px"
    className="object-cover"   // 🔥 tam oturur, taşanı kırpar
    priority
  />
</div>

            <h1 className="mt-4 text-3xl font-semibold text-neutral-900">ErayTechs</h1>
            <p className="text-sm text-neutral-600">@eraytechs</p>
          </div>

  

          {/* Tabs */}
          <div className="mt-6 flex justify-center">
            <div className="inline-flex rounded-full bg-neutral-100 p-1 ring-1 ring-black/10">
              <button
                onClick={() => setTab("links")}
                className={`px-4 py-1.5 text-sm rounded-full ${
                  tab === "links" ? "bg-white shadow" : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                Links
              </button>
              <button
                onClick={() => setTab("shop")}
                className={`px-4 py-1.5 text-sm rounded-full ${
                  tab === "shop" ? "bg-white shadow" : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                Shop
              </button>
            </div>
          </div>

          {/* Liste (hover efektli) */}
          <ul className="mt-6 space-y-4">
            {data.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  className="
                    group flex items-center justify-between
                    rounded-2xl border border-neutral-200/70 bg-white/90 p-4
                    shadow-sm ring-1 ring-black/5 backdrop-blur
                    transition
                    hover:-translate-y-[2px] hover:shadow-lg hover:ring-black/10
                  "
                >
                  <span className="flex items-center gap-3">
                    <span
                      className="
                        flex h-10 w-10 items-center justify-center
                        rounded-xl bg-neutral-100 text-neutral-900
                        transition group-hover:bg-black group-hover:text-white
                      "
                    >
                      {item.icon ?? <LinkIcon className="h-5 w-5" />}
                    </span>
                    <span className="text-[15px] font-medium text-neutral-900">
                      {item.label}
                    </span>
                    {item.chip ? (
                      <span className="rounded-full bg-neutral-100 px-2 py-[2px] text-[11px] text-neutral-700">
                        {item.chip}
                      </span>
                    ) : null}
                  </span>
                  <span className="text-sm text-neutral-500 transition group-hover:text-neutral-700">
                    Open
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* Alt çubuk: açıklama + kopyala */}
          <div className="mt-6 flex items-center justify-between rounded-2xl bg-neutral-50 px-4 py-3 text-xs text-neutral-600 ring-1 ring-neutral-200">
            <span>{t.footer.about}</span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-neutral-900 ring-1 ring-neutral-300 transition hover:bg-neutral-100"
              title="Copy page link"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </Container>
    </main>
  );
}
