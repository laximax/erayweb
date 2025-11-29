import Link from "next/link";

export default function Thanks() {
  return (
    <main className="min-h-[60vh] grid place-items-center bg-neutral-50 px-6">
      <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-semibold">Teşekkürler! 🎉</h1>
        <p className="mt-2 text-neutral-600">
          Mesajın bize ulaştı. En kısa sürede dönüş yapacağız.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-black px-5 py-2.5 text-white transition hover:bg-black/90"
        >
          Ana sayfaya dön
        </Link>
      </div>
    </main>
  );
}
