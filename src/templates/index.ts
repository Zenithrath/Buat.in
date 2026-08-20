// Central template registry

import type { Node, NodeProps, Theme } from "@/lib/schema/types";

export type TemplateCategory = "landing" | "dashboard" | "auth";

/** Node template mentah — dilebihkan dari Node penuh agar template
 *  bisa menetapkan style/metadata khusus dashboard. */
export interface RawTemplateNode {
  id: string;
  componentType: string;
  name?: string;
  props?: NodeProps;
  styles?: Record<string, string | undefined>;
  tabletOverride?: Record<string, string | undefined>;
  mobileOverride?: Record<string, string | undefined>;
  children?: RawTemplateNode[];
  metadata?: Partial<Node["metadata"]> & Record<string, unknown>;
}

export interface TemplateDefinition {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  thumbnail?: string;
  tier: "free" | "pro";
  tags: string[];
  /** Tema awal template; tetap bisa diganti lewat panel Tema setelah diterapkan. */
  theme?: Theme;
  createNodes: () => RawTemplateNode[];
}

import { createSaasLandingNodes } from "./landing/saas";
import { createStorefrontNodes } from "./landing/storefront";
import { createPortfolioLandingNodes } from "./landing/portfolio";
import { createStartupLandingNodes } from "./landing/startup";
import { createFashionLandingNodes } from "./landing/fashion";
import { createCompanyLandingNodes } from "./landing/company";
import { createKlinikLandingNodes } from "./landing/klinik";
import { createRestoranLandingNodes } from "./landing/restoran";
import { createEventLandingNodes } from "./landing/event";
import { createSekolahLandingNodes } from "./landing/sekolah";
import { createPropertiLandingNodes } from "./landing/properti";
import { createTravelLandingNodes } from "./landing/travel";
import { createAppShowcaseLandingNodes } from "./landing/app-showcase";
import { createNonprofitLandingNodes } from "./landing/nonprofit";
import { createAnalyticsDashboardNodes } from "./dashboard/analytics";
import { createEcommerceDashboardNodes } from "./dashboard/ecommerce";
import { createProjectDashboardNodes } from "./dashboard/project";
import { createKeuanganDashboardNodes } from "./dashboard/keuangan";
import { createHelpdeskDashboardNodes } from "./dashboard/helpdesk";
import { createArsitekLandingNodes } from "./landing/arsitek";
import { createAgensiKreatifNodes } from "./landing/agensi-kreatif";
import { createPortofolioOnepageNodes } from "./landing/portofolio-onepage";
import { createStudioKreatifNodes } from "./landing/studio-kreatif";
import { createHotelLandingNodes } from "./landing/hotel";
import { createRestoranModernNodes } from "./landing/restoran-modern";
import { createKafeMenuNodes } from "./landing/kafe-menu";
import { createAdminDashboardNodes } from "./dashboard/admin";
import { createOperasionalDashboardNodes } from "./dashboard/operasional";
import { createLoginMinimalNodes } from "./auth/login-minimal";
import { createLoginSplitNodes } from "./auth/login-split";
import { createLoginGradasiNodes } from "./auth/login-gradasi";

export const templateRegistry: TemplateDefinition[] = [
  {
    id: "landing-saas",
    name: "Company Profile Studio",
    description: "Landing page perusahaan statis dengan cerita brand, layanan, profil, dan ajakan konsultasi.",
    category: "landing",
    tier: "free",
    tags: ["company-profile", "studio", "landing", "bisnis"],
    createNodes: createSaasLandingNodes,
  },
  {
    id: "landing-storefront",
    name: "Toko Online",
    description: "Template e-commerce lengkap dengan navbar, hero, katalog produk, tentang, dan footer.",
    category: "landing",
    tier: "free",
    tags: ["toko", "ecommerce", "fashion", "produk"],
    createNodes: createStorefrontNodes,
  },
  {
    id: "landing-portfolio",
    name: "Portofolio Kreatif",
    description: "Portofolio editorial gelap dengan galeri karya, cerita studio, testimoni, dan ajakan kolaborasi.",
    category: "landing",
    tier: "free",
    tags: ["portfolio", "creative", "editorial", "studio"],
    theme: {
      presets: {
        style: "maia",
        baseColor: "zinc",
        theme: "amber",
        radius: "medium",
        font: "manrope",
        fontHeading: "figtree",
        fontMono: "jetbrains",
        chart: "theme",
        appearance: "dark",
      },
      overrides: {},
    },
    createNodes: createPortfolioLandingNodes,
  },
  {
    id: "landing-startup",
    name: "Landing Produk",
    description: "Landing produk lengkap dengan fitur, statistik, harga, testimoni, FAQ, dan CTA yang nyata.",
    category: "landing",
    tier: "free",
    tags: ["produk", "bisnis", "harga", "layanan"],
    theme: {
      presets: {
        style: "nova",
        baseColor: "mist",
        theme: "blue",
        radius: "large",
        font: "figtree",
        fontHeading: "figtree",
        fontMono: "jetbrains",
        chart: "theme",
        appearance: "light",
      },
      overrides: {},
    },
    createNodes: createStartupLandingNodes,
  },
  {
    id: "landing-fashion",
    name: "eCommerce Fashion",
    description: "Toko visual untuk koleksi musiman, lookbook, cerita pelanggan, dan newsletter yang elegan.",
    category: "landing",
    tier: "free",
    tags: ["fashion", "ecommerce", "lookbook", "retail"],
    theme: {
      presets: {
        style: "maia",
        baseColor: "stone",
        theme: "rose",
        radius: "large",
        font: "manrope",
        fontHeading: "manrope",
        fontMono: "jetbrains",
        chart: "theme",
        appearance: "light",
      },
      overrides: {},
    },
    createNodes: createFashionLandingNodes,
  },
  {
    id: "landing-company",
    name: "Company Profile",
    description: "Company profile profesional dengan capaian, layanan, tim, testimoni, dan form konsultasi.",
    category: "landing",
    tier: "free",
    tags: ["company-profile", "business", "services", "team"],
    theme: {
      presets: {
        style: "vega",
        baseColor: "stone",
        theme: "blue",
        radius: "medium",
        font: "inter",
        fontHeading: "figtree",
        fontMono: "jetbrains",
        chart: "theme",
        appearance: "light",
      },
      overrides: {},
    },
    createNodes: createCompanyLandingNodes,
  },
  {
    id: "dashboard-analytics",
    name: "Analytics Dashboard",
    description: "Dashboard operasional dengan sidebar, header, KPI, grafik, dan aktivitas proyek.",
    category: "dashboard",
    tier: "pro",
    tags: ["dashboard", "analytics", "admin", "data"],
    createNodes: createAnalyticsDashboardNodes,
  },
  {
    id: "landing-klinik",
    name: "Klinik Kesehatan",
    description: "Halaman klinik dengan layanan, tim dokter, testimoni pasien, dan jadwal konsultasi.",
    category: "landing",
    tier: "free",
    tags: ["klinik", "kesehatan", "dokter", "layanan"],
    theme: {
      presets: {
        style: "maia",
        baseColor: "mist",
        theme: "teal",
        radius: "large",
        font: "figtree",
        fontHeading: "figtree",
        fontMono: "jetbrains",
        chart: "theme",
        appearance: "light",
      },
      overrides: {},
    },
    createNodes: createKlinikLandingNodes,
  },
  {
    id: "landing-restoran",
    name: "Restoran & Kafe",
    description: "Halaman restoran dengan menu andalan, cerita dapur, reservasi, dan jam buka.",
    category: "landing",
    tier: "free",
    tags: ["restoran", "kafe", "makanan", "reservasi"],
    theme: {
      presets: {
        style: "maia",
        baseColor: "stone",
        theme: "orange",
        radius: "large",
        font: "manrope",
        fontHeading: "manrope",
        fontMono: "jetbrains",
        chart: "theme",
        appearance: "light",
      },
      overrides: {},
    },
    createNodes: createRestoranLandingNodes,
  },
  {
    id: "landing-event",
    name: "Acara & Konferensi",
    description: "Halaman acara dengan rundown singkat, tiket, pembicara, dokumentasi, dan FAQ.",
    category: "landing",
    tier: "free",
    tags: ["event", "konferensi", "tiket", "workshop"],
    theme: {
      presets: {
        style: "nova",
        baseColor: "zinc",
        theme: "violet",
        radius: "medium",
        font: "inter",
        fontHeading: "figtree",
        fontMono: "jetbrains",
        chart: "theme",
        appearance: "light",
      },
      overrides: {},
    },
    createNodes: createEventLandingNodes,
  },
  {
    id: "landing-sekolah",
    name: "Sekolah & Lembaga",
    description: "Halaman sekolah dengan program, statistik, tenaga pengajar, dan pendaftaran murid baru.",
    category: "landing",
    tier: "free",
    tags: ["sekolah", "pendidikan", "kursus", "lembaga"],
    theme: {
      presets: {
        style: "vega",
        baseColor: "mist",
        theme: "blue",
        radius: "medium",
        font: "figtree",
        fontHeading: "figtree",
        fontMono: "jetbrains",
        chart: "theme",
        appearance: "light",
      },
      overrides: {},
    },
    createNodes: createSekolahLandingNodes,
  },
  {
    id: "landing-properti",
    name: "Properti & Real Estate",
    description: "Halaman pengembang properti dengan unit tersedia, fasilitas, konsultasi KPR, dan denah.",
    category: "landing",
    tier: "free",
    tags: ["properti", "real-estate", "rumah", "cluster"],
    theme: {
      presets: {
        style: "vega",
        baseColor: "stone",
        theme: "emerald",
        radius: "medium",
        font: "inter",
        fontHeading: "figtree",
        fontMono: "jetbrains",
        chart: "theme",
        appearance: "light",
      },
      overrides: {},
    },
    createNodes: createPropertiLandingNodes,
  },
  {
    id: "landing-travel",
    name: "Travel & Wisata",
    description: "Halaman agen perjalanan dengan paket wisata, statistik, cara pesan, dan testimoni.",
    category: "landing",
    tier: "free",
    tags: ["travel", "wisata", "paket", "liburan"],
    theme: {
      presets: {
        style: "maia",
        baseColor: "mist",
        theme: "sky",
        radius: "large",
        font: "dmsans",
        fontHeading: "dmsans",
        fontMono: "jetbrains",
        chart: "theme",
        appearance: "light",
      },
      overrides: {},
    },
    createNodes: createTravelLandingNodes,
  },
  {
    id: "landing-app-showcase",
    name: "Aplikasi Mobile",
    description: "Halaman promosi aplikasi dengan fitur, paket harga, rating, dan unduhan.",
    category: "landing",
    tier: "free",
    tags: ["aplikasi", "mobile", "saas", "promo"],
    theme: {
      presets: {
        style: "nova",
        baseColor: "mist",
        theme: "indigo",
        radius: "large",
        font: "dmsans",
        fontHeading: "dmsans",
        fontMono: "jetbrains",
        chart: "theme",
        appearance: "light",
      },
      overrides: {},
    },
    createNodes: createAppShowcaseLandingNodes,
  },
  {
    id: "landing-nonprofit",
    name: "Yayasan & Sosial",
    description: "Halaman yayasan dengan program sosial, donasi, dokumentasi kegiatan, dan relawan.",
    category: "landing",
    tier: "free",
    tags: ["yayasan", "sosial", "donasi", "nonprofit"],
    theme: {
      presets: {
        style: "maia",
        baseColor: "stone",
        theme: "emerald",
        radius: "medium",
        font: "figtree",
        fontHeading: "figtree",
        fontMono: "jetbrains",
        chart: "theme",
        appearance: "light",
      },
      overrides: {},
    },
    createNodes: createNonprofitLandingNodes,
  },
  {
    id: "dashboard-ecommerce",
    name: "Dashboard Toko",
    description: "Dashboard toko online dengan pendapatan, pesanan, produk, dan aktivitas penjualan.",
    category: "dashboard",
    tier: "pro",
    tags: ["dashboard", "toko", "ecommerce", "penjualan"],
    theme: {
      presets: {
        style: "nova",
        baseColor: "mist",
        theme: "blue",
        radius: "medium",
        font: "inter",
        fontHeading: "figtree",
        fontMono: "jetbrains",
        chart: "theme",
        appearance: "light",
      },
      overrides: {},
    },
    createNodes: createEcommerceDashboardNodes,
  },
  {
    id: "dashboard-project",
    name: "Dashboard Proyek",
    description: "Dashboard manajemen proyek dengan progres, tugas, tim, dan kalender deadline.",
    category: "dashboard",
    tier: "pro",
    tags: ["dashboard", "proyek", "tugas", "tim"],
    theme: {
      presets: {
        style: "nova",
        baseColor: "zinc",
        theme: "violet",
        radius: "medium",
        font: "inter",
        fontHeading: "figtree",
        fontMono: "jetbrains",
        chart: "theme",
        appearance: "light",
      },
      overrides: {},
    },
    createNodes: createProjectDashboardNodes,
  },
  {
    id: "dashboard-keuangan",
    name: "Dashboard Keuangan",
    description: "Dashboard keuangan pribadi atau usaha dengan saldo, arus kas, anggaran, dan tagihan.",
    category: "dashboard",
    tier: "pro",
    tags: ["dashboard", "keuangan", "anggaran", "tagihan"],
    theme: {
      presets: {
        style: "nova",
        baseColor: "stone",
        theme: "emerald",
        radius: "medium",
        font: "inter",
        fontHeading: "figtree",
        fontMono: "jetbrains",
        chart: "theme",
        appearance: "light",
      },
      overrides: {},
    },
    createNodes: createKeuanganDashboardNodes,
  },
  {
    id: "dashboard-helpdesk",
    name: "Dashboard Helpdesk",
    description: "Dashboard layanan bantuan dengan tiket, antrian, prioritas, dan jadwal shift tim.",
    category: "dashboard",
    tier: "pro",
    tags: ["dashboard", "helpdesk", "tiket", "support"],
    theme: {
      presets: {
        style: "nova",
        baseColor: "mist",
        theme: "sky",
        radius: "medium",
        font: "inter",
        fontHeading: "figtree",
        fontMono: "jetbrains",
        chart: "theme",
        appearance: "light",
      },
      overrides: {},
    },
    createNodes: createHelpdeskDashboardNodes,
  },
  {
    id: "landing-arsitek",
    name: "Arsitek & Studio Desain",
    description: "Landing page studio arsitektur dengan karya terpilih, proses kerja, tim, dan form diskusi proyek.",
    category: "landing",
    tier: "free",
    tags: ["arsitek", "studio", "interior", "desain"],
    theme: {
      presets: {
        style: "vega",
        baseColor: "stone",
        theme: "blue",
        radius: "medium",
        font: "inter",
        fontHeading: "figtree",
        fontMono: "jetbrains",
        chart: "theme",
        appearance: "light",
      },
      overrides: {},
    },
    createNodes: createArsitekLandingNodes,
  },
  {
    id: "landing-agensi-kreatif",
    name: "Agensi Kreatif",
    description: "Landing page agensi kreatif dengan layanan, karya, cerita klien, dan newsletter.",
    category: "landing",
    tier: "free",
    tags: ["agensi", "kreatif", "brand", "digital"],
    theme: {
      presets: {
        style: "nova",
        baseColor: "mist",
        theme: "indigo",
        radius: "large",
        font: "dmsans",
        fontHeading: "dmsans",
        fontMono: "jetbrains",
        chart: "theme",
        appearance: "light",
      },
      overrides: {},
    },
    createNodes: createAgensiKreatifNodes,
  },
  {
    id: "landing-portofolio-onepage",
    name: "Portofolio One-Page",
    description: "Portofolio satu halaman gelap dengan karya, proses, dan ajakan kolaborasi.",
    category: "landing",
    tier: "free",
    tags: ["portofolio", "one-page", "freelance", "desainer"],
    theme: {
      presets: {
        style: "maia",
        baseColor: "zinc",
        theme: "amber",
        radius: "medium",
        font: "manrope",
        fontHeading: "figtree",
        fontMono: "jetbrains",
        chart: "theme",
        appearance: "dark",
      },
      overrides: {},
    },
    createNodes: createPortofolioOnepageNodes,
  },
  {
    id: "landing-studio-kreatif",
    name: "Studio Kreatif",
    description: "Landing page studio kreatif berwarna dengan layanan, karya, tim, dan penghargaan.",
    category: "landing",
    tier: "free",
    tags: ["studio", "kreatif", "desain", "penghargaan"],
    theme: {
      presets: {
        style: "nova",
        baseColor: "mist",
        theme: "rose",
        radius: "large",
        font: "dmsans",
        fontHeading: "dmsans",
        fontMono: "jetbrains",
        chart: "theme",
        appearance: "light",
      },
      overrides: {},
    },
    createNodes: createStudioKreatifNodes,
  },
  {
    id: "landing-hotel",
    name: "Hotel & Resort",
    description: "Halaman hotel mewah dengan kamar, fasilitas, paket menginap, dan reservasi.",
    category: "landing",
    tier: "free",
    tags: ["hotel", "resort", "penginapan", "liburan"],
    theme: {
      presets: {
        style: "maia",
        baseColor: "stone",
        theme: "amber",
        radius: "large",
        font: "dmsans",
        fontHeading: "dmsans",
        fontMono: "jetbrains",
        chart: "theme",
        appearance: "light",
      },
      overrides: {},
    },
    createNodes: createHotelLandingNodes,
  },
  {
    id: "landing-restoran-modern",
    name: "Restoran Modern",
    description: "Halaman restoran api kayu dengan menu musiman, suasana, ulasan, dan reservasi.",
    category: "landing",
    tier: "free",
    tags: ["restoran", "modern", "makanan", "reservasi"],
    theme: {
      presets: {
        style: "nova",
        baseColor: "stone",
        theme: "orange",
        radius: "medium",
        font: "figtree",
        fontHeading: "figtree",
        fontMono: "jetbrains",
        chart: "theme",
        appearance: "light",
      },
      overrides: {},
    },
    createNodes: createRestoranModernNodes,
  },
  {
    id: "landing-kafe-menu",
    name: "Menu Kafe Digital",
    description: "Halaman menu kafe dengan daftar menu bergambar, promo, ulasan, dan newsletter.",
    category: "landing",
    tier: "free",
    tags: ["kafe", "menu", "kopi", "minuman"],
    theme: {
      presets: {
        style: "maia",
        baseColor: "stone",
        theme: "orange",
        radius: "large",
        font: "manrope",
        fontHeading: "manrope",
        fontMono: "jetbrains",
        chart: "theme",
        appearance: "light",
      },
      overrides: {},
    },
    createNodes: createKafeMenuNodes,
  },
  {
    id: "dashboard-admin",
    name: "Dashboard Admin",
    description: "Dashboard admin klasik dengan KPI, grafik, tabel pesanan, aktivitas, dan form data.",
    category: "dashboard",
    tier: "pro",
    tags: ["dashboard", "admin", "pesanan", "laporan"],
    theme: {
      presets: {
        style: "nova",
        baseColor: "zinc",
        theme: "blue",
        radius: "medium",
        font: "inter",
        fontHeading: "figtree",
        fontMono: "jetbrains",
        chart: "theme",
        appearance: "light",
      },
      overrides: {},
    },
    createNodes: createAdminDashboardNodes,
  },
  {
    id: "dashboard-operasional",
    name: "Dashboard Operasional",
    description: "Dashboard operasional modern dengan sidebar ikon, kalender, kehadiran, dan rekap tim.",
    category: "dashboard",
    tier: "pro",
    tags: ["dashboard", "operasional", "kehadiran", "jadwal"],
    theme: {
      presets: {
        style: "nova",
        baseColor: "mist",
        theme: "teal",
        radius: "medium",
        font: "inter",
        fontHeading: "figtree",
        fontMono: "jetbrains",
        chart: "theme",
        appearance: "light",
      },
      overrides: {},
    },
    createNodes: createOperasionalDashboardNodes,
  },
  {
    id: "auth-login-minimal",
    name: "Login — Kartu Tengah",
    description: "Halaman masuk minimalis dengan kartu kredensial di tengah layar.",
    category: "auth",
    tier: "free",
    tags: ["login", "auth", "masuk", "minimal"],
    theme: {
      presets: {
        style: "vega",
        baseColor: "zinc",
        theme: "blue",
        radius: "medium",
        font: "inter",
        fontHeading: "figtree",
        fontMono: "jetbrains",
        chart: "theme",
        appearance: "light",
      },
      overrides: {},
    },
    createNodes: createLoginMinimalNodes,
  },
  {
    id: "auth-login-split",
    name: "Login — Dua Kolom",
    description: "Halaman masuk dua kolom dengan gambar dan panel kredensial di sisi kanan.",
    category: "auth",
    tier: "free",
    tags: ["login", "auth", "masuk", "dua-kolom"],
    theme: {
      presets: {
        style: "nova",
        baseColor: "mist",
        theme: "indigo",
        radius: "large",
        font: "dmsans",
        fontHeading: "dmsans",
        fontMono: "jetbrains",
        chart: "theme",
        appearance: "light",
      },
      overrides: {},
    },
    createNodes: createLoginSplitNodes,
  },
  {
    id: "auth-login-gradasi",
    name: "Login — Latar Gradasi",
    description: "Halaman masuk dengan latar gradasi warna dan kartu putih di tengah.",
    category: "auth",
    tier: "free",
    tags: ["login", "auth", "masuk", "gradasi"],
    theme: {
      presets: {
        style: "maia",
        baseColor: "mist",
        theme: "violet",
        radius: "large",
        font: "dmsans",
        fontHeading: "dmsans",
        fontMono: "jetbrains",
        chart: "theme",
        appearance: "light",
      },
      overrides: {},
    },
    createNodes: createLoginGradasiNodes,
  },
];

export const TEMPLATE_CATEGORY_LABELS: Record<TemplateCategory, string> = {
  landing: "Landing Page",
  dashboard: "Dashboard",
  auth: "Login & autentikasi",
};
