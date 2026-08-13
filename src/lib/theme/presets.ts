import type { Theme } from "@/lib/schema/types";

export interface ResolvedTokens {
  background: string;
  foreground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  muted: string;
  border: string;
  radius: string;
  fontHeading: string;
  fontBody: string;
  spacingScale: number;
  shadow: string;
}

export interface ColorPalette {
  id: string;
  name: string;
  background: string;
  foreground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  muted: string;
  border: string;
}

export interface RadiusPreset {
  id: string;
  name: string;
  radius: string;
}

export interface FontPreset {
  id: string;
  name: string;
  fontHeading: string;
  fontBody: string;
  googleFonts: string[];
}

export interface DensityPreset {
  id: string;
  name: string;
  spacingScale: number;
}

export interface ShadowPreset {
  id: string;
  name: string;
  shadow: string;
}

export const COLOR_PALETTES: ColorPalette[] = [
  {
    id: "neutral",
    name: "Neutral",
    background: "#ffffff",
    foreground: "#18181b",
    primary: "#18181b",
    primaryForeground: "#ffffff",
    secondary: "#f4f4f5",
    muted: "#71717a",
    border: "#e4e4e7",
  },
  {
    id: "slate",
    name: "Slate",
    background: "#f8fafc",
    foreground: "#0f172a",
    primary: "#334155",
    primaryForeground: "#f8fafc",
    secondary: "#e2e8f0",
    muted: "#64748b",
    border: "#cbd5e1",
  },
  {
    id: "warm",
    name: "Warm",
    background: "#fffaf5",
    foreground: "#292524",
    primary: "#d97706",
    primaryForeground: "#ffffff",
    secondary: "#fef3c7",
    muted: "#78716c",
    border: "#e7e5e4",
  },
  {
    id: "blue",
    name: "Blue",
    background: "#ffffff",
    foreground: "#0f172a",
    primary: "#2563eb",
    primaryForeground: "#ffffff",
    secondary: "#eff6ff",
    muted: "#64748b",
    border: "#e2e8f0",
  },
  {
    id: "indigo",
    name: "Indigo",
    background: "#fefefe",
    foreground: "#1e1b4b",
    primary: "#4f46e5",
    primaryForeground: "#ffffff",
    secondary: "#eef2ff",
    muted: "#6b7280",
    border: "#e0e7ff",
  },
  {
    id: "green",
    name: "Green",
    background: "#ffffff",
    foreground: "#052e16",
    primary: "#16a34a",
    primaryForeground: "#ffffff",
    secondary: "#f0fdf4",
    muted: "#4b5563",
    border: "#dcfce7",
  },
  {
    id: "orange",
    name: "Orange",
    background: "#fff7ed",
    foreground: "#431407",
    primary: "#ea580c",
    primaryForeground: "#ffffff",
    secondary: "#ffedd5",
    muted: "#78716c",
    border: "#fed7aa",
  },
];

export const RADIUS_PRESETS: RadiusPreset[] = [
  { id: "none", name: "Tegas", radius: "0px" },
  { id: "soft", name: "Lembut", radius: "8px" },
  { id: "rounded", name: "Bulat", radius: "16px" },
  { id: "pill", name: "Pil", radius: "9999px" },
];

export const FONT_PRESETS: FontPreset[] = [
  {
    id: "modern",
    name: "Modern",
    fontHeading: "'Inter', system-ui, sans-serif",
    fontBody: "'Inter', system-ui, sans-serif",
    googleFonts: ["Inter:wght@400;500;600;700;800"],
  },
  {
    id: "geometric",
    name: "Geometris",
    fontHeading: "'Poppins', system-ui, sans-serif",
    fontBody: "'Poppins', system-ui, sans-serif",
    googleFonts: ["Poppins:wght@400;500;600;700;800"],
  },
  {
    id: "humanist",
    name: "Humanis",
    fontHeading: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontBody: "'Plus Jakarta Sans', system-ui, sans-serif",
    googleFonts: ["Plus+Jakarta+Sans:wght@400;500;600;700;800"],
  },
  {
    id: "editorial",
    name: "Editorial",
    fontHeading: "'Lora', Georgia, serif",
    fontBody: "'Inter', system-ui, sans-serif",
    googleFonts: ["Lora:wght@400;500;600;700", "Inter:wght@400;500;600"],
  },
];

export const DENSITY_PRESETS: DensityPreset[] = [
  { id: "compact", name: "Padat", spacingScale: 1 },
  { id: "balanced", name: "Seimbang", spacingScale: 1.25 },
  { id: "spacious", name: "Lega", spacingScale: 1.5 },
];

export const SHADOW_PRESETS: ShadowPreset[] = [
  { id: "none", name: "Tanpa", shadow: "none" },
  {
    id: "soft",
    name: "Lembut",
    shadow: "0 10px 30px -12px rgba(0, 0, 0, 0.15)",
  },
  {
    id: "bold",
    name: "Tegas",
    shadow: "0 20px 40px -12px rgba(0, 0, 0, 0.25)",
  },
];

export function getPalette(id: string): ColorPalette {
  return COLOR_PALETTES.find((p) => p.id === id) ?? COLOR_PALETTES[0];
}

export function getRadiusPreset(id: string): RadiusPreset {
  return RADIUS_PRESETS.find((p) => p.id === id) ?? RADIUS_PRESETS[1];
}

export function getFontPreset(id: string): FontPreset {
  return FONT_PRESETS.find((p) => p.id === id) ?? FONT_PRESETS[0];
}

export function getDensityPreset(id: string): DensityPreset {
  return DENSITY_PRESETS.find((p) => p.id === id) ?? DENSITY_PRESETS[1];
}

export function getShadowPreset(id: string): ShadowPreset {
  return SHADOW_PRESETS.find((p) => p.id === id) ?? SHADOW_PRESETS[1];
}

export function resolveTheme(theme: Theme): ResolvedTokens {
  const palette = getPalette(theme.presets.color);
  const radius = getRadiusPreset(theme.presets.radius);
  const font = getFontPreset(theme.presets.font);
  const density = getDensityPreset(theme.presets.density);
  const shadow = getShadowPreset(theme.presets.shadow);

  return {
    background: theme.overrides.background ?? palette.background,
    foreground: theme.overrides.foreground ?? palette.foreground,
    primary: theme.overrides.primary ?? palette.primary,
    primaryForeground: palette.primaryForeground,
    secondary: palette.secondary,
    muted: palette.muted,
    border: palette.border,
    radius: radius.radius,
    fontHeading: font.fontHeading,
    fontBody: font.fontBody,
    spacingScale: density.spacingScale,
    shadow: shadow.shadow,
  };
}

export const SCALE_BASE = 16;

export function scalePx(unit: number, tokens: ResolvedTokens): string {
  return `${Math.round(unit * tokens.spacingScale)}px`;
}