"use client";

import { useState } from "react";
import { useBuilderStore } from "@/lib/store/project-store";
import {
  createDashboardTemplate,
  createTemplateProject,
} from "@/lib/schema/defaults";
import { Layout, LayoutDashboard, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TemplateItem {
  id: string;
  name: string;
  type: "landing" | "dashboard";
  category: string;
  description: string;
  tier: "free" | "pro";
  tags: string[];
}

const TEMPLATES: TemplateItem[] = [
  {
    id: "landing-toko",
    name: "Storefront & E-Commerce",
    type: "landing",
    category: "Store",
    description: "Landing page toko lengkap: navbar, hero, catalog produk, promo, dan footer.",
    tier: "free",
    tags: ["toko", "produk", "jualan"],
  },
  {
    id: "landing-saas",
    name: "SaaS & App Platform",
    type: "landing",
    category: "SaaS",
    description: "Halaman penawaran produk software dengan hero split, fitur, harga, dan CTA.",
    tier: "free",
    tags: ["saas", "software", "startup"],
  },
  {
    id: "landing-portfolio",
    name: "Portofolio Kreatif",
    type: "landing",
    category: "Personal",
    description: "Showcase karya profesional, bio singkat, statistik, dan kontak.",
    tier: "pro",
    tags: ["desainer", "karya", "personal"],
  },
  {
    id: "dashboard-analytics",
    name: "Analytics & Admin Overview",
    type: "dashboard",
    category: "Analytics",
    description: "Dashboard lengkap: sidebar navigasi, header, KPI metric, chart area & data table.",
    tier: "free",
    tags: ["analytics", "admin", "kpi"],
  },
  {
    id: "dashboard-crm",
    name: "CRM & Sales Dashboard",
    type: "dashboard",
    category: "Sales",
    description: "Dashboard pengelolaan pelanggan, statistik penjualan, dan transaksi terbaru.",
    tier: "pro",
    tags: ["crm", "sales", "finance"],
  },
];

export function TemplatesPanel() {
  const [tab, setTab] = useState<"landing" | "dashboard">("landing");
  const setDocument = useBuilderStore((s) => s.setDocument);
  const projectId = useBuilderStore((s) => s.document.projectId);

  const applyTemplate = (tmpl: TemplateItem) => {
    const doc =
      tmpl.type === "dashboard"
        ? createDashboardTemplate(projectId)
        : createTemplateProject(projectId, "landing");
    setDocument(doc);
  };

  const filtered = TEMPLATES.filter((t) => t.type === tab);

  return (
    <div className="space-y-4 p-1">
      <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
        <button
          type="button"
          onClick={() => setTab("landing")}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-semibold transition-colors ${
            tab === "landing" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
          }`}
        >
          <Layout size={13} /> Landing Page
        </button>
        <button
          type="button"
          onClick={() => setTab("dashboard")}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-semibold transition-colors ${
            tab === "dashboard" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
          }`}
        >
          <LayoutDashboard size={13} /> Dashboard
        </button>
      </div>

      <p className="text-[11px] text-muted-foreground">
        Template adalah komposisi utuh yang sepenuhnya dapat diubah: edit teks, warna, komponen, dan tata letak.
      </p>

      <div className="space-y-3">
        {filtered.map((tmpl) => (
          <div
            key={tmpl.id}
            className="group flex flex-col rounded-xl border bg-card p-3.5 transition-all hover:border-primary hover:shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground">{tmpl.name}</span>
              {tmpl.tier === "pro" ? (
                <Badge variant="brand">Pro</Badge>
              ) : (
                <Badge>Gratis</Badge>
              )}
            </div>
            <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
              {tmpl.description}
            </p>
            <div className="mt-2.5 flex flex-wrap gap-1">
              {tmpl.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-muted px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => applyTemplate(tmpl)}
              className="mt-3 flex items-center justify-center gap-1.5 rounded-md bg-primary/10 py-1.5 text-xs font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
            >
              <span>Gunakan Template</span>
              <ArrowRight size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
