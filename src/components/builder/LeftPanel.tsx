"use client";

import { useMemo, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import {
  LayoutTemplate,
  Blocks,
  Image as ImageIcon,
  Search,
  Crown,
  CheckCircle2,
  X,
  type LucideIcon,
} from "lucide-react";
import { useBuilderStore } from "@/lib/store/project-store";
import { componentRegistry, CATEGORY_LABELS } from "@/lib/registry";
import { templateRegistry, TEMPLATE_CATEGORY_LABELS } from "@/templates";
import type { ComponentManifest } from "@/lib/registry/types";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────
   Panel tabs — Templates | Components | Assets
───────────────────────────────────────────── */
type PanelTab = "templates" | "components" | "assets";

const PANEL_TABS: { id: PanelTab; icon: LucideIcon; label: string }[] = [
  { id: "templates", icon: LayoutTemplate, label: "Template" },
  { id: "components", icon: Blocks, label: "Komponen" },
  { id: "assets", icon: ImageIcon, label: "Gambar" },
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
  const sections = useBuilderStore((s) => s.document.pages[0].sections);

  const name = manifest.name.toLowerCase();
  const desc = manifest.description.toLowerCase();
  const q = search.toLowerCase();
  if (q && !name.includes(q) && !desc.includes(q)) return null;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onDoubleClick={() => addSection(manifest.id, sections.length)}
      title={`Seret ke kanvas atau klik dua kali untuk menambahkan\n${manifest.description}`}
      className={cn(
        "group relative flex items-center gap-2.5 rounded-lg border border-border bg-card px-2.5 py-2 cursor-grab",
        "hover:border-primary/50 hover:bg-primary/5 hover:shadow-sm transition-all text-left",
        isDragging && "opacity-50 ring-2 ring-primary"
      )}
    >
      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
        <Blocks size={14} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1 min-w-0">
          <p className="text-[11px] font-semibold text-foreground truncate">{manifest.name}</p>
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
      {/* Search */}
      <div className="relative">
        <Search size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari template..."
          className="w-full rounded-lg border border-border bg-muted/50 py-1.5 pl-7 pr-3 text-[11px] placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
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
              "rounded-full px-2.5 py-0.5 text-[10px] font-semibold transition-all",
              filter === cat
                ? "bg-primary text-white shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
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
            <button
              key={tmpl.id}
              onClick={() => handleApply(tmpl.id)}
              className={cn(
                "group relative w-full rounded-xl border bg-card p-3 text-left transition-all",
                "hover:border-primary/50 hover:shadow-md hover:bg-primary/5",
                applied === tmpl.id ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" : "border-border"
              )}
            >
              {/* Thumbnail placeholder */}
              <div className="mb-2.5 flex h-20 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-border/50 text-primary">
                {tmpl.category === "dashboard" ? (
                  <svg viewBox="0 0 80 48" className="w-16 opacity-70" fill="none">
                    <rect x="0" y="0" width="20" height="48" rx="2" fill="currentColor" opacity="0.15" />
                    <rect x="22" y="0" width="58" height="10" rx="2" fill="currentColor" opacity="0.1" />
                    <rect x="22" y="12" width="26" height="14" rx="2" fill="currentColor" opacity="0.2" />
                    <rect x="52" y="12" width="28" height="14" rx="2" fill="currentColor" opacity="0.2" />
                    <rect x="22" y="28" width="58" height="18" rx="2" fill="currentColor" opacity="0.12" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 80 48" className="w-16 opacity-70" fill="none">
                    <rect x="10" y="0" width="60" height="8" rx="2" fill="currentColor" opacity="0.15" />
                    <rect x="15" y="10" width="50" height="18" rx="2" fill="currentColor" opacity="0.2" />
                    <rect x="20" y="30" width="40" height="6" rx="2" fill="currentColor" opacity="0.12" />
                    <rect x="25" y="38" width="30" height="8" rx="2" fill="currentColor" opacity="0.18" />
                  </svg>
                )}
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
                  <span key={tag} className="rounded-full bg-muted px-1.5 py-0 text-[8px] font-medium text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>

              {applied === tmpl.id ? (
                <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-emerald-500/10 backdrop-blur-sm">
                  <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs">
                    <CheckCircle2 size={16} /> Template diterapkan!
                  </div>
                </div>
              ) : null}
            </button>
          ))
        )}
      </div>
    </div>
  );
}

/* ─── Components panel ────────────────────── */
function ComponentsPanel() {
  const [search, setSearch] = useState("");

  const grouped = useMemo(() => {
    const map = new Map<string, ComponentManifest[]>();
    componentRegistry.forEach((c) => {
      const cat = c.category;
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(c);
    });
    return map;
  }, []);

  return (
    <div className="flex flex-col gap-2 px-3 py-3">
      <div className="relative">
        <Search size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari komponen..."
          className="w-full rounded-lg border border-border bg-muted/50 py-1.5 pl-7 pr-3 text-[11px] placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            <X size={10} />
          </button>
        )}
      </div>
      <p className="text-[9px] text-muted-foreground">
        Seret ke kanvas atau klik dua kali untuk menambahkan komponen.
      </p>
      {Array.from(grouped.entries()).map(([cat, items]) => {
        const anyMatch = items.some((c) => {
          const q = search.toLowerCase();
          return !q || c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q);
        });
        if (!anyMatch) return null;
        return (
          <div key={cat}>
            <p className="mb-1.5 mt-2 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
              {CATEGORY_LABELS[cat as keyof typeof CATEGORY_LABELS] ?? cat}
            </p>
            <div className="flex flex-col gap-1.5">
              {items.map((m) => (
                <DraggableComponent key={m.id} manifest={m} search={search} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Assets panel ────────────────────────── */
function AssetsPanel() {
  const [uploaded, setUploaded] = useState<{ name: string; url: string }[]>([]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    files.forEach((f) => {
      const url = URL.createObjectURL(f);
      setUploaded((prev) => [...prev, { name: f.name, url }]);
    });
  }

  return (
    <div className="flex flex-col gap-3 px-3 py-3">
      <label className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/30 py-7 cursor-pointer hover:border-primary/60 hover:bg-primary/5 transition-all">
        <ImageIcon size={22} className="text-muted-foreground" />
        <p className="text-[11px] font-semibold text-foreground">Unggah Gambar</p>
        <p className="text-[9px] text-muted-foreground">PNG, JPG, SVG, WebP</p>
        <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />
      </label>

      {uploaded.length === 0 ? (
        <p className="text-center text-[10px] text-muted-foreground py-4">
          Belum ada gambar diunggah
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {uploaded.map((a, i) => (
            <div
              key={i}
              className="group relative rounded-lg border overflow-hidden bg-muted/40 aspect-square cursor-pointer hover:ring-1 hover:ring-primary"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- pratinjau lokal via blob URL */}
              <img src={a.url} alt={a.name} className="h-full w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-black/50 px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-[9px] text-white truncate">{a.name}</p>
              </div>
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
    leftTab === "components" || leftTab === "assets" ? leftTab : "templates";

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
                "group relative flex h-9 w-9 flex-col items-center justify-center rounded-lg transition-all",
                activeTab === tab.id
                  ? "bg-primary text-white shadow-md shadow-primary/30"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon size={16} />
              {/* Tooltip */}
              <span className="absolute left-full ml-2 z-50 hidden group-hover:flex items-center whitespace-nowrap rounded-md bg-popover border border-border px-2 py-1 text-[10px] font-semibold text-popover-foreground shadow-lg">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Panel content */}
      <div className="flex-1 overflow-y-auto min-w-0">
        {activeTab === "templates" && <TemplatesPanel />}
        {activeTab === "components" && <ComponentsPanel />}
        {activeTab === "assets" && <AssetsPanel />}
      </div>
    </div>
  );
}