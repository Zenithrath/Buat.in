import Link from "next/link";
import {
  ArrowRight,
  Check,
  Download,
  FileCode2,
  Globe,
  GripVertical,
  Mail,
  MessageCircle,
  Play,
  Plus,
  Send,
  Zap,
} from "lucide-react";

const STATS = [
  { value: "6+", label: "Komponen siap pakai" },
  { value: "100%", label: "Gratis mendesain" },
  { value: "0", label: "Lock-in setelah export" },
];

const HOW_POINTS = [
  "6 komponen siap pakai: navbar, hero, produk, tentang, ajakan, dan footer",
  "Edit teks, gambar, dan warna langsung di kanvas — tanpa menulis kode",
  "Pratinjau instan di desktop, tablet, dan mobile sebelum export",
];

const FEATURE_POINTS = [
  "HTML, CSS, dan JavaScript murni — tanpa runtime tersembunyi",
  "Kode rapi dan mudah dibaca, siap dikustomisasi developer mana pun",
  "Hosting di mana saja: Vercel, Netlify, atau hosting apa pun",
];

const CODE_SNIPPET = `<section class="bi-hero">
  <h1 class="bi-hero-title">Toko Kita</h1>
  <p>Desain sekali, miliki selamanya.</p>
  <a class="bi-btn" href="/produk">Lihat Produk</a>
</section>`;

const COMPONENT_NAMES = [
  "Navbar Minimal",
  "Hero Centered",
  "Grid Produk",
  "Tentang",
  "Ajakan",
  "Footer",
];

const PLANS = [
  {
    name: "Kreator",
    price: "Gratis",
    suffix: "selamanya",
    desc: "Untuk mencoba dan mendesain tanpa batas.",
    features: [
      "Akses semua 6 komponen",
      "Kanvas drag & drop penuh",
      "Pratinjau desktop, tablet, mobile",
      "Simpan otomatis di browser",
    ],
    cta: "Mulai Gratis",
    featured: false,
  },
  {
    name: "Sekali Bayar",
    price: "Rp 199rb",
    suffix: "sekali, selamanya",
    desc: "Bayar satu kali saat export — source code milik Anda.",
    features: [
      "Semua fitur Kreator",
      "Export HTML/CSS/JS + ZIP",
      "Panduan deploy lengkap",
      "Tanpa langganan bulanan",
    ],
    cta: "Export Sekarang",
    featured: true,
  },
  {
    name: "Studio",
    price: "Rp 499rb",
    suffix: "sekali",
    desc: "Untuk tim dan kebutuhan produksi.",
    features: [
      "Export tanpa batas project",
      "Dukungan prioritas",
      "Request komponen baru",
      "Lisensi komersial",
    ],
    cta: "Hubungi Kami",
    featured: false,
  },
];

const FAQS = [
  {
    q: "Apakah Buat.in benar-benar gratis?",
    a: "Ya. Mendesain, menyimpan, dan mempratinjau semuanya gratis tanpa batas waktu. Anda hanya membayar sekali saat memutuskan untuk mengambil source code hasil export.",
  },
  {
    q: "Apa yang saya dapatkan saat export?",
    a: "ZIP berisi index.html, CSS, JavaScript, README, panduan deploy, dan lisensi — kode murni yang bisa dibuka dan diedit di editor apa pun.",
  },
  {
    q: "Bisakah website hasil export di-hosting sendiri?",
    a: "Bisa. Tidak ada lock-in — hasil export berdiri sendiri tanpa Buat.in, jadi bisa dihosting di Vercel, Netlify, GitHub Pages, atau hosting mana pun.",
  },
  {
    q: "Apakah ada langganan bulanan?",
    a: "Tidak. Model kami bayar sekali saat export. Tidak ada biaya berulang, tidak ada biaya tersembunyi.",
  },
  {
    q: "Kapan export React tersedia?",
    a: "Sedang dalam pengerjaan (roadmap V0.7). Untuk sekarang, export HTML/CSS/JS murni yang cepat dan mudah di-deploy.",
  },
];

const FOOTER_COLS = [
  { title: "Produk", links: ["Builder", "Komponen", "Template", "Harga"] },
  { title: "Sumber", links: ["Dokumentasi", "Panduan Deploy", "Blog", "Changelog"] },
  { title: "Perusahaan", links: ["Tentang", "Kontak", "Karier", "Legal"] },
];

function Logo() {
  return (
    <Link href="/" className="text-lg font-extrabold tracking-tight text-zinc-900">
      Buat<span className="text-green-500">.</span>in
    </Link>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1 text-xs font-bold text-green-700">
      {children}
    </span>
  );
}

function CheckBullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/15">
        <Check size={13} strokeWidth={3} className="text-green-600" />
      </span>
      <span className="text-[15px] leading-relaxed text-zinc-600">{children}</span>
    </li>
  );
}

function BrowserChrome({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1.5 border-b border-zinc-100 px-4 py-3">
      <span className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
      <span className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
      <span className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
      <div className="ml-2 flex h-6 flex-1 items-center rounded-md bg-zinc-100 px-2 text-[10px] text-zinc-400">
        buat.in/builder/{label}
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-zinc-900">
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Logo />
          <nav className="hidden items-center gap-7 text-sm font-medium text-zinc-600 md:flex">
            <a href="#cara-kerja" className="transition-colors hover:text-zinc-900">
              Cara Kerja
            </a>
            <a href="#fitur" className="transition-colors hover:text-zinc-900">
              Fitur
            </a>
            <a href="#harga" className="transition-colors hover:text-zinc-900">
              Harga
            </a>
            <a href="#faq" className="transition-colors hover:text-zinc-900">
              FAQ
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/builder"
              className="hidden rounded-full border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 sm:inline-block"
            >
              Template Dasar
            </Link>
            <Link
              href="/builder"
              className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
            >
              Buka Builder
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-cream px-4 py-16 sm:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
            <div>
              <Pill>
                <Zap size={12} className="fill-current" />
                Gratis mendesain · bayar saat export
              </Pill>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-[56px]">
                Semua kebutuhan website Anda tersedia di{" "}
                <span className="whitespace-nowrap">
                  Buat<span className="text-green-500">.</span>in
                </span>{" "}
                ⚡
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-zinc-500 sm:text-lg">
                Drag &amp; drop untuk membangun halaman toko, portofolio, atau
                profil bisnis. Gratis selama mendesain — bayar sekali saat Anda
                mengambil source code-nya.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/builder"
                  className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-zinc-700"
                >
                  Mulai Mendesain — Gratis
                  <ArrowRight size={15} />
                </Link>
                <Link
                  href="#cara-kerja"
                  className="inline-flex items-center gap-2.5 rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100">
                    <Play size={10} className="fill-current" />
                  </span>
                  Lihat Cara Kerja
                </Link>
              </div>
              <div className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-zinc-200 pt-6">
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-[11px] font-medium leading-tight text-zinc-500 sm:text-xs">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <svg
                width="150"
                height="96"
                viewBox="0 0 150 96"
                fill="none"
                className="pointer-events-none absolute -top-12 -left-2 z-10 hidden lg:block"
              >
                <path
                  d="M10 10 C 38 4, 64 18, 60 36 C 56 54, 34 60, 20 52"
                  stroke="#a1a1aa"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M22 46 L 15 54 L 25 55"
                  stroke="#a1a1aa"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <text x="34" y="70" fontSize="11" fontWeight="700" fill="#a1a1aa">
                  Kode asli,
                </text>
                <text x="38" y="86" fontSize="11" fontWeight="700" fill="#a1a1aa">
                  milik Anda
                </text>
              </svg>

              <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl shadow-zinc-900/15">
                <BrowserChrome label="toko-kita" />
                <div className="space-y-2.5 p-4">
                  <div className="flex items-center justify-between rounded-xl bg-zinc-50 px-3 py-2">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold">
                      <span className="flex h-4 w-4 items-center justify-center rounded bg-zinc-900 text-[7px] font-extrabold text-white">
                        B
                      </span>
                      Toko Kita
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="h-1.5 w-8 rounded-full bg-zinc-200" />
                      <span className="h-1.5 w-8 rounded-full bg-zinc-200" />
                      <span className="h-4 w-9 rounded-full bg-zinc-900" />
                    </div>
                  </div>
                  <div className="flex flex-col items-center rounded-xl bg-zinc-50 px-3 py-4 text-center">
                    <span className="h-2 w-40 rounded-full bg-zinc-700/80" />
                    <span className="mt-1.5 h-2 w-28 rounded-full bg-zinc-300" />
                    <div className="mt-2.5 flex items-center gap-1.5">
                      <span className="h-4 w-14 rounded-full bg-zinc-900" />
                      <span className="h-4 w-14 rounded-full border border-zinc-300 bg-white" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="rounded-lg bg-zinc-50 p-1.5">
                        <div className="mb-1 h-10 w-full rounded-md bg-zinc-200/80" />
                        <div className="mx-auto h-1.5 w-3/4 rounded-full bg-zinc-300" />
                        <div className="mx-auto mt-1 h-1.5 w-1/2 rounded-full bg-zinc-200" />
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl bg-zinc-900 px-3 py-2">
                    <div className="mx-auto h-1.5 w-24 rounded-full bg-zinc-400/60" />
                  </div>
                </div>
              </div>

              <div className="absolute -right-3 -top-5 flex items-center gap-2 rounded-full bg-zinc-900 px-3.5 py-2 text-[11px] font-semibold text-white shadow-lg">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500">
                  <Check size={10} strokeWidth={4} className="text-zinc-900" />
                </span>
                Export selesai · ZIP
              </div>

              <div className="absolute -bottom-5 -left-4 flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-2 text-[11px] font-semibold text-zinc-700 shadow-lg">
                <FileCode2 size={13} className="text-green-600" />
                index.html · 4,2 KB
              </div>
            </div>
          </div>
        </section>

        <section className="bg-zinc-900 px-4 py-10">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Dibangun dengan teknologi modern
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {["HTML5", "CSS3", "JavaScript", "Next.js", "Tailwind CSS", "JSZip"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="text-sm font-extrabold uppercase tracking-wide text-zinc-400 transition-colors hover:text-white"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-14 sm:py-16">
          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-zinc-900 p-8 text-white sm:p-10">
              <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                Coba Buat.in sekarang, gratis! 👋
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-400">
                Tanpa kartu kredit, tanpa langganan bulanan, tanpa batas waktu.
                Desain sepuasnya sampai Anda puas.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/builder"
                  className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-zinc-900 transition-colors hover:bg-zinc-200"
                >
                  Buka Builder
                </Link>
                <Link
                  href="#fitur"
                  className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-zinc-300 transition-colors hover:bg-zinc-800"
                >
                  Lihat Fitur
                </Link>
              </div>
            </div>
            <div className="rounded-3xl bg-zinc-900 p-8 text-white sm:p-10">
              <div className="flex flex-wrap gap-2">
                {["HTML", "CSS", "JS", "ZIP"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-green-500/15 px-2.5 py-1 text-[11px] font-extrabold text-green-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl">
                Bayar sekali, kode selamanya 📦
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-400">
                Satu pembayaran saat export — dapatkan source code lengkap,
                readable, dan bebas dipakai selamanya.
              </p>
              <Link
                href="#harga"
                className="mt-7 inline-flex items-center gap-1.5 rounded-full bg-green-500 px-5 py-2.5 text-sm font-bold text-zinc-900 transition-colors hover:bg-green-400"
              >
                Lihat Harga
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        <section id="cara-kerja" className="scroll-mt-20 bg-cream px-4 py-16 sm:py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
            <div className="order-2 rounded-3xl border border-zinc-200 bg-white p-4 shadow-xl shadow-zinc-900/5 lg:order-1">
              <div className="mb-3 flex items-center justify-between px-1">
                <span className="text-xs font-extrabold text-zinc-800">
                  Halaman: Beranda
                </span>
                <span className="text-[10px] font-medium text-zinc-400">
                  6 komponen
                </span>
              </div>
              <div className="space-y-1.5">
                {COMPONENT_NAMES.map((name, i) => (
                  <div
                    key={name}
                    className="flex items-center gap-2.5 rounded-xl border border-zinc-100 bg-white px-3 py-2 shadow-sm"
                  >
                    <GripVertical size={14} className="text-zinc-300" />
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-100 text-[9px] font-extrabold text-zinc-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-xs font-medium text-zinc-700">
                      {name}
                    </span>
                    <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-green-600">
                      Siap
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <Pill>✦ Cara kerja</Pill>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                Seret &amp; letakkan komponen, hasilnya langsung terlihat
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-zinc-500">
                Susun halaman seperti menyusun lego — tanpa menulis satu baris
                kode pun. Semua perubahan terlihat langsung di kanvas.
              </p>
              <ul className="mt-6 space-y-3.5">
                {HOW_POINTS.map((point) => (
                  <CheckBullet key={point}>{point}</CheckBullet>
                ))}
              </ul>
              <Link
                href="/builder"
                className="mt-7 inline-flex items-center gap-1.5 text-sm font-bold text-zinc-900 underline-offset-4 hover:underline"
              >
                Lihat semua komponen
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        <section id="fitur" className="scroll-mt-20 bg-white px-4 py-16 sm:py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
            <div>
              <Pill>Fitur unggulan</Pill>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                Kode asli yang benar-benar Anda miliki
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-zinc-500">
                Hasil export bukan format proprietary. Ini HTML, CSS, dan
                JavaScript murni yang bisa dibuka siapa pun, diedit apa pun,
                dan dihosting di mana pun.
              </p>
              <ul className="mt-6 space-y-3.5">
                {FEATURE_POINTS.map((point) => (
                  <CheckBullet key={point}>{point}</CheckBullet>
                ))}
              </ul>
              <Link
                href="/builder"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-green-500 px-5 py-2.5 text-sm font-bold text-zinc-900 transition-colors hover:bg-green-400"
              >
                <Download size={14} />
                Coba Langsung
              </Link>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl bg-zinc-900 shadow-2xl shadow-zinc-900/20">
                <div className="flex items-center gap-1.5 border-b border-zinc-800 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                  <div className="ml-2 flex h-6 flex-1 items-center rounded-md bg-zinc-800 px-2 text-[10px] text-zinc-500">
                    index.html
                  </div>
                  <span className="rounded-full bg-green-500/15 px-2 py-0.5 text-[9px] font-extrabold text-green-400">
                    HTML
                  </span>
                </div>
                <pre className="overflow-x-auto p-5 text-[12px] leading-relaxed text-zinc-300">
                  <code>{CODE_SNIPPET}</code>
                </pre>
              </div>
              <div className="absolute -bottom-4 -right-2 flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-2 text-[11px] font-semibold text-zinc-700 shadow-lg">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500">
                  <Check size={10} strokeWidth={4} className="text-zinc-900" />
                </span>
                Valid · W3C-ready
              </div>
            </div>
          </div>
        </section>

        <section id="harga" className="scroll-mt-20 bg-cream px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-xl text-center">
              <Pill>Harga</Pill>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                Harga yang transparan, bayar sekali 👍
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-zinc-500">
                Gratis selama mendesain. Bayar hanya saat Anda mengambil source
                code — tanpa kejutan, tanpa biaya bulanan.
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {PLANS.map((plan) => (
                <div
                  key={plan.name}
                  className={
                    plan.featured
                      ? "relative flex flex-col rounded-3xl bg-zinc-900 p-7 text-white shadow-2xl shadow-zinc-900/25"
                      : "relative flex flex-col rounded-3xl border border-zinc-200 bg-white p-7"
                  }
                >
                  {plan.featured ? (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-green-500 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide text-zinc-900">
                      Paling populer
                    </span>
                  ) : null}
                  <h3
                    className={
                      plan.featured
                        ? "text-sm font-bold text-zinc-300"
                        : "text-sm font-bold text-zinc-500"
                    }
                  >
                    {plan.name}
                  </h3>
                  <div className="mt-3 flex items-baseline gap-1.5">
                    <span className="text-3xl font-extrabold tracking-tight">
                      {plan.price}
                    </span>
                    <span
                      className={
                        plan.featured
                          ? "text-xs text-zinc-400"
                          : "text-xs text-zinc-400"
                      }
                    >
                      {plan.suffix}
                    </span>
                  </div>
                  <p
                    className={
                      plan.featured
                        ? "mt-2 text-[13px] leading-relaxed text-zinc-400"
                        : "mt-2 text-[13px] leading-relaxed text-zinc-500"
                    }
                  >
                    {plan.desc}
                  </p>
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <span
                          className={
                            plan.featured
                              ? "mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-green-500/20"
                              : "mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-green-500/15"
                          }
                        >
                          <Check
                            size={11}
                            strokeWidth={3.5}
                            className={
                              plan.featured ? "text-green-400" : "text-green-600"
                            }
                          />
                        </span>
                        <span
                          className={
                            plan.featured
                              ? "text-[13px] leading-relaxed text-zinc-300"
                              : "text-[13px] leading-relaxed text-zinc-600"
                          }
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/builder"
                    className={
                      plan.featured
                        ? "mt-7 rounded-full bg-green-500 px-5 py-2.5 text-center text-sm font-bold text-zinc-900 transition-colors hover:bg-green-400"
                        : "mt-7 rounded-full bg-zinc-900 px-5 py-2.5 text-center text-sm font-bold text-white transition-colors hover:bg-zinc-700"
                    }
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-xs text-zinc-400">
              Harga indikatif — pembayaran hadir di rilis berikutnya. Untuk
              sekarang, export gratis.
            </p>
          </div>
        </section>

        <section id="faq" className="scroll-mt-20 bg-white px-4 py-16 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_1.4fr]">
            <div>
              <Pill>FAQ</Pill>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                Pertanyaan yang sering ditanyakan
              </h2>
              <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-zinc-500">
                Tidak menemukan jawaban? Hubungi kami — kami membalas cepat.
              </p>
              <div className="mt-7 flex items-center gap-4 rounded-3xl border border-zinc-200 bg-cream p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-zinc-900 text-white">
                  <Mail size={18} />
                </span>
                <div>
                  <p className="text-sm font-extrabold text-zinc-900">
                    Butuh bantuan?
                  </p>
                  <a
                    href="mailto:halo@buat.in"
                    className="text-sm text-zinc-500 underline underline-offset-2 hover:text-zinc-900"
                  >
                    halo@buat.in
                  </a>
                </div>
              </div>
            </div>
            <div className="divide-y divide-zinc-200 border-y border-zinc-200">
              {FAQS.map((faq) => (
                <details key={faq.q} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
                    <span className="text-[15px] font-bold text-zinc-900">
                      {faq.q}
                    </span>
                    <Plus
                      size={18}
                      className="shrink-0 text-zinc-400 transition-transform duration-200 group-open:rotate-45"
                    />
                  </summary>
                  <p className="pb-5 text-sm leading-relaxed text-zinc-500">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-zinc-900 px-4 py-16 text-center text-white sm:py-20">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            Siap membuat website impian Anda?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-400">
            Gratis mendesain sekarang — bayar hanya jika Anda ingin mengambil
            source code-nya.
          </p>
          <Link
            href="/builder"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-zinc-900 transition-colors hover:bg-zinc-200"
          >
            Buka Builder — Gratis
            <ArrowRight size={15} />
          </Link>
        </section>
      </main>

      <footer className="bg-zinc-950 px-4 py-14 text-zinc-400">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="text-lg font-extrabold tracking-tight text-white">
              Buat<span className="text-green-500">.</span>in
            </Link>
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-zinc-500">
              Desain website visual, bayar sekali, miliki kodenya. Tanpa
              lock-in, tanpa langganan.
            </p>
          </div>
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-zinc-300">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[13px] transition-colors hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-6 text-xs sm:flex-row">
          <span>© 2026 Buat.in — Visual Website Builder · V0 Prototype</span>
          <span>Dibuat dengan ❤️ di Indonesia</span>
          <div className="flex items-center gap-2">
            {[
              { icon: Globe, label: "Situs" },
              { icon: Send, label: "Email" },
              { icon: MessageCircle, label: "Chat" },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-white"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}