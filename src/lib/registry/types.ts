import type { ComponentType } from "react";
import type { Node, NodeProps, Theme } from "@/lib/schema/types";
import type { ResolvedTokens } from "@/lib/theme/presets";

export type ComponentCategory =
  | "layout"
  | "navigation"
  | "typography"
  | "actions"
  | "media"
  | "content"
  | "form"
  | "data"
  | "landing"
  | "dashboard"
  | "navbar"
  | "hero"
  | "product"
  | "about"
  | "cta"
  | "footer";

/** Katalog yang boleh memakai komponen ini di builder. */
export type ComponentScope = "landing" | "dashboard" | "both";

export interface ContentControlOption {
  value: string;
  label: string;
}

export interface ContentControlItemSchema {
  key: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "image"
    | "link"
    | "select"
    | "number"
    | "boolean";
  options?: ContentControlOption[];
}

export interface ContentControl {
  key: string;
  label: string;
  group?: string;
  type: "text" | "textarea" | "image" | "link" | "select" | "number" | "boolean" | "array" | "json";
  options?: ContentControlOption[];
  placeholder?: string;
  itemSchema?: ContentControlItemSchema[];
}

export interface ExportContext {
  theme: Theme;
  tokens: ResolvedTokens;
}

export interface ExportResult {
  html: string;
  css: string;
  /** Interaksi statis khusus komponen. Digabung ke js/main.js saat export. */
  js?: string;
  /** Gambar yang dipakai komponen (data URL) — ditulis ke folder assets/ saat ekspor. */
  assets?: ExportAsset[];
}

/** Gambar inline (data URL) milik komponen; eksportir menuliskannya sebagai file di assets/. */
export interface ExportAsset {
  fileName: string;
  mimeType: string;
  dataUrl: string;
}

export interface ComponentManifest {
  id: string;
  name: string;
  category: ComponentCategory;
  /**
   * Komponen lama boleh belum menyatakan scope agar dokumen lama tetap bisa
   * dimuat. Registry memberi fallback berdasarkan kategorinya.
   */
  scope?: ComponentScope;
  description: string;
  tier: "free" | "pro";
  priceKey: string;
  version: string;
  defaultProps: NodeProps;
  contentControls: ContentControl[];
  previewRenderer: ComponentType<{ node: Node; theme: Theme }>;
  exportAdapter: (node: Node, ctx: ExportContext) => ExportResult;
  /** Kontrol gaya tambahan khusus komponen (opsional). */
  styleControls?: SectionStyleControl[];
  /** Kemampuan tema yang dibutuhkan komponen (opsional). */
  themeCapabilities?: ("radius" | "shadow" | "fonts")[];
}

/** Alias for the full registry item (manifest + renderers) */
export type ComponentRegistryItem = ComponentManifest;

export interface SectionStyleControl {
  key: string;
  label: string;
  group?: string;
  type: "select" | "slider";
  options?: ContentControlOption[];
  min?: number;
  max?: number;
  defaultValue?: string | number;
}

export interface PreviewRendererProps {
  node: Node;
  theme: Theme;
}
