"use client";

import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import {
  Copy,
  Layers,
  Plus,
  Trash2,
  LayoutPanelTop,
  Sparkles,
  ShoppingBag,
  Info,
  Megaphone,
  PanelBottom,
  Navigation,
} from "lucide-react";
import {
  componentRegistry,
  CATEGORY_LABELS,
  type ComponentCategory,
} from "@/lib/registry";
import { useBuilderStore } from "@/lib/store/project-store";
import { cn } from "@/lib/utils";
import { Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const CATEGORY_ICONS: Record<ComponentCategory, React.ReactNode> = {
  navbar: <Navigation size={14} />,
  hero: <Sparkles size={14} />,
  product: <ShoppingBag size={14} />,
  about: <Info size={14} />,
  cta: <Megaphone size={14} />,
  footer: <PanelBottom size={14} />,
};

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
        "flex w-full items-start gap-2.5 rounded-lg border border-zinc-200 bg-white p-2.5 text-left transition-colors hover:border-blue-400 hover:bg-blue-50/50 active:cursor-grabbing",
        isDragging && "opacity-40"
      )}
    >
      <span className="mt-0.5 rounded-md bg-zinc-100 p-1.5 text-zinc-500">
        <LayoutPanelTop size={14} />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[13px] font-medium text-zinc-800">
          {manifest.name}
        </span>
        <span className="mt-0.5 line-clamp-2 block text-[11px] leading-snug text-zinc-400">
          {manifest.description}
        </span>
      </span>
    </button>
  );
}

export function LeftPanel() {
  const [tab, setTab] = useState("add");
  const sections = useBuilderStore((s) => s.document.pages[0].sections);
  const selectedId = useBuilderStore((s) => s.selectedId);
  const select = useBuilderStore((s) => s.select);
  const duplicateSection = useBuilderStore((s) => s.duplicateSection);
  const removeSection = useBuilderStore((s) => s.removeSection);

  const categories = [...new Set(componentRegistry.map((c) => c.category))];

  return (
    <div className="flex w-60 shrink-0 flex-col border-r border-zinc-200 bg-white">
      <Tabs
        active={tab}
        onChange={setTab}
        items={[
          { id: "add", label: "Tambahkan", icon: <Plus size={13} /> },
          { id: "layers", label: "Lapisan", icon: <Layers size={13} /> },
        ]}
      />
      <div className="flex-1 overflow-y-auto p-3">
        {tab === "add" ? (
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category}>
                <h3 className="mb-1.5 flex items-center gap-1.5 px-0.5 text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
                  {CATEGORY_ICONS[category]}
                  {CATEGORY_LABELS[category]}
                </h3>
                <div className="space-y-1.5">
                  {componentRegistry
                    .filter((c) => c.category === category)
                    .map((c) => (
                      <ComponentCard key={c.id} componentId={c.id} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {sections.length === 0 ? (
              <p className="py-8 text-center text-xs text-zinc-400">
                Belum ada komponen di halaman ini.
              </p>
            ) : (
              sections.map((section, index) => {
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
                        ? "border-blue-300 bg-blue-50"
                        : "border-transparent hover:bg-zinc-50"
                    )}
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-zinc-100 text-zinc-500">
                      {manifest
                        ? CATEGORY_ICONS[manifest.category]
                        : null}
                    </span>
                    <span className="flex-1 truncate text-[13px] text-zinc-700">
                      {index + 1}. {manifest?.name ?? section.componentType}
                    </span>
                    <span className="hidden items-center gap-0.5 group-hover:flex">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          duplicateSection(section.id);
                        }}
                        className="rounded p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
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
                        className="rounded p-1 text-zinc-400 hover:bg-red-50 hover:text-red-500"
                        title="Hapus"
                      >
                        <Trash2 size={12} />
                      </button>
                    </span>
                  </div>
                );
              })
            )}
            {sections.length > 0 ? (
              <Button
                variant="ghost"
                size="sm"
                className="mt-3 w-full text-zinc-400 hover:text-zinc-600"
                onClick={() => {
                  const last = sections[sections.length - 1];
                  duplicateSection(last.id);
                }}
              >
                <Copy size={12} /> Duplikat komponen terakhir
              </Button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}