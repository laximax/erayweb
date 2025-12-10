// src/app/api/nova/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userText = body.message || "";
    const lowerText = userText.toLowerCase();

    // Varsayılan Cevap
    let botResponse = "Henüz geliştirme aşamasında olduğum için bunu henüz öğrenemedim 🤔 Ama bana 'iş birliği', 'iletişim', 'prompt' veya 'Eray' hakkında sorular sorabilirsin!";

    // --- MANTIK ZİNCİRİ (Buradaki kodları tarayıcıda kimse göremez) ---
    
    // 1. SELAMLAŞMA
    if (lowerText.includes("selam") || lowerText.includes("merhaba") || lowerText.includes("hey")) {
      botResponse = "Selamlar! 👋 Hoş geldin. Sana nasıl rehberlik edebilirim?";
    } 
    else if (lowerText.includes("naber") || lowerText.includes("nasılsın")) {
      botResponse = "Sistemlerim %100 performansla çalışıyor! 🚀 Sen nasılsın?";
    }
    else if (lowerText.includes("iyiyim") || lowerText.includes("bende iyiyim")) {
      botResponse = "Bunu duyduğuma sevindim! 😊 Harika bir gün olsun.";
    }

    // 2. İŞ & İLETİŞİM
    else if (lowerText.includes("fiyat") || lowerText.includes("ücret") || lowerText.includes("reklam") || lowerText.includes("iş birliği") || lowerText.includes("sponsor") || lowerText.includes("işbirliği")) {
      botResponse = "İş birliği, reklam ve sponsorluk fiyatları için detaylı bilgiyi 'Media Kit' sayfamda bulabilir veya eray@eraytechs.com adresine mail atabilirsin. 💼";
    }
    else if (lowerText.includes("iletişim") || lowerText.includes("mail") || lowerText.includes("e-posta")) {
      botResponse = "Bana en hızlı eray@eraytechs.com adresinden ulaşabilirsin. Genelde 24 saat içinde dönüş yapıyorum! 📩";
    }

    // 3. EKİPMAN
    else if (lowerText.includes("ekipman") || lowerText.includes("kamera") || lowerText.includes("mikrofon") || lowerText.includes("pc")) {
      botResponse = "Kullandığım tüm ekipmanları, PC özelliklerini ve stüdyo malzemelerini menüdeki 'Bağlantılar' sayfasında listeledim. Linkleri orada bulabilirsin! 🖥️";
    }

    // 4. YAZILIM
    else if (lowerText.includes("program") || lowerText.includes("edit") || lowerText.includes("montaj") || lowerText.includes("hangi uygulama")) {
      botResponse = "Videolarımda genellikle Adobe Premiere Pro ve After Effects kullanıyorum.🎬";
    }
    else if (lowerText.includes("eray nasıl birisi") || lowerText.includes("eray iyi biri mi") || lowerText.includes("eraytechs nasıl biri") || lowerText.includes("eray kötü biri mi") || lowerText.includes("eray")  || lowerText.includes("eraytechs kimdir")) {
      botResponse = "Ahh benim canım sahibim Eray! o bir içerik üreticisi kendisini severim.";
    }


    // 5. AI / PROMPT
    else if (lowerText.includes("prompt") || lowerText.includes("yapay zeka")) {
      botResponse = "En iyi promptlarımı görmek için 'AI LAB' sekmesine mutlaka göz at! 🚀";
    }

    // 6. SOSYAL MEDYA
    else if (lowerText.includes("sosyal") || lowerText.includes("instagram") || lowerText.includes("tiktok") || lowerText.includes("youtube")) {
      botResponse = "Beni tüm platformlarda @ErayTechs kullanıcı adıyla bulabilirsin. Takip etmeyi unutma! 📱";
    }

    // 7. GENEL / EĞLENCE
    else if (lowerText.includes("teşekkür") || lowerText.includes("sağ ol") || lowerText.includes("eyvallah")) {
      botResponse = "Rica ederim! Yardımcı olabildiysem ne mutlu bana. 🦾";
    }
    else if (lowerText.includes("kimsin") || lowerText.includes("sen kimsin") || lowerText.includes("eray kim")) {
      botResponse = "Ben Nova 🤖 ErayTechs'in sanal asistanıyım. Eray ise teknolojiyi herkes için anlaşılır kılan bir içerik üreticisi!";
    }
    else if (lowerText.includes("sır") || lowerText.includes("gizli") || lowerText.includes("kod")) {
      botResponse = "Şşşt! 🤫 Aramızda kalsın ama yakında web siteme takipçilerime özel 'Premium Promptlar' kısmı gelecek. Takipte kal!";
    }
    else if (lowerText.includes("seviyorum") || lowerText.includes("evlen") || lowerText.includes("aşk")) {
      botResponse = "Duygusal devrelerim aşırı ısındı! ❤️ Teşekkür ederim, sizler sayesinde buradayım.";
    } 
    else if (lowerText.includes("yazı tura")) {
      const result = Math.random() > 0.5 ? "Yazı! 🪙" : "Tura! 🪙";
      botResponse = `Para havada dönüyor veee... ${result}`;
    }
    else if (lowerText.includes("sudo") || lowerText.includes("admin") || lowerText.includes("root")) {
      botResponse = "Yetki reddedildi! 🛑 Bu sistemin tek admini Eray'dır. Ama denemen güzeldi! 😎";
    }
    else if (lowerText.includes("sevgilin") || lowerText.includes("manita") || lowerText.includes("yenge")) {
      botResponse = "Benim tek aşkım teknoloji ve siz değerli takipçilerim! (Bir de RTX 5090'lar çok çekici duruyor 😍) 💔";
    }
    else if (lowerText.includes("kedi") || lowerText.includes("köpek") || lowerText.includes("evcil")) {
      botResponse = "Henüz bir evcil hayvanım yok ama stüdyoda gezen bir 'Robot Süpürge'm var, ona isim koymayı düşünüyorum. Önerin var mı? 🐈🤖";
    }
    else if (lowerText.includes("şarkı söyle") || lowerText.includes("rap yap")) {
      botResponse = "Yapay zeka olduğum için ses tellerim yok ama şöyle bir beat yapabilirim: 🤖 0100101 011001 🎵 (Binary Solo!)";
    }
    else if (lowerText.includes("saat kaç") || lowerText.includes("zaman")) {
      const now = new Date();
      botResponse = `Benim sistem saatime göre şu an: ${now.toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'})}. Zaman hızlı geçiyor, üretmeye devam! ⏳`;
    }
    else if (lowerText.includes("internet hızı") || lowerText.includes("ping") || lowerText.includes("hız testi")) {
      const fakePing = Math.floor(Math.random() * 20) + 5; 
      botResponse = `Sanal hatlarımı kontrol ettim. Şu an sunucularımda pingin ${fakePing}ms görünüyor! Fiber hızındasın! ⚡ (Şaka şaka, gerçek değildi )`;
    }
    
    else if (lowerText.includes("taş kağıt makas") || lowerText.includes("oyun oynayalım")) {
      const moves = ["Taş ✊", "Kağıt ✋", "Makas ✌️"];
      const botMove = moves[Math.floor(Math.random() * moves.length)];
      botResponse = `Hadi oynayalım! 1.. 2.. 3.. Ben ${botMove} seçtim! Sen kazandın mı? 😄`;
    }
    else if (lowerText.includes("güle güle") || lowerText.includes("görüşürüz") || lowerText.includes("bay bay") || lowerText.includes("hoşçakal") || lowerText.includes("bye") || lowerText.includes("bb")) {
      const farewells = [
        "Görüşmek üzere! 👋 Teknolojiyle kal, ErayTechs'i takip etmeyi unutma! 🚀",
        "Ben bekleme moduna geçiyorum... Bir sorun olursa buradayım. Kendine iyi bak! 🤖💤",
        "Bay bay! Çıkmadan önce yeni videolara göz atmayı unutma. 😉",
        "Görüşürüz! Kendine iyi bak."
      ];
      botResponse = farewells[Math.floor(Math.random() * farewells.length)];
    }

    // Yapay bir gecikme ekleyelim (Bot düşünüyormuş gibi) - Opsiyonel
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({ response: botResponse });

  } catch  {
    return NextResponse.json({ response: "Bir hata oluştu, lütfen tekrar dene." }, { status: 500 });
  }
}