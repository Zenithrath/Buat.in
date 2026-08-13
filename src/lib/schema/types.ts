export const SCHEMA_VERSION = "0.1.0";

export type Device = "desktop" | "tablet" | "mobile";

export type SectionStyleKey =
  | "padding"
  | "textAlign"
  | "contentWidth"
  | "background";

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
  color: string;
  radius: string;
  font: string;
  density: string;
  shadow: string;
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