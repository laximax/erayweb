"use client";
import Image from "next/image";
import { Instagram, Youtube, type LucideIcon } from "lucide-react"; 
import Container from "./Container";
import { useLang } from "../components/LangProvider";

export default function HeroCard() {
  // lang değişkenini de çektik
  const { t, lang } = useLang();

  return (
    <section className="mt-32 mb-16">
      <Container>
        {/* Kart Ana Yapısı */}
        <div className="relative overflow-hidden rounded-[32px] bg-neutral-900 shadow-2xl ring-1 ring-white/10">
          
          {/* === Arka Plan Görseli === */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero.png"
              alt="ErayTechs hero"
              fill
              priority
              sizes="(min-width: 1280px) 1100px, 100vw"
              quality={90}
              className="object-cover opacity-100"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>

          {/* === Köşe Çizgileri === */}
          <Corner pos="tl" />
          <Corner pos="tr" />
          <Corner pos="br" />
          <Corner pos="bl" />

          {/* === İçerik Grid === */}
          <div className="relative z-10 grid min-h-[480px] grid-cols-1 items-center gap-8 p-8 sm:min-h-[600px] lg:grid-cols-12 lg:p-14">
            
            {/* Sol Taraf: Büyük Marka İsmi */}
            <div className="flex flex-col justify-center lg:col-span-7">
              <h1 className="text-6xl font-bold tracking-tighter text-white sm:text-7xl md:text-8xl lg:text-[100px] leading-none">
                ERAY
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-600">
                  TECHS
                </span>
              </h1>
              
              {/* === DİL DESTEĞİ EKLENEN KISIM === */}
              <p className="mt-6 max-w-md text-lg text-neutral-400 font-medium">
                {lang === "en" 
                  ? "Technology & Digital Content." 
                  : "Teknoloji &  Dijital İçerik."}
              </p>
            </div>

            {/* Sağ Taraf: Sosyal Medya Butonları */}
            <div className="flex items-end justify-start lg:col-span-5 lg:h-full lg:justify-end lg:pb-4">
              <div className="flex flex-wrap gap-4">
                
                <SocialBtn 
                  href="https://instagram.com/eraytechs" 
                  icon={Instagram} 
                  label="Instagram" 
                />
                
                {/* TikTok için özel ikonumuzu kullanıyoruz */}
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
// Lucide ikonlarıyla aynı boyutta ve yapıda olması için tasarlandı
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
  // Hem LucideIcon hem de bizim özel TikTokIcon bileşenini kabul etmesi için React.ElementType kullanıyoruz
  icon: LucideIcon | React.ElementType; 
  label: string 
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
    >
      <Icon className="h-6 w-6 text-white transition-colors duration-300 group-hover:text-black" />
    </a>
  );
}

/* === Köşe Çizgileri === */
function Corner({ pos }: { pos: "tl" | "tr" | "br" | "bl" }) {
  const map: Record<string, string> = {
    tl: "left-6 top-6 border-l-2 border-t-2",
    tr: "right-6 top-6 border-r-2 border-t-2",
    br: "right-6 bottom-6 border-r-2 border-b-2",
    bl: "left-6 bottom-6 border-l-2 border-b-2",
  };
  return (
    <div
      className={`pointer-events-none absolute ${map[pos]} h-8 w-8 rounded-sm border-white/30 opacity-60`}
    />
  );
}

