"use client";
import { Eye, Aperture, Droplets } from "lucide-react";
import Container from "./Container";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useLang } from "../components/LangProvider";

export default function BenefitsSection() {
  const { t, lang } = useLang(); // 🌍 dil ve çeviri
  const prefersReduce = useReducedMotion();

  // === kart verileri ===
  const items = [
    { icon: <Eye className="h-6 w-6" />, ...t.benefits.cards[0] },
    { icon: <Aperture className="h-6 w-6" />, ...t.benefits.cards[1] },
    { icon: <Droplets className="h-6 w-6" />, ...t.benefits.cards[2] },
  ];

  // === animasyon ayarları ===
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.08 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: prefersReduce ? 0 : 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // === Başlık (work kısmı italic olacak şekilde dinamik) ===
  const heading = (() => {
    if (lang === "en") {
      return (
        <>
          Why <em className="italic text-neutral-900">work</em> with me?
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

  return (
    <section
      id="benefits"
      className="flex min-h-screen items-center justify-center bg-neutral-50 py-20 sm:py-24 scroll-mt-28"
    >
      <Container>
        <motion.div
          key={lang} // 🌍 dil değişince animasyonu resetle
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="mx-auto text-center"
        >
          {/* Badge */}
          <motion.span
            variants={item}
            className="inline-flex items-center rounded-full bg-neutral-200 px-4 py-1 text-sm text-neutral-700"
          >
            {t.benefits.badge}
          </motion.span>

          {/* Heading */}
          <motion.h2
            variants={item}
            className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
          >
            {heading}
          </motion.h2>

          {/* Açıklama */}
          <motion.p
            variants={item}
            className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600"
          >
            {t.benefits.blurb}
          </motion.p>

          {/* Kartlar */}
          <motion.div
            variants={container}
            className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {items.map((it, i) => (
              <motion.article
                key={`${lang}-${i}`} // ✅ dil değişince kartlar yeniden oluşturulur
                variants={item}
                className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-md transition hover:shadow-xl"
                whileHover={{ y: prefersReduce ? 0 : -4 }}
              >
                <div className="mb-5 mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-900">
                  {it.icon}
                </div>
                <h3 className="text-xl font-semibold text-neutral-900">
                  {it.title}
                </h3>
                <p className="mt-3 text-base text-neutral-600">{it.desc}</p>
                <span className="mt-6 inline-flex rounded-full bg-neutral-100 px-4 py-1.5 text-sm text-neutral-700">
                  {it.tag}
                </span>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
