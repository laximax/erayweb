export type Lang = "tr" | "en";

export type Translations = {
  brand: string;
  nav: {
    benefits: string;
    testimonials: string;
    faq: string;
    back: string;
    contact: string;
    mediakit: string;
    prompts: string;
  };
  hero: { title: string; trusted: string };
  benefits: {
    badge: string;
    heading: string;
    blurb: string;
    cards: { title: string; desc: string; tag: string }[];
  };
  testimonials: { badge: string; heading: string; blurb: string };

  linksPage: {
    tabs: { links: string; social: string; shop: string };
    items: { website: string; gear: string; presets: string };
    cta: { open: string; copy: string; copied: string };
  };

  footer: {
    ctaBadge: string;
    ctaTitle: string;
    ctaButton: string;
    about: string;
    about2: string;
    copy: (year: number) => string;
  };

  // ✅ YENİ İLETİŞİM SAYFASI İÇİN GÜNCELLENEN ALAN
  contact: {
    badge: string;        // İş Birlikleri İçin Açık
    titlePart1: string;   // Birlikte
    titlePart2: string;   // Çalışalım
    desc: string;         // Açıklama metni
    emailLabel: string;   // E-posta Adresi etiketi
    copied: string;       // Kopyalandı uyarısı
    openMail: string;     // Mail uygulamasında aç
  };

  // MediaKit
  mediakit: {
    name: string;
    verified: string;
    country: string;
    language: string;
    category: string;
    bio: string;
    reach: string;
    cta: string;

    meet: string;
    meetText: string;
    offerTitle: string;
    pack1: { title: string; items: string[] };
    pack2: { title: string; items: string[] };
    pack3: { title: string; items: string[] };
    workTitle: string;
    final: string;

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
      testimonials: "Reviews",
      faq: "Links",
      back: "Home Page",
      contact: "Contact",
      mediakit: "Media Kit",
      prompts: "Prompts",
    },
    hero: {
      title:
        "I turn complex tech into simple, viral content — PC optimization, AI workflows and creator tools.",
      trusted: "Trusted by 25,000+ clients",
    },
    benefits: {
      badge: "Partnership Value",
      heading: "Why partner with me?",
      blurb: "I bridge the gap between complex tech and consumer trust.",
      cards: [
        {
          title: "Viral Storytelling",
          desc: "I craft high-retention hooks and narratives that stop the scroll and keep audiences watching.",
          tag: "High Engagement & Reach",
        },
        {
          title: "Trusted Authority",
          desc: "My audience isn't just watching; they are listening. I built a community that trusts my technical verdict.",
          tag: "Brand Safety & Trust",
        },
        {
          title: "Conversion Focused",
          desc: "Content designed not just for views, but to drive downloads, sales, and real user action.",
          tag: "ROI & Results",
        },
      ],
    },
    testimonials: {
      badge: "Community Feedback",
      heading: "Community Love",
      blurb: "Honest feedback from tech enthusiasts.",
    },

    linksPage: {
      tabs: { links: "Links", social: "Social", shop: "Shop" },
      items: {
        website: "Official Website",
        gear: "Creator Gear List",
        presets: "PC Optimize Presets",
      },
      cta: { open: "Open", copy: "Copy Link", copied: "Copied!" },
    },

    footer: {
      ctaBadge: "Initiate Your Journey",
      ctaTitle: "Great collaborations begin with a conversation",
      ctaButton: "Get In Touch",
      about: "Technology & Digital Content.",
      about2: "Bridging the gap between complex tech and daily life.",
      copy: (year) => `© ${year} ErayTechs. All rights reserved.`,
    },

    // ✅ ENGLISH TRANSLATIONS FOR NEW CONTACT PAGE
    contact: {
      badge: "Available for Collaboration",
      titlePart1: "Let's Work",
      titlePart2: "Together.",
      desc: "Reach out for sponsorships, product reviews, or just to say hello.",
      emailLabel: "Email Address",
      copied: "Copied to clipboard!",
      openMail: "Open in Mail App",
    },

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
      contact: "İletişim",
      mediakit: "Medya Kiti",
      prompts: "Promptlar",
    },
    hero: {
      title:
        "Karmaşık teknolojiyi basit, viral içeriğe dönüştürüyorum — PC optimizasyonu, yapay zeka iş akışları ve içerik araçları.",
      trusted: "25.000+ müşteri tarafından güveniliyor",
    },
    benefits: {
      badge: "İş Birliği Değeri",
      heading: "Neden benimle çalışmalısın?",
      blurb: "Karmaşık teknolojiyi, tüketicinin güven duyduğu bir dille anlatıyorum.",
      cards: [
        {
          title: "Viral Hikaye Anlatımı",
          desc: "Kaydırmayı durduran kancalar (hooks) ve izleyiciyi videoda tutan akıcı kurgular üretiyorum.",
          tag: "Yüksek Etkileşim & Erişim",
        },
        {
          title: "Güvenilir Otorite",
          desc: "Kitlem sadece izlemiyor, dinliyor. Teknik önerilerime güvenen sadık bir topluluk inşa ettim.",
          tag: "Marka Güvenliği & İtibar",
        },
        {
          title: "Dönüşüm Odaklı",
          desc: "Sadece izlenme (vanity metrics) değil; indirme, satış ve gerçek kullanıcı hareketi getiren içerikler.",
          tag: "ROI & Gerçek Sonuçlar",
        },
      ],
    },
    testimonials: {
      badge: "Takipçi Yorumları",
      heading: "Sizden Gelenler",
      blurb: "Teknoloji tutkunlarının dürüst yorumları.",
    },

    linksPage: {
      tabs: { links: "Linkler", social: "Sosyal", shop: "Mağaza" },
      items: {
        website: "Resmi Web Sitesi",
        gear: "Ekipman Listem",
        presets: "PC Hızlandırma Ayarları",
      },
      cta: { open: "Aç", copy: "Linki Kopyala", copied: "Kopyalandı!" },
    },

    footer: {
      ctaBadge: "Yolculuğunu Başlat",
      ctaTitle: "Harika işler bir sohbetle başlar",
      ctaButton: "İletişime Geç",
      about: "Teknoloji & Dijital İçerik.",
      about2: "Karmaşık teknolojiyi günlük yaşamla buluşturuyoruz.",
      copy: (year) => `© ${year} ErayTechs. Tüm hakları saklıdır.`,
    },

    // ✅ YENİ İLETİŞİM SAYFASI İÇİN TÜRKÇE ÇEVİRİLER
    contact: {
      badge: "İş Birlikleri İçin Açık",
      titlePart1: "Birlikte",
      titlePart2: "Çalışalım.",
      desc: "Sponsorluk, ürün incelemeleri veya sadece merhaba demek için ulaşın.",
      emailLabel: "E-posta Adresi",
      copied: "Panoya kopyalandı!",
      openMail: "Mail Uygulamasında Aç",
    },

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
        items: [
          "Kurgulama & metin yazımı",
          "Çoklu platform yayını",
          "Detaylı raporlama",
        ],
      },
      workTitle: "Seçili İşler",
      final:
        "Özel bir ihtiyacın mı var? Markana uygun paketi birlikte oluşturalım.",

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