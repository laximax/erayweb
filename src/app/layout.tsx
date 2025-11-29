import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LangProvider from "./components/LangProvider"; // 🌍 dil sağlayıcısı

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ErayTechs",
  description: "Teknoloji İçerik Üreticisi • Tech Influencer Portfolio by ErayTechs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 🌍 HTML etiketi sabit "tr" başlar ama dil değişiminde LangProvider override eder
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ✅ Sadece burada LangProvider kullan, başka yerde tekrarlama */}
        <LangProvider initialLang="tr">
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
