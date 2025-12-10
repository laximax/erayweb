"use client";

/* CREDITS & LICENSES:
  1. Neon Orb Loader: Based on code by 'dexter-st' from Uiverse.io (MIT License)
  2. Chat Input Design: Based on code by 'Lakshay-art' from Uiverse.io (MIT License)
*/
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, MessageSquare, User } from "lucide-react";

// --- NEON ORB (Görsel Bileşen) ---
const NeonOrb = () => {
  return (
    <>
      <style jsx>{`
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
  const pathname = usePathname();
  const isStaticPage =
    pathname?.startsWith("/contact") ||
    pathname?.startsWith("/mediakit") ||
    pathname?.startsWith("/prompts");
  const enableAnimations = !isStaticPage;
  // Status: init(bekle), intro(ortada), docked(sağ alt), open(chat açık)
  const [status, setStatus] = useState<"intro" | "docked" | "open" | "init">(
    enableAnimations ? "init" : "docked"
  );
  
  const [showTooltip, setShowTooltip] = useState(false);
  const [mounted, setMounted] = useState(!enableAnimations);
  
  // Chat state
  const [inputVal, setInputVal] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Selam! Ben Nova, ErayTechs'in yapay zeka tabanlı asistanıyım. Sorularını bekliyorum!", sender: "bot" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 1. BAŞLANGIÇ MANTIĞI (F5 KONTROLÜ DAHİL)
  useEffect(() => {
     if (!enableAnimations) return;
    // Senkron hatasını önlemek için setTimeout
    const initTimer = setTimeout(() => {
      const hasSeenIntro = sessionStorage.getItem("novaIntroSeen");

      if (hasSeenIntro) {
        // F5 atılmışsa veya daha önce girilmişse: Direkt DOCKED (Animasyonsuz)
        setStatus("docked");
      } else {
        // İlk giriş: INTRO (Ortada başlar)
        setStatus("intro");
        sessionStorage.setItem("novaIntroSeen", "true");
      }
      setMounted(true);
    }, 0);

    return () => clearTimeout(initTimer);
  }, [enableAnimations]);

  // 2. INTRO -> DOCKED GEÇİŞİ
  useEffect(() => {
    if (status === "intro") {
      const timer = setTimeout(() => {
        setStatus("docked");
      }, 2500); // 2.5 saniye ortada durur
      return () => clearTimeout(timer);
    }
  }, [status]);

  // 3. TOOLTIP (BALONCUK) MANTIĞI
  useEffect(() => {
    let showTimer: NodeJS.Timeout;
    let hideTimer: NodeJS.Timeout;



    if (!enableAnimations) return () => undefined;

    if (status === "docked") {
      // Intro bittiğinde veya sayfa yüklendiğinde balonu göster
      showTimer = setTimeout(() => {
        setShowTooltip(true);
      }, 300); // Küçük bir gecikme

      // 5 saniye sonra gizle
      hideTimer = setTimeout(() => {
        setShowTooltip(false);
      }, 3000);

    } else if (status === "intro") {
      // Intro sırasındaysa ("Nova Hazır!" yazısı için) görünür yap
      // Timeout kullanıyoruz ki render hatası olmasın
       showTimer = setTimeout(() => {
        setShowTooltip(true);
      }, 0);

    } else {
      // Chat açıksa gizle
       hideTimer = setTimeout(() => {
        setShowTooltip(false);
      }, 0);
    }

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
   }, [enableAnimations, status]);

  // 4. Auto Scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // --- BOT CEVAPLARI ---
  // --- BOT CEVAPLARI ---
  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputVal.trim()) return;

    // 1. Kullanıcı mesajını ekrana bas
    const userMsg: Message = { id: Date.now(), text: inputVal, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    try {
      // 2. Sunucuya (API'ye) istek gönder
      const res = await fetch("/api/nova", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text }),
      });

      if (!res.ok) throw new Error("API hatası");

      const data = await res.json();
      
      // 3. Gelen cevabı ekrana bas
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: data.response, sender: "bot" },
      ]);
    } catch  {
      // Hata durumunda
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: "Bağlantıda bir sorun oluştu 😔", sender: "bot" },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!mounted || status === "init") return null;

  // --- ANİMASYON AYARLARI ---
  // Eğer status "intro" ise (ilk giriş), animasyon ortadan başlar.
  // Eğer status "docked" ise (F5 atılmış), animasyon direkt sağ alttan başlar (hareket etmez).
  const isIntro = enableAnimations && status === "intro";

  const dockedPosition = { right: "24px", bottom: "24px", x: 0, y: 0, scale: 0.85, opacity: 1 } as const;
  return (
    <>
      <style jsx>{`
        /* Stil kodları aynı (kısaltıldı) */
        .poda { display: flex; align-items: center; justify-content: center; width: 100%; position: relative; }
        .main-input-container { position: relative; width: 100%; }
        .input-bg { background-color: #010201; border: none; width: 100%; height: 56px; border-radius: 10px; color: white; padding-left: 55px; padding-right: 60px; font-size: 16px; }
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
        .pink-mask { pointer-events: none; width: 30px; height: 20px; position: absolute; background: #cf30aa; top: 18px; left: 15px; filter: blur(20px); opacity: 0.8; transition: all 2s; }
        .main-input-container:hover > .pink-mask { opacity: 0; }
        .send-btn-container { position: absolute; top: 8px; right: 8px; display: flex; align-items: center; justify-content: center; z-index: 2; width: 40px; height: 40px; border-radius: 10px; background: linear-gradient(180deg, #161329, black, #1d1b4b); border: 1px solid transparent; cursor: pointer; transition: transform 0.2s; }
        .send-btn-container:hover { transform: scale(1.05); }
        .filterBorder { height: 42px; width: 42px; position: absolute; overflow: hidden; top: 7px; right: 7px; border-radius: 10px; pointer-events: none; }
        .filterBorder::before { content: ""; text-align: center; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(90deg); position: absolute; width: 600px; height: 600px; background-repeat: no-repeat; background-position: 0 0; filter: brightness(1.35); background-image: conic-gradient(rgba(0,0,0,0), #3d3a4f, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 50%, #3d3a4f, rgba(0,0,0,0) 100%); animation: rotate 4s linear infinite; }
        .search-icon { position: absolute; left: 20px; top: 16px; pointer-events: none; }
        @keyframes rotate { 100% { transform: translate(-50%, -50%) rotate(450deg); } }
      `}</style>

      {/* --- ASİSTAN TOPU --- */}
      <motion.div
        layout
        // Eğer INTRO ise başlangıç pozisyonu sol dışarıda (efekt için)
        // Eğer DOCKED ise (F5 durumu) başlangıç pozisyonu direkt sağ alt.
        initial={
          enableAnimations
            ? isIntro
              ? { left: "-150px", top: "-50px", scale: 0.5, opacity: 0 }
              : { left: "auto", top: "auto", ...dockedPosition }
            : { left: "auto", top: "auto", ...dockedPosition }
        }
        animate={
          enableAnimations
            ? status === "intro"
              ? { left: "50%", top: "40%", x: "-50%", y: "-50%", scale: 1.5, opacity: 1, transition: { type: "spring", duration: 2, bounce: 0.3 } }
              : status === "docked"
                ? { left: "auto", top: "auto", ...dockedPosition, transition: { type: "spring", stiffness: 120, damping: 18 } }
                : { opacity: 0, scale: 0, pointerEvents: "none", right: "24px", bottom: "24px" }
            : { left: "auto", top: "auto", ...dockedPosition }
        }
        whileHover={enableAnimations ? { scale: 0.9 } : undefined}
        style={{ position: "fixed", zIndex: 9999, cursor: "pointer", width: "64px", height: "64px" }}
        onClick={() => status === "docked" && setStatus("open")}
      >
        <NeonOrb />

        {/* KONUŞMA BALONU */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute right-[115%] top-1/2 -translate-y-1/2 w-max max-w-[200px] rounded-2xl bg-white/95 px-4 py-2.5 text-sm font-bold text-indigo-900 shadow-[0_5px_20px_rgba(71,30,236,0.3)] backdrop-blur-md ring-2 ring-indigo-100"
            >
              {/* Status'a göre baloncuk içeriği değişiyor */}
              {status === "intro" ? (
                 <span className="flex items-center gap-2">Nova Hazır! 🚀</span>
              ) : (
                 <span className="flex items-center gap-2">Yardımcı olabilir miyim?</span>
              )}
              
              <div className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 bg-white/95 ring-r-2 ring-t-2 ring-indigo-100"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* --- CHAT EKRANI (DEĞİŞMEDİ) --- */}
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