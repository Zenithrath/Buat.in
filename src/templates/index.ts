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
import { createAnalyticsDashboardNodes } from "./dashboard/analytics";

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
];

export const TEMPLATE_CATEGORY_LABELS: Record<TemplateCategory, string> = {
  landing: "Landing Page",
  dashboard: "Dashboard",
};
