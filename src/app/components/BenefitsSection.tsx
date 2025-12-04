"use client";
import { Zap, ShieldCheck, TrendingUp } from "lucide-react";
import Container from "../components/Container";
import { motion, type Variants } from "framer-motion"; 
import { useLang } from "../components/LangProvider";

export default function BenefitsSection() {
  const { t, lang } = useLang();

  // === İKONLAR ===
  const items = [
    { icon: <Zap className="h-7 w-7" />, ...t.benefits.cards[0] },
    { icon: <ShieldCheck className="h-7 w-7" />, ...t.benefits.cards[1] },
    { icon: <TrendingUp className="h-7 w-7" />, ...t.benefits.cards[2] },
  ];

  // Başlık (Dil desteği ile)
  const heading = (() => {
    if (lang === "en") {
      return (
        <>
          Why <em className="italic text-neutral-900">partner</em> with me?
        </>
      );
    } else {
      return (
        <>
          Neden <em className="italic text-neutral-900">benimle</em> çalışmalısın?
        </>
      );
    }
  })();

  // Kartlar için basit stagger (sıralı geliş) varyantı
  const gridVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Kartlar arası bekleme süresi
        delayChildren: 0.3,    // Metinler bittikten sonra başlasın
      },
    },
  };

  const cardVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  };

  return (
    <section
      id="benefits"
      className="flex min-h-screen items-center justify-center bg-neutral-100 py-20 sm:py-24 scroll-mt-28"
    >
      <Container>
        <div className="mx-auto text-center">
          
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full bg-white px-4 py-1 text-sm font-medium text-neutral-800 shadow-sm ring-1 ring-neutral-200"
          >
            {t.benefits.badge}
          </motion.span>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
          >
            {heading}
          </motion.h2>

          {/* Açıklama */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600"
          >
            {t.benefits.blurb}
          </motion.p>

          {/* Kartlar */}
          <motion.div
            key={lang} // Dil değişince animasyon sıfırlansın
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {items.map((it, i) => (
              <motion.article
                key={i}
                variants={cardVariant}
                className="group relative flex flex-col items-center overflow-hidden rounded-[32px] bg-white/80 p-8 text-center shadow-xl shadow-neutral-200/50 ring-1 ring-neutral-200/60 backdrop-blur-[2px] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-neutral-300/60 hover:ring-neutral-300"
              >
                {/* İkon Kutusu */}
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-50 text-neutral-900 ring-1 ring-neutral-200/80 transition-all duration-300 group-hover:bg-neutral-900 group-hover:text-white group-hover:ring-neutral-900 group-hover:from-neutral-900 group-hover:to-black">
                  {it.icon}
                </div>

                {/* Başlık */}
                <h3 className="text-2xl font-bold text-neutral-900 transition-colors group-hover:text-black">
                  {it.title}
                </h3>

                {/* Açıklama */}
                <p className="mt-3 text-base leading-relaxed text-neutral-600 transition-colors group-hover:text-neutral-700">
                  {it.desc}
                </p>

                {/* Tag */}
                <span className="mt-8 inline-flex rounded-full bg-neutral-100/80 px-3 py-1 text-xs font-medium text-neutral-600 ring-1 ring-neutral-200/50 transition-all group-hover:bg-neutral-200 group-hover:text-neutral-800 group-hover:ring-neutral-300">
                  {it.tag}
                </span>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}