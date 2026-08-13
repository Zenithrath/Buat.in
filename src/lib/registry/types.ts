import type { ComponentType } from "react";
import type { Node, NodeProps, Theme } from "@/lib/schema/types";
import type { ResolvedTokens } from "@/lib/theme/presets";

export type ComponentCategory =
  | "navbar"
  | "hero"
  | "product"
  | "about"
  | "cta"
  | "footer";

export interface ContentControlOption {
  value: string;
  label: string;
}

export interface ContentControl {
  key: string;
  label: string;
  group?: string;
  type: "text" | "textarea" | "image" | "link" | "select";
  options?: ContentControlOption[];
  placeholder?: string;
}

export interface ExportContext {
  theme: Theme;
  tokens: ResolvedTokens;
}

export interface ExportResult {
  html: string;
  css: string;
}

export interface ComponentManifest {
  id: string;
  name: string;
  category: ComponentCategory;
  description: string;
  tier: "free" | "pro";
  priceKey: string;
  version: string;
  defaultProps: NodeProps;
  contentControls: ContentControl[];
  previewRenderer: ComponentType<{ node: Node; theme: Theme }>;
  exportAdapter: (node: Node, ctx: ExportContext) => ExportResult;
}

export interface PreviewRendererProps {
  node: Node;
  theme: Theme;
}