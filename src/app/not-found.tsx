"use client";

import Link from "next/link";
import { useLang } from "./components/LangProvider";
import { Search } from "lucide-react";
import { motion, type Variants } from "framer-motion";


export default function NotFoundPage() {
  const { lang } = useLang();

  // Rakamlar için giriş + idle animasyonları (tipli)
  const digitVariants = {
    hidden: { opacity: 0, scale: 0.6, y: 20 },

    show: (i: number = 0) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: 0.15 + i * 0.08,
        type: "spring" as const,
        stiffness: 300,
        damping: 18,
      },
    }),

    idle: (i: number = 0) => ({
      y: [0, -4, 0],
      transition: {
        delay: 0.3 + i * 0.12,
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    }),
  } satisfies Variants;

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-neutral-50 px-6 text-center">
      {/* Glow arka plan */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_20%,rgba(0,0,0,0.06),transparent)]" />
      </div>

      {/* Üstte ikon + titreşim */}
      <motion.div
        initial={{ scale: 0.6, rotate: -8, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        className="relative mb-6"
      >
        <motion.div
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="relative inline-flex"
        >
          <Search className="h-20 w-20 text-neutral-400 sm:h-24 sm:w-24" />
          <span className="pointer-events-none absolute -inset-2 -z-10 rounded-full bg-white/40 blur-xl" />
        </motion.div>
      </motion.div>

      {/* 404 başlık */}
      <div className="flex items-end justify-center gap-2 sm:gap-4">
        {["4", "0", "4"].map((d, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={digitVariants}
            initial="hidden"
            animate={["show", "idle"]} // çoklu variant label desteklenir
            className="text-[18vw] leading-none sm:text-[14vw] font-extrabold bg-gradient-to-b from-neutral-900 to-neutral-600 bg-clip-text text-transparent drop-shadow-[0_6px_20px_rgba(0,0,0,0.08)]"
          >
            {d}
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 220, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        className="mx-auto mt-3 h-[3px] rounded-full bg-neutral-200 sm:mt-4"
      />
      <p className="mx-auto mt-4 max-w-xl text-neutral-600 sm:text-lg">
        {lang === "en"
          ? "The page you’re looking for doesn’t exist or has been moved."
          : "Aradığınız sayfa bulunamadı ya da taşınmış olabilir."}
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-black/90"
        >
          {lang === "en" ? "Back to Home" : "Ana Sayfaya Dön"}
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-medium text-neutral-800 transition hover:bg-neutral-100"
        >
          {lang === "en" ? "Contact Us" : "İletişime Geç"}
        </Link>
      </div>

      <p className="mt-10 text-xs text-neutral-400">© {new Date().getFullYear()} ErayTechs</p>
    </main>
  );
}
