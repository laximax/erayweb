"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLang } from "../components/LangProvider";

const SECTIONS = ["benefits", "testimonials"] as const;
type Sec = (typeof SECTIONS)[number];

export default function TopNavPill() {
  const pathname = usePathname();
  const { lang, setLang, t } = useLang();

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

  // Whitespace-nowrap ekleyerek mobilde metinlerin alt satıra düşmesini engelledik
  const linkCls = (id: Sec) =>
    `transition whitespace-nowrap ${
      active === id ? "text-white" : "text-neutral-300 hover:text-white"
    }`;

  return (
    // Mobilde genişliği kısıtlayıp ortaladık
    <div className="fixed left-1/2 top-4 z-50 w-full max-w-[95%] -translate-x-1/2 sm:w-auto sm:max-w-none">
      <nav 
        className="
          flex items-center gap-6 sm:gap-8 
          rounded-full bg-black/90 backdrop-blur-sm 
          px-5 py-3 sm:px-7 
          text-[14px] sm:text-[15px] 
          shadow-lg ring-1 ring-black/10
          overflow-x-auto no-scrollbar
        "
      >
        {/* Logo */}
        <Link href="/" className="font-semibold text-white shrink-0">
          {t.brand}
          <span className="align-super text-[10px] opacity-70">®</span>
        </Link>

        {isStandalone ? (
          <Link
            href="/"
            className="ml-auto sm:ml-1 shrink-0 rounded-full bg-white/10 px-3 py-1.5 text-white transition hover:bg-white/15 whitespace-nowrap"
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
              className="text-neutral-300 transition hover:text-white whitespace-nowrap"
            >
              {t.nav.faq}
            </Link>

            <Link
              href="/mediakit"
              className="text-neutral-300 transition hover:text-white whitespace-nowrap"
            >
              Media Kit
            </Link>

            <Link
              href="/contact"
              className="text-neutral-300 transition hover:text-white whitespace-nowrap"
            >
              Contact
            </Link>
          </>
        )}

        {/* Dil Butonları */}
        <div
          className="ml-auto sm:ml-1 flex shrink-0 items-center gap-1 rounded-full bg-white/10 p-1 text-xs"
          role="group"
          aria-label="Language switcher"
        >
          <button
            type="button"
            onClick={() => setLang("tr")}
            className={`rounded-full px-2.5 py-1 transition ${
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
            className={`rounded-full px-2.5 py-1 transition ${
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