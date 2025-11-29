"use client";
import Image from "next/image";
import { Instagram, Youtube, Music } from "lucide-react";
import Container from "./Container";
import { useLang } from "../components/LangProvider";

export default function HeroCard() {
  const { t } = useLang();

  return (
    <section className="mt-30">
      <Container>
        <div className="relative overflow-hidden rounded-[32px] bg-neutral-700/30 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)] ring-1 ring-black/10">
          
          {/* === Arka Plan Görsel + Gradient === */}
          <div className="absolute inset-0">
            <Image
              src="/hero.png"
              alt="ErayTechs hero"
              fill
              priority
              sizes="(min-width: 1280px) 1100px, 100vw"
              quality={90}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-br from-neutral-900/20 via-neutral-900/5 to-transparent" />
          </div>

          {/* === Köşe Çizgileri === */}
          <Corner pos="tl" />
          <Corner pos="tr" />
          <Corner pos="br" />
          <Corner pos="bl" />

          {/* === İçerik === */}
          <div className="relative grid min-h-[480px] grid-cols-1 items-center gap-8 p-8 sm:min-h-[660px] lg:grid-cols-12 lg:p-12">
            
            {/* Sol Taraf: Başlık */}
            <div className="relative lg:col-span-6">
              <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl">
                <span className="text-white">ERAY</span>
                <span className="opacity-80">TECHS</span>
              </h1>
            </div>

            {/* Sağ Taraf: Açıklama + Sosyal Medya */}
            <div className="lg:col-span-6 lg:pl-8">
              <p className="ml-auto max-w-lg text-right text-base text-white/85 sm:text-lg">
                {t.hero.title}
              </p>

              <div className="mt-10 flex items-center justify-end gap-8">
               

                <div className="flex flex-col items-center gap-3 text-white/85">
                  <a
                    href="https://tiktok.com/@eraytechs"
                    aria-label="TikTok"
                    target="_blank"
                    className="transition hover:opacity-90"
                  >
                    <Music className="h-5 w-5" />
                  </a>
                  <a
                    href="https://instagram.com/eraytechs"
                    aria-label="Instagram"
                    target="_blank"
                    className="transition hover:opacity-90"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="https://youtube.com/@eraytechs"
                    aria-label="YouTube"
                    target="_blank"
                    className="transition hover:opacity-90"
                  >
                    <Youtube className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* === Köşe Çizgileri === */
function Corner({ pos }: { pos: "tl" | "tr" | "br" | "bl" }) {
  const map: Record<string, string> = {
    tl: "left-6 top-6 rotate-90",
    tr: "right-6 top-6 rotate-180",
    br: "right-6 bottom-6 rotate-[270deg]",
    bl: "left-6 bottom-6 -rotate-360",
  };
  return (
    <div
      className={`pointer-events-none absolute ${map[pos]} h-6 w-6 rounded-[6px] border-2 border-white/50 border-t-transparent border-r-transparent`}
    />
  );
}
