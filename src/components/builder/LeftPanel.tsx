"use client";

import { useMemo, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import {
  Copy,
  Trash2,
  Sparkles,
  ShoppingBag,
  Info,
  Megaphone,
  PanelBottom,
  Navigation,
  Blocks,
  FileText,
  Image as ImageIcon,
  Palette,
  Search,
  Boxes,
} from "lucide-react";
import {
  componentRegistry,
  CATEGORY_LABELS,
  type ComponentCategory,
} from "@/lib/registry";
import {
  blockRegistry,
  BLOCK_CATEGORY_LABELS,
  buildBlockNodes,
  type BlockCategory,
} from "@/lib/blocks";
import {
  useBuilderStore,
  type LeftTab,
} from "@/lib/store/project-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/controls";
import { Badge } from "@/components/ui/badge";
import { ThemeCustomizer } from "./ThemeCustomizer";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const CATEGORY_ICONS: Record<ComponentCategory, React.ReactNode> = {
  navbar: <Navigation size={14} />,
  hero: <Sparkles size={14} />,
  product: <ShoppingBag size={14} />,
  about: <Info size={14} />,
  cta: <Megaphone size={14} />,
  footer: <PanelBottom size={14} />,
};

const RAIL: { id: LeftTab; label: string; hint: string; icon: React.ReactNode }[] = [
  { id: "pages", label: "Halaman", hint: "Halaman & lapisan komponen", icon: <FileText size={16} /> },
  { id: "components", label: "Komponen", hint: "Tambahkan komponen ke halaman", icon: <Boxes size={16} /> },
  { id: "blocks", label: "Blok", hint: "Template halaman siap pakai", icon: <Blocks size={16} /> },
  { id: "style", label: "Style", hint: "Warna, border, tipografi", icon: <Palette size={16} /> },
  { id: "assets", label: "Aset", hint: "Gambar & file project", icon: <ImageIcon size={16} /> },
];

function ComponentCard({ componentId }: { componentId: string }) {
  const manifest = componentRegistry.find((c) => c.id === componentId)!;
  const addSection = useBuilderStore((s) => s.addSection);
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `new:${componentId}`,
    data: { type: "new", componentType: componentId },
  });

  return (
    <button
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      type="button"
      onClick={() => addSection(componentId)}
      className={cn(
        "flex w-full items-start gap-2.5 rounded-lg border bg-card p-2.5 text-left transition-colors hover:border-brand hover:bg-brand/5 active:cursor-grabbing",
        isDragging && "opacity-40"
      )}
    >
      <span className="mt-0.5 rounded-md bg-muted p-1.5 text-muted-foreground">
        {CATEGORY_ICONS[manifest.category]}
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-1.5">
          <span className="truncate text-[13px] font-medium text-foreground">
            {manifest.name}
          </span>
          {manifest.tier === "pro" ? <Badge variant="brand">Pro</Badge> : null}
        </span>
        <span className="mt-0.5 line-clamp-2 block text-[11px] leading-snug text-muted-foreground">
          {manifest.description}
        </span>
      </span>
    </button>
  );
}

export function LeftPanel() {
  const leftTab = useBuilderStore((s) => s.leftTab);
  const setLeftTab = useBuilderStore((s) => s.setLeftTab);
  const sections = useBuilderStore((s) => s.document.pages[0].sections);
  const pageName = useBuilderStore((s) => s.document.pages[0].name);
  const selectedId = useBuilderStore((s) => s.selectedId);
  const select = useBuilderStore((s) => s.select);
  const duplicateSection = useBuilderStore((s) => s.duplicateSection);
  const removeSection = useBuilderStore((s) => s.removeSection);
  const addBlock = useBuilderStore((s) => s.addBlock);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ComponentCategory | "all">("all");
  const [tier, setTier] = useState<"all" | "free" | "pro">("all");

  const categories = useMemo(
    () => [...new Set(componentRegistry.map((c) => c.category))],
    []
  );

  const filtered = useMemo(
    () =>
      componentRegistry.filter((c) => {
        if (category !== "all" && c.category !== category) return false;
        if (tier !== "all" && c.tier !== tier) return false;
        if (!query.trim()) return true;
        const q = query.toLowerCase();
        return (
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
        );
      }),
    [category, tier, query]
  );

  const blockCategories = useMemo(
    () => [...new Set(blockRegistry.map((b) => b.category))],
    []
  );

  return (
    <div className="flex shrink-0 border-r bg-background">
      <div className="flex w-12 shrink-0 flex-col items-center gap-1 border-r bg-muted/40 py-2">
        {RAIL.map((item) => (
          <Tooltip key={item.id}>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => setLeftTab(item.id)}
                aria-label={item.hint}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-md transition-colors",
                  leftTab === item.id
                    ? "bg-card text-foreground shadow-sm ring-1 ring-border"
                    : "text-muted-foreground hover:bg-card hover:text-foreground"
                )}
              >
                {item.icon}
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">{item.label}</TooltipContent>
          </Tooltip>
        ))}
      </div>

      <div className="flex w-64 shrink-0 flex-col">
        <div className="border-b px-3 py-2">
          <p className="text-xs font-semibold text-foreground">
            {RAIL.find((r) => r.id === leftTab)?.label}
          </p>
          <p className="text-[10px] text-muted-foreground">
            {RAIL.find((r) => r.id === leftTab)?.hint}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          {leftTab === "pages" ? (
            <div className="space-y-4">
              <div>
                <h3 className="mb-1.5 px-0.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Halaman
                </h3>
                <div className="flex items-center gap-2 rounded-md border border-border bg-card px-2 py-2">
                  <FileText size={14} className="text-muted-foreground" />
                  <span className="text-[13px] font-medium text-foreground">
                    {pageName}
                  </span>
                  <Badge className="ml-auto">{sections.length}</Badge>
                </div>
                <p className="pt-2 text-center text-[11px] text-muted-foreground">
                  Halaman tambahan segera hadir.
                </p>
              </div>

              <div>
                <h3 className="mb-1.5 px-0.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Lapisan
                </h3>
                {sections.length === 0 ? (
                  <p className="py-6 text-center text-xs text-muted-foreground">
                    Belum ada komponen di halaman ini.
                  </p>
                ) : (
                  <div className="space-y-1">
                    {sections.map((section, index) => {
                      const manifest = componentRegistry.find(
                        (c) => c.id === section.componentType
                      );
                      const active = selectedId === section.id;
                      return (
                        <div
                          key={section.id}
                          onClick={() => select(section.id)}
                          className={cn(
                            "group flex cursor-pointer items-center gap-2 rounded-md border px-2 py-1.5 transition-colors",
                            active
                              ? "border-brand bg-brand/10"
                              : "border-transparent hover:bg-muted"
                          )}
                        >
                          <span className="flex h-6 w-6 items-center justify-center rounded bg-muted text-muted-foreground">
                            {manifest ? CATEGORY_ICONS[manifest.category] : null}
                          </span>
                          <span className="flex-1 truncate text-[13px] text-foreground">
                            {index + 1}. {manifest?.name ?? section.componentType}
                          </span>
                          <span className="hidden items-center gap-0.5 group-hover:flex">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                duplicateSection(section.id);
                              }}
                              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                              title="Duplikat"
                            >
                              <Copy size={12} />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeSection(section.id);
                              }}
                              className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                              title="Hapus"
                            >
                              <Trash2 size={12} />
                            </button>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
                {sections.length > 0 ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-3 w-full text-muted-foreground hover:text-foreground"
                    onClick={() => {
                      const last = sections[sections.length - 1];
                      duplicateSection(last.id);
                    }}
                  >
                    <Copy size={12} /> Duplikat komponen terakhir
                  </Button>
                ) : null}
              </div>
            </div>
          ) : null}

          {leftTab === "components" ? (
            <div className="space-y-3">
              <div className="relative">
                <Search
                  size={13}
                  className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari komponen..."
                  className="h-8 pl-8"
                />
              </div>
              <div className="flex flex-wrap gap-1">
                <button
                  type="button"
                  onClick={() => setCategory("all")}
                  className={cn(
                    "rounded-full border px-2 py-0.5 text-[10px] font-medium transition-colors",
                    category === "all"
                      ? "border-brand bg-brand/10 text-brand-foreground"
                      : "text-muted-foreground hover:border-muted"
                  )}
                >
                  Semua
                </button>
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={cn(
                      "rounded-full border px-2 py-0.5 text-[10px] font-medium transition-colors",
                      category === c
                        ? "border-brand bg-brand/10 text-brand-foreground"
                        : "text-muted-foreground hover:border-muted"
                    )}
                  >
                    {CATEGORY_LABELS[c]}
                  </button>
                ))}
              </div>
              <div className="flex gap-1">
                {(["all", "free", "pro"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTier(t)}
                    className={cn(
                      "rounded-md border px-2 py-0.5 text-[10px] font-medium capitalize transition-colors",
                      tier === t
                        ? "border-brand bg-brand/10 text-brand-foreground"
                        : "text-muted-foreground hover:border-muted"
                    )}
                  >
                    {t === "all" ? "Semua" : t === "free" ? "Gratis" : "Pro"}
                  </button>
                ))}
              </div>
              <div className="space-y-1.5">
                {filtered.map((c) => (
                  <ComponentCard key={c.id} componentId={c.id} />
                ))}
                {filtered.length === 0 ? (
                  <p className="py-6 text-center text-xs text-muted-foreground">
                    Tidak ada komponen yang cocok.
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}

          {leftTab === "blocks" ? (
            <div className="space-y-4">
              <p className="px-0.5 text-[11px] text-muted-foreground">
                Blok adalah kumpulan komponen siap pakai. Klik untuk menambah
                seluruh halaman sekaligus.
              </p>
              {blockCategories.map((bc) => (
                <div key={bc}>
                  <h3 className="mb-1.5 px-0.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {BLOCK_CATEGORY_LABELS[bc as BlockCategory]}
                  </h3>
                  <div className="space-y-1.5">
                    {blockRegistry
                      .filter((b) => b.category === bc)
                      .map((block) => (
                        <button
                          key={block.id}
                          type="button"
                          onClick={() => addBlock(buildBlockNodes(block))}
                          className="w-full rounded-lg border bg-card p-2.5 text-left transition-colors hover:border-brand hover:bg-brand/5"
                        >
                          <span className="flex items-center justify-between">
                            <span className="text-[13px] font-medium text-foreground">
                              {block.name}
                            </span>
                            {block.tier === "pro" ? (
                              <Badge variant="brand">Pro</Badge>
                            ) : (
                              <Badge>Gratis</Badge>
                            )}
                          </span>
                          <span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground">
                            {block.description}
                          </span>
                          <span className="mt-1.5 flex flex-wrap gap-1">
                            {block.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-muted px-1.5 py-0.5 text-[9px] text-muted-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                          </span>
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {leftTab === "style" ? <ThemeCustomizer /> : null}

          {leftTab === "assets" ? (
            <div className="flex flex-col items-center gap-2 py-8 text-center">
              <span className="rounded-full bg-muted p-3 text-muted-foreground">
                <ImageIcon size={18} />
              </span>
              <p className="text-xs text-muted-foreground">
                Belum ada aset. Unggah gambar untuk dipakai di komponen.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}