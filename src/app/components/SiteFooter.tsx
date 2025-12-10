"use client";
import Container from "./Container";
import { useLang } from "../components/LangProvider";

export default function SiteFooter() {
  const { t, lang } = useLang();

  return (
    <footer className="bg-neutral-100/80">
      <Container>
        <div className="my-16 rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-neutral-200/70 sm:p-8 lg:p-10">
          {/* === ÜST CTA PANELİ === */}
          <div className="mx-auto rounded-[24px] bg-neutral-50 px-6 py-10 text-center ring-1 ring-neutral-200/60 sm:px-10 md:py-14">
            <span className="inline-flex items-center rounded-full bg-neutral-200 px-4 py-1 text-sm text-neutral-700">
              {t.footer.ctaBadge}
            </span>

            <h3 className="mx-auto mt-5 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-[40px]">
              {lang === "en" ? (
                <>
                  Great collaborations begin with a {" "}
                  <span className="font-serif italic">conversation</span>
                </>
              ) : (
                <>
                  Harika işler bir {" "}
                  <span className="font-serif italic">sohbetle</span> başlar
                </>
              )}
            </h3>

            <p className="mx-auto mt-3 max-w-2xl text-neutral-600">
              {t.footer.about2}
            </p>

            <a
              href="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-black/90"
            >
              {t.footer.ctaButton}
            </a>
          </div>

          {/* === LİNK GRİD === */}
          <div className="mt-10 grid gap-10 md:grid-cols-4">
            {/* Brand / about */}
            <div>
              <div className="text-lg font-semibold">
                {t.brand}
                <span className="align-super text-[10px] opacity-70">™</span>
              </div>
              <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-600">
                {t.footer.about}
              </p>
            </div>

            {/* Columns */}
            <FooterCol
              title={lang === "en" ? "Quick Links" : "Hızlı Linkler"}
              links={[
                { label: lang === "en" ? "Links" : "Linkler", href: "links" },
                { label: lang === "en" ? "Media Kit" : "Medya kiti", href: "mediakit" },
              ]}
            />
            <FooterCol
              title={lang === "en" ? "Social" : "Sosyal Medya"}
              links={[
                { label: lang === "en" ? "Instagram" : "İnstagram", href: "https://www.instagram.com/eraytechs/" },
                { label: lang === "en" ? "Tiktok" : "Tiktok", href: "https://www.tiktok.com/@eraytechs" },
                { label: "Youtube", href: "https://www.youtube.com/@eraytechs" },
              ]}
            />
            <FooterCol
  title={lang === "en" ? "Legal" : "Yasal"} // Başlığı 'Utility' yerine 'Legal' veya 'Yasal' yapabilirsin
  links={[
    { 
      label: lang === "en" ? "Legal & Disclaimer" : "Yasal & Sorumluluk Reddi", 
      href: "/legal" // Linki '/legal' olarak değiştiriyoruz
    },
  ]}
/>
          </div>

          {/* === ALT SATIR === */}
          <div className="mt-10 border-t border-neutral-200/70 pt-6 text-sm text-neutral-500">
            {t.footer.copy(new Date().getFullYear())}
          </div>
        </div>
      </Container>
    </footer>
  );
}

/* === Alt Footer Sütunları === */
function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <nav aria-label={title}>
      <div className="mb-3 text-sm font-semibold text-neutral-900">{title}</div>
      <ul className="space-y-2 text-sm text-neutral-600">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="transition hover:text-neutral-900">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
