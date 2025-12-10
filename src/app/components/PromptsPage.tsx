"use client";

import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import React, { useMemo, useState, useEffect, useRef, Suspense } from 'react';
import { 
  Check, Copy, Search, SlidersHorizontal, ChevronLeft, ChevronRight, 
  X, Info, Maximize2, Download, ExternalLink, Share2, Layers 
} from 'lucide-react';

// ==================== 1. PLATFORM IKONLARI (SVG) ====================
const PlatformIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case "Midjourney":
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fillOpacity="0" />
          <path d="M17.5 12.5c-.3 0-.5-.2-.5-.5V8.2c0-1.5-1-2.2-2.3-2.2-1 0-1.8.5-2.2 1.3-.4-.8-1.3-1.3-2.3-1.3-1.4 0-2.2.8-2.2 2.2v3.8c0 .3-.2.5-.5.5s-.5-.2-.5-.5V8.2c0-2.1 1.4-3.2 3.2-3.2 1.3 0 2.4.7 2.9 1.8.5-1.1 1.6-1.8 2.9-1.8 1.9 0 3.2 1.1 3.2 3.2v3.8c0 .3-.2.5-.5.5z" />
          <path d="M8.8 13.7c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5zM13.7 13.7c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5z" />
        </svg>
      );
    case "Dall-E 3":
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
          <path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z" />
        </svg>
      );
    case "Stable Diffusion":
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a4.5 4.5 0 0 1 4.5 4.5v.5" />
          <path d="M12 22a4.5 4.5 0 0 0-4.5-4.5v-.5" />
          <path d="M2 12a4.5 4.5 0 0 1 4.5-4.5h.5" />
          <path d="M22 12a4.5 4.5 0 0 0-4.5 4.5h-.5" />
        </svg>
      );
    case "Gemini":
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
          <path d="M12 2l2.5 5.5L20 10l-5.5 2.5L12 18l-2.5-5.5L4 10l5.5-2.5z" />
          <path d="M4 16l1.5 3.5L9 21l-3.5 1.5L4 26l-1.5-3.5L-1 21l3.5-1.5z" transform="scale(0.8) translate(10, -5)" opacity="0.7"/>
        </svg>
      );
    case "Combo":
      return <Layers className="w-4 h-4" />;
    default:
      return <SlidersHorizontal className="w-4 h-4" />;
  }
};

// ==================== 2. SKELETON LOADING ====================
function SkeletonCard() {
  return (
    <div className="rounded-[2rem] border border-gray-100 overflow-hidden bg-white">
      <div className="aspect-[4/3] bg-gray-200 animate-pulse relative"></div>
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-200 rounded-md w-3/4 animate-pulse"></div>
        <div className="h-20 bg-gray-100 rounded-xl w-full animate-pulse border border-gray-200"></div>
        <div className="flex gap-2">
          <div className="h-6 w-12 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="h-6 w-16 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

// ==================== 3. PARAMETER TOOLTIP ====================
const PromptHighlighter = ({ text }: { text: string }) => {
  const parts = text.split(/(--[a-z]+ [0-9.:]+|--[a-z]+)/g);
  return (
    <p className="text-sm text-gray-600 font-mono leading-relaxed">
      <span className="text-gray-300 select-none mr-2">$&gt;</span>
      {parts.map((part, i) => {
        if (part.startsWith("--")) {
          let tooltipText = "Parametre";
          if (part.includes("--ar")) tooltipText = "Aspect Ratio (En/Boy Oranı)";
          if (part.includes("--v")) tooltipText = "Version (Model Versiyonu)";
          if (part.includes("--s")) tooltipText = "Stylize (Sanatsallık Değeri)";
          if (part.includes("--q")) tooltipText = "Quality (Detay Kalitesi)";
          if (part.includes("--no")) tooltipText = "Negative Prompt (İstenmeyenler)";
          return (
            <span key={i} className="group relative inline-block text-blue-600 font-bold mx-1 cursor-help">
              {part}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 font-sans">
                {tooltipText}
                <svg className="absolute text-black h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
              </span>
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </p>
  );
};

// ==================== VERİ SETİ (RAW_DATA) ====================
const RAW_DATA = [
  // --- SAYFA 1 ---
  { id: 1, title: "Cyberpunk Sokak", platform: "Gemini", image: "/cyberpunk.png", prompt: "Cinematic street photography of a futuristic cyberpunk street food vendor in rainy Tokyo night, neon lights reflecting on wet pavement, steam rising from the food stall, volumetric lighting, highly detailed, photorealistic, 8k, shot on 35mm lens, depth of field, bokeh effect --ar 16:9 --v 6.0", tags: ["Cyberpunk", "Manzara"] },
  { id: 2, title: "3D Chibi", platform: "Gemini", image: "/astranot.png", prompt: "A cute 3D rendered chibi astronaut sitting on a glowing crescent moon, holding a star, isometric view, soft clay texture, pastel colors, studio lighting, minimal background, 3D illustration, C4D, Blender render, high quality, 4k --ar 1:1", tags: ["3D", "Blender"] },
  { id: 3, title: "Duvar Kağıdı", platform: "Gemini", image: "/wallpaper.png", prompt: "Translucent crystal flower with bioluminescent glowing petals, iridescent colors, dark background, macro photography, sharp focus, ray tracing, magical atmosphere, ethereal, liquid glass texture, vibrant gradient lighting --ar 9:16", tags: ["Wallpaper", "Mobil"] },
  { id: 4, title: "Chibi Tarzı İnstagram", platform: "Gemini", image: "/instaboy.png", prompt: "Generate a 3D chibi-style character from the attached photo, keeping the subject’s facial features and outfit details accurate. The character is making a finger heart with the left hand, with a small red heart floating above the fingers. The character is playfully perched on the edge of a giant Instagram frame, legs dangling outside.At the top of the frame, display eraytechs. Surround the scene with floating social media icons like like, comment, and share, along with additional playful emojis drifting around the frame to create a fun, lively atmosphere.", tags: ["Tasarım", "Sosyal Medya"] },
  { id: 5, title: "Poloroid Fotoğraf", platform: "Gemini", image: "/poloroid.png", prompt: "Generate a nostalgic Polaroid-style photo of two people hugging warmly. Keep their faces clearly visible and natural, with authentic expressions of joy and affection. Use indoor lighting with a slight flash effect and subtle blur to mimic a real instant photo. Include a soft background and maintain the classic Polaroid frame aesthetic for a cozy, heartfelt feel.", tags: ["Fotoğraf", "Poloroid"] },
  { id: 6, title: "İstediğin yerde selfie", platform: "Gemini", image: "/paris.png", prompt: "Please draw an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition — just like a random snapshot taken casually. The photo should include slight motion blur, with uneven lighting caused by sunlight or indoor lights, resulting in mild overexposure. The angle is awkward, the composition is messy, and the overall aesthetic is deliberately plain — as if it were accidentally taken while pulling the phone out of a pocket. The subjects are [Names], taken at night, next to the [Eiffel].", tags: ["Selfie", "Telefon"] },
  
  // --- SAYFA 2 ---
  { id: 7, title: "Hayalindeki Yer", platform: "Gemini", image: "/dream.png", prompt: "A majestic floating island in the sky with waterfalls cascading into clouds, ancient white castle, golden hour sunlight, epic scale, matte painting, concept art style, ArtStation trending, highly detailed, dreamy atmosphere, wide angle --ar 16:9", tags: ["Hayal", "Manzara"] },
];

const INITIAL_PROMPTS = RAW_DATA;
const CATEGORIES = ["Tümü", "Midjourney", "Dall-E 3", "Stable Diffusion", "Gemini", "Combo", "Logo", "Web/UI", "Portre"];

// ==================== ANA COMPONENT (İÇERİK) ====================
function PromptsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPrompt, setSelectedPrompt] = useState<typeof RAW_DATA[0] | null>(null);
  
  const filterRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  // --- HATA DÜZELTME: updateUrl FONKSİYONU EN ÜSTE TAŞINDI ---
  const updateUrl = (item: typeof RAW_DATA[0] | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (item) {
      params.set('id', item.id.toString());
    } else {
      params.delete('id');
    }
    window.history.replaceState(null, '', `?${params.toString()}`);
  };

  // --- HATA DÜZELTME: handleCloseModal ve handleOpenModal EN ÜSTE TAŞINDI ---
  const handleOpenModal = (item: typeof RAW_DATA[0]) => {
    setSelectedPrompt(item);
    updateUrl(item);
  };
  
  const handleCloseModal = () => {
    setSelectedPrompt(null);
    updateUrl(null);
  };

  // 1. Initial Loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // 2. URL Parameter Handling (Deep Linking)
  useEffect(() => {
    const idFromUrl = searchParams.get('id');
    if (idFromUrl) {
      const foundPrompt = RAW_DATA.find(p => p.id === Number(idFromUrl));
      if (foundPrompt) {
        setTimeout(() => setSelectedPrompt(foundPrompt), 0);
      }
    } else {
      setTimeout(() => setSelectedPrompt(null), 0);
    }
  }, [searchParams]);

  // Click Outside (Filtre)
  useEffect(() => { 
    function handleClickOutside(event: MouseEvent) { 
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) { 
        setIsFilterOpen(false); 
      } 
    } 
    document.addEventListener("mousedown", handleClickOutside); 
    return () => document.removeEventListener("mousedown", handleClickOutside); 
  }, []);

  // --- ESC TUŞU İLE KAPATMA ---
  // Artık handleCloseModal yukarıda tanımlı olduğu için hata vermez.
  useEffect(() => {
    if (!selectedPrompt) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedPrompt]);

  const filteredPrompts = useMemo(() => {
    return INITIAL_PROMPTS.filter((p) => {
      const categoryMatch = activeCategory === "Tümü" || p.platform === activeCategory || p.tags.includes(activeCategory);
      const searchMatch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.prompt.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [searchQuery, activeCategory]);

  const totalPages = Math.ceil(filteredPrompts.length / itemsPerPage);
  const currentItems = filteredPrompts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleCopy = (text: string, id?: number) => {
    navigator.clipboard.writeText(text);
    if(id) setCopiedId(id); else setCopiedId(9999);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShare = async (item: typeof RAW_DATA[0]) => {
    if (typeof window === 'undefined') return;
    const directLink = `${window.location.origin}${window.location.pathname}?id=${item.id}`;
    
    const shareData = { 
      title: `ErayTechs - ${item.title}`, 
      text: `Bu harika AI promptunu keşfet:\n\n"${item.prompt}"`, 
      url: directLink 
    };
    
    if (navigator.share) { 
      try { await navigator.share(shareData); } catch (err) { console.log("Paylaşım iptal edildi"); } 
    } else { 
      handleCopy(directLink); 
      alert("Direkt prompt linki kopyalandı!"); 
    }
  };

  const getPlatformLink = (platform: string) => {
    if (platform.includes("Midjourney")) return "https://discord.com/app";
    if (platform.includes("Dall-E") || platform.includes("GPT")) return "https://chatgpt.com/";
    if (platform.includes("Stable Diffusion")) return "https://dreamstudio.ai/";
    if (platform.includes("Gemini")) return "https://gemini.google.com/";
    if (platform.includes("Combo")) return "https://www.google.com/search?q=ai+tools+combo";
    return "https://google.com/search?q=" + platform + "+ai+generator";
  };

  const handleCategorySelect = (cat: string) => { setIsLoading(true); setTimeout(() => setIsLoading(false), 600); setActiveCategory(cat); setCurrentPage(1); setIsFilterOpen(false); };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => { setSearchQuery(e.target.value); setCurrentPage(1); };
  const handlePageChange = (pageNumber: number) => { setIsLoading(true); setTimeout(() => setIsLoading(false), 500); setCurrentPage(pageNumber); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <div className="bg-[#F5F5F5] text-gray-900 font-sans min-h-screen flex flex-col">
      {/* MODAL */}
      {selectedPrompt && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={handleCloseModal}></div>
          <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] animate-in fade-in zoom-in-95 duration-300">
            <div className="w-full md:w-3/5 bg-gray-100 relative group">
              <Image src={selectedPrompt.image} alt={selectedPrompt.title} width={1200} height={900} className="w-full h-full object-cover"/>
              <button className="absolute bottom-4 right-4 p-2 bg-white/20 backdrop-blur rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity"><Download className="w-5 h-5"/></button>
            </div>
            <div className="w-full md:w-2/5 p-8 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between mb-6 shrink-0">
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full text-xs font-bold text-gray-700"><PlatformIcon platform={selectedPrompt.platform} />{selectedPrompt.platform}</div>
                <div className="flex gap-2">
                  <button onClick={() => handleShare(selectedPrompt)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Share2 className="w-5 h-5 text-gray-500"/></button>
                  <button onClick={handleCloseModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="w-5 h-5 text-gray-500"/></button>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-4 shrink-0">{selectedPrompt.title}</h2>
              
              {/* SCROLLABLE PROMPT KUTUSU */}
              <div className="bg-blue-50/50 rounded-xl border border-blue-100 mb-6 flex flex-col overflow-hidden shrink min-h-0">
                <div className="px-4 pt-4 pb-2 bg-transparent shrink-0">
                  <h4 className="text-xs font-bold text-blue-800 uppercase tracking-wider flex items-center gap-1"><Info className="w-3 h-3"/> Prompt</h4>
                </div>
                <div className="px-4 pb-4 overflow-y-auto custom-scrollbar max-h-[250px]">
                  <div className="whitespace-pre-wrap break-words">
                    <PromptHighlighter text={selectedPrompt.prompt} />
                  </div>
                </div>
              </div>

              <div className="mt-auto grid gap-3 shrink-0">
                <button onClick={() => handleCopy(selectedPrompt.prompt)} className="w-full py-3.5 bg-black text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-all active:scale-95"><Copy className="w-4 h-4"/>Promptu Kopyala</button>
                <a href={getPlatformLink(selectedPrompt.platform)} target="_blank" rel="noopener noreferrer" className="w-full py-3.5 bg-white text-gray-900 border border-gray-200 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-all active:scale-95"><ExternalLink className="w-4 h-4"/>{selectedPrompt.platform}&apos;de Dene</a>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="flex-grow pb-12">
        <div className="pt-28 pb-10 px-6 text-center">
          <span className="inline-flex items-center py-1.5 px-4 rounded-full bg-white text-[11px] font-bold text-gray-500 mb-6 tracking-widest uppercase border border-gray-200 shadow-sm">AI Prompt Kütüphanesi</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-gray-900">Sınırsız Olanı <span className="font-serif italic font-black text-gray-900 ml-3 relative inline-block">Tasarla.<span className="absolute -bottom-2 left-0 w-full h-1 bg-gray-900/10 rounded-full transform -rotate-1"></span></span></h1>
          <p className="text-gray-500 max-w-xl mx-auto text-lg leading-relaxed font-light">Senin için özenle seçilmiş, yüksek kaliteli AI prompt koleksiyonu.</p>
        </div>
        <div className="relative z-40 px-4 md:px-8 mt-[-10px]">
          <div className="max-w-2xl mx-auto"> 
            <div className="bg-white shadow-xl shadow-black/5 rounded-2xl p-2 border border-white flex gap-2 relative">
              <div className="relative flex-1"><Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="text" placeholder="Prompt, model veya stil ara..." value={searchQuery} onChange={handleSearchChange} className="w-full pl-12 pr-4 h-12 bg-gray-50 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-black/5 border border-transparent focus:border-gray-200 transition-all placeholder:text-gray-400 text-gray-900"/></div>
              <div ref={filterRef}><button onClick={() => setIsFilterOpen(!isFilterOpen)} className={`h-12 px-5 rounded-xl flex items-center gap-2 font-medium transition-all duration-200 border ${isFilterOpen || activeCategory !== "Tümü" ? 'bg-black text-white border-black shadow-lg shadow-gray-900/20' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'}`}><SlidersHorizontal className="w-4 h-4" /><span className="hidden sm:inline text-sm">Filtrele</span>{activeCategory !== "Tümü" && (<span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-black text-[10px] font-bold ml-1">1</span>)}</button>
                {isFilterOpen && (<div className="absolute top-full right-0 mt-3 w-72 bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-200"><div className="flex justify-between items-center mb-3 px-1"><span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Kategoriler</span>{activeCategory !== "Tümü" && (<button onClick={() => handleCategorySelect("Tümü")} className="text-[10px] text-red-500 hover:text-red-700 font-medium underline">Temizle</button>)}</div><div className="grid grid-cols-2 gap-2">{CATEGORIES.map((cat) => (<button key={cat} onClick={() => handleCategorySelect(cat)} className={`text-left px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${activeCategory === cat ? 'bg-gray-900 text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>{cat} {activeCategory === cat && <Check className="w-3 h-3 inline-block ml-2 mb-0.5"/>}</button>))}</div></div>)}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{[1, 2, 3, 4, 5, 6].map((n) => <SkeletonCard key={n} />)}</div>
          ) : filteredPrompts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-gray-400 bg-white rounded-3xl border border-dashed border-gray-200"><SlidersHorizontal className="w-16 h-16 mb-4 opacity-20" /><p className="text-lg font-medium text-gray-500">Bu filtrede sonuç bulunamadı.</p><button onClick={() => { setSearchQuery(""); setActiveCategory("Tümü"); setCurrentPage(1); }} className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-full text-sm hover:bg-gray-800 transition-colors">Tümünü Göster</button></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentItems.map((item) => (
                <div key={item.id} onClick={() => handleOpenModal(item)} className="group relative bg-white rounded-[2rem] border border-gray-200 overflow-hidden hover:shadow-2xl hover:shadow-gray-200/60 transition-all duration-500 ease-out hover:-translate-y-2 cursor-pointer">
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <Image src={item.image} alt={item.title} width={800} height={600} className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"/>
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-gray-900 text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-wider shadow-sm border border-white/50 z-10 flex items-center gap-1.5"><PlatformIcon platform={item.platform} />{item.platform}</div>
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><Maximize2 className="w-4 h-4"/></div>
                    <button onClick={(e) => { e.stopPropagation(); handleCopy(item.prompt, item.id); }} className="hidden md:flex absolute bottom-5 right-5 bg-white text-black p-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm items-center justify-center transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out hover:scale-110 active:scale-95 z-20 border border-white/50">{copiedId === item.id ? <Check className="w-6 h-6 text-green-500"/> : <Copy className="w-6 h-6"/>}</button>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{item.title}</h3>
                    <div className="bg-[#F5F5F5] rounded-xl p-4 border border-gray-200 group-hover:border-gray-300 group-hover:bg-gray-100 transition-all relative overflow-hidden">
                      <p className="text-sm text-gray-600 font-mono line-clamp-3 leading-relaxed pr-6"><span className="text-gray-300 select-none">$&gt; </span>{item.prompt}</p>
                      {copiedId === item.id && (<div className="absolute inset-0 bg-green-500/5 animate-pulse pointer-events-none"></div>)}
                    </div>
                    <div className="flex items-center justify-between mt-5 pt-2 border-t border-gray-50/50">
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map(tag => (<span key={tag} className="text-[10px] font-bold text-gray-500 bg-[#F5F5F5] border border-gray-200 px-3 py-1.5 rounded-md uppercase tracking-wider">{tag}</span>))}
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); handleCopy(item.prompt, item.id); }} className="md:hidden shrink-0 p-2.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 active:scale-95 transition-all shadow-sm border border-gray-200" title="Hızlı Kopyala">
                        {copiedId === item.id ? <Check className="w-4 h-4 text-green-600"/> : <Copy className="w-4 h-4"/>}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-16 mb-8">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 rounded-full border border-gray-200 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors"><ChevronLeft className="w-5 h-5 text-gray-600" /></button>
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              return (<button key={pageNum} onClick={() => handlePageChange(pageNum)} className={`w-10 h-10 rounded-full text-sm font-medium transition-all duration-200 ${currentPage === pageNum ? 'bg-black text-white shadow-lg shadow-black/20 scale-110' : 'bg-transparent text-gray-500 hover:bg-white hover:text-black border border-transparent hover:border-gray-200'}`}>{pageNum}</button>);
            })}
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 rounded-full border border-gray-200 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors"><ChevronRight className="w-5 h-5 text-gray-600" /></button>
          </div>
        )}
      </main>

      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ${copiedId ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-90'}`}>
        <div className="bg-gray-900/95 backdrop-blur-md text-white px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-3 border border-white/10">
          <div className="bg-green-500 rounded-full p-1"><Check className="w-3.5 h-3.5 text-white" strokeWidth={3} /></div>
          <span className="text-sm font-semibold tracking-wide">{copiedId === 9999 ? "Prompt kopyalandı!" : "Prompt panoya kopyalandı!"}</span>
        </div>
      </div>
    </div>
  );
}

// ==================== EXPORT (SUSPENSE ILE WRAP) ====================
// Bu sayede useSearchParams sunucu tarafında hata vermez.
export default function PromptsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]"><div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div></div>}>
      <PromptsContent />
    </Suspense>
  );
}