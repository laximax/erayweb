// src/app/components/TestimonialsSection.tsx
"use client";
import { Star } from "lucide-react";
import Container from "./Container";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useLang } from "../components/LangProvider";

export default function TestimonialsSection() {
  const { lang, t } = useLang();
  const reduce = useReducedMotion();

  // EN/TR kart içerikleri (i18n sözlüğünde henüz cards alanı yoksa buradan yönetiyoruz)
  const items =
    lang === "en"
      ? [
          {
            name: "Nehas",
            handle: "@Creators",
            quote: `"Quality That Boosted Our Brand"`,
            desc:
              "The photos were sharp, clean, and made our website look premium.",
            avatar: "/avatar-1.jpg",
          },
          {
            name: "Monia",
            handle: "@Artist",
            quote: `"Captured the Essence of Our Business"`,
            desc:
              "Each image told a story and aligned perfectly with our vision.",
            avatar: "/avatar-2.jpg",
          },
          {
            name: "Jusuf",
            handle: "@Creators",
            quote: `"Exactly What Our Website Needed"`,
            desc:
              "Modern, high-quality visuals that made a strong first impression.",
            avatar: "/avatar-3.jpg",
          },
        ]
      : [
          {
            name: "Nehas",
            handle: "@Creators",
            quote: `"Markamızı Yukarı Taşıyan Kalite"`,
            desc:
              "Görseller net, temiz ve web sitemize premium bir hava kattı.",
            avatar: "/avatar-1.jpg",
          },
          {
            name: "Monia",
            handle: "@Artist",
            quote: `"İşimizin Özünü Yakaladı"`,
            desc:
              "Her görsel bir hikâye anlattı ve vizyonumuzla mükemmel örtüştü.",
            avatar: "/avatar-2.jpg",
          },
          {
            name: "Jusuf",
            handle: "@Creators",
            quote: `"Web Sitemizin Tam İhtiyacı Olan Şey"`,
            desc:
              "Modern ve yüksek kaliteli görseller ilk izlenimi çok güçlendirdi.",
            avatar: "/avatar-3.jpg",
          },
        ];

  // Başlık (italic kısım dil bazlı)
  const heading =
    lang === "en" ? (
      <>
        Client <em className="italic font-serif">Feedback</em>
      </>
    ) : (
      <>
        Marka <em className="italic font-serif">Geri Bildirimleri</em>
      </>
    );

  const ratingLabel =
    lang === "en" ? "0.0 from 0k reviews" : "0.0 / 0k değerlendirme";

  // Animasyonlar
  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="testimonials"
      className="flex min-h-screen items-center justify-center bg-neutral-50 py-20 sm:py-24 scroll-mt-28"
    >
      <Container>
        <motion.div
          key={lang} // dil değişince animasyonu güvenli şekilde resetle
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-5xl text-center"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center rounded-full bg-neutral-200 px-4 py-1 text-sm text-neutral-700"
          >
            {t.testimonials.badge}
          </motion.span>

          <motion.h2
            variants={item}
            className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            {heading}
          </motion.h2>

          <motion.p
            variants={item}
            className="mx-auto mt-3 max-w-2xl text-neutral-600"
          >
            {t.testimonials.blurb}
          </motion.p>

          <motion.div
            variants={container}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {items.map((tt, i) => (
              <motion.article
                key={`${lang}-${i}`} // dil değişiminde re-mount
                variants={item}
                className="rounded-3xl border border-neutral-200 bg-white p-8 text-left shadow-md transition hover:shadow-xl"
                whileHover={{ y: reduce ? 0 : -4 }}
              >
                <div className="mb-4 flex items-center gap-1 text-amber-400">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} className="h-5 w-5 fill-amber-400" />
                  ))}
                </div>

                <div className="border-t border-neutral-200/70" />

                <h3 className="mt-4 text-lg font-medium text-neutral-900">
                  {tt.quote}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {tt.desc}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-neutral-200/70 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 overflow-hidden rounded-full bg-neutral-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      {tt.avatar ? (
                        <img
                          src={tt.avatar}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>
                    <span className="text-sm font-medium text-neutral-900">
                      {tt.name}
                    </span>
                  </div>
                  <span className="text-xs text-neutral-500">{tt.handle}</span>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <motion.div
            variants={item}
            className="mx-auto mt-10 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-neutral-700 shadow"
          >
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span>{ratingLabel}</span>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
