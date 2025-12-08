"use client";
import Image from "next/image";
import { Instagram, Youtube, type LucideIcon } from "lucide-react"; 
import Container from "./Container";
import { useLang } from "../components/LangProvider";

export default function HeroCard() {
  const { t, lang } = useLang();

  return (
    // Mobilde üst boşluğu biraz kıstık (mt-28), büyük ekranda açtık
    <section className="mt-28 sm:mt-32 mb-12 sm:mb-16">
      <Container>
        {/* Kart Ana Yapısı */}
        <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] bg-neutral-900 shadow-2xl ring-1 ring-white/10">
          
          {/* === Arka Plan Görseli === */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero.png"
              alt="ErayTechs hero"
              fill
              priority
              sizes="(min-width: 1500px) 1400px, (min-width: 1280px) 1100px, 100vw"
              quality={90}
              className="object-cover opacity-100"
            />
            {/* Gradient Overlay: Mobilde alttan, masaüstünde sağdan karartma */}
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/90 via-black/50 to-transparent lg:from-black/80 lg:via-black/40" />
          </div>

          {/* === Köşe Çizgileri === */}
          <Corner pos="tl" />
          <Corner pos="tr" />
          <Corner pos="br" />
          <Corner pos="bl" />

          {/* === İçerik Grid === */}
          <div className="relative z-10 grid min-h-[500px] sm:min-h-[600px] lg:min-h-[650px] grid-cols-1 items-center gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:p-14">
            
            {/* Sol Taraf: Büyük Marka İsmi */}
            <div className="flex flex-col justify-center text-center lg:text-left lg:col-span-7">
              <h1 className="leading-none font-bold tracking-tighter text-white">
                {/* Responsive Font Boyutları */}
                <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-[100px] xl:text-[110px] 2xl:text-[130px]">
                  ERAY
                </span>
                <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-[100px] xl:text-[110px] 2xl:text-[130px] text-transparent bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-600">
                  TECHS
                </span>
              </h1>
              
              <p className="mt-4 sm:mt-6 max-w-lg mx-auto lg:mx-0 text-base sm:text-lg lg:text-xl text-neutral-300 font-medium text-shadow-sm">
                {lang === "en" 
                  ? "Technology & Digital Content." 
                  : "Teknoloji & Dijital İçerik."}
              </p>
            </div>

            {/* Sağ Taraf: Sosyal Medya Butonları */}
            <div className="flex items-end justify-center lg:col-span-5 lg:h-full lg:justify-end lg:pb-4">
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                
                <SocialBtn 
                  href="https://instagram.com/eraytechs" 
                  icon={Instagram} 
                  label="Instagram" 
                />
                
                <SocialBtn 
                  href="https://tiktok.com/@eraytechs" 
                  icon={TikTokIcon} 
                  label="TikTok" 
                />
                
                <SocialBtn 
                  href="https://youtube.com/@eraytechs" 
                  icon={Youtube} 
                  label="YouTube" 
                />

              </div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}

/* === Özel TikTok İkonu (SVG) === */
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
    </svg>
  );
}

/* === Sosyal Medya Butonu Bileşeni === */
function SocialBtn({ 
  href, 
  icon: Icon, 
  label 
}: { 
  href: string; 
  icon: LucideIcon | React.ElementType; 
  label: string 
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      // Mobilde butonları biraz küçülttük (h-12 w-12), masaüstünde eski boyutta (h-14 w-14)
      className="group relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
    >
      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white transition-colors duration-300 group-hover:text-black" />
    </a>
  );
}

/* === Köşe Çizgileri === */
function Corner({ pos }: { pos: "tl" | "tr" | "br" | "bl" }) {
  // Mobilde köşeleri biraz küçülttük ve içe çektik
  const map: Record<string, string> = {
    tl: "left-4 top-4 sm:left-6 sm:top-6 border-l-2 border-t-2",
    tr: "right-4 top-4 sm:right-6 sm:top-6 border-r-2 border-t-2",
    br: "right-4 bottom-4 sm:right-6 sm:bottom-6 border-r-2 border-b-2",
    bl: "left-4 bottom-4 sm:left-6 sm:bottom-6 border-l-2 border-b-2",
  };
  return (
    <div
      className={`pointer-events-none absolute ${map[pos]} h-6 w-6 sm:h-8 sm:w-8 rounded-sm border-white/30 opacity-60`}
    />
  );
}