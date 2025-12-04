import TopNavPill from "../components/TopNavPill"; // Eğer hata verirse "@/..." yerine "../components/..." dene
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal & Disclaimer – ErayTechs",
  description: "Legal notice, disclaimer and usage terms for ErayTechs content.",
};

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNavPill /> 
      {children}
    </>
  );
}