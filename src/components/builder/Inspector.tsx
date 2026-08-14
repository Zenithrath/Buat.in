"use client";

import { useState } from "react";
import {
  Palette,
  Type,
  LayoutTemplate,
  Search,
  PanelRight,
  RotateCcw,
} from "lucide-react";
import { useBuilderStore } from "@/lib/store/project-store";
import { getComponent } from "@/lib/registry";
import { propString } from "@/lib/registry/shared";
import { resolveTheme, type ResolvedTokens } from "@/lib/theme/presets";
import { cn } from "@/lib/utils";
import { Tabs } from "@/components/ui/tabs";
import { Field, Input, Textarea, Select, Separator } from "@/components/ui/controls";
import { Button } from "@/components/ui/button";
import { ThemeCustomizer } from "./ThemeCustomizer";
import { ThemePreview } from "./ThemePreview";
import type { Node, NodeLayout } from "@/lib/schema/types";

const PADDING_OPTIONS = [
  { value: "none", label: "Tanpa" },
  { value: "sm", label: "Kecil" },
  { value: "md", label: "Sedang" },
  { value: "lg", label: "Besar" },
  { value: "xl", label: "Ekstra" },
];

const ALIGN_OPTIONS = [
  { value: "left", label: "Kiri" },
  { value: "center", label: "Tengah" },
  { value: "right", label: "Kanan" },
];

const WIDTH_OPTIONS = [
  { value: "narrow", label: "Sempit" },
  { value: "default", label: "Standar (Fill)" },
  { value: "full", label: "Penuh" },
];

const BACKGROUND_OPTIONS = [
  { value: "default", label: "Latar (tema)" },
  { value: "muted", label: "Redup" },
  { value: "primary", label: "Warna utama" },
  { value: "custom", label: "Kustom" },
  { value: "transparent", label: "Transparan" },
];

const DEVICE_TABS = [
  { id: "desktop" as const, label: "Desktop" },
  { id: "tablet" as const, label: "Tablet" },
  { id: "mobile" as const, label: "Mobile" },
];

export function Inspector() {
  const node = useBuilderStore((s) => {
    const sections = s.document.pages[0].sections;
    if (!s.selectedId) return null;
    const findInTree = (nodes: Node[], id: string): Node | null => {
      for (const n of nodes) {
        if (n.id === id) return n;
        if (n.children) {
          const res = findInTree(n.children, id);
          if (res) return res;
        }
      }
      return null;
    };
    return findInTree(sections, s.selectedId);
  });

  if (!node) {
    return <ThemePanel />;
  }

  const manifest = getComponent(node.componentType);
  if (!manifest) {
    return (
      <div className="p-4 text-xs text-muted-foreground">
        Komponen tidak ditemukan di registry.
      </div>
    );
  }

  return <NodeInspector nodeId={node.id} manifest={manifest} />;
}

function patchStylesForDevice(
  patchStyles: (key: string, value: string, device?: "tablet" | "mobile") => void,
  key: string,
  value: string,
  device: "tablet" | "mobile"
) {
  patchStyles(key, value, device);
}

function NodeInspector({
  nodeId,
  manifest,
}: {
  nodeId: string;
  manifest: NonNullable<ReturnType<typeof getComponent>>;
}) {
  const [tab, setTab] = useState("content");
  const [deviceTab, setDeviceTab] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const updateNode = useBuilderStore((s) => s.updateNode);
  const updateNodeLayout = useBuilderStore((s) => s.updateNodeLayout);
  
  const node = useBuilderStore((s) => {
    const sections = s.document.pages[0].sections;
    const findInTree = (nodes: Node[], id: string): Node | null => {
      for (const n of nodes) {
        if (n.id === id) return n;
        if (n.children) {
          const res = findInTree(n.children, id);
          if (res) return res;
        }
      }
      return null;
    };
    return findInTree(sections, nodeId);
  });

  if (!node) return null;

  const patchProps = (key: string, value: string | number | boolean) => {
    updateNode(nodeId, (n) => ({ ...n, props: { ...n.props, [key]: value } }));
  };

  const patchStyles = (
    key: string,
    value: string,
    device?: "tablet" | "mobile"
  ) => {
    updateNode(nodeId, (n) => ({
      ...n,
      styles: device ? n.styles : { ...n.styles, [key]: value },
      tabletOverride: device === "tablet" ? { ...n.tabletOverride, [key]: value } : n.tabletOverride,
      mobileOverride: device === "mobile" ? { ...n.mobileOverride, [key]: value } : n.mobileOverride,
    }));
  };

  const groups = [
    ...new Set((manifest.contentControls ?? []).map((c) => c.group ?? "Umum")),
  ];

  const overrides: Node["tabletOverride"] =
    deviceTab === "tablet" ? node.tabletOverride : node.mobileOverride;

  return (
    <div className="flex w-72 shrink-0 flex-col border-l bg-background">
      {/* 3 Core Inspector Tabs */}
      <Tabs
        active={tab}
        onChange={setTab}
        items={[
          { id: "content", label: "CONTENT", icon: <Type size={13} /> },
          { id: "component", label: "COMPONENT", icon: <LayoutTemplate size={13} /> },
          { id: "general", label: "STYLE", icon: <Palette size={13} /> },
        ]}
      />

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        <div className="flex items-center justify-between border-b pb-2">
          <div>
            <p className="text-xs font-bold text-foreground">{node.name || manifest.name}</p>
            <p className="text-[10px] text-muted-foreground capitalize">
              {manifest.category} · {manifest.tier}
            </p>
          </div>
          <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[9px] font-bold text-muted-foreground">
            {node.componentType}
          </span>
        </div>

        {/* TAB 1: CONTENT */}
        {tab === "content" ? (
          <div className="space-y-4">
            {groups.map((group) => (
              <div key={group} className="space-y-3">
                {groups.length > 1 ? (
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    {group}
                  </p>
                ) : null}
                {(manifest.contentControls ?? [])
                  .filter((c) => (c.group ?? "Umum") === group)
                  .map((control) => (
                    <Field key={control.key} label={control.label}>
                      {control.type === "textarea" ? (
                        <Textarea
                          value={propString(node, control.key)}
                          onChange={(e) => patchProps(control.key, e.target.value)}
                          placeholder={control.placeholder}
                          className="text-xs"
                        />
                      ) : control.type === "json" ? (
                        <Textarea
                          value={propString(node, control.key)}
                          onChange={(e) => patchProps(control.key, e.target.value)}
                          placeholder={control.placeholder || "Format JSON array..."}
                          className="font-mono text-[11px] h-24"
                        />
                      ) : control.type === "select" ? (
                        <Select
                          value={propString(node, control.key)}
                          onChange={(e) => patchProps(control.key, e.target.value)}
                          className="text-xs"
                        >
                          {control.options?.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </Select>
                      ) : (
                        <Input
                          value={propString(node, control.key)}
                          onChange={(e) => patchProps(control.key, e.target.value)}
                          placeholder={control.placeholder}
                          className="text-xs"
                        />
                      )}
                    </Field>
                  ))}
              </div>
            ))}
          </div>
        ) : null}

        {/* TAB 2: COMPONENT STYLE */}
        {tab === "component" ? (
          <div className="space-y-4">
            {/* Device Switcher */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Perangkat Overrides
              </label>
              <div className="flex items-center gap-0.5 rounded-lg bg-muted p-0.5">
                {DEVICE_TABS.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDeviceTab(d.id)}
                    className={cn(
                      "flex h-7 flex-1 items-center justify-center rounded-md text-[11px] font-semibold transition-colors",
                      deviceTab === d.id
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Sizing & Layout */}
            <div className="space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Ukuran & Tata Letak
              </p>
              <Field label="Ukuran Lebar (Width Mode)">
                <Select
                  value={node.layout?.widthMode ?? "fill"}
                  onChange={(e) => updateNodeLayout(nodeId, { widthMode: e.target.value as NodeLayout["widthMode"] })}
                  className="text-xs"
                >
                  <option value="hug">Hug Contents (Fit)</option>
                  <option value="fill">Fill Container (100%)</option>
                  <option value="fixed">Fixed Width (Pixel)</option>
                </Select>
              </Field>

              {node.layout?.widthMode === "fixed" ? (
                <Field label="Lebar Spesifik (px)">
                  <Input
                    type="number"
                    value={node.layout?.fixedWidth ?? 300}
                    onChange={(e) => updateNodeLayout(nodeId, { fixedWidth: Number(e.target.value) })}
                    className="text-xs font-mono"
                  />
                </Field>
              ) : null}

              <Field label="Lebar Konten Kontainer">
                <Select
                  value={node.styles.contentWidth ?? "default"}
                  onChange={(e) => patchStyles("contentWidth", e.target.value)}
                  className="text-xs"
                >
                  {WIDTH_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field label="Perataan Teks (Alignment)">
                <Select
                  value={node.styles.textAlign ?? "center"}
                  onChange={(e) => patchStyles("textAlign", e.target.value)}
                  className="text-xs"
                >
                  {ALIGN_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field label="Padding / Jarak Dalam">
                <Select
                  value={
                    deviceTab === "desktop"
                      ? node.styles.padding ?? "lg"
                      : overrides.padding ?? node.styles.padding ?? "lg"
                  }
                  onChange={(e) =>
                    deviceTab === "desktop"
                      ? patchStyles("padding", e.target.value)
                      : patchStylesForDevice(patchStyles, "padding", e.target.value, deviceTab)
                  }
                  className="text-xs"
                >
                  {PADDING_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>

            <Separator />

            {/* Appearance */}
            <div className="space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Tampilan / Appearance
              </p>
              <Field label="Latar Belakang (Background)">
                <Select
                  value={node.styles.background ?? "default"}
                  onChange={(e) => {
                    patchStyles("background", e.target.value);
                    if (e.target.value !== "custom") {
                      patchStyles("backgroundCustom", "");
                    }
                  }}
                  className="text-xs"
                >
                  {BACKGROUND_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Select>
              </Field>

              {node.styles.background === "custom" ? (
                <Field label="Warna Kustom">
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={
                        /^#[0-9a-f]{6}$/i.test(node.styles.backgroundCustom ?? "")
                          ? node.styles.backgroundCustom!
                          : "#ffffff"
                      }
                      onChange={(e) =>
                        patchStyles("backgroundCustom", e.target.value)
                      }
                      className="h-8 w-10 shrink-0 cursor-pointer rounded-md border bg-transparent p-0.5"
                    />
                    <Input
                      value={node.styles.backgroundCustom ?? ""}
                      placeholder="#ffffff"
                      onChange={(e) =>
                        patchStyles("backgroundCustom", e.target.value)
                      }
                      className="text-xs font-mono"
                    />
                  </div>
                </Field>
              ) : null}

              <Button
                variant="outline"
                size="sm"
                className="w-full gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                onClick={() => {
                  patchStyles("background", "default");
                  patchStyles("backgroundCustom", "");
                  patchStyles("padding", "lg");
                }}
              >
                <RotateCcw size={12} /> Reset Ke Tema
              </Button>
            </div>
          </div>
        ) : null}

        {/* TAB 3: GENERAL STYLE (Global Theme System) */}
        {tab === "general" ? (
          <div className="space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Desain System Global
            </p>
            <ThemeCustomizer />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ThemePanel() {
  const document = useBuilderStore((s) => s.document);
  const updateSeo = useBuilderStore((s) => s.updateSeo);
  const setLeftTab = useBuilderStore((s) => s.setLeftTab);
  const tokens: ResolvedTokens = resolveTheme(document.theme);

  return (
    <div className="flex w-72 shrink-0 flex-col border-l bg-background">
      <Tabs
        active="page"
        onChange={() => {}}
        items={[
          { id: "page", label: "Halaman & SEO", icon: <PanelRight size={13} /> },
        ]}
      />
      <div className="flex-1 space-y-5 overflow-y-auto p-4">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Ringkasan Tema Global
          </p>
          <ThemePreview tokens={tokens} compact />
          <Button
            variant="secondary"
            size="sm"
            className="w-full text-xs font-bold"
            onClick={() => setLeftTab("style")}
          >
            <Palette size={13} /> Buka Panel Theme Customizer
          </Button>
        </div>

        <Separator />

        <div className="space-y-3">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            <Search size={11} /> SEO & Metadata
          </p>
          <Field label="Judul Halaman (Meta Title)">
            <Input
              value={document.seo.title}
              placeholder={document.name}
              onChange={(e) =>
                updateSeo((seo) => ({ ...seo, title: e.target.value }))
              }
              className="text-xs"
            />
          </Field>
          <Field label="Deskripsi (Meta Description)">
            <Textarea
              value={document.seo.description}
              placeholder="Deskripsi singkat untuk mesin pencari Google"
              onChange={(e) =>
                updateSeo((seo) => ({ ...seo, description: e.target.value }))
              }
              className="text-xs"
            />
          </Field>
        </div>
      </div>
    </div>
  );
}