"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLang } from "../components/LangProvider"; // Yolun doğru olduğundan emin olun
import { Menu, X } from "lucide-react";

const SECTIONS = ["collaboration", "testimonials"] as const;
type Sec = (typeof SECTIONS)[number];

export default function TopNavPill() {
  const pathname = usePathname();
  const { lang, setLang, t } = useLang();

   const isContactLike =
    pathname?.startsWith("/contact") ||
    pathname?.startsWith("/links") ||
     pathname?.startsWith("/prompts") ||
    pathname?.startsWith("/legal");

  const isMediaKit = pathname?.startsWith("/mediakit");

  const isStandalone = isContactLike || isMediaKit;

  const [active, setActive] = useState<Sec | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

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
    `transition whitespace-nowrap ${
      active === id ? "text-white" : "text-neutral-300 hover:text-white"
    }`;

  const handleNavClick = () => setMenuOpen(false);

  const languageSwitcher = (
    <div
      className="flex shrink-0 items-center gap-1 rounded-full bg-white/10 p-1 text-xs"
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
  );
const brandLink = (
      <Link href="/" className="shrink-0 whitespace-nowrap font-semibold text-white">
      {t.brand}
      <span className="align-super text-[10px] opacity-70">™</span>
    </Link>
  );
  return (
    <div className="fixed left-1/2 top-4 z-50 w-full max-w-[95%] -translate-x-1/2 md:w-auto md:max-w-none">
      {/* ----------------MOBILE NAVIGATION---------------- */}
      <nav
        className="
          block md:hidden
          rounded-[28px] bg-black/90 backdrop-blur-sm
          px-4 py-3
          text-[14px]
          shadow-lg ring-1 ring-black/10
        "
      >
         {isStandalone ? (
          <div className="flex flex-wrap items-center gap-3">
            {brandLink}

       
            <Link
              href="/"
              onClick={handleNavClick}
             className="text-white underline decoration-white/60 underline-offset-4 transition hover:decoration-white"
            >
              {t.nav.back}
            </Link>
        
               {isMediaKit && (
              <Link
              href="/contact"
                onClick={handleNavClick}
                className="whitespace-nowrap text-neutral-300 transition hover:text-white"
              >
                {t.nav.contact}
              </Link>
            )}

               <div className="ml-auto w-full min-[420px]:w-auto">{languageSwitcher}</div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3">
              {/* Logo */}
              {brandLink}

              <button
                type="button"
                className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label={menuOpen ? "Close navigation" : "Open navigation"}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
       
            <div
              className={`mt-3 flex flex-col items-start gap-3 ${
                menuOpen ? "flex" : "hidden"
              }`}
            >
              <div className="flex flex-col gap-2">
                <a href="#collaboration" className={linkCls("collaboration")} onClick={handleNavClick}>
                  {t.nav.benefits}
                </a>
                
                <Link
                  href="/links"
                  onClick={handleNavClick}
                  className="whitespace-nowrap text-neutral-300 transition hover:text-white"
                >
                  {t.nav.faq}
                </Link>

                <Link
                  href="/mediakit"
                  onClick={handleNavClick}
                  className="whitespace-nowrap text-neutral-300 transition hover:text-white"
                >
                   {t.nav.mediakit}
                </Link>

                <Link
                  href="/prompts"
                  onClick={handleNavClick}
                  className="whitespace-nowrap text-neutral-300 transition hover:text-white"
                >
                  {t.nav.prompts}
                </Link>

                <Link
                  href="/contact"
                  onClick={handleNavClick}
                  className="whitespace-nowrap text-neutral-300 transition hover:text-white"
                >
                  {t.nav.contact}
                </Link>
              </div>

              <div className="w-full">{languageSwitcher}</div>
            </div>
          </>
        )}
         
      </nav>

      {/* ----------------DESKTOP & TABLET NAVIGATION---------------- */}
      <nav
        className="
          hidden md:flex md:items-center
          rounded-full bg-black/90 backdrop-blur-sm
          px-5 py-3 lg:px-7
          text-[15px]
          shadow-lg ring-1 ring-black/10
        "
      >
        {/* 1. Logo (En Solda) */}
        <Link href="/" className="shrink-0 font-semibold text-white whitespace-nowrap mr-6 lg:mr-8">
          {t.brand}
          <span className="align-super text-[10px] opacity-70">™</span>
        </Link>

        {/* 2. Linkler (Ortada / Solda Logo'nun yanında) */}
        {isStandalone ? (
             <div className="flex items-center gap-4 lg:gap-6">
            <Link
              href="/"
              onClick={handleNavClick}
              className="whitespace-nowrap rounded-full bg-white/10 px-3 py-1.5 text-white transition hover:bg-white/15"
            >
              {t.nav.back}
            </Link>
             {isMediaKit && (
              <Link
                href="/contact"
                className="whitespace-nowrap text-neutral-300 transition hover:text-white"
              >
                {t.nav.contact}
              </Link>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-6 lg:gap-8">
            <a href="#collaboration" className={linkCls("collaboration")}>
              {t.nav.benefits}
            </a>
          
            <Link
              href="/links"
              className="whitespace-nowrap text-neutral-300 transition hover:text-white"
            >
              {t.nav.faq}
            </Link>
            <Link
              href="/mediakit"
              className="whitespace-nowrap text-neutral-300 transition hover:text-white"
            >
              {t.nav.mediakit}
            </Link>
            <Link
              href="/prompts"
              className="whitespace-nowrap text-neutral-300 transition hover:text-white"
            >
              {t.nav.prompts}
            </Link>
            <Link
              href="/contact"
              className="whitespace-nowrap text-neutral-300 transition hover:text-white"
            >
              {t.nav.contact}
            </Link>
          </div>
        )}

        {/* 3. Dil Değiştirici (En Sağda) */}
        {/* ml-auto: Otomatik sol boşluk vererek en sağa iter */}
        <div className="ml-auto pl-6">
           {languageSwitcher}
        </div>
      </nav>
    </div>
  );
}