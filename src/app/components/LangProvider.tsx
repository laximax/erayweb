"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { dict, type Lang } from "../lib/i18n";

type Ctx = {
  lang: Lang;
  t: typeof dict["en"];
  setLang: (l: Lang) => void;
};

const LangCtx = createContext<Ctx | null>(null);

export default function LangProvider({
  initialLang,
  children,
}: {
  initialLang: Lang;
  children: React.ReactNode;
}) {
  const [lang, setLang] = useState<Lang>(initialLang);

  // URL & localStorage eşitle (opsiyonel ama güzel)
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.history.replaceState({}, "", url.toString());
    localStorage.setItem("lang", lang);
    // server cookie ayarla (route handler'a POST)
    fetch("/api/lang", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ lang }),
    }).catch(() => {});
  }, [lang]);

  const value = useMemo(
    () => ({ lang, t: dict[lang], setLang }),
    [lang]
  );

  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const v = useContext(LangCtx);
  if (!v) throw new Error("useLang must be used within LangProvider");
  return v;
}
