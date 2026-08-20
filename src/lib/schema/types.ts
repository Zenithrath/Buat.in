export const SCHEMA_VERSION = "0.1.0";

export type Device = "desktop" | "tablet" | "mobile";

export type ProjectType = "landing" | "dashboard";

export type SectionStyleKey =
  | "padding"
  | "textAlign"
  | "contentWidth"
  | "background"
  | "backgroundCustom"
  | "borderRadius"
  | "boxShadow"
  | "opacity"
  /** Lebar sidebar dashboard yang diatur langsung dari canvas. */
  | "sidebarWidth";

export type SectionStyle = Partial<Record<SectionStyleKey, string>>;

// Props komponen adalah JSON arbitrer dari dokumen project.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NodeProps = Record<string, any>;

export interface NodeLayout {
  type?: "auto" | "freeform" | "stack" | "row" | "grid";
  widthMode?: "hug" | "fill" | "fixed";
  heightMode?: "hug" | "fill" | "fixed";
  fixedWidth?: number;
  fixedHeight?: number;
  gap?: number;
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between";
  wrap?: boolean;
  x?: number;
  y?: number;
  zIndex?: number;
  colSpan?: number;
}

export interface Node {
  id: string;
  name?: string;
  componentType: string;
  props: NodeProps;
  styles: SectionStyle;
  tabletOverride: SectionStyle;
  mobileOverride: SectionStyle;
  layout?: NodeLayout;
  children: Node[];
  metadata: {
    createdAt: string;
    hidden?: boolean;
    locked?: boolean;
  };
}

export interface Page {
  id: string;
  name: string;
  /** Slug halaman, mis. "/", "/tentang", "/kontak". Halaman beranda = "/". */
  path: string;
  /** Halaman beranda — hanya boleh satu per dokumen. */
  isHome: boolean;
  sections: Node[];
}

export interface ThemePresetSelection {
  /** Gaya struktural: vega | nova | maia | lyra | mira */
  style?: string;
  /** Warna dasar permukaan: neutral | stone | zinc | mauve | olive | mist | taupe */
  baseColor?: string;
  /** Warna utama project: neutral | red | ... | rose */
  theme?: string;
  /** Radius: none | small | medium | large | xlarge */
  radius?: string;
  /** Font: geist | inter | figtree | manrope | dmsans | ibmplex | jetbrains */
  font?: string;
  /** Font heading: "inherit" | FontId */
  fontHeading?: string;
  /** Palette chart: neutral | theme | categorical */
  chart?: string;
  /** Tampilan project: light | dark (default light) */
  appearance?: "light" | "dark";
  /** Font mono: jetbrains | inherit */
  fontMono?: string;
  /** Legacy */
  color?: string;
  density?: string;
  shadow?: string;
}

export interface Theme {
  presets: ThemePresetSelection;
  overrides: {
    primary?: string;
    secondary?: string;
    background?: string;
    foreground?: string;
    border?: string;
  };
}

export interface Seo {
  title: string;
  description: string;
}

export interface SourceTemplateEdit {
  text?: string;
  src?: string;
  href?: string;
}

export interface Asset {
  id: string;
  url: string;
  fileName: string;
  mimeType: string;
  size: number;
  width: number;
  height: number;
}

export interface ProjectDocument {
  schemaVersion: string;
  projectId: string;
  name: string;
  projectType: ProjectType;
  theme: Theme;
  settings: {
    device: Device;
  };
  pages: Page[];
  assets: Asset[];
  seo: Seo;
  /** ID template sumber asli, jika project dibuat dari arsip di src. */
  sourceTemplateId?: string;
  /** Perubahan konten yang diterapkan ke HTML source saat export. */
  sourceEdits?: Record<string, SourceTemplateEdit>;
}
