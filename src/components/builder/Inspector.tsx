"use client";

import { useState } from "react";
import {
  Palette,
  Type,
  LayoutTemplate,
  Search,
  PanelRight,
  RotateCcw,
  Plus,
  Trash2,
  Copy,
  Link2,
} from "lucide-react";
import { getActivePage, useBuilderStore } from "@/lib/store/project-store";
import { getComponent } from "@/lib/registry";
import { propString } from "@/lib/registry/shared";
import type { ContentControl, ContentControlItemSchema } from "@/lib/registry/types";
import { cn } from "@/lib/utils";
import { Tabs } from "@/components/ui/tabs";
import { Field, Input, Textarea, Select, Separator, ImageField } from "@/components/ui/controls";
import { Button } from "@/components/ui/button";
import { ThemeCustomizer } from "./ThemeCustomizer";
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
  { value: "default", label: "Lebar normal" },
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
  { id: "mobile" as const, label: "Ponsel" },
];

export function Inspector() {
  const node = useBuilderStore((s) => {
    const sections = getActivePage(s.document, s.activePageId).sections;
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

type VisualListItem = Record<string, unknown>;

const FRIENDLY_FIELD_LABELS: Record<string, string> = {
  id: "ID",
  label: "Label",
  title: "Judul",
  name: "Nama",
  description: "Deskripsi",
  quote: "Testimoni",
  role: "Peran",
  initials: "Inisial",
  url: "Tautan",
  image: "Gambar",
  imageUrl: "Gambar",
  alt: "Deskripsi gambar",
  price: "Harga",
  period: "Periode",
  tag: "Label kecil",
  actionText: "Teks tombol",
  actionUrl: "Tautan tombol",
  icon: "Ikon",
  status: "Status",
  time: "Waktu",
  customer: "Pelanggan",
  amount: "Nominal",
  date: "Tanggal",
  value: "Nilai",
  val1: "Nilai utama",
  val2: "Nilai pembanding",
};

function prettyFieldLabel(key: string) {
  return (
    FRIENDLY_FIELD_LABELS[key] ??
    key
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/[_-]+/g, " ")
      .replace(/^./, (char) => char.toUpperCase())
  );
}

function parseVisualList(value: unknown): VisualListItem[] {
  try {
    const parsed: unknown =
      typeof value === "string" ? JSON.parse(value) : value;
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((item): VisualListItem[] =>
      item && typeof item === "object" && !Array.isArray(item)
        ? [{ ...(item as VisualListItem) }]
        : []
    );
  } catch {
    return [];
  }
}

function inferItemSchema(
  control: ContentControl,
  items: VisualListItem[]
): ContentControlItemSchema[] {
  if (control.itemSchema?.length) return control.itemSchema;

  const sample = items[0] ?? {};
  const keys = Object.keys(sample);
  if (keys.length === 0) {
    return [
      { key: "title", label: "Judul", type: "text" },
      { key: "description", label: "Deskripsi", type: "textarea" },
    ];
  }

  return keys.map((key) => {
    const value = sample[key];
    const lower = key.toLowerCase();
    const type: ContentControlItemSchema["type"] =
      typeof value === "boolean"
        ? "boolean"
        : typeof value === "number"
          ? "number"
          : /(?:url|href|link)$/.test(lower)
            ? "link"
            : /(?:image|photo|avatar)(?:url)?$/.test(lower)
              ? "image"
              : /(?:description|quote|answer|message|content)/.test(lower)
                ? "textarea"
                : "text";
    return { key, label: prettyFieldLabel(key), type };
  });
}

function VisualListEditor({
  control,
  value,
  onChange,
  pages,
}: {
  control: ContentControl;
  value: unknown;
  onChange: (value: unknown) => void;
  pages: { id: string; name: string; path: string; isHome: boolean }[];
}) {
  const items = parseVisualList(value);
  const schema = inferItemSchema(control, items);
  const displayLabel = control.label.replace(/\s*\(JSON\)\s*/gi, "");
  const isSerializedList = typeof value === "string";

  const write = (next: VisualListItem[]) =>
    onChange(isSerializedList ? JSON.stringify(next) : next);
  const updateItem = (
    index: number,
    field: ContentControlItemSchema,
    nextValue: string | boolean
  ) => {
    const next = items.map((item, itemIndex) => {
      if (itemIndex !== index) return item;
      const previous = item[field.key];
      let valueToStore: unknown = nextValue;
      if (field.type === "number") {
        valueToStore = Number(nextValue) || 0;
      } else if (typeof previous === "boolean") {
        valueToStore = nextValue === true || nextValue === "true";
      } else if (Array.isArray(previous)) {
        valueToStore = String(nextValue)
          .split("\n")
          .map((entry) => entry.trim())
          .filter(Boolean);
      }
      return { ...item, [field.key]: valueToStore };
    });
    write(next);
  };

  const addItem = () => {
    const item: VisualListItem = {};
    schema.forEach((field) => {
      item[field.key] = field.type === "boolean" ? false : field.type === "number" ? 0 : "";
    });
    write([...items, item]);
  };

  return (
    <Field label={displayLabel}>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={`${control.key}-${index}`} className="rounded-lg border border-border bg-muted/25 p-2.5">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[10px] font-bold text-foreground">Item {index + 1}</p>
              <button
                type="button"
                onClick={() => write(items.filter((_, itemIndex) => itemIndex !== index))}
                className="rounded p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                aria-label={`Hapus item ${index + 1}`}
                title="Hapus item"
              >
                <Trash2 size={12} />
              </button>
            </div>
            <div className="space-y-2">
              {schema.map((field) => {
                const rawValue = item[field.key];
                const inputValue = Array.isArray(rawValue)
                  ? rawValue.join("\n")
                  : String(rawValue ?? "");
                if (field.type === "boolean") {
                  return (
                    <label key={field.key} className="flex items-center justify-between gap-2 text-[11px] font-medium text-foreground">
                      {field.label}
                      <input
                        type="checkbox"
                        checked={Boolean(rawValue)}
                        onChange={(event) => updateItem(index, field, event.target.checked)}
                        className="size-4 accent-primary"
                      />
                    </label>
                  );
                }
                return (
                  <label key={field.key} className="block space-y-1">
                    <span className="text-[10px] font-medium text-muted-foreground">{field.label}</span>
                    {field.type === "textarea" || Array.isArray(rawValue) ? (
                      <Textarea
                        value={inputValue}
                        onChange={(event) => updateItem(index, field, event.target.value)}
                        className="min-h-16 text-xs"
                      />
                    ) : field.type === "select" ? (
                      <Select
                        value={inputValue}
                        onChange={(event) => updateItem(index, field, event.target.value)}
                        className="text-xs"
                      >
                        {field.options?.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </Select>
                    ) : field.type === "image" ? (
                      <ImageField
                        value={inputValue}
                        onChange={(value) => updateItem(index, field, value)}
                        label={field.label}
                      />
                    ) : field.type === "link" ? (
                      <div className="space-y-1.5">
                        <Input
                          type="text"
                          value={inputValue}
                          onChange={(event) => updateItem(index, field, event.target.value)}
                          placeholder="https://… atau #bagian"
                          className="text-xs"
                        />
                        <Select
                          value={pages.some((page) => page.path === inputValue) ? inputValue : ""}
                          onChange={(event) => {
                            if (event.target.value) updateItem(index, field, event.target.value);
                          }}
                          className="h-6 text-[11px]"
                          aria-label="Tautkan ke halaman"
                        >
                          <option value="" disabled>
                            Tautkan ke halaman…
                          </option>
                          {pages.map((page) => (
                            <option key={page.id} value={page.path}>
                              {page.name} — {page.path}
                              {page.isHome ? " · beranda" : ""}
                            </option>
                          ))}
                        </Select>
                      </div>
                    ) : (
                      <Input
                        type={field.type === "number" ? "number" : "text"}
                        value={inputValue}
                        onChange={(event) => updateItem(index, field, event.target.value)}
                        className="text-xs"
                      />
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        ))}
        {items.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border px-3 py-2 text-[11px] text-muted-foreground">
            Belum ada item. Tambahkan yang pertama untuk mulai mengisi bagian ini.
          </p>
        ) : null}
        <button
          type="button"
          onClick={addItem}
          className="flex w-full items-center justify-center gap-1.5 rounded-md border border-dashed border-brand/50 px-2 py-2 text-[11px] font-semibold text-brand transition-colors hover:bg-brand/5"
        >
          <Plus size={13} /> Tambah item
        </button>
      </div>
    </Field>
  );
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
  const pages = useBuilderStore((s) => s.document.pages);
  
  const node = useBuilderStore((s) => {
    const sections = getActivePage(s.document, s.activePageId).sections;
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

  const patchProps = (key: string, value: unknown) => {
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
    <div className="flex h-full min-h-0 w-full min-w-0 flex-col bg-background">
      {/* 3 Core Inspector Tabs */}
      <Tabs
        active={tab}
        onChange={setTab}
        items={[
          { id: "content", label: "ISI", icon: <Type size={13} /> },
          { id: "component", label: "TATA LETAK", icon: <LayoutTemplate size={13} /> },
          { id: "theme", label: "TEMA", icon: <Palette size={13} /> },
        ]}
      />

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        <div className="flex items-center justify-between border-b pb-2">
          <div>
            <p className="text-xs font-bold text-foreground">{node.name || manifest.name}</p>
            <p className="text-[10px] text-muted-foreground">
              Sesuaikan isi dan tampilan bagian ini
            </p>
          </div>
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
                    control.type === "json" || control.type === "array" ? (
                      <VisualListEditor
                        key={control.key}
                        control={control}
                        value={node.props[control.key]}
                        onChange={(value) => patchProps(control.key, value)}
                        pages={pages}
                      />
                    ) : (
                    <Field key={control.key} label={control.label}>
                      {control.type === "image" ? (
                        <ImageField
                          value={propString(node, control.key)}
                          onChange={(value) => patchProps(control.key, value)}
                          placeholder={control.placeholder}
                          label={control.label}
                        />
                      ) : control.type === "textarea" ? (
                        <Textarea
                          value={propString(node, control.key)}
                          onChange={(e) => patchProps(control.key, e.target.value)}
                          placeholder={control.placeholder}
                          className="text-xs"
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
                      ) : control.type === "link" ? (
                        <div className="space-y-1.5">
                          <Input
                            value={propString(node, control.key)}
                            onChange={(e) => patchProps(control.key, e.target.value)}
                            placeholder={control.placeholder}
                            className="text-xs"
                          />
                          <div className="flex items-center gap-1.5">
                            <Link2
                              size={11}
                              className="shrink-0 text-muted-foreground"
                            />
                            <Select
                              value={
                                pages.some((p) => p.path === propString(node, control.key))
                                  ? propString(node, control.key)
                                  : ""
                              }
                              onChange={(e) => {
                                if (e.target.value) {
                                  patchProps(control.key, e.target.value);
                                }
                              }}
                              className="h-6 text-[11px]"
                            >
                              <option value="" disabled>
                                Tautkan ke halaman…
                              </option>
                              {pages.map((p) => (
                                <option key={p.id} value={p.path}>
                                  {p.name} — {p.path}
                                  {p.isHome ? " · beranda" : ""}
                                </option>
                              ))}
                            </Select>
                          </div>
                        </div>
                      ) : (
                        <Input
                          value={propString(node, control.key)}
                          onChange={(e) => patchProps(control.key, e.target.value)}
                          placeholder={control.placeholder}
                          className="text-xs"
                        />
                      )}
                    </Field>
                    )
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
                Atur untuk perangkat
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
                        ? "bg-brand text-brand-foreground"
                        : "text-muted-foreground hover:text-brand"
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
                className="w-full gap-1.5 text-xs text-muted-foreground"
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

        {/* TAB 3: GLOBAL THEME */}
        {tab === "theme" ? (
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
  const activePageId = useBuilderStore((s) => s.activePageId);
  const updatePage = useBuilderStore((s) => s.updatePage);
  const duplicatePage = useBuilderStore((s) => s.duplicatePage);
  const deletePage = useBuilderStore((s) => s.deletePage);
  const updateSeo = useBuilderStore((s) => s.updateSeo);
  const [tab, setTab] = useState("theme");
  const activePage = getActivePage(document, activePageId);

  return (
    <div className="flex h-full min-h-0 w-full min-w-0 flex-col bg-background">
      <Tabs
        active={tab}
        onChange={setTab}
        items={[
          { id: "theme", label: "Tema", icon: <Palette size={13} /> },
          { id: "page", label: "Halaman & SEO", icon: <PanelRight size={13} /> },
        ]}
      />
      <div className="flex-1 space-y-5 overflow-y-auto p-4">
        {tab === "theme" ? <ThemeCustomizer /> : null}

        {tab === "page" ? <div className="space-y-5">
          <div className="space-y-3">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              <PanelRight size={11} /> Halaman Aktif
            </p>
            <Field label="Nama Halaman">
              <Input
                value={activePage.name}
                onChange={(e) => updatePage(activePage.id, { name: e.target.value })}
                className="text-xs"
              />
            </Field>
            <Field label={activePage.isHome ? "Path URL (beranda = “/”)" : "Path URL"}>
              <Input
                value={activePage.path}
                disabled={activePage.isHome}
                onChange={(e) => updatePage(activePage.id, { path: e.target.value })}
                className="text-xs font-mono"
              />
            </Field>
            <label className="flex cursor-pointer items-center justify-between gap-2 rounded-md border border-border bg-muted/40 px-3 py-2">
              <span className="text-xs font-medium text-foreground">Jadikan beranda</span>
              <input
                type="checkbox"
                checked={activePage.isHome}
                disabled={activePage.isHome}
                onChange={(e) => updatePage(activePage.id, { isHome: e.target.checked })}
                className="size-4 accent-brand"
              />
            </label>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="flex-1 text-xs"
                onClick={() => duplicatePage(activePage.id)}
              >
                <Copy size={12} /> Duplikat
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="flex-1 text-xs text-destructive hover:text-destructive"
                onClick={() => deletePage(activePage.id)}
                disabled={activePage.isHome || document.pages.length <= 1}
              >
                <Trash2 size={12} /> Hapus
              </Button>
            </div>
            {document.pages.length === 1 ? (
              <p className="text-[10px] text-muted-foreground">
                Project harus memiliki minimal satu halaman. Beranda tidak bisa dihapus.
              </p>
            ) : null}
          </div>

          <div className="space-y-3">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              <Search size={11} /> SEO & Metadata (beranda)
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
        </div> : null}
      </div>
    </div>
  );
}
