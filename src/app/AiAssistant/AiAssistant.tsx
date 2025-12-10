"use client";

/* CREDITS & LICENSES:
  1. Neon Orb Loader: Based on code by 'dexter-st' from Uiverse.io (MIT License)
  2. Chat Input Design: Based on code by 'Lakshay-art' from Uiverse.io (MIT License)
*/

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, MessageSquare, User } from "lucide-react";

// --- YENİ NEON ORB (dexter-st Design) ---
const NeonOrb = () => {
  return (
    <>
      <style jsx>{`
        /* From Uiverse.io by dexter-st - MIT License */
        .loader-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #0a0a0a; 
          box-shadow: 0 0 20px rgba(71, 30, 236, 0.5);
        }
        .loader {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: transparent;
          animation: loader-rotate 2s linear infinite;
          z-index: 0;
        }
        @keyframes loader-rotate {
          0% { transform: rotate(90deg); box-shadow: inset 0 0 10px 0 rgba(255, 255, 255, 0.8), inset 0 5px 10px 0 #ad5fff, inset 0 20px 25px 0 #471eec; }
          50% { transform: rotate(270deg); box-shadow: inset 0 0 10px 0 rgba(255, 255, 255, 0.8), inset 0 5px 5px 0 #d60a47, inset 0 15px 25px 0 #311e80; }
          100% { transform: rotate(450deg); box-shadow: inset 0 0 10px 0 rgba(255, 255, 255, 0.8), inset 0 5px 10px 0 #ad5fff, inset 0 20px 25px 0 #471eec; }
        }
      `}</style>
      <div className="loader-wrapper">
        <div className="loader"></div>
      </div>
    </>
  );
};

// --- MESAJ TİPİ ---
type Message = {
  id: number;
  text: string;
  sender: "bot" | "user";
};

export default function AiAssistant() {
  const [status, setStatus] = useState<"intro" | "docked" | "open">("intro");
  const [showTooltip, setShowTooltip] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // --- CHAT MANTIĞI İÇİN STATE ---
  const [inputVal, setInputVal] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Selam! Ben Nova, ErayTechs'in yapay zeka tabanlı asistanıyım. Sorularını bekliyorum!", sender: "bot" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 1. Hydration Fix
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // 2. Animasyon Zamanlayıcısı
  useEffect(() => {
    if (!mounted) return;
    const timer = setTimeout(() => {
      setStatus("docked");
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 5000);
    }, 2500);
    return () => clearTimeout(timer);
  }, [mounted]);

  // 3. Otomatik Scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // --- GELİŞMİŞ BOT CEVAP MANTIĞI ---
  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputVal.trim()) return;

    const userMsg: Message = { id: Date.now(), text: inputVal, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    setTimeout(() => {
      const lowerText = userMsg.text.toLowerCase();
      // Varsayılan Cevap
      let botResponse = "Henüz geliştirme aşamasında olduğum için bunu henüz öğrenemedim 🤔 Ama bana 'reklam', 'iletişim', 'prompt' veya 'iş birliği' hakkında sorular sorabilirsin!";

      // --- 1. SELAMLAŞMA & HAL HATIR ---
      if (lowerText.includes("selam") || lowerText.includes("merhaba") || lowerText.includes("hey")) {
        botResponse = "Selamlar! 👋 Hoş geldin.Sana nasıl rehberlik edebilirim?";
      } 
      else if (lowerText.includes("naber") || lowerText.includes("nasılsın")) {
        botResponse = "Sistemlerim %100 performansla çalışıyor! 🚀 Sen nasılsın?";
      }
      else if (lowerText.includes("iyiyim") || lowerText.includes("bende iyiyim")) {
        botResponse = "Bunu duyduğuma sevindim! 😊 Harika bir gün olsun.";
      }

      // --- 2. İŞ & İLETİŞİM ---
      else if (lowerText.includes("fiyat") || lowerText.includes("ücret") || lowerText.includes("reklam") || lowerText.includes("iş birliği") || lowerText.includes("sponsor")) {
        botResponse = "İş birliği, reklam ve sponsorluk fiyatları için detaylı bilgiyi 'Media Kit' sayfamda bulabilir veya eray@eraytechs.com adresine mail atabilirsin. 💼";
      }
      else if (lowerText.includes("iletişim") || lowerText.includes("mail") || lowerText.includes("e-posta") || lowerText.includes("iş birliği")) {
        botResponse = "Bana en hızlı eray@eraytechs.com adresinden ulaşabilirsin. Genelde 24 saat içinde dönüş yapıyorum! 📩";
      }

      // --- 3. EKİPMAN & DONANIM ---
      else if (lowerText.includes("ekipman") || lowerText.includes("kamera") || lowerText.includes("mikrofon") || lowerText.includes("pc")) {
        botResponse = "Kullandığım tüm ekipmanları, PC özelliklerini ve stüdyo malzemelerini menüdeki 'Bağlantılar' sayfasında listeledim. Linkleri orada bulabilirsin! 🖥️";
      }

      // --- 4. YAZILIM & EDİT ---
      else if (lowerText.includes("program") || lowerText.includes("edit") || lowerText.includes("montaj") || lowerText.includes("hangi uygulama")) {
        botResponse = "Videolarımda genellikle Adobe Premiere Pro ve After Effects kullanıyorum.🎬";
      }


      // --- 6. PROMPTLAR ---
      else if (lowerText.includes("prompt") || lowerText.includes("yapay zeka")) {
        botResponse = "En iyi promptlarımı görmek için 'AI LAB' sekmesine mutlaka göz at! 🚀";
      }

      // --- 7. SOSYAL MEDYA ---
      else if (lowerText.includes("sosyal") || lowerText.includes("instagram") || lowerText.includes("tiktok") || lowerText.includes("youtube")) {
        botResponse = "Beni tüm platformlarda @ErayTechs kullanıcı adıyla bulabilirsin. Takip etmeyi unutma! 📱";
      }

      // --- 8. GENEL / EĞLENCE ---
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
// Evcil Hayvan
else if (lowerText.includes("kedi") || lowerText.includes("köpek") || lowerText.includes("evcil")) {
  botResponse = "Henüz bir evcil hayvanım yok ama stüdyoda gezen bir 'Robot Süpürge'm var, ona isim koymayı düşünüyorum. Önerin var mı? 🐈🤖";
}

else if (lowerText.includes("şarkı söyle") || lowerText.includes("rap yap")) {
  botResponse = "Yapay zeka olduğum için ses tellerim yok ama şöyle bir beat yapabilirim: 🤖 0100101 011001 🎵 (Binary Solo!)";
}
// Saat Kaç?
else if (lowerText.includes("saat kaç") || lowerText.includes("zaman")) {
  const now = new Date();
  botResponse = `Benim sistem saatime göre şu an: ${now.toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'})}. Zaman hızlı geçiyor, üretmeye devam! ⏳`;
}
// Hız Testi
else if (lowerText.includes("internet hızı") || lowerText.includes("ping") || lowerText.includes("hız testi")) {
  const fakePing = Math.floor(Math.random() * 20) + 5; // 5-25 arası random ping
  botResponse = `Sanal hatlarımı kontrol ettim. Şu an sunucularımda pingin ${fakePing}ms görünüyor! Fiber hızındasın! ⚡ (Şaka şaka, gerçek değildi )`;
}
else if (lowerText.includes("eray") || lowerText.includes("eraytechs kim")) {
  botResponse = "Ahh benim canım sahibim Eray! o bir içerik üreticisi.";
}
// Taş Kağıt Makas
else if (lowerText.includes("taş kağıt makas") || lowerText.includes("oyun oynayalım")) {
  const moves = ["Taş ✊", "Kağıt ✋", "Makas ✌️"];
  const botMove = moves[Math.floor(Math.random() * moves.length)];
  botResponse = `Hadi oynayalım! 1.. 2.. 3.. Ben ${botMove} seçtim! Sen kazandın mı? 😄`;
}

// Vedalaşma
else if (lowerText.includes("güle güle") || lowerText.includes("görüşürüz") || lowerText.includes("bay bay") || lowerText.includes("hoşçakal") || lowerText.includes("bye") || lowerText.includes("bb")) {
  const farewells = [
    "Görüşmek üzere! 👋 Teknolojiyle kal, ErayTechs'i takip etmeyi unutma! 🚀",
    "Ben bekleme moduna geçiyorum... Bir sorun olursa buradayım. Kendine iyi bak! 🤖💤",
    "Bay bay! Çıkmadan önce yeni videolara göz atmayı unutma. 😉",
    "Görüşürüz! Kendine iyi bak."
  ];
  botResponse = farewells[Math.floor(Math.random() * farewells.length)];
}

      setMessages((prev) => [...prev, { id: Date.now() + 1, text: botResponse, sender: "bot" }]);
      setIsTyping(false);
    }, 1000);
  };

  if (!mounted) return null;

  return (
    <>
      <style jsx>{`
        /* From Uiverse.io by Lakshay-art - MIT License */
        .poda { display: flex; align-items: center; justify-content: center; width: 100%; position: relative; }
        .main-input-container { position: relative; width: 100%; }
        .input-bg { background-color: #010201; border: none; width: 100%; height: 56px; border-radius: 10px; color: white; padding-left: 55px; padding-right: 60px; font-size: 16px; }
        .input-bg::placeholder { color: #c0b9c0; }
        .input-bg:focus { outline: none; }
        
        .white, .border, .darkBorderBg, .glow { max-height: 70px; height: 100%; width: 100%; position: absolute; overflow: hidden; z-index: -1; border-radius: 12px; filter: blur(3px); inset: 0; }
        .white { max-height: 63px; filter: blur(2px); margin: auto; }
        .border { max-height: 59px; filter: blur(0.5px); margin: auto; }
        .darkBorderBg { max-height: 65px; margin: auto; }
        .glow { filter: blur(30px); opacity: 0.4; max-height: 130px; }

        .white::before, .border::before, .darkBorderBg::before, .glow::before { content: ""; z-index: -2; text-align: center; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(83deg); position: absolute; width: 600px; height: 600px; background-repeat: no-repeat; background-position: 0 0; transition: all 2s; }
        .white::before { background-image: conic-gradient(rgba(0,0,0,0) 0%, #a099d8, rgba(0,0,0,0) 8%, rgba(0,0,0,0) 50%, #dfa2da, rgba(0,0,0,0) 58%); }
        .border::before { background-image: conic-gradient(#1c191c, #402fb5 5%, #1c191c 14%, #1c191c 50%, #cf30aa 60%, #1c191c 64%); }
        .darkBorderBg::before { background-image: conic-gradient(rgba(0,0,0,0), #18116a, rgba(0,0,0,0) 10%, rgba(0,0,0,0) 50%, #6e1b60, rgba(0,0,0,0) 60%); }
        .glow::before { background-image: conic-gradient(#000, #402fb5 5%, #000 38%, #000 50%, #cf30aa 60%, #000 87%); }

        .poda:hover > .darkBorderBg::before { transform: translate(-50%, -50%) rotate(262deg); }
        .poda:hover > .glow::before { transform: translate(-50%, -50%) rotate(240deg); }
        .poda:hover > .white::before { transform: translate(-50%, -50%) rotate(263deg); }
        .poda:hover > .border::before { transform: translate(-50%, -50%) rotate(250deg); }

        .poda:focus-within > .darkBorderBg::before { transform: translate(-50%, -50%) rotate(442deg); transition: all 4s; }
        .poda:focus-within > .glow::before { transform: translate(-50%, -50%) rotate(420deg); transition: all 4s; }
        .poda:focus-within > .white::before { transform: translate(-50%, -50%) rotate(443deg); transition: all 4s; }
        .poda:focus-within > .border::before { transform: translate(-50%, -50%) rotate(430deg); transition: all 4s; }

        .pink-mask { pointer-events: none; width: 30px; height: 20px; position: absolute; background: #cf30aa; top: 18px; left: 15px; filter: blur(20px); opacity: 0.8; transition: all 2s; }
        .main-input-container:hover > .pink-mask { opacity: 0; }

        .send-btn-container { position: absolute; top: 8px; right: 8px; display: flex; align-items: center; justify-content: center; z-index: 2; width: 40px; height: 40px; border-radius: 10px; background: linear-gradient(180deg, #161329, black, #1d1b4b); border: 1px solid transparent; cursor: pointer; transition: transform 0.2s; }
        .send-btn-container:hover { transform: scale(1.05); }
        .send-btn-container:active { transform: scale(0.95); }

        .filterBorder { height: 42px; width: 42px; position: absolute; overflow: hidden; top: 7px; right: 7px; border-radius: 10px; pointer-events: none; }
        .filterBorder::before { content: ""; text-align: center; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(90deg); position: absolute; width: 600px; height: 600px; background-repeat: no-repeat; background-position: 0 0; filter: brightness(1.35); background-image: conic-gradient(rgba(0,0,0,0), #3d3a4f, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 50%, #3d3a4f, rgba(0,0,0,0) 100%); animation: rotate 4s linear infinite; }
        
        .search-icon { position: absolute; left: 20px; top: 16px; pointer-events: none; }
        @keyframes rotate { 100% { transform: translate(-50%, -50%) rotate(450deg); } }
      `}</style>

      {/* --- ASİSTAN TOPU --- */}
      <motion.div
        layout
        initial={{ left: "-150px", top: "-50px", scale: 0.5 }}
        animate={
          status === "intro"
            ? { left: "50%", top: "40%", x: "-50%", y: "-50%", scale: 1.5, transition: { type: "spring", duration: 2, bounce: 0.3 } }
            : status === "docked"
            ? { left: "auto", top: "auto", right: "24px", bottom: "30px", x: 0, y: 0, scale: 0.7, transition: { type: "spring", stiffness: 120, damping: 18 } }
            : { opacity: 0, scale: 0, pointerEvents: "none", right: "24px", bottom: "30px" }
        }
        whileHover={{ scale: 0.8 }}
        style={{ position: "fixed", zIndex: 9999, cursor: "pointer", width: "64px", height: "64px" }}
        onClick={() => status === "docked" && setStatus("open")}
      >
        <NeonOrb />

        {/* KONUŞMA BALONU */}
        <AnimatePresence>
          {(status === "intro" || (status === "docked" && showTooltip)) && (
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute right-[115%] top-1/2 -translate-y-1/2 w-max max-w-[200px] rounded-2xl bg-white/95 px-4 py-2.5 text-sm font-bold text-indigo-900 shadow-[0_5px_20px_rgba(71,30,236,0.3)] backdrop-blur-md ring-2 ring-indigo-100"
            >
              {status === "intro" ? (
                <span className="flex items-center gap-2">Nova Hazır!</span>
              ) : (
                <span className="flex items-center gap-2">Yardımcı olabilir miyim?</span>
              )}
              <div className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 bg-white/95 ring-r-2 ring-t-2 ring-indigo-100"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* --- CHAT EKRANI --- */}
      <AnimatePresence>
        {status === "open" && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            style={{ 
              background: "linear-gradient(180deg, #161329, #0a0a0b, #1d1b4b)",
              boxShadow: "0 0 30px rgba(64, 47, 181, 0.4)"
            }}
            className="fixed bottom-6 right-6 z-[9999] w-[90vw] max-w-[400px] overflow-hidden rounded-3xl backdrop-blur-xl ring-1 ring-white/10 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 text-white bg-white/5 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 backdrop-blur-sm">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                  </div>
                </div>
                <span className="font-bold tracking-wide text-gray-100">Nova</span>
              </div>
              <button onClick={() => setStatus("docked")} className="rounded-full bg-white/10 p-1.5 hover:bg-white/30 transition text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Alanı */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent max-h-[60vh]"
            >
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  
                  {msg.sender === "bot" && (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600/50 text-white shadow-[0_0_10px_rgba(79,70,229,0.3)] ring-1 ring-white/10">
                      <Sparkles className="h-5 w-5" />
                    </div>
                  )}

                  <div 
                    className={`p-3.5 text-[15px] leading-relaxed shadow-sm backdrop-blur-sm max-w-[80%]
                      ${msg.sender === "bot" 
                        ? "rounded-2xl rounded-tl-none bg-white/10 text-gray-200 ring-1 ring-white/5" 
                        : "rounded-2xl rounded-br-none bg-indigo-600 text-white ring-1 ring-indigo-400"
                      }
                    `}
                  >
                    {msg.text}
                  </div>

                  {msg.sender === "user" && (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/10">
                      <User className="h-5 w-5" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                   <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600/50 text-white shadow-[0_0_10px_rgba(79,70,229,0.3)] ring-1 ring-white/10">
                      <Sparkles className="h-5 w-5" />
                   </div>
                   <div className="flex items-center gap-1 rounded-2xl rounded-tl-none bg-white/10 px-4 py-3 ring-1 ring-white/5">
                      <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0s" }}></div>
                      <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                   </div>
                </div>
              )}
            </div>

            {/* Input Alanı */}
            <div className="p-3 pb-5 bg-transparent">
              <form className="poda" onSubmit={handleSend}>
                <div className="glow"></div>
                <div className="darkBorderBg"></div>
                <div className="darkBorderBg"></div>
                <div className="darkBorderBg"></div>
                <div className="white"></div>
                <div className="border"></div>

                <div className="main-input-container">
                  <input 
                    placeholder="Mesaj yaz..." 
                    type="text" 
                    className="input-bg" 
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                  />
                  <div className="pink-mask"></div>
                  
                  <div className="search-icon">
                    <MessageSquare className="h-5 w-5 text-gray-400" />
                  </div>

                  <div className="filterBorder"></div>
                  <button type="submit" className="send-btn-container">
                    <Send className="h-4 w-4 text-[#d6d6e6]" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}