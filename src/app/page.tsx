import Link from "next/link";
import {
  ArrowRight,
  Check,
  Download,
  Globe,
  Mail,
  MessageCircle,
  Play,
  Plus,
  Send,
} from "lucide-react";

const NAV_LINKS = [
  { href: "#cara-kerja", label: "Cara Kerja" },
  { href: "#fitur", label: "Fitur" },
  { href: "#harga", label: "Harga" },
  { href: "#faq", label: "FAQ" },
];

const HERO_STATS = [
  { value: "6+", label: "Komponen siap pakai" },
  { value: "100%", label: "Gratis mendesain" },
  { value: "0", label: "Lock-in setelah export" },
];

const MID_STATS = [
  { value: "6+", label: "Komponen siap pakai" },
  { value: "3", label: "Breakpoint responsive" },
  { value: "100%", label: "Gratis mendesain" },
  { value: "0", label: "Lock-in setelah export" },
];

const STEPS = [
  {
    title: "Drag & drop",
    desc: "Seret komponen dari panel kiri ke kanvas dan susun halaman seperti menyusun lego — tanpa satu baris kode pun.",
  },
  {
    title: "Edit di tempat",
    desc: "Klik teks, gambar, dan warna lalu ubah langsung di kanvas. Semua perubahan terlihat seketika.",
  },
  {
    title: "Pratinjau & export",
    desc: "Cek hasil di desktop, tablet, dan mobile, lalu export HTML/CSS/JS — kode asli milik Anda selamanya.",
  },
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

const LAYER_NAMES = ["Navbar", "Hero", "Produk", "Tentang", "Footer"];

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
    <Link href="/" className="text-[15px] font-bold tracking-tight text-ivory">
      Buat<span className="text-cobalt">.</span>in
    </Link>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center justify-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-cobalt" />
      {children}
    </p>
  );
}

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
      [ {index} — {children} ]
    </p>
  );
}

function Serif({ children }: { children: React.ReactNode }) {
  return <em className="font-serif italic font-normal">{children}</em>;
}

function CheckBullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3.5">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cobalt/10">
        <Check size={12} strokeWidth={3} className="text-cobalt" />
      </span>
      <span className="text-[15px] leading-relaxed text-muted-foreground">{children}</span>
    </li>
  );
}

function FloatChip({
  className,
  label,
  dot,
  style,
}: {
  className: string;
  label: string;
  dot: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`absolute z-20 hidden ${className} sm:block`} style={style}>
      <div className="flex items-center gap-2.5 rounded-full border border-line bg-ink-2/90 px-4 py-2 shadow-lg shadow-black/50 backdrop-blur">
        <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-ivory/80">
          {label}
        </span>
      </div>
    </div>
  );
}

function SpinBadge() {
  return (
    <div className="absolute -right-8 -top-14 z-20 hidden lg:block">
      <div className="relative flex h-36 w-36 items-center justify-center">
        <svg
          viewBox="0 0 144 144"
          className="absolute inset-0 h-full w-full animate-ring-turn text-muted-foreground-foreground/50"
        >
          <defs>
            <path
              id="bi-ring-path"
              d="M72,72 m-56,0 a56,56 0 1,1 112,0 a56,56 0 1,1 -112,0"
              fill="none"
            />
          </defs>
          <text
            className="fill-current text-[10px] font-bold uppercase"
            style={{ letterSpacing: "0.15em" }}
          >
            <textPath href="#bi-ring-path">
              design · export · own · design · export · own ·
            </textPath>
          </text>
        </svg>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ivory text-ink">
          <Download size={16} />
        </span>
      </div>
    </div>
  );
}

function BuilderMockup() {
  return (
    <div className="relative mx-auto mt-16 max-w-5xl px-5 sm:mt-24">
      <FloatChip
        className="animate-float -left-2 top-14 lg:-left-10"
        label="Drag & Drop"
        dot="bg-cobalt"
      />
      <FloatChip
        className="animate-float -right-2 top-36 lg:-right-10"
        label="Export ZIP"
        dot="bg-cobalt"
        style={{ animationDelay: "1.2s" }}
      />
      <FloatChip
        className="animate-float bottom-8 left-6 lg:left-16"
        label="100% Gratis"
        dot="bg-cobalt"
        style={{ animationDelay: "0.6s" }}
      />
      <FloatChip
        className="animate-float -bottom-5 right-10"
        label="HTML Siap"
        dot="bg-cobalt"
        style={{ animationDelay: "1.8s" }}
      />

      <SpinBadge />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-ink to-transparent sm:w-24"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-ink to-transparent sm:w-24"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-ink to-transparent"
      />

      <div className="relative z-0 overflow-hidden rounded-2xl border border-line bg-ink-2">
        <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-ivory/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ivory/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ivory/15" />
          <div className="ml-3 flex h-6 flex-1 items-center justify-center rounded-md bg-ink px-2 font-mono text-[10px] text-muted-foreground">
            buat.in/builder
          </div>
          <span className="flex items-center gap-1.5 rounded-md border border-cobalt/40 bg-cobalt/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-cobalt">
            <span className="h-1 w-1 rounded-full bg-cobalt" />
            Live
          </span>
        </div>

        <div className="flex">
          <div className="hidden w-48 shrink-0 flex-col gap-2 border-r border-line p-3 sm:flex">
            <p className="px-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Komponen
            </p>
            {LAYER_NAMES.map((name) => (
              <div
                key={name}
                className="flex items-center gap-2 rounded-md border border-line bg-ink px-2.5 py-1.5"
              >
                <span className="h-1 w-1 rounded-full bg-cobalt" />
                <span className="text-[10px] font-medium text-ivory/80">{name}</span>
              </div>
            ))}
          </div>

          <div className="flex-1 space-y-3 p-3 sm:p-4">
            <div className="rounded-lg border border-line bg-ink px-4 py-5 text-center sm:py-7">
              <div className="mx-auto h-1.5 w-20 rounded-full bg-ivory/20 sm:w-24" />
              <div className="mx-auto mt-2.5 h-2.5 w-36 rounded-full bg-ivory/35 sm:w-44" />
              <div className="mx-auto mt-2 h-2 w-48 max-w-full rounded-full bg-ivory/15 sm:w-60" />
              <div className="mt-4 flex justify-center gap-2">
                <span className="rounded-md bg-cobalt px-2.5 py-1 text-[8px] font-bold text-ivory sm:text-[9px]">
                  CTA
                </span>
                <span className="rounded-md border border-line px-2.5 py-1 text-[8px] font-bold text-ivory/60 sm:text-[9px]">
                  CTA
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-lg border border-line bg-ink p-2.5">
                  <div className="aspect-[4/3] rounded-md bg-ink-2" />
                  <div className="mt-2 h-1.5 w-3/4 rounded-full bg-ivory/20" />
                  <div className="mt-1.5 h-1 w-1/2 rounded-full bg-ivory/10" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-line px-4 py-2">
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            6 Komponen · Gratis
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.25em] text-cobalt">
            <span className="h-1 w-1 rounded-full bg-cobalt" />
            Saved
          </span>
        </div>
      </div>
    </div>
  );
}

function Ticker({
  items,
  separator,
}: {
  items: string[];
  separator: string;
}) {
  const half = (
    <div className="flex items-center whitespace-nowrap">
      {items.map((item) => (
        <span
          key={item}
          className="flex items-center gap-10 pr-10 text-[12px] font-bold uppercase tracking-[0.35em]"
        >
          {item}
          <span aria-hidden className="opacity-50">
            {separator}
          </span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="overflow-hidden">
      <div className="flex w-max animate-ticker">
        {half}
        {half}
      </div>
    </div>
  );
}

function SectionHeader({
  label,
  index,
  title,
  desc,
  center = false,
}: {
  label: string;
  index: string;
  title: React.ReactNode;
  desc?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <SectionLabel index={index}>{label}</SectionLabel>
      <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
        {title}
      </h2>
      {desc ? (
        <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">{desc}</p>
      ) : null}
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-ink text-ivory">
      <header className="sticky top-0 z-50 border-b border-line bg-ink/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Logo />
          <nav className="hidden items-center gap-8 text-[13px] font-medium text-muted-foreground md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-ivory"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2.5">
            <Link
              href="/builder"
              className="hidden rounded-lg border border-line px-4 py-2 text-[13px] font-semibold text-ivory transition-colors hover:border-muted hover:bg-white/5 sm:inline-block"
            >
              Template Dasar
            </Link>
            <Link
              href="/builder"
              className="rounded-lg bg-ivory px-4 py-2 text-[13px] font-bold text-ink transition-colors hover:bg-ivory/90"
            >
              Buka Builder
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden pt-28 sm:pt-36">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
          >
            <div className="absolute left-[10%] top-[-10%] h-[65%] w-px bg-gradient-to-b from-ivory/15 to-transparent" />
            <div className="absolute left-[18%] top-[-30%] h-[90%] w-px bg-gradient-to-b from-ivory/10 to-transparent" />
            <div className="absolute right-[16%] top-[-20%] h-[75%] w-px bg-gradient-to-b from-ivory/15 to-transparent" />
            <div className="absolute right-[27%] top-[-5%] h-[45%] w-px bg-gradient-to-b from-ivory/8 to-transparent" />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl px-5 pt-8 text-center sm:pt-12">
            <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
              <Eyebrow>VISUAL WEBSITE BUILDER</Eyebrow>
            </div>
            <h1
              className="animate-fade-up mt-8 font-display text-[42px] font-bold leading-[1.02] tracking-[-0.03em] sm:text-[64px] lg:text-[84px]"
              style={{ animationDelay: "80ms" }}
            >
              <span className="block">Desain website visual,</span>
              <span className="block">bayar sekali,</span>
              <span className="block">
                miliki <Serif>kodenya</Serif>.
              </span>
            </h1>
            <p
              className="animate-fade-up mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
              style={{ animationDelay: "160ms" }}
            >
              Drag &amp; drop untuk membuat website Anda. Gratis selama
              mendesain — bayar hanya saat Anda mengunduh source code
              HTML/CSS/JS yang benar-benar Anda miliki.
            </p>
            <div
              className="animate-fade-up mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
              style={{ animationDelay: "240ms" }}
            >
              <Link
                href="/builder"
                className="w-full rounded-lg bg-ivory px-7 py-3.5 text-sm font-bold text-ink transition-colors hover:bg-ivory/90 sm:w-auto"
              >
                Mulai Mendesain — Gratis
              </Link>
              <Link
                href="#cara-kerja"
                className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-line px-6 py-3.5 text-sm font-semibold text-ivory transition-colors hover:border-muted hover:bg-white/5 sm:w-auto"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-line">
                  <Play size={8} className="fill-current" />
                </span>
                Lihat Cara Kerja
              </Link>
            </div>
          </div>

          <BuilderMockup />

          <div className="relative z-10 mx-auto mt-20 max-w-lg px-5 sm:mt-24">
            <div className="grid grid-cols-3 gap-4 border-t border-line pt-8">
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-3xl font-bold tracking-[-0.02em]">
                    {stat.value}
                  </p>
                  <p className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-24 border-y border-line py-5">
          <Ticker
            items={["DESIGN VISUALLY", "EXPORT HTML", "EXPORT REACT", "OWN YOUR CODE"]}
            separator="✦"
          />
        </section>

        <section className="border-b border-line py-9">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 sm:flex-row sm:justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Dibangun dengan teknologi modern
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-9 gap-y-3">
              {["HTML5", "CSS3", "JavaScript", "Next.js", "Tailwind CSS", "JSZip"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="text-[13px] font-bold uppercase tracking-wide text-muted-foreground transition-colors hover:text-ivory"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>
        </section>

        <section id="cara-kerja" className="scroll-mt-16 py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-5">
            <SectionHeader
              index="01"
              label="Cara Kerja"
              title={
                <>
                  Seret &amp; letakkan komponen, hasilnya{" "}
                  <Serif>langsung terlihat</Serif>
                </>
              }
              desc="Susun halaman seperti menyusun lego — tanpa menulis satu baris kode pun. Semua perubahan terlihat langsung di kanvas."
            />
            <div className="mt-14 divide-y divide-line rounded-2xl border border-line bg-ink-2">
              {STEPS.map((step, i) => (
                <div
                  key={step.title}
                  className="grid gap-3 p-8 sm:grid-cols-[90px_1.2fr_1fr] sm:items-baseline sm:gap-6 sm:p-10"
                >
                  <span className="font-mono text-sm font-semibold text-muted-foreground">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-2xl font-bold tracking-[-0.02em] sm:text-3xl">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
            <Link
              href="/builder"
              className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-ivory transition-colors hover:text-cobalt"
            >
              Lihat semua komponen
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        <section className="border-t border-line py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-5">
            <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
              {MID_STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-5xl font-bold tracking-[-0.03em] sm:text-6xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="fitur" className="scroll-mt-16 border-t border-line py-24 sm:py-32">
          <div className="mx-auto grid max-w-6xl items-center gap-16 px-5 lg:grid-cols-2">
            <div>
              <SectionHeader
                index="02"
                label="Fitur Unggulan"
                title={
                  <>
                    Kode asli yang benar-benar <Serif>Anda miliki</Serif>
                  </>
                }
                desc="Hasil export bukan format proprietary. Ini HTML, CSS, dan JavaScript murni yang bisa dibuka siapa pun, diedit apa pun, dan dihosting di mana pun."
              />
              <ul className="mt-9 space-y-4">
                {FEATURE_POINTS.map((point) => (
                  <CheckBullet key={point}>{point}</CheckBullet>
                ))}
              </ul>
              <Link
                href="/builder"
                className="mt-10 inline-flex items-center gap-2 rounded-lg bg-ivory px-6 py-3 text-sm font-bold text-ink transition-colors hover:bg-ivory/90"
              >
                <Download size={14} />
                Coba Langsung
              </Link>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-line bg-ink-2">
                <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-ivory/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-ivory/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-ivory/15" />
                  <div className="ml-2 flex h-6 flex-1 items-center rounded-md bg-ink px-2.5 font-mono text-[10px] text-muted-foreground">
                    index.html
                  </div>
                  <span className="rounded-md border border-cobalt/40 bg-cobalt/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-cobalt">
                    HTML
                  </span>
                </div>
                <pre className="overflow-x-auto p-6 text-[12.5px] leading-relaxed text-ivory/80">
                  <code>{CODE_SNIPPET}</code>
                </pre>
              </div>
              <div className="absolute -bottom-5 -right-2 flex items-center gap-2 rounded-xl border border-line bg-ink px-4 py-2.5 text-[11px] font-semibold text-ivory shadow-lg shadow-black/50">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-cobalt">
                  <Check size={10} strokeWidth={4} className="text-ivory" />
                </span>
                Valid · W3C-ready
              </div>
            </div>
          </div>
        </section>

        <section id="harga" className="scroll-mt-16 border-t border-line py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-5">
            <SectionHeader
              center
              index="03"
              label="Harga"
              title={
                <>
                  Harga transparan, bayar <Serif>sekali</Serif>
                </>
              }
              desc="Gratis selama mendesain. Bayar hanya saat Anda mengambil source code — tanpa kejutan, tanpa biaya bulanan."
            />
            <div className="mt-16 grid gap-5 md:grid-cols-3">
              {PLANS.map((plan) => (
                <div
                  key={plan.name}
                  className={
                    plan.featured
                      ? "relative flex flex-col rounded-2xl border border-cobalt/40 bg-ink-2 p-8"
                      : "relative flex flex-col rounded-2xl border border-line bg-ink-2 p-8"
                  }
                >
                  {plan.featured ? (
                    <span className="absolute -top-3 left-8 rounded-md bg-cobalt px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-ivory">
                      Paling populer
                    </span>
                  ) : null}
                  <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                    {plan.name}
                  </h3>
                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="font-display text-4xl font-bold tracking-[-0.02em]">
                      {plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground">{plan.suffix}</span>
                  </div>
                  <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
                    {plan.desc}
                  </p>
                  <ul className="mt-7 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-cobalt/10">
                          <Check size={11} strokeWidth={3.5} className="text-cobalt" />
                        </span>
                        <span className="text-[13px] leading-relaxed text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/builder"
                    className={
                      plan.featured
                        ? "mt-8 rounded-lg bg-ivory px-5 py-3 text-center text-sm font-bold text-ink transition-colors hover:bg-ivory/90"
                        : "mt-8 rounded-lg border border-line px-5 py-3 text-center text-sm font-bold text-ivory transition-colors hover:border-muted hover:bg-white/5"
                    }
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center font-mono text-[11px] text-muted-foreground-foreground/70">
              Harga indikatif — pembayaran hadir di rilis berikutnya. Untuk
              sekarang, export gratis.
            </p>
          </div>
        </section>

        <section id="faq" className="scroll-mt-16 border-t border-line py-24 sm:py-32">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-[1fr_1.4fr]">
            <div>
              <SectionLabel index="04">FAQ</SectionLabel>
              <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
                Pertanyaan yang <Serif>sering ditanyakan</Serif>
              </h2>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
                Tidak menemukan jawaban? Hubungi kami — kami membalas cepat.
              </p>
              <div className="mt-9 flex items-center gap-4 rounded-xl border border-line bg-ink-2 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cobalt/10 text-cobalt">
                  <Mail size={18} />
                </span>
                <div>
                  <p className="text-sm font-bold text-ivory">Butuh bantuan?</p>
                  <a
                    href="mailto:halo@buat.in"
                    className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-ivory"
                  >
                    halo@buat.in
                  </a>
                </div>
              </div>
            </div>
            <div className="divide-y divide-line border-y border-line">
              {FAQS.map((faq, i) => (
                <details key={faq.q} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 [&::-webkit-details-marker]:hidden">
                    <span className="flex items-start gap-4">
                      <span className="mt-0.5 font-mono text-xs font-semibold text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[15px] font-semibold text-ivory">
                        {faq.q}
                      </span>
                    </span>
                    <Plus
                      size={17}
                      className="shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45"
                    />
                  </summary>
                  <p className="pb-6 pl-10 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-line py-28 text-center sm:py-36">
          <h2 className="mx-auto max-w-3xl px-5 font-display text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-6xl">
            Siap membuat <Serif>website impian</Serif> Anda?
          </h2>
          <p className="mx-auto mt-5 max-w-md px-5 text-sm leading-relaxed text-muted-foreground">
            Gratis mendesain sekarang — bayar hanya jika Anda ingin mengambil
            source code-nya.
          </p>
          <Link
            href="/builder"
            className="mt-10 inline-flex items-center gap-2 rounded-lg bg-ivory px-8 py-4 text-sm font-bold text-ink transition-colors hover:bg-ivory/90"
          >
            Buka Builder — Gratis
            <ArrowRight size={15} />
          </Link>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-muted-foreground">
              Desain website visual, bayar sekali, miliki kodenya. Tanpa
              lock-in, tanpa langganan.
            </p>
          </div>
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-ivory/50">
                {col.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[13px] text-muted-foreground transition-colors hover:text-ivory"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-line px-5 py-6 text-xs text-muted-foreground sm:flex-row">
          <span>© 2026 Buat.in — Visual Website Builder · V0 Prototype</span>
          <span>Dibuat di Indonesia</span>
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
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted-foreground transition-colors hover:border-muted hover:text-ivory"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}