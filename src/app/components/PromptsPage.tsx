"use client";

import Image from "next/image";
import React, { useMemo, useState } from 'react';
import { Check, Copy, Filter, Search } from 'lucide-react';

// Örnek Veri Seti
const INITIAL_PROMPTS = [
  {
    id: 1,
    title: "Cyberpunk Sokak",
    platform: "Midjourney",
    image: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?q=80&w=600&auto=format&fit=crop",
    prompt: "/imagine prompt: futuristic cyberpunk street level view, neon lights reflecting on wet pavement, volumetric fog, cinematic lighting, 8k --ar 16:9 --v 6.0",
    tags: ["3D", "Manzara"]
  },
  {
    id: 2,
    title: "Minimalist Logo",
    platform: "Dall-E 3",
    image: "https://images.unsplash.com/photo-1626785774573-4b799312c95d?q=80&w=600&auto=format&fit=crop",
    prompt: "Minimalist vector logo design of a geometric fox head, orange and black, flat design, white background, high quality",
    tags: ["Logo", "Vektör"]
  },
  {
    id: 3,
    title: "Mobil Uygulama UI",
    platform: "Midjourney",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop",
    prompt: "Clean mobile app UI design for a fitness tracker, dark mode, vibrant green accents, modern typography, figma style --ar 9:16",
    tags: ["Web/UI", "Mobil"]
  },
  {
    id: 4,
    title: "Hiperrealistik Portre",
    platform: "Stable Diffusion",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop",
    prompt: "Close up portrait of a young woman, natural lighting, highly detailed skin texture, 85mm lens, f/1.8, photorealistic",
    tags: ["Portre", "Fotoğraf"]
  },
  {
    id: 5,
    title: "İzometrik Ofis",
    platform: "Midjourney",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=600&auto=format&fit=crop",
    prompt: "Isometric view of a modern tech office, 3d render, blender style, soft pastel colors, cute aesthetic, high detail",
    tags: ["3D", "İzometrik"]
  }
];

const CATEGORIES = ["Tümü", "Midjourney", "Dall-E 3", "Stable Diffusion", "Logo", "Web/UI", "Portre"];

export default function PromptsPage() {
  // prompts state'ini sildik çünkü filtreleme anlık yapılmalı.
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // --- DÜZELTME: useMemo ile Derived State ---
  // Bu değişken, searchQuery veya activeCategory değiştiğinde otomatik güncellenir.
  // Ekstra bir render tetiklemez.
  const filteredPrompts = useMemo(() => {
    return INITIAL_PROMPTS.filter((p) => {
      // 1. Kategori Kontrolü
      const categoryMatch = 
        activeCategory === "Tümü" || 
        p.platform === activeCategory || 
        p.tags.includes(activeCategory);

      // 2. Arama Kontrolü
      const searchMatch = 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.prompt.toLowerCase().includes(searchQuery.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [searchQuery, activeCategory]);

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-[#F9F9F9] text-gray-900 pb-20 font-sans">
      
      {/* HERO */}
      <div className="pt-24 pb-12 px-6 text-center bg-white border-b border-gray-100">
        <span className="inline-block py-1 px-3 rounded-full bg-gray-100 text-xs font-semibold text-gray-600 mb-4 tracking-wider">
          AI LIBRARY
        </span>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-gray-900">
          İlhamı <span className="font-serif italic font-normal text-gray-500">Keşfet.</span>
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto text-lg leading-relaxed">
          Projelerin için derlenmiş en iyi prompt koleksiyonu. 
          Kopyala, yapıştır ve üretmeye başla.
        </p>
      </div>

      {/* SEARCH BAR */}
      <div className="sticky top-4 z-40 px-4 md:px-8 mt-[-24px]">
        <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md shadow-xl shadow-gray-200/50 rounded-2xl p-2 border border-white/50">
          <div className="flex flex-col md:flex-row gap-2 items-center">
            <div className="relative w-full md:w-64 shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Prompt ara..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-black/5 border border-transparent focus:border-gray-200 transition-all"
              />
            </div>
            <div className="hidden md:block w-px h-6 bg-gray-200 mx-1"></div>
            <div className="flex gap-2 overflow-x-auto w-full no-scrollbar py-1 md:py-0 mask-fade">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 border
                    ${activeCategory === cat 
                      ? 'bg-black text-white border-black shadow-md' 
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'}
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-12">
        {/* Render kısmında artık 'filteredPrompts' kullanıyoruz */}
        {filteredPrompts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Filter className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>Aradığınız kriterde prompt bulunamadı.</p>
            <button 
              onClick={() => {setSearchQuery(""); setActiveCategory("Tümü")}}
              className="text-black underline mt-2 text-sm"
            >
              Filtreleri Temizle
            </button>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredPrompts.map((item) => (
              <div 
                key={item.id} 
                className="break-inside-avoid group relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-auto overflow-hidden bg-gray-100">
                 <Image
                    src={item.image}
                    alt={item.title}
                    width={800}
                    height={600}
                    className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button 
                      onClick={() => handleCopy(item.prompt, item.id)}
                      className="bg-white text-black px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg"
                    >
                      {copiedId === item.id ? <Check className="w-4 h-4 text-green-600"/> : <Copy className="w-4 h-4"/>}
                      {copiedId === item.id ? "Kopyalandı" : "Promptu Kopyala"}
                    </button>
                  </div>
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-md font-medium border border-white/20">
                    {item.platform}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 group-hover:border-gray-200 transition-colors cursor-pointer relative"
                       onClick={() => handleCopy(item.prompt, item.id)}>
                    <p className="text-xs text-gray-500 font-mono line-clamp-3 leading-relaxed">
                      {item.prompt}
                    </p>
                    <div className="absolute bottom-2 right-2 md:hidden">
                       {copiedId === item.id 
                        ? <Check className="w-4 h-4 text-green-600" /> 
                        : <Copy className="w-4 h-4 text-gray-400" />
                       }
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TOAST */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${copiedId ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="bg-black text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3">
          <div className="bg-green-500 rounded-full p-0.5">
            <Check className="w-3 h-3 text-black" strokeWidth={3} />
          </div>
          <span className="text-sm font-medium">Prompt panoya kopyalandı!</span>
        </div>
      </div>
    </div>
  );
}