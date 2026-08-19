"use client";

import { useMemo, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import {
  LayoutTemplate,
  Blocks,
  PanelsTopLeft,
  Image as ImageIcon,
  Search,
  Crown,
  CheckCircle2,
  ChevronDown,
  X,
  type LucideIcon,
} from "lucide-react";
import { getActivePage, useBuilderStore } from "@/lib/store/project-store";
import { componentRegistry } from "@/lib/registry";
import { templateRegistry, TEMPLATE_CATEGORY_LABELS } from "@/templates";
import type { ComponentManifest } from "@/lib/registry/types";
import type { Asset } from "@/lib/schema/types";
import { uid } from "@/lib/utils";
import { TemplatePreview } from "./TemplatePreview";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────
   Panel tabs — Templates | Sections | Components | Assets
───────────────────────────────────────────── */
type PanelTab = "templates" | "sections" | "components" | "assets";

const PANEL_TABS: { id: PanelTab; icon: LucideIcon; label: string }[] = [
  { id: "templates", icon: LayoutTemplate, label: "Template" },
  { id: "sections", icon: PanelsTopLeft, label: "Section" },
  { id: "components", icon: Blocks, label: "Komponen" },
  { id: "assets", icon: ImageIcon, label: "Gambar" },
];

/* ─── Panel header ─────────────────────────── */
function PanelHeader({
  title,
  count,
}: {
  title: string;
  count?: number;
}) {
  return (
    <div className="flex items-center justify-between px-1">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        {title}
      </p>
      {typeof count === "number" ? (
        <span className="rounded-md border border-border bg-muted/50 px-1.5 py-0.5 text-[9px] font-semibold text-muted-foreground">
          {count}
        </span>
      ) : null}
    </div>
  );
}

/* ─── Komponen: nama ramah & kelompok kategori ── */
const FRIENDLY_NAMES: Record<string, string> = {
  "navbar-minimal": "Navbar Minimal",
  "navbar-centered": "Navbar Tengah",
  "navbar-split": "Navbar Dua Sisi",
  "navbar-glass": "Navbar Kaca (Glass)",
  "navbar-mega": "Navbar Mega Menu",
  "navbar-fullscreen": "Navbar Layar Penuh",
  "menu-offcanvas": "Menu Geser (Offcanvas)",
  "menu-circle": "Menu Melingkar",
  "dropdown-menu": "Menu Dropdown",
  "hero-centered": "Hero Pembuka",
  "hero-split": "Hero Terbelah (Split)",
  "hero-bg-image": "Hero Gambar Latar",
  "about-basic": "Bagian Tentang Kami",
  "card-feature": "Kartu Fitur",
  "product-grid-basic": "Katalog Produk",
  "gallery-grid": "Galeri Foto",
  "team-grid": "Kartu Tim",
  "testimonial-grid": "Kartu Testimoni",
  "stats-banner": "Statistik / Angka",
  "pricing-table": "Paket Harga",
  "faq-accordion": "FAQ / Pertanyaan",
  "form-contact": "Form Kontak",
  "form-newsletter": "Form Berlangganan",
  "cta-basic": "Ajakan Aksi (CTA)",
  "footer-basic": "Footer / Bagian Bawah",
  "modal-center": "Popup Tengah",
  "modal-sheet": "Panel Geser (Sheet)",
  "modal-confirm": "Dialog Konfirmasi",
  "grid-container": "Grid / Kolom",
  "section-basic": "Section Kosong",
  "app-sidebar": "Sidebar Aplikasi",
  "sidebar-icon": "Sidebar Ikon",
  "dashboard-header": "Header Dashboard",
  "kpi-card": "Kartu Statistik (KPI)",
  "chart-card": "Kartu Grafik",
  "data-table": "Tabel Data",
  "dashboard-activity-list": "Daftar Aktivitas",
};

type ComponentGroup = {
  id: string;
  label: string;
  scope: "landing" | "dashboard" | "both";
  ids: string[];
};

const COMPONENT_GROUPS: ComponentGroup[] = [
  { id: "navbar", label: "Navbar / Menu Atas", scope: "landing", ids: ["navbar-minimal", "navbar-centered", "navbar-split", "navbar-glass", "navbar-mega", "navbar-fullscreen"] },
  { id: "menu", label: "Menu & Dropdown", scope: "landing", ids: ["menu-offcanvas", "menu-circle", "dropdown-menu"] },
  { id: "hero", label: "Hero / Bagian Pembuka", scope: "landing", ids: ["hero-centered", "hero-split", "hero-bg-image"] },
  { id: "about", label: "Tentang Kami", scope: "landing", ids: ["about-basic"] },
  { id: "cards", label: "Kartu", scope: "landing", ids: ["card-feature"] },
  { id: "product", label: "Produk & Katalog", scope: "landing", ids: ["product-grid-basic"] },
  { id: "gallery", label: "Galeri", scope: "landing", ids: ["gallery-grid"] },
  { id: "team", label: "Tim", scope: "landing", ids: ["team-grid"] },
  { id: "testimonial", label: "Testimoni", scope: "landing", ids: ["testimonial-grid"] },
  { id: "stats", label: "Statistik", scope: "landing", ids: ["stats-banner"] },
  { id: "pricing", label: "Harga", scope: "landing", ids: ["pricing-table"] },
  { id: "faq", label: "FAQ / Pertanyaan", scope: "landing", ids: ["faq-accordion"] },
  { id: "form", label: "Formulir", scope: "landing", ids: ["form-contact", "form-newsletter"] },
  { id: "cta", label: "Ajakan Aksi (CTA)", scope: "landing", ids: ["cta-basic"] },
  { id: "footer", label: "Footer / Bagian Bawah", scope: "landing", ids: ["footer-basic"] },
  { id: "modal", label: "Popup / Modal", scope: "both", ids: ["modal-center", "modal-sheet", "modal-confirm"] },
  { id: "layout", label: "Tata Letak / Grid", scope: "both", ids: ["grid-container"] },
  { id: "section", label: "Section / Bagian", scope: "both", ids: ["section-basic"] },
  { id: "sidebar", label: "Sidebar / Menu Samping", scope: "dashboard", ids: ["app-sidebar", "sidebar-icon"] },
  { id: "dash-header", label: "Header Dashboard", scope: "dashboard", ids: ["dashboard-header"] },
  { id: "kpi", label: "Kartu Statistik (KPI)", scope: "dashboard", ids: ["kpi-card"] },
  { id: "chart", label: "Grafik", scope: "dashboard", ids: ["chart-card"] },
  { id: "table", label: "Tabel Data", scope: "dashboard", ids: ["data-table"] },
  { id: "activity", label: "Daftar Aktivitas", scope: "dashboard", ids: ["dashboard-activity-list"] },
];

/* ─── Component drag item ──────────────────── */
function DraggableComponent({
  manifest,
  search,
}: {
  manifest: ComponentManifest;
  search: string;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `drag-new-${manifest.id}`,
    data: { type: "new", componentType: manifest.id },
  });

  const addSection = useBuilderStore((s) => s.addSection);
  const sections = useBuilderStore((s) =>
    getActivePage(s.document, s.activePageId).sections
  );

  const name = FRIENDLY_NAMES[manifest.id] ?? manifest.name;
  const q = search.toLowerCase();
  if (q && !name.toLowerCase().includes(q) && !manifest.description.toLowerCase().includes(q)) return null;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onDoubleClick={() => addSection(manifest.id, sections.length)}
      title={`Seret ke kanvas atau klik dua kali untuk menambahkan\n${manifest.description}`}
      className={cn(
        "group relative flex items-center gap-2.5 rounded-md border border-border bg-card px-2.5 py-2 cursor-grab",
        "hover:border-brand/50 hover:bg-brand/5 transition-all text-left",
        isDragging && "opacity-50 ring-2 ring-brand"
      )}
    >
      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-brand/10 text-brand">
        <Blocks size={14} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1 min-w-0">
          <p className="text-[11px] font-semibold text-foreground truncate">{name}</p>
          {manifest.tier === "pro" && (
            <span className="ml-auto shrink-0 flex items-center gap-0.5 rounded px-1 py-0 bg-amber-500/15 text-amber-600 text-[9px] font-bold">
              <Crown size={9} />PRO
            </span>
          )}
        </div>
        <p className="text-[9px] text-muted-foreground leading-tight truncate">
          {manifest.description}
        </p>
      </div>
    </div>
  );
}

/* ─── Sections panel ──────────────────────── */
const SECTION_COMPONENT_IDS = ["section-basic", "grid-container"];

function SectionsPanel() {
  const sectionItems = componentRegistry.filter((c) =>
    SECTION_COMPONENT_IDS.includes(c.id)
  );

  return (
    <div className="flex flex-col gap-3 px-3 py-3">
      <PanelHeader title="Section" count={sectionItems.length} />
      <p className="rounded-md bg-muted/60 px-2.5 py-2 text-[9.5px] leading-4 text-muted-foreground">
        Section adalah kerangka halaman. Tambahkan section kosong, lalu isi
        dengan komponen lain (seret ke kanvas atau klik dua kali).
      </p>
      <div className="flex flex-col gap-1.5">
        {sectionItems.map((manifest) => (
          <DraggableComponent key={manifest.id} manifest={manifest} search="" />
        ))}
      </div>
    </div>
  );
}

/* ─── Templates panel ─────────────────────── */
function TemplatesPanel() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "landing" | "dashboard">("all");
  const applyTemplate = useBuilderStore((s) => s.applyTemplate);
  const [applied, setApplied] = useState<string | null>(null);

  const filtered = templateRegistry.filter((t) => {
    const q = search.toLowerCase();
    const matchQ = !q || t.name.toLowerCase().includes(q) || t.tags.some((tag) => tag.includes(q));
    const matchFilter = filter === "all" || t.category === filter;
    return matchQ && matchFilter;
  });

  function handleApply(templateId: string) {
    if (typeof applyTemplate === "function") applyTemplate(templateId);
    setApplied(templateId);
    setTimeout(() => setApplied(null), 2000);
  }

  return (
    <div className="flex flex-col gap-3 px-3 py-3">
      <PanelHeader title="Template" count={filtered.length} />
      {/* Search */}
      <div className="relative">
        <Search size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari template..."
          className="w-full rounded-md border border-border bg-muted/50 py-1.5 pl-7 pr-3 text-[11px] placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-brand"
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-brand">
            <X size={10} />
          </button>
        )}
      </div>

      {/* Category filter pills */}
      <div className="flex gap-1.5">
        {(["all", "landing", "dashboard"] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={cn(
              "rounded-md px-2.5 py-1 text-[10px] font-semibold transition-colors",
              filter === cat
                ? "bg-brand text-brand-foreground"
                : "bg-muted text-muted-foreground hover:bg-brand/10 hover:text-brand"
            )}
          >
            {cat === "all" ? "Semua" : TEMPLATE_CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Template cards */}
      <div className="flex flex-col gap-2">
        {filtered.length === 0 ? (
          <p className="text-center text-[11px] text-muted-foreground py-6">
            Tidak ada template yang sesuai
          </p>
        ) : (
          filtered.map((tmpl) => (
            <div
              key={tmpl.id}
              role="button"
              tabIndex={0}
              onClick={() => handleApply(tmpl.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleApply(tmpl.id);
                }
              }}
              className={cn(
                "group relative w-full cursor-pointer rounded-lg border bg-card p-3 text-left transition-colors",
                "hover:border-brand/40 hover:bg-brand/5",
                applied === tmpl.id ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" : "border-border"
              )}
            >
              <div className="pointer-events-none mb-2.5 h-40 select-none overflow-hidden rounded-md border border-border/50 bg-card">
                <TemplatePreview template={tmpl} />
              </div>

              <div className="flex items-start justify-between gap-1">
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-foreground leading-tight">{tmpl.name}</p>
                  <p className="text-[9px] text-muted-foreground mt-0.5 leading-snug line-clamp-2">
                    {tmpl.description}
                  </p>
                </div>
                {tmpl.tier === "pro" && (
                  <span className="shrink-0 flex items-center gap-0.5 rounded px-1.5 py-0.5 bg-amber-500/15 text-amber-600 text-[9px] font-bold">
                    <Crown size={9} />PRO
                  </span>
                )}
              </div>

              {/* Tags */}
              <div className="mt-1.5 flex flex-wrap gap-1">
                {tmpl.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="rounded-md bg-muted px-1.5 py-0.5 text-[8px] font-medium text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>

              {applied === tmpl.id ? (
                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-emerald-500/10 backdrop-blur-sm">
                  <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs">
                    <CheckCircle2 size={16} /> Template diterapkan!
                  </div>
                </div>
              ) : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ─── Components panel ────────────────────── */
function ComponentsPanel() {
  const [search, setSearch] = useState("");
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());
  const projectType = useBuilderStore((s) => s.document.projectType);

  const visibleGroups = useMemo(() => {
    return COMPONENT_GROUPS.filter((group) => {
      if (group.scope !== "both" && group.scope !== projectType) return false;
      const q = search.toLowerCase();
      return group.ids.some((id) => {
        if (q) {
          const manifest = componentRegistry.find((c) => c.id === id);
          if (!manifest) return false;
          const name = (FRIENDLY_NAMES[id] ?? manifest.name).toLowerCase();
          if (!name.includes(q) && !manifest.description.toLowerCase().includes(q)) return false;
        }
        return true;
      });
    });
  }, [projectType, search]);

  function toggleGroup(id: string) {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="flex flex-col gap-2 px-3 py-3">
      <PanelHeader title="Komponen" />
      <div className="relative">
        <Search size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari komponen..."
          className="w-full rounded-md border border-border bg-muted/50 py-1.5 pl-7 pr-3 text-[11px] placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-brand"
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-brand">
            <X size={10} />
          </button>
        )}
      </div>
      <p className="text-[9px] text-muted-foreground">
        Komponen untuk {projectType === "dashboard" ? "dashboard" : "landing page"}. Klik kategori untuk melihat pilihan desainnya.
      </p>

      {visibleGroups.length === 0 ? (
        <p className="py-6 text-center text-[11px] text-muted-foreground">
          Tidak ada komponen yang sesuai
        </p>
      ) : (
        <div className="flex flex-col gap-1.5">
          {visibleGroups.map((group) => {
            const open = openGroups.has(group.id);
            const items = componentRegistry.filter((c) => group.ids.includes(c.id));
            return (
              <div key={group.id} className="overflow-hidden rounded-md border border-border bg-card">
                <button
                  onClick={() => toggleGroup(group.id)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-2 px-2.5 py-2 text-left transition-colors hover:bg-brand/5"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-foreground">
                    {group.label}
                  </span>
                  <span className="flex shrink-0 items-center gap-1.5">
                    <span className="rounded-md bg-muted px-1.5 py-0.5 text-[9px] font-semibold text-muted-foreground">
                      {items.length}
                    </span>
                    <ChevronDown
                      size={13}
                      className={cn(
                        "text-muted-foreground transition-transform duration-200",
                        open && "rotate-180 text-brand"
                      )}
                    />
                  </span>
                </button>
                {open ? (
                  <div className="flex flex-col gap-1.5 border-t border-border p-1.5">
                    {items.map((manifest) => (
                      <DraggableComponent key={manifest.id} manifest={manifest} search={search} />
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── Assets panel ────────────────────────── */
function AssetsPanel() {
  const assets = useBuilderStore((s) => s.document.assets);
  const addAssets = useBuilderStore((s) => s.addAssets);
  const removeAsset = useBuilderStore((s) => s.removeAsset);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const readers = files.map(
      (file) =>
        new Promise<Asset | null>((resolve) => {
          if (!file.type.startsWith("image/")) {
            resolve(null);
            return;
          }
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              id: uid(),
              url: String(reader.result ?? ""),
              fileName: file.name,
              mimeType: file.type,
              size: file.size,
              width: 0,
              height: 0,
            });
          };
          reader.onerror = () => resolve(null);
          reader.readAsDataURL(file);
        })
    );
    Promise.all(readers).then((results) => {
      const fresh = results.filter((asset): asset is Asset => asset !== null);
      if (fresh.length > 0) addAssets(fresh);
      if (fresh.length < files.length) {
        setError("Beberapa file dilewati — hanya gambar (PNG, JPG, WebP, SVG, GIF) yang bisa diunggah.");
        setTimeout(() => setError(null), 4000);
      }
    });
    e.target.value = "";
  }

  async function copyAsset(asset: Asset) {
    try {
      await navigator.clipboard.writeText(asset.url);
      setCopiedId(asset.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setError("Gagal menyalin — gunakan browser yang mendukung clipboard.");
      setTimeout(() => setError(null), 4000);
    }
  }

  function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return (
    <div className="flex flex-col gap-3 px-3 py-3">
      <PanelHeader title="Gambar" />
      <label className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/30 py-7 cursor-pointer hover:border-brand/60 hover:bg-brand/5 transition-colors">
        <ImageIcon size={22} className="text-muted-foreground" />
        <p className="text-[11px] font-semibold text-foreground">Unggah Gambar</p>
        <p className="text-[9px] text-muted-foreground">PNG, JPG, SVG, WebP, GIF</p>
        <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />
      </label>
      <p className="rounded-md bg-muted/60 px-2.5 py-2 text-[9.5px] leading-4 text-muted-foreground">
        Klik gambar di bawah untuk menyalin URL-nya, lalu tempel di kolom gambar komponen (klik gambar di kanvas → tempel URL).
      </p>

      {error ? <p className="rounded-md bg-rose-500/10 px-2.5 py-2 text-[10px] text-rose-600">{error}</p> : null}

      {assets.length === 0 ? (
        <p className="text-center text-[10px] text-muted-foreground py-4">
          Belum ada gambar diunggah
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="group relative rounded-md border overflow-hidden bg-muted/40 aspect-square cursor-pointer hover:ring-1 hover:ring-brand"
              onClick={() => copyAsset(asset)}
              title="Klik untuk menyalin URL gambar"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- pratinjau lokal via data URL */}
              <img src={asset.url} alt={asset.fileName} className="h-full w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-black/60 px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-[9px] text-white truncate">{asset.fileName}</p>
                <p className="text-[8px] text-white/70">{formatSize(asset.size)}</p>
              </div>
              <span
                className={`absolute inset-x-0 top-0 bg-brand px-1.5 py-1 text-center text-[9px] font-bold text-brand-foreground transition-opacity ${
                  copiedId === asset.id ? "opacity-100" : "opacity-0"
                }`}
              >
                Disalin!
              </span>
              <button
                type="button"
                aria-label={`Hapus ${asset.fileName}`}
                title="Hapus gambar"
                onClick={(event) => {
                  event.stopPropagation();
                  removeAsset(asset.id);
                }}
                className="absolute right-1 top-1 grid size-5 place-items-center rounded-md bg-black/50 text-white opacity-0 transition-opacity hover:bg-black/75 group-hover:opacity-100"
              >
                <X size={11} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Main LeftPanel component ────────────── */
export function LeftPanel() {
  const leftTab = useBuilderStore((s) => s.leftTab);
  const setLeftTab = useBuilderStore((s) => s.setLeftTab);
  const activeTab: PanelTab =
    leftTab === "components" || leftTab === "assets" || leftTab === "sections"
      ? leftTab
      : "templates";

  return (
    <div className="flex h-full">
      {/* Icon rail */}
      <div className="flex w-12 shrink-0 flex-col items-center gap-1.5 border-r border-border bg-card/80 py-3">
        {PANEL_TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setLeftTab(tab.id)}
              title={tab.label}
              className={cn(
                "group relative flex h-9 w-9 flex-col items-center justify-center rounded-md transition-colors",
                activeTab === tab.id
                  ? "bg-brand text-brand-foreground"
                  : "text-muted-foreground hover:bg-brand/10 hover:text-brand"
              )}
            >
              <Icon size={16} />
              {/* Tooltip */}
              <span className="absolute left-full ml-2 z-50 hidden group-hover:flex items-center whitespace-nowrap rounded-md bg-popover border border-border px-2 py-1 text-[10px] font-semibold text-popover-foreground shadow-sm">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Panel content */}
      <div className="flex-1 overflow-y-auto min-w-0">
        {activeTab === "templates" && <TemplatesPanel />}
        {activeTab === "sections" && <SectionsPanel />}
        {activeTab === "components" && <ComponentsPanel />}
        {activeTab === "assets" && <AssetsPanel />}
      </div>
    </div>
  );
}
