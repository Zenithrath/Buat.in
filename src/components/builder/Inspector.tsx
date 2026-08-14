"use client";

import { useState } from "react";
import {
  Palette,
  Type,
  LayoutTemplate,
  Search,
  Smartphone,
  PanelRight,
} from "lucide-react";
import { useBuilderStore } from "@/lib/store/project-store";
import { getComponent } from "@/lib/registry";
import { propString } from "@/lib/registry/shared";
import { resolveTheme, type ResolvedTokens } from "@/lib/theme/presets";
import { cn } from "@/lib/utils";
import { Tabs } from "@/components/ui/tabs";
import { Field, Input, Textarea, Select, Separator } from "@/components/ui/controls";
import { Button } from "@/components/ui/button";
import { ThemePreview } from "./ThemePreview";
import type { Node } from "@/lib/schema/types";

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
  { value: "default", label: "Standar" },
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
  { id: "tablet", label: "Tablet" },
  { id: "mobile", label: "Mobile" },
];

export function Inspector() {
  const node = useBuilderStore((s) =>
    s.document.pages[0].sections.find((sec) => sec.id === s.selectedId)
  );

  if (!node) {
    return <ThemePanel />;
  }

  const manifest = getComponent(node.componentType);
  if (!manifest) {
    return (
      <div className="p-4 text-xs text-muted-foreground">
        Komponen tidak ditemukan.
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
  const [deviceTab, setDeviceTab] = useState<"tablet" | "mobile">("tablet");
  const updateNode = useBuilderStore((s) => s.updateNode);
  const node = useBuilderStore((s) =>
    s.document.pages[0].sections.find((sec) => sec.id === nodeId)
  );
  if (!node) return null;

  const patchProps = (key: string, value: string) => {
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

  const styleControls = manifest.styleControls ?? [];
  const styleGroups = [
    ...new Set(styleControls.map((c) => c.group ?? "Umum")),
  ];

  const overrides: Node["tabletOverride"] =
    deviceTab === "tablet" ? node.tabletOverride : node.mobileOverride;

  const overrideTarget: "tablet" | "mobile" = deviceTab;

  return (
    <div className="flex w-72 shrink-0 flex-col border-l bg-background">
      <Tabs
        active={tab}
        onChange={setTab}
        items={[
          { id: "content", label: "Konten", icon: <Type size={13} /> },
          { id: "layout", label: "Tata Letak", icon: <LayoutTemplate size={13} /> },
          { id: "style", label: "Style", icon: <Palette size={13} /> },
          { id: "responsive", label: "Responsif", icon: <Smartphone size={13} /> },
        ]}
      />
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        <div>
          <p className="text-sm font-semibold text-foreground">{manifest.name}</p>
          <p className="text-[11px] text-muted-foreground">
            {manifest.tier === "free" ? "Komponen gratis" : "Komponen Pro"}
          </p>
        </div>

        {tab === "content" ? (
          <div className="space-y-4">
            {groups.map((group) => (
              <div key={group} className="space-y-3">
                {groups.length > 1 ? (
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
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
                        />
                      ) : control.type === "select" ? (
                        <Select
                          value={propString(node, control.key)}
                          onChange={(e) => patchProps(control.key, e.target.value)}
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
                        />
                      )}
                    </Field>
                  ))}
              </div>
            ))}
          </div>
        ) : null}

        {tab === "layout" ? (
          <div className="space-y-3">
            <Field label="Lebar Konten">
              <Select
                value={node.styles.contentWidth ?? "default"}
                onChange={(e) => patchStyles("contentWidth", e.target.value)}
              >
                {WIDTH_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Perataan Teks">
              <Select
                value={node.styles.textAlign ?? "center"}
                onChange={(e) => patchStyles("textAlign", e.target.value)}
              >
                {ALIGN_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Jarak / Padding">
              <Select
                value={node.styles.padding ?? "lg"}
                onChange={(e) => patchStyles("padding", e.target.value)}
              >
                {PADDING_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
            </Field>
          </div>
        ) : null}

        {tab === "style" ? (
          <div className="space-y-3">
            <Field label="Latar Belakang">
              <Select
                value={node.styles.background ?? "default"}
                onChange={(e) => {
                  patchStyles("background", e.target.value);
                  if (e.target.value !== "custom") {
                    patchStyles("backgroundCustom", "");
                  }
                }}
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
                    className="h-8 w-10 shrink-0 cursor-pointer rounded-md border border-input bg-transparent p-0.5"
                    title="Pilih warna latar"
                  />
                  <Input
                    value={node.styles.backgroundCustom ?? ""}
                    placeholder="#ffffff"
                    onChange={(e) =>
                      patchStyles("backgroundCustom", e.target.value)
                    }
                  />
                </div>
              </Field>
            ) : null}
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() => {
                patchStyles("background", "default");
                patchStyles("backgroundCustom", "");
              }}
            >
              Reset ke tema
            </Button>
            {styleGroups.map((group) => (
              <div key={group} className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {group}
                </p>
                {styleControls
                  .filter((c) => (c.group ?? "Umum") === group)
                  .map((control) => (
                    <Field key={control.key} label={control.label}>
                      {control.type === "select" ? (
                        <Select
                          value={propString(node, control.key)}
                          onChange={(e) => patchProps(control.key, e.target.value)}
                        >
                          {control.options?.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </Select>
                      ) : null}
                    </Field>
                  ))}
              </div>
            ))}
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              Warna, font, dan sudut diatur lewat Tema (panel kiri → Tema).
              Pengaturan per-komponen hanya untuk latar belakang.
            </p>
          </div>
        ) : null}

        {tab === "responsive" ? (
          <div className="space-y-3">
            <div className="flex items-center gap-0.5 rounded-lg bg-muted p-0.5">
              {DEVICE_TABS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDeviceTab(d.id as "tablet" | "mobile")}
                  className={cn(
                    "flex h-7 flex-1 items-center justify-center rounded-md text-[11px] font-medium transition-colors",
                    deviceTab === d.id
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground"
                  )}
                >
                  {d.label}
                </button>
              ))}
            </div>
            <Field label="Jarak / Padding">
              <Select
                value={overrides.padding ?? node.styles.padding ?? "lg"}
                onChange={(e) =>
                  patchStylesForDevice(patchStyles, "padding", e.target.value, overrideTarget)
                }
              >
                {PADDING_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Perataan Teks">
              <Select
                value={overrides.textAlign ?? node.styles.textAlign ?? "center"}
                onChange={(e) =>
                  patchStylesForDevice(patchStyles, "textAlign", e.target.value, overrideTarget)
                }
              >
                {ALIGN_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Lebar Konten">
              <Select
                value={overrides.contentWidth ?? node.styles.contentWidth ?? "default"}
                onChange={(e) =>
                  patchStylesForDevice(patchStyles, "contentWidth", e.target.value, overrideTarget)
                }
              >
                {WIDTH_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
            </Field>
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              Override berlaku saat pratinjau perangkat {deviceTab === "tablet" ? "tablet" : "mobile"}.
            </p>
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
            Ringkasan Tema
          </p>
          <ThemePreview tokens={tokens} compact />
          <Button
            variant="secondary"
            size="sm"
            className="w-full"
            onClick={() => setLeftTab("style")}
          >
            <Palette size={13} /> Buka Panel Style
          </Button>
        </div>

        <Separator />

        <div className="space-y-3">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            <Search size={11} /> SEO
          </p>
          <Field label="Judul Halaman">
            <Input
              value={document.seo.title}
              placeholder={document.name}
              onChange={(e) =>
                updateSeo((seo) => ({ ...seo, title: e.target.value }))
              }
            />
          </Field>
          <Field label="Deskripsi">
            <Textarea
              value={document.seo.description}
              placeholder="Deskripsi singkat untuk mesin pencari"
              onChange={(e) =>
                updateSeo((seo) => ({ ...seo, description: e.target.value }))
              }
            />
          </Field>
        </div>
      </div>
    </div>
  );
}