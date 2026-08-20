// Registry template Buat.in.
//
// Template yang tersedia di panel ini adalah hasil impor ZIP asli di
// src/templates/imported-assets. Adapter di ./imported membuat node yang dikenali
// schema Buat.in, sedangkan source HTML/CSS/JS/aset tetap dipakai sebagai
// visual master agar hasilnya tidak berubah menjadi template basic.

import type { Node, NodeProps, Theme } from "@/lib/schema/types";

export type TemplateCategory = "landing" | "dashboard" | "auth";

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
  theme?: Theme;
  createNodes: () => RawTemplateNode[];
  /** Native pages converted from the ZIP's HTML files. */
  createPages?: () => RawTemplatePage[];
}

export interface RawTemplatePage {
  id: string;
  name: string;
  path: string;
  isHome: boolean;
  sourcePath?: string;
  stylesheets?: string[];
  inlineStyles?: string[];
  sections: RawTemplateNode[];
}

export interface TemplateSource {
  folder: string;
  archive: string;
  entry: string;
}

import { createBinoPages } from "./imported/bino";
import { createBalayMasterPages } from "./imported/balay-master";
import { createFlameonepagePages } from "./imported/flameonepage-gh-pages";
import { createMadePages } from "./imported/made";
import { createRoyalMasterPages } from "./imported/royal-master";
import { createTastyMasterPages } from "./imported/tasty-master";
import { createWebsiteMenuPages } from "./imported/website-menu-03";
import { createAdminatorPages } from "./imported/adminator";
import { createShadcnAdminPages } from "./imported/shadcn-admin-main";
import { createLoginForm02Pages } from "./imported/login-form-02";
import { createLoginForm20Pages } from "./imported/login-form-20";
import { createLoginFormV16Pages } from "./imported/login-form-v16";

function firstPageNodes(createPages: () => RawTemplatePage[]): RawTemplateNode[] {
  return createPages()[0]?.sections ?? [];
}

const importedTheme: Theme = {
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
};

export const templateRegistry: TemplateDefinition[] = [
  {
    id: "landing-agensi-kreatif",
    name: "bino",
    description: "Template ZIP asli bino untuk landing page agensi kreatif.",
    category: "landing",
    tier: "free",
    tags: ["bino", "agensi", "kreatif", "zip asli"],
    theme: importedTheme,
    createNodes: () => firstPageNodes(createBinoPages),
    createPages: createBinoPages,
  },
  {
    id: "landing-arsitek",
    name: "balay-master",
    description: "Template ZIP asli balay-master untuk studio arsitektur.",
    category: "landing",
    tier: "free",
    tags: ["balay-master", "arsitek", "studio", "zip asli"],
    theme: importedTheme,
    createNodes: () => firstPageNodes(createBalayMasterPages),
    createPages: createBalayMasterPages,
  },
  {
    id: "landing-portofolio-onepage",
    name: "flameonepage-gh-pages",
    description: "Template ZIP asli flameonepage-gh-pages untuk portofolio satu halaman.",
    category: "landing",
    tier: "free",
    tags: ["flameonepage-gh-pages", "portofolio", "one page", "zip asli"],
    theme: importedTheme,
    createNodes: () => firstPageNodes(createFlameonepagePages),
    createPages: createFlameonepagePages,
  },
  {
    id: "landing-studio-kreatif",
    name: "made",
    description: "Template ZIP asli made untuk studio kreatif dan portofolio.",
    category: "landing",
    tier: "free",
    tags: ["made", "studio", "kreatif", "zip asli"],
    theme: importedTheme,
    createNodes: () => firstPageNodes(createMadePages),
    createPages: createMadePages,
  },
  {
    id: "landing-hotel",
    name: "royal-master",
    description: "Template ZIP asli royal-master untuk hotel dan resort.",
    category: "landing",
    tier: "free",
    tags: ["royal-master", "hotel", "resort", "zip asli"],
    theme: importedTheme,
    createNodes: () => firstPageNodes(createRoyalMasterPages),
    createPages: createRoyalMasterPages,
  },
  {
    id: "landing-restoran-modern",
    name: "tasty-master",
    description: "Template ZIP asli tasty-master untuk restoran modern.",
    category: "landing",
    tier: "free",
    tags: ["tasty-master", "restoran", "makanan", "zip asli"],
    theme: importedTheme,
    createNodes: () => firstPageNodes(createTastyMasterPages),
    createPages: createTastyMasterPages,
  },
  {
    id: "landing-kafe-menu",
    name: "website-menu-03",
    description: "Template ZIP asli website-menu-03 untuk menu kafe.",
    category: "landing",
    tier: "free",
    tags: ["website-menu-03", "kafe", "menu", "zip asli"],
    theme: importedTheme,
    createNodes: () => firstPageNodes(createWebsiteMenuPages),
    createPages: createWebsiteMenuPages,
  },
  {
    id: "dashboard-admin",
    name: "adminator",
    description: "Template ZIP asli adminator untuk dashboard admin.",
    category: "dashboard",
    tier: "free",
    tags: ["adminator", "dashboard", "admin", "zip asli"],
    theme: importedTheme,
    createNodes: () => firstPageNodes(createAdminatorPages),
    createPages: createAdminatorPages,
  },
  {
    id: "dashboard-operasional",
    name: "shadcn-admin-main",
    description: "Template ZIP asli shadcn-admin-main untuk dashboard operasional.",
    category: "dashboard",
    tier: "free",
    tags: ["shadcn-admin-main", "dashboard", "operasional", "zip asli"],
    theme: importedTheme,
    createNodes: () => firstPageNodes(createShadcnAdminPages),
    createPages: createShadcnAdminPages,
  },
  {
    id: "auth-login-minimal",
    name: "login-form-02",
    description: "Template ZIP asli login-form-02 untuk halaman login minimal.",
    category: "auth",
    tier: "free",
    tags: ["login-form-02", "login", "auth", "zip asli"],
    theme: importedTheme,
    createNodes: () => firstPageNodes(createLoginForm02Pages),
    createPages: createLoginForm02Pages,
  },
  {
    id: "auth-login-split",
    name: "login-form-20",
    description: "Template ZIP asli login-form-20 untuk halaman login dua kolom.",
    category: "auth",
    tier: "free",
    tags: ["login-form-20", "login", "split", "zip asli"],
    theme: importedTheme,
    createNodes: () => firstPageNodes(createLoginForm20Pages),
    createPages: createLoginForm20Pages,
  },
  {
    id: "auth-login-gradasi",
    name: "login-form-v16",
    description: "Template ZIP asli login-form-v16 untuk halaman login bergradasi.",
    category: "auth",
    tier: "free",
    tags: ["login-form-v16", "login", "gradient", "zip asli"],
    theme: importedTheme,
    createNodes: () => firstPageNodes(createLoginFormV16Pages),
    createPages: createLoginFormV16Pages,
  },
];

export const TEMPLATE_CATEGORY_LABELS: Record<TemplateCategory, string> = {
  landing: "Landing Page",
  dashboard: "Dashboard",
  auth: "Login & autentikasi",
};

/** Arsip dan entry asli yang diekstrak dari ZIP ke src/templates/imported-assets. */
export const TEMPLATE_SOURCES: Record<string, TemplateSource> = {
  "landing-agensi-kreatif": {
    folder: "bino",
    archive: "bino.zip",
    entry: "bino/index.html",
  },
  "landing-arsitek": {
    folder: "balay-master",
    archive: "balay-master.zip",
    entry: "balay-master/index.html",
  },
  "landing-portofolio-onepage": {
    folder: "flameonepage-gh-pages",
    archive: "flameonepage-gh-pages.zip",
    entry: "flameonepage-gh-pages/index.html",
  },
  "landing-studio-kreatif": {
    folder: "made",
    archive: "made.zip",
    entry: "made/index.html",
  },
  "landing-hotel": {
    folder: "royal-master",
    archive: "royal-master.zip",
    entry: "royal-master/index.html",
  },
  "landing-restoran-modern": {
    folder: "tasty-master",
    archive: "tasty-master.zip",
    entry: "tasty-master/index.html",
  },
  "landing-kafe-menu": {
    folder: "website-menu-03",
    archive: "website-menu-03.zip",
    entry: "website-menu-03/index.html",
  },
  "dashboard-admin": {
    folder: "adminator",
    archive: "adminator.zip",
    entry: "index.html",
  },
  "dashboard-operasional": {
    folder: "shadcn-admin-main",
    archive: "shadcn-admin-main.zip",
    entry: "shadcn-admin-main/index.html",
  },
  "auth-login-minimal": {
    folder: "login-form-02",
    archive: "login-form-02.zip",
    entry: "login-form-02/index.html",
  },
  "auth-login-split": {
    folder: "login-form-20",
    archive: "login-form-20.zip",
    entry: "login-form-20/index.html",
  },
  "auth-login-gradasi": {
    folder: "login-form-v16",
    archive: "login-form-v16.zip",
    entry: "Login_v16/index.html",
  },
};

export function getTemplateSource(templateId: string): TemplateSource | undefined {
  return TEMPLATE_SOURCES[templateId];
}
