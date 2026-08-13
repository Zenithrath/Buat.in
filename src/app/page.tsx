import Link from "next/link";
import {
  MousePointerClick,
  CreditCard,
  Download,
  FileCode2,
  Lock,
  MonitorSmartphone,
  Sparkles,
} from "lucide-react";

const STEPS = [
  {
    icon: MousePointerClick,
    title: "1. Desain",
    desc: "Seret komponen ke kanvas, ubah teks dan gambar — gratis, tanpa batas waktu.",
  },
  {
    icon: MonitorSmartphone,
    title: "2. Pratinjau",
    desc: "Lihat hasil di desktop, tablet, dan mobile sebelum memutuskan.",
  },
  {
    icon: CreditCard,
    title: "3. Bayar Sekali",
    desc: "Hanya saat Anda mau mengambil source code. Tanpa langganan bulanan.",
  },
  {
    icon: Download,
    title: "4. Unduh ZIP",
    desc: "Dapatkan project HTML/CSS/JS lengkap dengan README dan panduan deploy.",
  },
];

const FEATURES = [
  {
    icon: FileCode2,
    title: "Source Code Asli",
    desc: "Bukan format proprietary. Kode rapi, readable, tanpa runtime tersembunyi — bisa dibuka developer mana pun.",
  },
  {
    icon: Lock,
    title: "No Lock-In",
    desc: "Setelah export, website Anda jalan tanpa Buat.in. Hosting sendiri di mana saja, selamanya.",
  },
  {
    icon: Sparkles,
    title: "Responsive Otomatis",
    desc: "Desain sekali, otomatis rapi di desktop, tablet, dan mobile.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-900">
      <header className="border-b border-zinc-100">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-1.5 font-extrabold tracking-tight">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-xs font-bold text-white">
              B
            </span>
            Buat.in
          </Link>
          <Link
            href="/builder"
            className="rounded-lg bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
          >
            Buka Builder
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 pb-16 pt-20 text-center">
          <p className="mb-4 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
            Design · Export · Own
          </p>
          <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Desain website visual,
            <br />
            <span className="text-blue-600">bayar sekali, miliki kodenya.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-lg leading-relaxed text-zinc-500">
            Drag &amp; drop untuk membuat website Anda. Gratis selama mendesain
            — bayar hanya saat Anda mengunduh source code HTML/CSS/JS yang
            benar-benar Anda miliki.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/builder"
              className="w-full rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-700 sm:w-auto"
            >
              Mulai Mendesain — Gratis
            </Link>
            <Link
              href="/builder"
              className="w-full rounded-xl border border-zinc-200 px-6 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 sm:w-auto"
            >
              Lihat Template Dasar
            </Link>
          </div>
          <p className="mt-4 text-xs text-zinc-400">
            Tanpa kartu kredit · tanpa langganan · tanpa batas waktu
          </p>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-16">
          <div className="overflow-hidden rounded-2xl border border-zinc-200 shadow-xl">
            <div className="flex h-8 items-center gap-1.5 border-b border-zinc-100 bg-zinc-50 px-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-300" />
            </div>
            <div className="bg-white">
              <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-2.5">
                <span className="text-xs font-semibold text-zinc-700">Toko Kita</span>
                <span className="flex items-center gap-2">
                  <span className="hidden text-[10px] text-zinc-400 sm:inline">
                    Komponen: 6 · Estimasi export: Gratis
                  </span>
                  <span className="rounded-md bg-blue-600 px-2.5 py-1 text-[10px] font-semibold text-white">
                    Export
                  </span>
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3">
                {[
                  ["t-9", "t-5/12", "t-7/12", "t-1/2"],
                  ["t-10", "t-6/12", "t-8/12"],
                  ["t-11", "t-5/12"],
                ].map((cols, i) => (
                  <div key={i} className="rounded-lg border border-zinc-100 bg-zinc-50/50 p-3">
                    <div className="mx-auto mb-2 h-16 w-full rounded-md bg-zinc-200/70" />
                    <div className={`mx-auto h-2 w-${cols[0]} rounded bg-zinc-300`} />
                    <div className={`mx-auto mt-1.5 h-2 w-${cols[1] ?? "1/2"} rounded bg-zinc-200`} />
                    <div className={`mx-auto mt-1.5 h-2 w-${cols[2] ?? "1/3"} rounded bg-zinc-200`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-16">
          <h2 className="mb-8 text-center text-2xl font-bold tracking-tight">
            Cara kerjanya
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <div
                key={step.title}
                className="rounded-xl border border-zinc-100 bg-zinc-50/50 p-5"
              >
                <step.icon className="mb-3 text-blue-600" size={22} />
                <h3 className="text-sm font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-500">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-20">
          <h2 className="mb-8 text-center text-2xl font-bold tracking-tight">
            Bedanya dengan yang lain
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="rounded-xl border border-zinc-100 p-5">
                <feature.icon className="mb-3 text-blue-600" size={22} />
                <h3 className="text-sm font-semibold">{feature.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-500">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-zinc-900 px-4 py-14 text-center text-white">
          <h2 className="text-2xl font-bold tracking-tight">
            Siap membuat website Anda?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">
            Gratis mendesain sekarang — bayar hanya jika Anda ingin mengambil
            source code-nya.
          </p>
          <Link
            href="/builder"
            className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
          >
            Buka Builder
          </Link>
        </section>
      </main>

      <footer className="border-t border-zinc-100 py-6 text-center text-xs text-zinc-400">
        Buat.in — Visual Website Builder · V0 Engineering Prototype
      </footer>
    </div>
  );
}