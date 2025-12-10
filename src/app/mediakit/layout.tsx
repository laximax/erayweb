// src/app/mediakit/layout.tsx
import TopNavPill from "../components/TopNavPill";


export const metadata = {
  title: "Media Kit – ErayTechs",
  description: "Stats, audience and collaboration details for ErayTechs.",
};

export default function MediaKitLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNavPill />  {/* sadece /mediakit’te görünür */}
      {children}
       
    </>
  );
}
