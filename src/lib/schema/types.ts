export const SCHEMA_VERSION = "0.1.0";

export type Device = "desktop" | "tablet" | "mobile";

export type SectionStyleKey =
  | "padding"
  | "textAlign"
  | "contentWidth"
  | "background"
  | "backgroundCustom";

export type SectionStyle = Partial<Record<SectionStyleKey, string>>;

export type NodeProps = Record<
  string,
  string | number | boolean | undefined
>;

export interface Node {
  id: string;
  componentType: string;
  props: NodeProps;
  styles: SectionStyle;
  tabletOverride: SectionStyle;
  mobileOverride: SectionStyle;
  children: Node[];
  metadata: {
    createdAt: string;
  };
}

export interface Page {
  id: string;
  name: string;
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
    background?: string;
    foreground?: string;
  };
}

export interface Seo {
  title: string;
  description: string;
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
  theme: Theme;
  settings: {
    device: Device;
  };
  pages: Page[];
  assets: Asset[];
  seo: Seo;
}