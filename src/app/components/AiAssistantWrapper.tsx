"use client";

import { usePathname } from "next/navigation";
import AiAssistant from "../AiAssistant/AiAssistant";

export default function AiAssistantWrapper() {
  const pathname = usePathname();

  // Hangi sayfalarda görünsün?
  const showOnThisPage =
    pathname === "/" || // ana sayfa
    pathname?.startsWith("/contact") ||
    pathname?.startsWith("/mediakit") ||
    pathname?.startsWith("/prompts");

  // Örneğin /links, /legal, vs. hiçbirinde görünmeyecek
  if (!showOnThisPage) {
    return null;
  }

  return <AiAssistant />;
}
