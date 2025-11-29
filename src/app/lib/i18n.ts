// src/lib/i18n.ts
export type Lang = "tr" | "en";

export type Translations = {
  brand: string;
  nav: { benefits: string; testimonials: string; faq: string; back: string };
  hero: { title: string; trusted: string };
  benefits: {
    badge: string;
    heading: string;
    blurb: string;
    cards: { title: string; desc: string; tag: string }[];
  };
  testimonials: { badge: string; heading: string; blurb: string };
  footer: {
    ctaBadge: string;
    ctaTitle: string;
    ctaButton: string;
    about: string;
    copy: (year: number) => string;
  };
  contact: { title: string; desc: string; submit: string };

  // ➕ MediaKit
  mediakit: {
    // Hero alanı
    name: string;
    verified: string;
    country: string;
    language: string;
    category: string;
    bio: string;
    reach: string;
    cta: string;

    // Sarı blok / paketler / işler
    meet: string;
    meetText: string;
    offerTitle: string;
    pack1: { title: string; items: string[] };
    pack2: { title: string; items: string[] };
    pack3: { title: string; items: string[] };
    workTitle: string;
    final: string;

    // ✅ Channels + Statistics + Audience için yeni alanlar
    stats: string;
    last30: string;
    latest10: string;
    followers: string;
    posts: string;
    avgDuration: string;
    engagementRate: string;

    audience: string;
    location: string;
    age: string;
    gender: string;
    male: string;
    female: string;
  };
};

export const dict: Record<Lang, Translations> = {
  en: {
    brand: "ErayTechs",
    nav: {
      benefits: "Collab",
      testimonials: "Brand reviews",
      faq: "Links",
      back: "Back To Home",
    },
    hero: {
      title:
        "I turn complex tech into simple, viral content — PC optimization, AI workflows and creator tools.",
      trusted: "Trusted by 25,000+ clients",
    },
    benefits: {
      badge: "Collaboration",
      heading: "Why work with me?",
      blurb:
        "I translate technology into content people understand, trust, and use.",
      cards: [
        {
          title: "From Complex → Clear",
          desc: "I turn technical topics into short, simple, and highly digestible content.",
          tag: "Actionable Tech Insights",
        },
        {
          title: "Data-Driven Content",
          desc: "Every piece is backed by research, trends, search data, and audience behavior.",
          tag: "Performance-Focused Creation",
        },
        {
          title: "Measure. Improve. Repeat.",
          desc: "Optimization based on analytics, not guesses.",
          tag: "Data + Testing + Results",
        },
      ],
    },
    testimonials: {
      badge: "Brand reviews",
      heading: "Client Feedback",
      blurb: "Real words from brands who trusted the work.",
    },
    footer: {
      ctaBadge: "Initiate Your Journey",
      ctaTitle: "Great collaborations begin with a conversation",
      ctaButton: "Get In Touch",
      about:
        "I simplify technology for everyone and create content that inspires.",
      copy: (year) => `© ${year} ErayTechs. All rights reserved.`,
    },
    contact: {
      title: "Reach Out to Me",
      desc: "Fill out the form below, and we’ll respond soon!",
      submit: "Submit",
    },

    // MediaKit (EN)
    mediakit: {
      name: "ErayTechs",
      verified: "Verified",
      country: "Turkey",
      language: "Turkish / English",
      category: "Tech & Creator Tools",
      bio:
        "I create high-impact tech content focused on PC optimization, AI workflows and creator tools. My style blends clarity, speed and practical value.",
      reach: "Monthly Reach",
      cta: "Work with me",

      meet: "MEET THE CREATOR",
      meetText:
        "I share tech in a real, human way—from quick fixes to deep workflows. Whether it’s performance tuning, AI automations or creator gear, my goal is to deliver content that people actually use.",
      offerTitle: "What I offer",
      pack1: {
        title: "Single Video",
        items: ["1x Short-form video", "Hook + CTA copy", "1 revision"],
      },
      pack2: {
        title: "Bundle",
        items: [
          "3x Short-form videos",
          "Cross-posting",
          "Basic performance report",
        ],
      },
      pack3: {
        title: "Custom Partnership",
        items: [
          "Storyline & scripting",
          "Multi-platform rollout",
          "Detailed reporting",
        ],
      },
      workTitle: "Selected Work",
      final:
        "Need something specific? Let’s build the right package for your brand.",

      // ✅ new
      stats: "Statistics",
      last30: "Last 30 days",
      latest10: "10 latest posts",
      followers: "Followers",
      posts: "Posts",
      avgDuration: "Avg Duration",
      engagementRate: "Engagement Rate",

      audience: "Audience",
      location: "Location",
      age: "Age",
      gender: "Gender",
      male: "Male",
      female: "Female",
    },
  },

  tr: {
    brand: "ErayTechs",
    nav: {
      benefits: "İş Birliği",
      testimonials: "Yorumlar",
      faq: "Bağlantılar",
      back: "Ana Sayfaya Dön",
    },
    hero: {
      title:
        "Karmaşık teknolojiyi basit, viral içeriğe dönüştürüyorum — PC optimizasyonu, yapay zeka iş akışları ve içerik araçları.",
      trusted: "25.000+ müşteri tarafından güveniliyor",
    },
    benefits: {
      badge: "İş Birliği",
      heading: "Neden benimle çalışmalısın?",
      blurb:
        "Teknolojiyi insanların anlayıp güvenerek uyguladığı içeriklere dönüştürüyorum.",
      cards: [
        {
          title: "Karmaşıktan → Kolaya",
          desc:
            "Teknik konuları kısa, anlaşılır ve uygulanabilir içeriklere dönüştürüyorum.",
          tag: "Uygulanabilir Teknoloji İçgörüleri",
        },
        {
          title: "Veri Odaklı İçerik",
          desc:
            "Her içerik araştırma, trend analizi ve kullanıcı davranışına dayanır.",
          tag: "Performans Odaklı Üretim",
        },
        {
          title: "Ölç – Geliştir – Tekrarla",
          desc: "Tahminle değil, analizlerle optimize ediyorum.",
          tag: "Veri + Test + Sonuç",
        },
      ],
    },
    testimonials: {
      badge: "Yorumlar",
      heading: "Müşteri Geri Bildirimleri",
      blurb: "İşime güvenen ekiplerin gerçek yorumları.",
    },
    footer: {
      ctaBadge: "Yolculuğunu Başlat",
      ctaTitle: "Harika işler bir sohbetle başlar",
      ctaButton: "İletişime Geç",
      about:
        "Teknolojiyi herkesin anlayacağı hale getiriyor, ilham veren içerikler üretiyorum.",
      copy: (year) => `© ${year} ErayTechs. Tüm hakları saklıdır.`,
    },
    contact: {
      title: "Bizimle İletişime Geç",
      desc: "Formu doldur; en kısa sürede dönüş yapacağız!",
      submit: "Gönder",
    },

    // MediaKit (TR)
    mediakit: {
      name: "ErayTechs",
      verified: "Onaylı",
      country: "Türkiye",
      language: "Türkçe / İngilizce",
      category: "Teknoloji & Creator Araçları",
      bio:
        "PC optimizasyonu, yapay zekâ iş akışları ve creator araçları odağında yüksek etkili teknoloji içerikleri üretiyorum. Anlatımım net, hızlı ve uygulanabilir.",
      reach: "Aylık Erişim",
      cta: "Benimle çalış",

      meet: "CREATOR İLE TANIŞ",
      meetText:
        "Teknolojiyi gerçek ve anlaşılır bir dille paylaşıyorum: hızlı ipuçlarından derin iş akışlarına. Performans ayarı, otomasyon ya da ekipman — amacım insanların gerçekten kullandığı içerikler üretmek.",
      offerTitle: "Neler sunuyorum",
      pack1: {
        title: "Tek Video",
        items: ["1x kısa video", "Hook + CTA metni", "1 revizyon"],
      },
      pack2: {
        title: "Paket",
        items: ["3x kısa video", "Çapraz paylaşım", "Temel performans raporu"],
      },
      pack3: {
        title: "Özel İş Birliği",
        items: ["Kurgulama & metin yazımı", "Çoklu platform yayını", "Detaylı raporlama"],
      },
      workTitle: "Seçili İşler",
      final:
        "Özel bir ihtiyacın mı var? Markana uygun paketi birlikte oluşturalım.",

      // ✅ yeni
      stats: "İstatistikler",
      last30: "Son 30 gün",
      latest10: "Son 10 post",
      followers: "Takipçi",
      posts: "Post",
      avgDuration: "Ort. Süre",
      engagementRate: "Etkileşim Oranı",

      audience: "Audience",
      location: "Lokasyon",
      age: "Yaş",
      gender: "Cinsiyet",
      male: "Erkek",
      female: "Kadın",
    },
  },
};
