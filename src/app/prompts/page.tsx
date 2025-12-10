"use client";

import TopNavPill from "../components/TopNavPill";
import PromptsPage from "../components/PromptsPage";
import AiAssistant from "../AiAssistant/AiAssistant";

export default function Prompts() {
  return (
    <main className="min-h-screen bg-[#F9F9F9]">
      <TopNavPill />
      <AiAssistant />
      <PromptsPage />
    </main>
  );
}