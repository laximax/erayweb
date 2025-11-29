// src/app/links/page.tsx
import type { Metadata } from "next";
import LinksBoard from "../components/LinksBoard";

export const metadata: Metadata = {
  title: "ErayTechs • Links",
  description: "ErayTechs link hub",
};

export default function LinksPage() {
  return <LinksBoard />;
}
