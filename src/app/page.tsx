import TopNavPill from "./components/TopNavPill";
import HeroCard from "./components/HeroCard";
import BenefitsSection from "./components/BenefitsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import SiteFooter from "./components/SiteFooter";
import AiAssistant from "./AiAssistant//AiAssistant";

export default function Page() {
  return (
    <>
      <TopNavPill />
      <AiAssistant />
      <HeroCard />
      <BenefitsSection />
      <TestimonialsSection />
      <SiteFooter />
      {/* aşağıya diğer bölümler gelecek */}
    </>
  );
}
