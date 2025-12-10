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
    footerText: string; // ✅ items DIŞINDA, doğru yerde
  };

  footer: {
    ctaBadge: string;
    ctaTitle: string;
    ctaButton: string;
    about: string;
    about2: string;
    copy: (year: number) => string;
  };

  contact: {
    badge: string;
    titlePart1: string;
    titlePart2: string;
    desc: string;
    emailLabel: string;
    copied: string;
    openMail: string;
  };

  mediakit: {
    name: string;
    verified: string;
    country: string;
    language: string;
    category: string;
    bio: string;
    reach: string;
    cta: string;

    channels: string;
    platformNames: { tiktok: string; instagram: string; youtube: string };
    goTo: (platform: string) => string;
    downloadPdf: string;
    downloadPdfShort: string;
    totalViews: string;
    avgPostImpressions: string;
    postEngagementRate: string;
    avgReelsViews: string;
    avgVideoViews: string;
    dataRefresh: string;

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
      prompts: "AI Lab",
    },
    hero: {
      title:
        "I turn complex tech into simple, viral content — PC optimization, AI workflows and creator tools.",
      trusted: "Trusted by 25,000+ clients",
    },
    benefits: {
      badge: "Partnership Value",
      heading: "Why partner with me?",
      blurb: "I explain technology with a voice consumers trust.",
      cards: [
        {
          title: "Viral Potential",
          desc: "I deliver your brand's message naturally to a broad audience, using dynamic editing styles that master social media dynamics.",
          tag: "Organic Growth",
        },
        {
          title: "Targeted Reach",
          desc: "I engage with a qualified community that is tech-savvy, loves innovation, and genuinely trusts my recommendations.",
          tag: "Brand Safety & Trust",
        },
        {
          title: "Tangible Results",
          desc: "I focus on performance driving not just visibility, but real engagement, traffic, and demand for your brand.",
          tag: "ROI & Performance",
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
      }, // ✅ items burada kapandı
      cta: { open: "Open", copy: "Copy Link", copied: "Copied!" },
      footerText: "All my digital world in one place.", // ✅ items ile kardeş
    },

    footer: {
      ctaBadge: "Initiate Your Journey",
      ctaTitle: "Great collaborations begin with a conversation",
      ctaButton: "Get In Touch",
      about: "Technology & Digital Content.",
      about2:
        "Let's take the first step together to introduce your product or service to the right audience in the clearest way possible.",
      copy: (year) => `© ${year} ErayTechs. All rights reserved.`,
    },

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
      bio: "I create high impact content focused on technology, digital solutions, AI workflows, and everyday user needs. My communication style is clear, fast, and directly actionable. My goal is to make technology understandable and accessible for everyone while helping brands deliver their message to the right audience.",
      reach: "Monthly Reach",
      cta: "Work with me",
       channels: "Channels",
      platformNames: {
        tiktok: "TikTok",
        instagram: "Instagram",
        youtube: "YouTube",
      },
      goTo: (platform: string) => `Go to ${platform} ↗`,
      downloadPdf: "Download Media Kit (PDF)",
      downloadPdfShort: "Media Kit PDF",
      totalViews: "Total Views",
      avgPostImpressions: "Avg Post Impressions",
      postEngagementRate: "Post Engagement Rate",
      avgReelsViews: "Avg Reels Views",
      avgVideoViews: "Avg Video Views",
      dataRefresh: "Data automatically updates weekly. Last Sync: Dec 09, 2025 • 22:50",

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
      prompts: "AI Lab",
    },
    hero: {
      title:
        "Karmaşık teknolojiyi basit, viral içeriğe dönüştürüyorum — PC optimizasyonu, yapay zeka iş akışları ve içerik araçları.",
      trusted: "25.000+ müşteri tarafından güveniliyor",
    },
    benefits: {
      badge: "İş Birliği Değeri",
      heading: "Neden benimle çalışmalısın?",
      blurb: "Teknolojiyi tüketicinin güven duyduğu bir dille anlatıyorum.",
      cards: [
        {
          title: "Viral Potansiyel",
          desc: "Sosyal medya dinamiklerine hakim kurgularla, markanızın mesajını geniş kitlelere en doğal haliyle ulaştırıyorum.",
          tag: "Organik Büyüme",
        },
        {
          title: "Doğru Kitle",
          desc: "Teknolojiye meraklı, yenilikleri seven ve önerilerime değer veren nitelikli bir topluluğa hitap ediyorum.",
          tag: "Marka Güvenliği & İtibar",
        },
        {
          title: "Somut Sonuçlar",
          desc: "Markanız için sadece görünürlük değil; etkileşim, trafik ve talep oluşturan performans odaklı çalışıyorum.",
          tag: "ROI & Performans",
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
      }, // ✅ items burada kapandı
      cta: { open: "Aç", copy: "Linki Kopyala", copied: "Kopyalandı!" },
      footerText: "Tüm dijital dünyam tek bir yerde.", // ✅ items ile kardeş ve Türkçe
    },

    footer: {
      ctaBadge: "Yolculuğunu Başlat",
      ctaTitle: "Harika işler bir sohbetle başlar",
      ctaButton: "İletişime Geç",
      about: "Teknoloji & Dijital İçerik.",
      about2:
        "Ürün veya hizmetinizi en doğru kitleye, en anlaşılır dille anlatmak için ilk adımı birlikte atalım.",
      copy: (year) => `© ${year} ErayTechs. Tüm hakları saklıdır.`,
    },

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
      bio: " Teknoloji, dijital çözümler, yapay zeka iş akışları ve günlük kullanıcı ihtiyaçlarına yönelik yüksek etkili içerikler üretiyorum. Anlatımım net, hızlı ve doğrudan uygulanabilir. Hedefim, teknolojiyi herkes için anlaşılır ve erişilebilir kılarak markaların mesajlarını doğru kitleyle buluşturmak.",
      reach: "Aylık Erişim",
      cta: "Benimle çalış",
       channels: "Kanallar",
      platformNames: {
        tiktok: "TikTok",
        instagram: "Instagram",
        youtube: "YouTube",
      },
      goTo: (platform: string) => `${platform} sayfasına git ↗`,
      downloadPdf: "Medya Kitini İndir (PDF)",
      downloadPdfShort: "Medya Kiti PDF",
      totalViews: "Toplam İzlenme",
      avgPostImpressions: "Gönderi Başına Ortalama Erişim",
      postEngagementRate: "Gönderi Etkileşim Oranı",
      avgReelsViews: "Reels Ortalama İzlenme",
      avgVideoViews: "Video Ortalama İzlenme",
      dataRefresh: "Veriler haftalık olarak otomatik güncellenir. Son Eşitleme: 09.12.2025 • 22:50",

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
        items: [
          "3x kısa video",
          "Çapraz paylaşım",
          "Temel performans raporu",
        ],
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

      audience: "Kitle",
      location: "Lokasyon",
      age: "Yaş",
      gender: "Cinsiyet",
      male: "Erkek",
      female: "Kadın",
    },
  },
};