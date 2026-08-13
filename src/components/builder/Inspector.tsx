"use client";

import { useState } from "react";
import { Palette, Type, LayoutTemplate, Search } from "lucide-react";
import { useBuilderStore } from "@/lib/store/project-store";
import { getComponent } from "@/lib/registry";
import { propString } from "@/lib/registry/shared";
import {
  COLOR_PALETTES,
  RADIUS_PRESETS,
  FONT_PRESETS,
  DENSITY_PRESETS,
  SHADOW_PRESETS,
} from "@/lib/theme/presets";
import { cn } from "@/lib/utils";
import { Tabs } from "@/components/ui/tabs";
import { Field, Input, Textarea, Select, Separator } from "@/components/ui/controls";

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
  { value: "transparent", label: "Transparan" },
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
      <div className="p-4 text-xs text-zinc-400">
        Komponen tidak ditemukan.
      </div>
    );
  }

  return <NodeInspector nodeId={node.id} manifest={manifest} />;
}

function NodeInspector({ nodeId, manifest }: { nodeId: string; manifest: ReturnType<typeof getComponent> }) {
  const [tab, setTab] = useState("content");
  const updateNode = useBuilderStore((s) => s.updateNode);
  const node = useBuilderStore((s) =>
    s.document.pages[0].sections.find((sec) => sec.id === nodeId)
  );
  if (!node) return null;

  const patchProps = (key: string, value: string) => {
    updateNode(nodeId, (n) => ({ ...n, props: { ...n.props, [key]: value } }));
  };

  const patchStyles = (key: string, value: string) => {
    updateNode(nodeId, (n) => ({ ...n, styles: { ...n.styles, [key]: value } }));
  };

  const groups = [
    ...new Set((manifest?.contentControls ?? []).map((c) => c.group ?? "Umum")),
  ];

  return (
    <div className="flex w-72 shrink-0 flex-col border-l border-zinc-200 bg-white">
      <Tabs
        active={tab}
        onChange={setTab}
        items={[
          { id: "content", label: "Konten", icon: <Type size={13} /> },
          { id: "layout", label: "Tata Letak", icon: <LayoutTemplate size={13} /> },
          { id: "style", label: "Gaya", icon: <Palette size={13} /> },
        ]}
      />
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        <div>
          <p className="text-sm font-semibold text-zinc-800">{manifest?.name}</p>
          <p className="text-[11px] text-zinc-400">
            {manifest?.tier === "free" ? "Komponen gratis" : "Komponen Pro"}
          </p>
        </div>

        {tab === "content" ? (
          <div className="space-y-4">
            {groups.map((group) => (
              <div key={group} className="space-y-3">
                {groups.length > 1 ? (
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
                    {group}
                  </p>
                ) : null}
                {(manifest?.contentControls ?? [])
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
                onChange={(e) => patchStyles("background", e.target.value)}
              >
                {BACKGROUND_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
            </Field>
            <p className="text-[11px] leading-relaxed text-zinc-400">
              Warna, font, dan sudut diatur lewat Tema (klik area kosong di
              kanvas). Pengaturan per-komponen hanya untuk latar belakang.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ThemePanel() {
  const document = useBuilderStore((s) => s.document);
  const updateTheme = useBuilderStore((s) => s.updateTheme);
  const updateSeo = useBuilderStore((s) => s.updateSeo);
  const theme = document.theme;

  return (
    <div className="flex w-72 shrink-0 flex-col border-l border-zinc-200 bg-white">
      <Tabs
        active="theme"
        onChange={() => {}}
        items={[{ id: "theme", label: "Tema & SEO", icon: <Palette size={13} /> }]}
      />
      <div className="flex-1 space-y-5 overflow-y-auto p-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
            Warna
          </p>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {COLOR_PALETTES.map((palette) => (
              <button
                key={palette.id}
                type="button"
                onClick={() =>
                  updateTheme((t) => ({
                    ...t,
                    presets: { ...t.presets, color: palette.id },
                  }))
                }
                className={cn(
                  "rounded-lg border-2 p-1.5 transition-colors",
                  theme.presets.color === palette.id
                    ? "border-blue-500"
                    : "border-transparent hover:border-zinc-300"
                )}
                title={palette.name}
              >
                <span className="flex h-7 w-full overflow-hidden rounded-md">
                  <span
                    className="h-full flex-1"
                    style={{ background: palette.primary }}
                  />
                  <span
                    className="h-full flex-1"
                    style={{ background: palette.background }}
                  />
                  <span
                    className="h-full flex-1"
                    style={{ background: palette.secondary }}
                  />
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
            Sudut
          </p>
          <div className="mt-2 flex gap-1.5">
            {RADIUS_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() =>
                  updateTheme((t) => ({
                    ...t,
                    presets: { ...t.presets, radius: preset.id },
                  }))
                }
                className={cn(
                  "flex-1 rounded-md border px-1 py-1.5 text-[11px] transition-colors",
                  theme.presets.radius === preset.id
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-zinc-200 text-zinc-500 hover:border-zinc-300"
                )}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
            Tipografi
          </p>
          <div className="mt-2 space-y-1">
            {FONT_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() =>
                  updateTheme((t) => ({
                    ...t,
                    presets: { ...t.presets, font: preset.id },
                  }))
                }
                className={cn(
                  "w-full rounded-md border px-2.5 py-2 text-left text-sm transition-colors",
                  theme.presets.font === preset.id
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-zinc-200 text-zinc-600 hover:border-zinc-300"
                )}
                style={{ fontFamily: preset.fontHeading }}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
              Kerapatan
            </p>
            <Select
              value={theme.presets.density}
              onChange={(e) =>
                updateTheme((t) => ({
                  ...t,
                  presets: { ...t.presets, density: e.target.value },
                }))
              }
              className="mt-1.5"
            >
              {DENSITY_PRESETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
              Bayangan
            </p>
            <Select
              value={theme.presets.shadow}
              onChange={(e) =>
                updateTheme((t) => ({
                  ...t,
                  presets: { ...t.presets, shadow: e.target.value },
                }))
              }
              className="mt-1.5"
            >
              {SHADOW_PRESETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
            Warna Kustom
          </p>
          <Field label="Warna Utama">
            <div className="flex gap-2">
              <Input
                type="color"
                className="h-9 w-12 shrink-0 cursor-pointer p-1"
                value={theme.overrides.primary ?? "#2563eb"}
                onChange={(e) =>
                  updateTheme((t) => ({
                    ...t,
                    overrides: { ...t.overrides, primary: e.target.value },
                  }))
                }
              />
              <Input
                value={theme.overrides.primary ?? ""}
                placeholder="Reset (ikuti preset)"
                onChange={(e) =>
                  updateTheme((t) => ({
                    ...t,
                    overrides: { ...t.overrides, primary: e.target.value },
                  }))
                }
              />
            </div>
          </Field>
        </div>

        <Separator />

        <div className="space-y-3">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
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