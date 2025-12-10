// 1. Önce en üste import et
import AiAssistant from "./AiAssistant"; // veya yolun neyse: "../components/AiAssistant"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>
        {/* Mevcut kodların burada duruyor... */}
        {children}
        
        {/* 2. BURAYA EKLE (Body kapanmadan hemen önce) */}
        <AiAssistant />
        
      </body>
    </html>
  );
}