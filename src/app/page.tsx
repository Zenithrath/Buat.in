import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Globe,
  Mail,
  MessageCircle,
  Send,
} from "lucide-react";
import { Reveal } from "@/components/landing/Reveal";

const NAV_LINKS = [
  { href: "#cara-kerja", label: "Cara Kerja" },
  { href: "#layanan", label: "Layanan" },
  { href: "#harga", label: "Harga" },
  { href: "#faq", label: "FAQ" },
];

const SERVICES = [
  {
    title: "Drag & Drop",
    desc: "Seret komponen dari panel kiri ke kanvas dan susun halaman seperti menyusun lego — tanpa satu baris kode pun.",
  },
  {
    title: "Edit di Tempat",
    desc: "Klik teks, gambar, dan warna lalu ubah langsung di kanvas. Semua perubahan terlihat seketika.",
  },
  {
    title: "Pratinjau Responsive",
    desc: "Cek hasil di desktop, tablet, dan mobile. Setiap breakpoint punya kontrol sendiri.",
  },
  {
    title: "Export HTML/CSS/JS",
    desc: "Source code murni milik Anda selamanya — tanpa runtime tersembunyi, siap di-host di mana pun.",
  },
];

const STEPS = [
  {
    title: "Seret & Letakkan",
    desc: "Pilih komponen dari panel, seret ke kanvas, dan susun halaman seperti menyusun lego — tanpa menulis satu baris kode pun.",
  },
  {
    title: "Ubah & Atur",
    desc: "Klik teks, gambar, dan warna lalu ubah langsung di kanvas. Semua perubahan terlihat seketika.",
  },
  {
    title: "Preview & Export",
    desc: "Cek hasil di desktop, tablet, dan mobile, lalu export HTML/CSS/JS — kode asli milik Anda selamanya.",
  },
];

const MID_STATS = [
  { value: "6+", label: "Komponen siap pakai" },
  { value: "3", label: "Breakpoint responsive" },
  { value: "100%", label: "Gratis mendesain" },
  { value: "0", label: "Lock-in setelah export" },
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
    <Link href="/" className="font-anton text-xl uppercase tracking-[0.02em] text-paper">
      Buat<span className="text-cobalt">.in</span>
    </Link>
  );
}

function SectionHeader({
  index,
  label,
  dark = true,
}: {
  index: string;
  label: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline gap-4 border-b pb-6 sm:pb-8 ${
        dark ? "border-line-dark" : "border-line"
      }`}
    >
      <span className={`meta-label ${dark ? "text-cobalt" : "text-cobalt-ink"}`}>
        / {index}
      </span>
      <span className={`meta-label ${dark ? "text-muted-ink-dark" : "text-muted-ink"}`}>
        {label}
      </span>
      <span aria-hidden className={`h-px flex-1 self-center ${dark ? "bg-line-dark" : "bg-line"}`} />
    </div>
  );
}

function MonoButtonLink({
  href,
  children,
  variant = "ghost",
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "pink" | "ghost";
  external?: boolean;
}) {
  const base =
    "group/btn inline-flex items-center gap-2.5 font-jbmono text-[0.6875rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300";
  const style =
    variant === "pink"
      ? "bg-cobalt px-6 py-3 text-ink hover:bg-cobalt-deep hover:text-paper"
      : "border border-line-dark px-6 py-3 text-paper hover:border-cobalt hover:text-cobalt";
  return (
    <Link href={href} className={`${base} ${style}`} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
      {children}
      <ArrowRight
        size={14}
        aria-hidden
        className="transition-transform duration-300 group-hover/btn:translate-x-1"
      />
    </Link>
  );
}

function GridPattern({ id }: { id: string }) {
  return (
    <svg aria-hidden className="absolute inset-0 h-full w-full text-current opacity-[0.03]">
      <defs>
        <pattern id={id} width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-ink font-sans text-paper">
      {/* ─── Header ─────────────────────────── */}
      <header className="site-header sticky top-0 z-50 h-16 border-b border-line-dark bg-ink text-paper">
        <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Logo />
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="meta-label text-muted-ink-dark transition-colors duration-300 hover:text-cobalt"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <Link
            href="/builder"
            className="meta-label bg-cobalt px-5 py-3 text-ink transition-colors duration-300 hover:bg-cobalt-deep hover:text-paper"
          >
            Buka Builder
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* ─── Hero ──────────────────────────── */}
        <section className="relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-ink text-paper">
          <GridPattern id="bi-grid-hero" />
          <div className="relative mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-5 pb-24 pt-28 sm:px-8 sm:pt-32 lg:px-12">
            <p className="hero-item meta-label text-cobalt" style={{ animationDelay: "0.2s" }}>
              / Visual Website Builder
            </p>
            <h1 className="mt-6 font-anton text-[clamp(2.25rem,8vw,5.5rem)] uppercase leading-[0.95] tracking-[0.01em]">
              <span className="block overflow-hidden">
                <span className="word-reveal block" style={{ animationDelay: "0.36s" }}>
                  Desain website visual,
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="word-reveal block" style={{ animationDelay: "0.46s" }}>
                  bayar sekali,
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="word-reveal flex flex-wrap items-baseline gap-x-3" style={{ animationDelay: "0.56s" }}>
                  miliki
                  <span className="relative mt-2 inline-block bg-cobalt px-3 text-ink sm:mt-0">
                    kodenya.
                  </span>
                </span>
              </span>
            </h1>
            <p
              className="hero-item mt-8 max-w-xl text-sm leading-relaxed text-muted-ink-dark sm:text-base"
              style={{ animationDelay: "0.68s" }}
            >
              Drag &amp; drop untuk membuat website Anda. Gratis selama
              mendesain — bayar hanya saat Anda mengunduh source code
              HTML/CSS/JS yang benar-benar Anda miliki.
            </p>
            <div className="hero-item mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: "0.8s" }}>
              <MonoButtonLink href="/builder" variant="pink">
                Mulai Mendesain — Gratis
              </MonoButtonLink>
              <MonoButtonLink href="#cara-kerja">Lihat Cara Kerja</MonoButtonLink>
            </div>
          </div>
        </section>

        {/* ─── 01 Layanan ────────────────────── */}
        <section
          id="layanan"
          className="scroll-mt-16 border-t border-line-dark bg-ink-2 py-24 text-paper sm:py-32"
        >
          <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <SectionHeader index="01" label="Layanan" />
            <Reveal>
              <div className="divide-y divide-line-dark border-b border-line-dark">
                {SERVICES.map((service, i) => (
                  <div
                    key={service.title}
                    className="group grid grid-cols-12 items-baseline gap-x-4 py-7 sm:py-8"
                  >
                    <span className="meta-label text-cobalt sm:col-span-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="col-span-12 mt-3 font-anton text-2xl uppercase leading-[0.95] tracking-[0.01em] transition-colors duration-300 group-hover:text-cobalt sm:col-span-5 sm:mt-0 sm:text-3xl lg:text-4xl">
                      {service.title}
                    </h3>
                    <p className="col-span-12 mt-3 text-sm leading-relaxed text-muted-ink-dark sm:col-span-6 sm:col-start-7 sm:mt-0">
                      {service.desc}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─── 02 Cara Kerja ─────────────────── */}
        <section
          id="cara-kerja"
          className="scroll-mt-16 bg-ivory py-24 text-ink-text sm:py-32"
          style={{ clipPath: "polygon(0 4%, 100% 0, 100% 100%, 0 100%)" }}
        >
          <div className="mx-auto w-full max-w-[1440px] px-5 pb-4 pt-16 sm:px-8 sm:pt-24 lg:px-12">
            <SectionHeader index="02" label="Cara Kerja" dark={false} />
            <Reveal>
              <div className="mt-12 divide-y divide-line">
                {STEPS.map((step, i) => (
                  <div
                    key={step.title}
                    className="group grid grid-cols-12 items-baseline gap-x-4 py-8 sm:py-9"
                  >
                    <span className="meta-label text-muted-ink sm:col-span-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="col-span-12 mt-3 font-anton text-2xl uppercase leading-[0.95] tracking-[0.01em] transition-colors duration-300 group-hover:text-cobalt-ink sm:col-span-5 sm:mt-0 sm:text-3xl lg:text-4xl">
                      {step.title}
                    </h3>
                    <p className="col-span-12 mt-3 text-sm leading-relaxed text-muted-ink sm:col-span-6 sm:col-start-7 sm:mt-0">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-16 grid grid-cols-2 gap-x-4 gap-y-10 border-t border-line pt-10 lg:grid-cols-4">
                {MID_STATS.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-anton text-4xl uppercase leading-[0.95] tracking-[0.01em] sm:text-5xl">
                      {stat.value}
                    </p>
                    <p className="meta-label mt-3 text-muted-ink">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─── 03 Hasil Export ───────────────── */}
        <section className="bg-cream py-24 text-ink-text sm:py-32">
          <div className="mx-auto grid w-full max-w-[1440px] items-start gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12">
            <div className="lg:col-span-5">
              <SectionHeader index="03" label="Hasil Export" dark={false} />
              <Reveal>
                <h2 className="mt-8 font-anton text-4xl uppercase leading-[0.95] tracking-[0.01em] sm:text-5xl lg:text-6xl">
                  Kode asli yang benar-benar Anda miliki
                </h2>
                <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-ink sm:text-base">
                  Hasil export bukan format proprietary. Ini HTML, CSS, dan
                  JavaScript murni yang bisa dibuka siapa pun, diedit apa pun,
                  dan dihosting di mana pun.
                </p>
                <ul className="mt-8 space-y-4">
                  {FEATURE_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-1.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center bg-cobalt">
                        <Check size={10} strokeWidth={4} className="text-paper" />
                      </span>
                      <span className="text-sm leading-relaxed text-muted-ink">{point}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/builder"
                  className="group/btn mt-10 inline-flex items-center gap-2.5 font-jbmono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-ink-text transition-colors duration-300 hover:text-cobalt-ink"
                >
                  Coba Langsung
                  <ArrowUpRight
                    size={14}
                    aria-hidden
                    className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                  />
                </Link>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-7">
              <div className="border border-line bg-ink">
                <div className="flex items-center gap-1.5 border-b border-line-dark px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-paper/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-paper/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-paper/15" />
                  <span className="ml-3 font-jbmono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-ink-dark">
                    index.html
                  </span>
                  <span className="ml-auto bg-cobalt px-2 py-1 font-jbmono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-ink">
                    HTML
                  </span>
                </div>
                <pre className="overflow-x-auto p-6 text-[12.5px] leading-relaxed text-paper/80 sm:p-8">
                  <code>{CODE_SNIPPET}</code>
                </pre>
                <div className="flex items-center justify-between border-t border-line-dark px-4 py-3">
                  <span className="meta-label text-muted-ink-dark">Buat.in</span>
                  <span className="meta-label flex items-center gap-2 text-cobalt-ink">
                    <span className="h-1.5 w-1.5 bg-cobalt" aria-hidden />
                    Valid · W3C-ready
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─── 04 Harga ──────────────────────── */}
        <section
          id="harga"
          className="scroll-mt-16 border-t border-line-dark bg-ink-2 py-24 text-paper sm:py-32"
          style={{ clipPath: "polygon(0 0, 100% 3%, 100% 100%, 0 100%)" }}
        >
          <div className="mx-auto w-full max-w-[1440px] px-5 pb-4 pt-16 sm:px-8 sm:pt-24 lg:px-12">
            <SectionHeader index="04" label="Harga" />
            <Reveal>
              <h2 className="mt-8 max-w-3xl font-anton text-4xl uppercase leading-[0.95] tracking-[0.01em] sm:text-5xl lg:text-6xl">
                Harga transparan, bayar sekali
              </h2>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-ink-dark sm:text-base">
                Gratis selama mendesain. Bayar hanya saat Anda mengambil source
                code — tanpa kejutan, tanpa biaya bulanan.
              </p>
            </Reveal>
            <div className="mt-14 grid gap-x-10 gap-y-14 md:grid-cols-3">
              {PLANS.map((plan, i) => (
                <Reveal key={plan.name} delay={i * 0.08}>
                  <div
                    className={
                      plan.featured
                        ? "relative flex h-full flex-col border border-cobalt bg-cobalt/[0.06] p-8"
                        : "relative flex h-full flex-col border border-line-dark p-8"
                    }
                  >
                    {plan.featured ? (
                      <span className="absolute -top-3.5 left-8 bg-cobalt px-2.5 py-1 meta-label text-ink">
                        Paling populer
                      </span>
                    ) : null}
                    <p className="meta-label text-muted-ink-dark">{plan.name}</p>
                    <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-anton text-5xl uppercase leading-[0.95] tracking-[0.01em]">
                        {plan.price}
                      </span>
                      <span className="meta-label text-muted-ink-dark">{plan.suffix}</span>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted-ink-dark">
                      {plan.desc}
                    </p>
                    <ul className="mt-8 flex-1 space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-cobalt" aria-hidden />
                          <span className="text-[13px] leading-relaxed text-muted-ink-dark">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/builder"
                      className={`group/btn mt-10 inline-flex items-center justify-between gap-2.5 border-t pt-5 font-jbmono text-[0.6875rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300 ${
                        plan.featured
                          ? "border-cobalt text-cobalt hover:text-cobalt-deep"
                          : "border-line-dark text-paper hover:text-cobalt"
                      }`}
                    >
                      {plan.cta}
                      <ArrowRight
                        size={14}
                        aria-hidden
                        className="transition-transform duration-300 group-hover/btn:translate-x-1"
                      />
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.1}>
              <p className="mt-12 border-t border-line-dark pt-6 meta-label text-muted-ink-dark">
                Harga indikatif — pembayaran hadir di rilis berikutnya. Untuk
                sekarang, export gratis.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ─── 05 FAQ ────────────────────────── */}
        <section id="faq" className="scroll-mt-16 bg-cream py-24 text-ink-text sm:py-32">
          <div className="mx-auto grid w-full max-w-[1440px] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12">
            <div className="lg:col-span-5">
              <SectionHeader index="05" label="FAQ" dark={false} />
              <Reveal>
                <h2 className="mt-8 font-anton text-4xl uppercase leading-[0.95] tracking-[0.01em] sm:text-5xl">
                  Pertanyaan yang sering ditanyakan
                </h2>
                <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-ink sm:text-base">
                  Tidak menemukan jawaban? Hubungi kami — kami membalas cepat.
                </p>
                <div className="mt-10 border border-line p-6">
                  <p className="meta-label text-muted-ink">Butuh bantuan?</p>
                  <a
                    href="mailto:halo@buat.in"
                    className="mt-3 block font-jbmono text-sm tracking-[0.02em] text-ink-text underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-cobalt-ink hover:decoration-cobalt-ink"
                  >
                    halo@buat.in
                  </a>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-7">
              <div className="divide-y divide-line border-b border-line">
                {FAQS.map((faq, i) => (
                  <details key={faq.q} className="group">
                    <summary className="flex cursor-pointer list-none items-baseline gap-4 py-6 sm:py-7 [&::-webkit-details-marker]:hidden">
                      <span className="meta-label text-cobalt-ink">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 text-[15px] font-medium leading-snug">
                        {faq.q}
                      </span>
                      <span
                        aria-hidden
                        className="font-jbmono text-lg leading-none text-muted-ink transition-transform duration-200 group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="pb-7 pl-9 text-sm leading-relaxed text-muted-ink">{faq.a}</p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─── CTA ───────────────────────────── */}
        <section className="relative overflow-hidden border-t border-line-dark bg-ink py-28 text-paper sm:py-36">
          <GridPattern id="bi-grid-cta" />
          <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <Reveal>
              <h2 className="max-w-5xl font-anton text-[clamp(2.75rem,7.5vw,7.5rem)] uppercase leading-[0.95] tracking-[0.01em]">
                Siap membuat website impian Anda?
              </h2>
              <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-ink-dark sm:text-base">
                Gratis mendesain sekarang — bayar hanya jika Anda ingin
                mengambil source code-nya.
              </p>
              <div className="mt-12 flex flex-wrap items-center gap-8">
                <MonoButtonLink href="/builder" variant="pink">
                  Buka Builder — Gratis
                </MonoButtonLink>
                <a
                  href="mailto:halo@buat.in"
                  className="group/btn inline-flex items-center gap-2.5 font-jbmono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-paper underline decoration-paper/40 underline-offset-4 transition-colors duration-300 hover:text-cobalt hover:decoration-cobalt"
                >
                  halo@buat.in
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ─── Footer ─────────────────────────── */}
      <footer className="border-t border-line-dark bg-ink text-paper">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-12 gap-x-4 gap-y-12 px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="col-span-12 lg:col-span-5">
            <Logo />
            <p className="meta-label mt-3 text-muted-ink-dark">Visual Website Builder</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-ink-dark">
              Desain website visual, bayar sekali, miliki kodenya. Tanpa
              lock-in, tanpa langganan.
            </p>
          </div>
          {FOOTER_COLS.map((col) => (
            <div key={col.title} className="col-span-6 md:col-span-3 lg:col-span-2">
              <h4 className="meta-label text-muted-ink-dark">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="inline-block py-0.5 text-sm text-paper transition-colors duration-300 hover:text-cobalt"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-6 md:col-span-3 lg:col-span-1">
            <h4 className="meta-label text-muted-ink-dark">Kontak</h4>
            <ul className="mt-4 space-y-2.5">
              {[
                { icon: Globe, label: "Situs" },
                { icon: Mail, label: "Email" },
                { icon: Send, label: "Telegram" },
                { icon: MessageCircle, label: "Chat" },
              ].map(({ icon: Icon, label }) => (
                <li key={label}>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 py-0.5 text-sm text-paper transition-colors duration-300 hover:text-cobalt"
                  >
                    <Icon size={13} aria-hidden />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-line-dark">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start justify-between gap-4 px-5 py-6 sm:flex-row sm:items-center sm:px-8 lg:px-12">
            <span className="meta-label text-muted-ink-dark">
              © 2026 Buat.in — Semua hak dilindungi
            </span>
            <span className="meta-label text-muted-ink-dark">Dibuat di Indonesia</span>
            <a
              href="#"
              className="meta-label flex items-center gap-1.5 text-cobalt transition-colors duration-300 hover:text-cobalt-deep"
            >
              Ke atas <ArrowUpRight size={12} aria-hidden />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}