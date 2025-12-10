import TopNavPill from "../components/TopNavPill";
import AiAssistant from "../AiAssistant/AiAssistant";

export const metadata = {
  title: "Contact – ErayTechs",
  description: "Reach out for collabs, media kit or sponsorships.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNavPill />   {/* sadece /contact’ta görünür */}
      {children}
       <AiAssistant />
    </>
  );
}
