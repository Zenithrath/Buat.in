// Central template registry

import type { Node, NodeProps } from "@/lib/schema/types";

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
  createNodes: () => RawTemplateNode[];
}

import { createSaasLandingNodes } from "./landing/saas";
import { createStorefrontNodes } from "./landing/storefront";
import { createAnalyticsDashboardNodes } from "./dashboard/analytics";

export const templateRegistry: TemplateDefinition[] = [
  {
    id: "landing-saas",
    name: "SaaS Landing Page",
    description: "Template landing page untuk produk SaaS dengan hero, tentang, statistik, dan CTA.",
    category: "landing",
    tier: "free",
    tags: ["saas", "startup", "landing", "produk"],
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
    id: "dashboard-analytics",
    name: "Analytics Dashboard",
    description: "Dashboard admin komprehensif dengan sidebar, header, KPI cards, chart, dan data table.",
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
