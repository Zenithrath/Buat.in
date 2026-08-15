// Central template registry

import type { Node, NodeProps, Theme } from "@/lib/schema/types";

export type TemplateCategory = "landing" | "dashboard";

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
];

export const TEMPLATE_CATEGORY_LABELS: Record<TemplateCategory, string> = {
  landing: "Landing Page",
  dashboard: "Dashboard",
};
