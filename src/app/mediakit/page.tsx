"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "@/app/components/LangProvider";
import TopNavPill from "../components/TopNavPill";

import { CheckCircle2, MapPin, Languages, Instagram, Music, Youtube, Globe ,FileDown} from "lucide-react";

/* ================= HERO ================= */

type SocialCounts = { tiktok?: number | null; instagram?: number | null; youtube?: number | null };

function formatCount(n?: number | null) {
  if (n == null) return "-";
  if (n < 1_000) return n.toString();
  if (n < 1_000_000) return (n / 1_000).toFixed(n % 1_000 === 0 ? 0 : 1) + "K";
  return (n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1) + "M";
}

function CreatorHero() {
  const { t } = useLang();
  const [counts, setCounts] = useState<SocialCounts>({});

  useEffect(() => {
    fetch("/api/social", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => setCounts(data))
      .catch(() => {});
  }, []);

  return (
    <section
      className="
        relative w-full bg-white
        py-12 sm:py-16 lg:py-20
        shadow-[0_20px_60px_-20px_rgba(0,0,0,0.15)]
        ring-1 ring-black/5
      "
    >
       <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-4 sm:px-8 lg:px-10 md:flex-row md:items-center md:gap-12">
        {/* Sol: Görsel */}
        <div className="relative shrink-0 overflow-hidden rounded-[32px] ring-4 ring-white shadow-xl w-56 h-56 sm:w-72 sm:h-72 md:w-[320px] md:h-[320px]">
          <Image
            src="/hero.png"
            alt="ErayTechs"
            fill
            sizes="(max-width:768px) 80vw, 320px"
            className="object-cover"
            priority
          />
        </div>

        {/* Sağ: Bilgiler */}
        <div className="flex-1 text-center md:text-left">
           <div className="flex flex-col items-center md:flex-row md:items-center md:gap-3 md:justify-start">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900">
              {t.mediakit.name}
            </h1>
            <span className="mt-2 md:mt-0 inline-flex items-center gap-1 self-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {t.mediakit.verified}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4 text-sm text-neutral-600">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {t.mediakit.country}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Languages className="h-4 w-4" />
              {t.mediakit.language}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Globe className="h-4 w-4" />
              {t.mediakit.category}
            </span>
          </div>

          <p className="mt-4 max-w-2xl mx-auto md:mx-0 text-[15px] leading-7 text-neutral-700">
            {t.mediakit.bio}
          </p>

          <div className="mt-6 flex flex-wrap justify-center md:justify-start items-center gap-4 sm:gap-6">
            <Stat icon={<Music className="h-4 w-4" />} label="TikTok" value={formatCount(counts.tiktok)} />
            <Stat icon={<Instagram className="h-4 w-4" />} label="Instagram" value={formatCount(counts.instagram)} />
            <Stat icon={<Youtube className="h-4 w-4" />} label="YouTube" value={formatCount(counts.youtube)} />
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-black/90"
            >
              {t.mediakit.cta}
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.9),rgba(0,0,0,0.02))]" />
    </section>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1.5 text-xs sm:text-sm text-neutral-800 ring-1 ring-neutral-200">
      {icon}
      <span className="font-medium">{label}</span>
      <span className="text-neutral-500">•</span>
      <span>{value}</span>
    </div>
  );
}

/* ================ CHANNELS (statik) ================ */

type PlatformKey = "tiktok" | "instagram" | "youtube";

type Stats = {
  followers: number;
  videos?: number;
  totalViews?: number;              // Toplam izlenme
  avgPostImpressions?: number;      // IG
  postEngagementRate?: number;      // IG %
  avgReelsViews?: number;           // IG/TT/YT: video ort. izlenme
  reelsEngagementRate?: number;     // IG %
  avgDurationSec?: number;          // TT/YT/IG reels
  engagementRate?: number;          // TT/YT genel %
};

type Audience = {
  location: { label: string; value: number }[];
  age: { label: string; value: number }[];
  gender: { male: number; female: number };
};

const MEDIA_KIT_PDF_PATH = "/media/ErayTechs-Media-Kit.pdf"; // public/media içine PDF'i koy


const DATA: Record<PlatformKey, { stats: Stats; audience: Audience; url: string; badge: string }> = {
  tiktok: {
    url: "https://www.tiktok.com/@eraytechs",
    badge: "1.6K",
    stats: {
      followers: 1578,
      videos: 33,
      totalViews: 1_400_000,
      avgReelsViews: 18_200,
      engagementRate: 6.48,
      avgDurationSec: 178,
    },
    audience: {
      location: [
        { label: "Türkiye", value: 70.09 },
        { label: "Diğer", value: 19.8 },
        { label: "Almanya", value: 2.7 },
        { label: "Azerbaycan", value: 2.3 },
        { label: "Mısır", value: 1.0 },
        { label: "Bulgaristan", value: 0.7 },
        { label: "Hollanda", value: 0.6 },
        { label: "Belçika", value: 0.5 },
        { label: "Fransa", value: 0.5 },
        { label: "İngiltere", value: 0.5 },
        { label: "ABD", value: 0.5 },
      ],
      age: [
        { label: "18–24", value: 14.2 },
        { label: "25–34", value: 28.7 },
        { label: "35–44", value: 26.8 },
        { label: "45–54", value: 19.7 },
        { label: "55+", value: 10.6 },
      ],
      gender: { male: 83.0, female: 17.0 },
    },
  },
  instagram: {
    url: "https://instagram.com/eraytechs",
    badge: "4.9K",
    stats: {
      followers: 4_992,
      videos: 32,
      totalViews: 4_201_720,
      avgPostImpressions: 45_000,
      postEngagementRate: 1.74,
      avgReelsViews: 11_000,
      reelsEngagementRate: 2.06,
      avgDurationSec: 35,
    },
    audience: {
      location: [
        { label: "Türkiye", value: 94.7 },
        { label: "Almanya", value: 0.9 },
        { label: "Hindistan", value: 0.7 },
        { label: "Azerbaycan", value: 0.4 },
        { label: "Kıbrıs", value: 0.4 },
      ],
      age: [
        { label: "13–17", value: 11.9 },
        { label: "18–24", value: 27.9 },
        { label: "25–34", value: 31.3 },
        { label: "35–44", value: 15.0 },
        { label: "45–54", value: 8.6 },
        { label: "55–64", value: 3.5 },
        { label: "65+", value: 1.7 },
      ],
      gender: { male: 94.8, female: 5.2 },
    },
  },
  youtube: {
    url: "https://youtube.com/@eraytechs",
    badge: "328",
    stats: {
      followers: 328,
      videos: 34,
      totalViews: 381_000,
      avgReelsViews: 3_200,   // video ort. izlenme
      engagementRate: 4.1,
      avgDurationSec: 420,
    },
    audience: {
      location: [
        { label: "Türkiye", value: 90 },
        { label: "Azerbaycan", value: 2.0 },
        { label: "Almanya", value: 1.0 },
        
      ],
      age: [
        { label: "18–24", value: 25.0 },
        { label: "25–34", value: 39.0 },
        { label: "35–44", value: 18.0 },
       
      ],
      gender: { male: 82, female: 18 },
    },
  },
};

function fmt(n: number) {
  if (n < 1_000) return n.toString();
  if (n < 1_000_000) return (n / 1_000).toFixed(n % 1_000 === 0 ? 0 : 1) + "K";
  return (n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1) + "M";
}
function fmtDuration(sec?: number) {
  if (sec == null) return "—";
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}m ${s}s`;
}

function ChannelsSection() {
  const { t } = useLang();
  const [tab, setTab] = useState<PlatformKey>("tiktok");
  const d = DATA[tab];

  const avgViewsLabel = tab === "instagram" ? "Avg Reels Views" : "Avg Video Views";

  return (
    <section className="mx-auto mt-12 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center sm:text-left">Channels</h2>

      {/* Tabs */}
     <div className="mt-4 flex flex-wrap items-center gap-3 border-b border-neutral-200 pb-4">
        <div className="flex flex-wrap items-center gap-3">
          <Tab active={tab === "tiktok"} onClick={() => setTab("tiktok")} icon={<Music className="h-4 w-4" />} label="TikTok" badge={DATA.tiktok.badge} />
          <Tab active={tab === "instagram"} onClick={() => setTab("instagram")} icon={<Instagram className="h-4 w-4" />} label="Instagram" badge={DATA.instagram.badge} />
          <Tab active={tab === "youtube"} onClick={() => setTab("youtube")} icon={<Youtube className="h-4 w-4" />} label="YouTube" badge={DATA.youtube.badge} />
        </div>
        <div className="flex w-full flex-col gap-2 sm:ml-auto sm:w-auto sm:flex-row sm:items-center">
          <a
            href={d.url}
            target="_blank"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-sm transition hover:bg-neutral-100 sm:w-auto"
          >
            Go to {cap(tab)} ↗
          </a>
          <a
            href={MEDIA_KIT_PDF_PATH}
            download
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50 sm:w-auto"
            aria-label="Download Media Kit as PDF"
          >
            <FileDown className="h-4 w-4" />
            <span className="hidden sm:inline">Download Media Kit (PDF)</span>
            <span className="sm:hidden">Media Kit PDF</span>
          </a>
        </div>
      </div>

      {/* Statistics */}
      <h3 className="mt-6 text-xl sm:text-2xl font-semibold">{t.mediakit?.stats ?? "Statistics"}</h3>
      <div className="mt-3 flex gap-2">
        
      </div>

      {/* Cards grid */}
      {tab === "instagram" ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
          <StatCard title={t.mediakit?.followers ?? "Followers"} value={fmt(d.stats.followers)} />
          <StatCard title={t.mediakit?.posts ?? "Posts"} value={d.stats.videos?.toString() ?? "—"} />
          <StatCard title="Total Views" value={d.stats.totalViews ? fmt(d.stats.totalViews) : "—"} />
          <StatCard title="Avg Post Impressions" value={d.stats.avgPostImpressions ? fmt(d.stats.avgPostImpressions) : "—"} />
          <StatCard title="Post Engagement Rate" value={d.stats.postEngagementRate != null ? `${d.stats.postEngagementRate.toFixed(2)}%` : "—"} />
          <StatCard title="Avg Reels Views" value={d.stats.avgReelsViews ? fmt(d.stats.avgReelsViews) : "—"} />
        </div>
      ) : (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
          <StatCard title={t.mediakit?.followers ?? "Followers"} value={fmt(d.stats.followers)} />
          <StatCard title={t.mediakit?.posts ?? "Posts"} value={d.stats.videos?.toString() ?? "—"} />
          <StatCard title="Total Views" value={d.stats.totalViews ? fmt(d.stats.totalViews) : "—"} />
          <StatCard title={avgViewsLabel} value={d.stats.avgReelsViews ? fmt(d.stats.avgReelsViews) : "—"} />
          <StatCard title={t.mediakit?.engagementRate ?? "Engagement Rate"} value={d.stats.engagementRate != null ? `${d.stats.engagementRate.toFixed(2)}%` : "—"} />
          <StatCard title={t.mediakit?.avgDuration ?? "Avg Duration"} value={fmtDuration(d.stats.avgDurationSec)} />
        </div>
      )}

      {/* Audience */}
      <h3 className="mt-10 text-xl sm:text-2xl font-semibold">{t.mediakit?.audience ?? "Audience"}</h3>
      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        <div>
          <h4 className="mb-3 font-medium">{t.mediakit?.location ?? "Location"}</h4>
          <div className="space-y-3">
            {d.audience.location.map((it) => <Bar key={it.label} label={it.label} value={it.value} />)}
          </div>
        </div>
        <div>
          <h4 className="mb-3 font-medium">{t.mediakit?.age ?? "Age"}</h4>
          <div className="space-y-3">
            {d.audience.age.map((it) => <Bar key={it.label} label={it.label} value={it.value} />)}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h4 className="mb-3 font-medium">{t.mediakit?.gender ?? "Gender"}</h4>
          <Donut male={d.audience.gender.male} female={d.audience.gender.female} />
          <div className="mt-4 text-sm">
            <span className="inline-flex items-center gap-2 mr-4">
              <span className="h-3 w-3 rounded-full bg-blue-500" /> {t.mediakit?.male ?? "Male"} • {d.audience.gender.male}%
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-600" /> {t.mediakit?.female ?? "Female"} • {d.audience.gender.female}%
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ sub components ============ */

function Tab({
  active, onClick, icon, label, badge,
}: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string; badge: string }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 pb-2 text-sm transition border-b-2 ${
        active ? "border-red-600 text-neutral-900" : "border-transparent text-neutral-600 hover:text-neutral-900"
      }`}
      aria-current={active ? "page" : undefined}
    >
      {icon}
      <span className="font-medium">{label}</span>
      <span className="rounded-md bg-neutral-100 px-1.5 py-0.5 text-[11px] text-neutral-600">{badge}</span>
    </button>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5">
      <div className="text-sm text-neutral-500">{title}</div>
      <div className="mt-1 text-2xl font-semibold tracking-tight">{value}</div>
    </div>
  );
}

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className="text-neutral-500">{value.toFixed(2)}%</span>
      </div>
      <div className="h-2 rounded-full bg-neutral-200">
        <div className="h-2 rounded-full bg-red-600" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
      </div>
    </div>
  );
}

function Donut({ male, female }: { male: number; female: number }) {
  const femaleDeg = female * 3.6;
  return (
    <div
      className="relative h-40 w-40 rounded-full"
      style={{ background: `conic-gradient(#e11d48 ${femaleDeg}deg, #3b82f6 0deg)` }}
      aria-label={`Male ${male}%, Female ${female}%`}
      role="img"
    >
      <div className="absolute inset-6 rounded-full bg-white" />
    </div>
  );
}

function cap(s: string) {
  return s.slice(0, 1).toUpperCase() + s.slice(1);
}

/* ================ CONTACT CTA FOOTER ================ */

function MediaKitFooter() {
  const { t, lang } = useLang();

  return (
    <footer className="mt-16">
      {/* Tam genişlikte yatay CTA bandı */}
      <div className="relative w-full bg-white/90 backdrop-blur ring-1 ring-neutral-200">
        {/* Arka plan efekti */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(90%_80%_at_50%_-20%,rgba(0,0,0,0.05),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.02),transparent)]" />
        </div>

        {/* İçerik alanı */}
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 text-center md:flex-row md:text-left md:py-14">
          {/* Sol metin */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-neutral-200 px-4 py-1 text-xs font-medium text-neutral-700">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-600" />
              {t.footer.ctaBadge}
            </div>

            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
              {lang === "en" ? (
                <>Let’s build something great <span className="font-serif italic">together</span></>
              ) : (
                <>Birlikte harika işler <span className="font-serif italic">üretelim</span></>
              )}
            </h3>

            <p className="mt-2 text-sm leading-6 text-neutral-600">
              {t.footer.about}
            </p>
          </div>

          {/* Sağ buton */}
          <div className="w-full md:w-auto">
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-full bg-black px-8 py-3 text-sm font-medium text-white transition hover:bg-black/90 sm:w-auto"
            >
              {t.footer.ctaButton}
            </Link>
          </div>
        </div>

        {/* Alt çizgi (copyright) */}
        <div className="border-t border-neutral-200/70 bg-white/70">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-4 text-xs text-neutral-500 sm:flex-row">
            <div className="font-medium text-neutral-700">
              ErayTechs <span className="align-super text-[10px] opacity-60">®</span>
            </div>
            <div>{t.footer.copy(new Date().getFullYear())}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}


/* ================= PAGE EXPORT ================= */

export default function MediaKitPage() {
  return (
      <main className="min-h-dvh bg-neutral-100 pt-20 sm:pt-24">
      <TopNavPill />
      <CreatorHero />
      <ChannelsSection />
      <MediaKitFooter />
    </main>
  );
}
