"use client";

import Container from "../components/Container";
import { useLang } from "../components/LangProvider";

export default function LegalPage() {
  const { lang } = useLang();

  return (
    <main className="bg-neutral-50 py-14 sm:py-24">
      <Container>
         <div className="mx-auto max-w-3xl rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-neutral-200/70 sm:p-12">
          
          <header className="mb-10 border-b border-neutral-100 pb-8">
            <h1 className="text-[clamp(1.6rem,4vw,2.25rem)] font-bold tracking-tight text-neutral-900 sm:text-3xl">
              {lang === "en" ? "Legal Notice & Disclaimer" : "Yasal Bilgilendirme ve Sorumluluk Reddi"}
            </h1>
            <p className="mt-2 text-sm text-neutral-500">
              {lang === "en" ? "Transparency, usage terms and disclaimer." : "Şeffaflık, kullanım şartları ve yasal uyarılar."}
            </p>
          </header>

          <div className="prose prose-neutral prose-sm sm:prose-base max-w-none text-neutral-600">
            {lang === "en" ? <EnglishLegal /> : <TurkishLegal />}
          </div>

        </div>
      </Container>
    </main>
  );
}

// === TÜRKÇE METİN ===
function TurkishLegal() {
  return (
    <div className="space-y-8">
      {/* KISIM 1: KÜNYE */}
      <section>
        <h3 className="text-lg font-semibold text-neutral-900">1. Yayıncı ve Marka Bilgisi</h3>
        <p>
          Bu web sitesi ve bağlı sosyal medya kanalları (Instagram, TikTok, YouTube), <strong>ErayTechs</strong> markası altında teknoloji, yazılım, dijital servisler ve içerik üretimi üzerine faaliyet göstermektedir.
        </p>
        <p className="mt-2">
          İş birlikleri, sponsorluklar ve medya talepleri için <a href="/contact" className="text-black underline">iletişim sayfasını</a> veya resmi e-posta adresimizi kullanabilirsiniz.
        </p>
      </section>

      {/* KISIM 2: İŞ BİRLİĞİ POLİTİKASI */}
      <section className="rounded-xl bg-blue-50 p-5 ring-1 ring-blue-100">
        <h3 className="text-lg font-semibold text-blue-900">2. İş Birliği ve Seçim Politikası</h3>
        <p className="mt-2 text-blue-800">
          ErayTechs olarak takipçilerimize sunduğumuz önerilerde önceliğimiz her zaman <strong>fayda, kalite ve güvenilirliktir.</strong> Sponsorluk ve tanıtım süreçlerimiz şu prensiplerle yürütülür:
        </p>
        <ul className="mt-3 list-disc pl-5 space-y-2 text-blue-800">
          <li>
            <strong>Seçici Yaklaşım:</strong> Tanıtımını yaptığımız ürünler, internet kampanyaları, yazılımlar veya dijital servisler; önceden inceleyip onayladığımız hizmetlerdir. Kalite standartlarımızı karşılamayan veya kullanıcı aleyhine olabilecek teklifler kabul edilmez.
          </li>
          <li>
            <strong>Güven İlişkisi:</strong> Sayfamızda bir öneri veya kampanya haberi görüyorsanız, bu içerik ErayTechs&apos;in kalite filtresinden geçmiş ve onaylanmış demektir.
          </li>
          <li>
            <strong>Şeffaflık:</strong> Maddi bir iş birliği (Sponsorluk) içeren tüm paylaşımlarda, ilgili platformun kurallarına ve yerel yasalara uygun olarak (Örn: #işbirliği, #reklam) bilgilendirme yapılır.
          </li>
        </ul>
      </section>

      {/* KISIM 3: SORUMLULUK REDDİ (Kapsamlı Koruma) */}
      <section className="rounded-xl bg-amber-50 p-5 ring-1 ring-amber-100">
        <h3 className="text-lg font-semibold text-amber-900">3. Hizmet ve Ürün Sorumluluk Sınırları (Önemli)</h3>
        <p className="mt-2 text-amber-800">
          ErayTechs bir medya kanalıdır; ürün satıcısı, ithalatçısı veya servis sağlayıcısı değildir. Bu nedenle:
        </p>
        <ul className="mt-3 list-disc pl-5 space-y-2 text-amber-800">
          <li>
            <strong>Üretim ve Hizmet Hataları:</strong> Tanıtılan bir ürünün <strong>ayıplı/kusurlu çıkması, kargoda hasar görmesi, üretim hatası barındırması</strong> veya sonradan arızalanması durumunda; ayrıca internet/yazılım hizmetlerinde yaşanan kesintiler , problemler  ve hız düşüklüklerinde tüm yasal sorumluluk <strong>ilgili firma, satıcı veya üreticiye aittir.</strong>
          </li>
          <li>
            <strong>Anlık Deneyim:</strong> İncelemelerimiz, içeriğin üretildiği tarihteki kişisel deneyimlerimize ve o anki test sonuçlarına dayanır. Ürünlerin veya hizmetlerin kalitesinde sonradan yaşanabilecek değişimlerden ErayTechs sorumlu tutulamaz.
          </li>
        </ul>
      </section>

      {/* KISIM 4: TEKNİK SORUMLULUK REDDİ */}
      <section>
        <h3 className="text-lg font-semibold text-neutral-900">4. Teknik İşlemler</h3>
        <p className="mt-2">
          ErayTechs tarafından paylaşılan teknik rehberler (Overclock, Regedit, BIOS vb.) bilgilendirme ve eğitim amaçlıdır.
        </p>
        <ul className="mt-3 list-disc pl-5 space-y-1">
          <li>Bu işlemlerin uygulanması tamamen kullanıcının inisiyatifindedir.</li>
          <li>Olası donanım hasarlarından veya veri kayıplarından ErayTechs sorumlu değildir.</li>
          <li>İşlem yapmadan önce mutlaka yedek almanız önerilir.</li>
        </ul>
      </section>

      {/* KISIM 5: TELİF */}
      <section>
        <h3 className="text-lg font-semibold text-neutral-900">5. Fikri Mülkiyet</h3>
        <p>
          Sitede ve sosyal medya hesaplarında yer alan özgün içeriklerin ticari amaçla izinsiz kopyalanması yasaktır. Ancak, kaynak gösterilerek paylaşım yapılması serbesttir.
        </p>
      </section>
    </div>
  );
}

// === İNGİLİZCE METİN ===
function EnglishLegal() {
  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-lg font-semibold text-neutral-900">1. Publisher & Brand Info</h3>
        <p>
          This website and associated social media channels operate under the <strong>ErayTechs</strong> brand, focusing on technology, software tips, digital services, and content creation. For collaborations, please visit our <a href="/contact" className="text-black underline">contact page</a>.
        </p>
      </section>

      <section className="rounded-xl bg-blue-50 p-5 ring-1 ring-blue-100">
        <h3 className="text-lg font-semibold text-blue-900">2. Collaboration & Selection Policy</h3>
        <p className="mt-2 text-blue-800">
          At ErayTechs, our priority is always <strong>utility, quality, and reliability</strong> in the recommendations we make.
        </p>
        <ul className="mt-3 list-disc pl-5 space-y-2 text-blue-800">
          <li>
            <strong>Selective Approach:</strong> The products, internet campaigns, software, or digital services we promote are those we have pre-reviewed and approved. We do not accept offers that do not meet our standards or could be detrimental to the user.
          </li>
          <li>
            <strong>Trust:</strong> If you see a recommendation or campaign featured on our page, it means it has passed ErayTechs&apos; quality filter and is approved.
          </li>
          <li>
            <strong>Disclosure:</strong> Any content involving financial compensation (Sponsorship) is clearly marked in compliance with platform rules (e.g., #ad, #sponsored).
          </li>
        </ul>
      </section>

      <section className="rounded-xl bg-amber-50 p-5 ring-1 ring-amber-100">
        <h3 className="text-lg font-semibold text-amber-900">3. Limitation of Liability (Important)</h3>
        <p className="mt-2 text-amber-800">
          ErayTechs acts as a media channel, not a product seller or service provider. Therefore:
        </p>
        <ul className="mt-3 list-disc pl-5 space-y-2 text-amber-800">
          <li>
            <strong>Manufacturing & Service Defects:</strong> Responsibility for products arriving <strong>defective, damaged in transit, or containing manufacturing faults</strong>, as well as service interruptions, problems or quality drops, lies entirely with the <strong>manufacturer, seller, or service provider.</strong>
          </li>
          <li>
            <strong>Snapshot in Time:</strong> Reviews reflect our personal experience and test results at the time the content was created. We are not responsible for future changes made by providers.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-neutral-900">4. Technical Disclaimer</h3>
        <p className="mt-2">
          Technical guides (Overclocking, Registry edits, BIOS, etc.) are for educational purposes only.
        </p>
        <ul className="mt-3 list-disc pl-5 space-y-1">
          <li>Application of these methods is at the user&apos;s own risk.</li>
          <li>ErayTechs constitutes no liability for any hardware damage or data loss.</li>
          <li>Users are strongly advised to backup their systems before making critical changes.</li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-neutral-900">5. Intellectual Property</h3>
        <p>
          Unauthorized commercial use of original content is prohibited. Sharing with credit to &quot;ErayTechs&quot; is welcomed.
        </p>
      </section>
    </div>
  );
}