"use client";
import { useState, useEffect } from "react";
import { 
  Heart, 
  Instagram, 
  Youtube, 
  ThumbsUp, 
  ChevronLeft, 
  ChevronRight, 
  Quote 
} from "lucide-react";
import Container from "./Container";
import { motion } from "framer-motion";
import { useLang } from "../components/LangProvider";

// Tip tanımlaması (Interface)
interface TestimonialItem {
  name: string;
  handle: string;
  quote: string;
  desc: string;
  avatar: string;
  source: string;
}

export default function TestimonialsSection() {
  const { lang, t } = useLang();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // === VERİLER ===
  const originalItems: TestimonialItem[] = lang === "en" ? [
    {
      name: "Hamza",
      handle: "Instagram Follower",
      quote: "Tech at its Clearest",
      desc: "I've been following since the day I got my PC. I saved all your videos and applied the tips one by one. Wishing you continued success!",
      avatar: "/avatar-2.png",
      source: "instagram",
    },
    {
      name: "Niğda",
      handle: "Instagram Follower",
      quote: "Invaluable Knowledge",
      desc: "This information is very valuable to me, exactly what I needed.",
      avatar: "/avatar-1.png",
      source: "instagram",
    },
    {
      name: "Ege",
      handle: "Instagram Follower",
      quote: "Absolute Legend",
      desc: "Bro, you are the king! Thank you so much.",
      avatar: "/avatar-2.png",
      source: "instagram",
    },
  ] : [
    {
      name: "Hamza",
      handle: "Instagram Takipçisi",
      quote: "Teknolojinin En Net Hali",
      desc: "Bilgisayarımı aldığım günden beri takip ediyorum. Tüm videolarını kaydedip tek tek bilgisayarıma uyguladım. Başarılarının devamını dilerim!",
      avatar: "/avatar-2.png",
      source: "instagram",
    },
    {
      name: "Niğda",
      handle: "Instagram Takipçisi",
      quote: "Hazine Değerinde Bilgi",
      desc: "Bu bilgi benim için çok kıymetli, tam aradığım şeydi. Teşekkürler!",
      avatar: "/avatar-1.png",
      source: "instagram",
    },
    {
      name: "Ege",
      handle: "Instagram Takipçisi",
      quote: "Faydalı İçerik",
      desc: "Abi kralsın ya, çok teşekkürler!",
      avatar: "/avatar-2.png",
      source: "instagram",
    },
  ];

  // DÜZELTME: Sonsuz döngü ve masaüstünde 3. sayfanın boş kalmaması için listeyi 3 kez kopyalıyoruz.
  // Masaüstünde her "Sayfa" 3 kart gösterir. 3 sayfa gezmek için en az 9 kart gerekir (3x3).
  const items = [...originalItems, ...originalItems, ...originalItems];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % originalItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + originalItems.length) % originalItems.length);
  };

  // === OTOMATİK KAYDIRMA ===
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4000); // 4 saniyede bir kayar
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, currentIndex]);

  // === GÖRSEL DETAYLAR ===
  const heading = lang === "en" ? (
    <>Community <em className="italic font-serif">Love</em></>
  ) : (
    <>Sizden <em className="italic font-serif">Gelenler</em></>
  );

  const ratingLabel = lang === "en" ? "Endless thanks to you all." : "Hepinize sonsuz teşekkürler.";

  return (
    <section
      id="testimonials"
      className="flex min-h-screen items-center justify-center bg-neutral-50 py-16 sm:py-24 lg:py-28 scroll-mt-28"
    >
      <Container>
        <div className="mx-auto max-w-6xl text-center">
          
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center rounded-full bg-white px-4 py-1 text-sm font-medium text-neutral-800 shadow-sm ring-1 ring-neutral-200"
          >
            {t.testimonials.badge}
          </motion.span>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-5 text-[clamp(2.25rem,5vw,3.5rem)] font-semibold tracking-tight sm:text-5xl md:text-6xl"
          >
            {heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600"
          >
            {t.testimonials.blurb}
          </motion.p>

          {/* === CAROUSEL ALANI === */}
          <div 
            className="relative mt-16"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Butonlar */}
            <div className="absolute -left-4 top-1/2 z-20 hidden -translate-y-1/2 lg:block">
              <button 
                onClick={handlePrev}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-neutral-800 shadow-lg ring-1 ring-neutral-200 transition hover:scale-110 hover:bg-neutral-50"
                aria-label="Previous"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            </div>
            <div className="absolute -right-4 top-1/2 z-20 hidden -translate-y-1/2 lg:block">
              <button 
                onClick={handleNext}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-neutral-800 shadow-lg ring-1 ring-neutral-200 transition hover:scale-110 hover:bg-neutral-50"
                aria-label="Next"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Slider Track Container */}
            <div className="overflow-hidden px-4 pb-10 pt-4 sm:px-0">
              <div className="relative overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ 
                    transform: `translateX(-${currentIndex * 100}%)` 
                  }}
                >
                  <CarouselTrack items={items} />
                </div>
              </div>
            </div>

            {/* Mobil Kontroller (Dots) */}
            <div className="mt-4 flex justify-center gap-2 lg:hidden">
              {originalItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex % originalItems.length ? "w-6 bg-neutral-800" : "w-2 bg-neutral-300"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>

          {/* Footer Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 shadow ring-1 ring-neutral-200"
          >
            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            <span>{ratingLabel}</span>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}

// === Carousel Track Bileşeni ===
function CarouselTrack({ items }: { items: TestimonialItem[] }) {
  return (
    <div className="flex w-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
      <style jsx>{`
        .carousel-item {
          width: 100%;
        }
        @media (min-width: 640px) {
          .carousel-item { width: 50%; }
        }
        @media (min-width: 1024px) {
          .carousel-item { width: 33.333%; }
        }
      `}</style>

      {items.map((tt, i) => (
        // `flex` eklendi ki içindeki h-full işe yarasın
        <div 
          key={i} 
          className="carousel-item flex flex-shrink-0 px-3"
        >
          {/* DEĞİŞİKLİKLER BURADA:
              1. 'flex flex-col' eklendi: İçerikleri dikey dizebilmek için.
              2. 'h-full' zaten vardı, flex container içinde tüm kartları eşitler.
          */}
          <div className="group relative flex h-full w-full flex-col overflow-hidden rounded-[32px] border border-white/40 bg-white/60 p-8 text-left shadow-xl shadow-neutral-200/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/80 hover:shadow-2xl hover:ring-1 hover:ring-neutral-300">
            
            {/* Dekoratif Tırnak İşareti */}
            <div className="absolute right-6 top-6 opacity-10 transition-opacity group-hover:opacity-20">
              <Quote className="h-16 w-16 text-neutral-900" />
            </div>

            {/* İkon */}
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-neutral-100">
              {tt.source === 'youtube' && <Youtube className="h-6 w-6 text-red-600" />}
              {tt.source === 'instagram' && <Instagram className="h-6 w-6 text-pink-600" />}
              {tt.source === 'like' && <ThumbsUp className="h-6 w-6 text-blue-500" />}
            </div>

            <h3 className="relative z-10 text-lg font-bold text-neutral-900">
              {tt.quote}
            </h3>
            
            {/* DEĞİŞİKLİK:
                Yazı alanı otomatik büyümezse alt kısım yukarı kayar.
                Ancak biz alt kısmı 'mt-auto' ile iteceğimiz için burası esnek kalabilir.
            */}
            <p className="relative z-10 mt-3 text-sm leading-relaxed text-neutral-600">
              {tt.desc}
            </p>

            {/* DEĞİŞİKLİK: 'mt-auto' EKLENDİ.
                Bu komut, üstteki içerik (yazı, başlık) ne kadar kısa olursa olsun,
                bu footer div'ini kartın en altına iter.
                Kartların hepsi aynı yükseklikte olduğu için (h-full),
                çizgiler ip gibi hizalanır.
            */}
            <div className="relative z-10 mt-auto flex items-center gap-3 border-t border-neutral-200/50 pt-5">
              <div className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {tt.avatar && <img src={tt.avatar} alt="" className="h-full w-full object-cover" />}
              </div>
              <div>
                <div className="text-sm font-bold text-neutral-900">{tt.name}</div>
                <div className="text-xs font-medium text-neutral-500">{tt.handle}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}