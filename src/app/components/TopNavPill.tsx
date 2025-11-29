"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLang } from "../components/LangProvider";

// Scrollspy sadece tek sayfa bölümleri için.
// FAQ ve MediaKit artık ayrı sayfa (/links, /mediakit)
const SECTIONS = ["benefits", "testimonials"] as const;
type Sec = (typeof SECTIONS)[number];

export default function TopNavPill() {
  const pathname = usePathname();
  const { lang, setLang, t } = useLang();

  // /contact veya /links veya /mediakit sayfalarında "Back To Home" gösterelim
  const isStandalone =
    pathname?.startsWith("/contact") ||
    pathname?.startsWith("/links") ||
    pathname?.startsWith("/mediakit");

  const [active, setActive] = useState<Sec | null>(null);
  useEffect(() => {
    if (isStandalone) return;
    const ios: IntersectionObserver[] = [];

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setActive(id),
        { rootMargin: "-96px 0px -60% 0px", threshold: 0.1 }
      );
      io.observe(el);
      ios.push(io);
    });

    return () => ios.forEach((o) => o.disconnect());
  }, [isStandalone]);

  const linkCls = (id: Sec) =>
    `transition ${
      active === id ? "text-white" : "text-neutral-300 hover:text-white"
    }`;

  return (
    <div className="fixed left-1/2 top-4 z-50 -translate-x-1/2">
      <nav className="flex items-center gap-8 rounded-full bg-black/90 backdrop-blur-sm px-7 py-3 text-[15px] shadow-lg ring-1 ring-black/10">
        <Link href="/" className="font-semibold text-white">
          {t.brand}
          <span className="align-super text-[10px] opacity-70">®</span>
        </Link>

        {isStandalone ? (
          <Link
            href="/"
            className="ml-1 rounded-full bg-white/10 px-3 py-1.5 text-white transition hover:bg-white/15"
          >
            {t.nav.back}
          </Link>
        ) : (
          <>
            <a href="#benefits" className={linkCls("benefits")}>
              {t.nav.benefits}
            </a>
            <a href="#testimonials" className={linkCls("testimonials")}>
              {t.nav.testimonials}
            </a>
            <Link
              href="/links"
              className="text-neutral-300 transition hover:text-white"
            >
              {t.nav.faq}
              
            </Link>

            {/* 🔥 Yeni MediaKit butonu */}
            <Link
  href="/mediakit"
  className="text-neutral-300 transition hover:text-white"
>
  Media Kit
</Link>

<Link
  href="/contact"
  className="text-neutral-300 transition hover:text-white"
>
  Contact
</Link>

          </>
        )}

        {/* Dil butonları (her sayfada kalsın) */}
        <div
          className="ml-1 flex items-center gap-1 rounded-full bg-white/10 p-1 text-xs"
          role="group"
          aria-label="Language switcher"
        >
          <button
            type="button"
            onClick={() => setLang("tr")}
            className={`rounded-full px-2.5 py-1 ${
              lang === "tr"
                ? "bg-white text-black"
                : "text-white/80 hover:text-white"
            }`}
          >
            TR
          </button>
          <button
            type="button"
            onClick={() => setLang("en")}
            className={`rounded-full px-2.5 py-1 ${
              lang === "en"
                ? "bg-white text-black"
                : "text-white/80 hover:text-white"
            }`}
          >
            EN
          </button>
        </div>
      </nav>
    </div>
  );
}
