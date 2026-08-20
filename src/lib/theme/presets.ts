import type { Theme, ThemePresetSelection } from "@/lib/schema/types";

/* ============================================================
   Style presets — struktur & kepadatan tampilan
   ============================================================ */

export type StyleId = "vega" | "nova" | "maia" | "lyra" | "mira";

export interface StylePreset {
  id: StyleId;
  name: string;
  description: string;
  density: number;
  defaultRadius: RadiusId;
  shadow: string;
  /** Padding kartu di dalam section */
  cardPadding: string;
  /** Tinggi kontrol (tombol/input) */
  controlHeight: string;
  /** Jarak antar elemen/section */
  sectionGap: string;
  /** Pengali radius sudut */
  radiusScale: number;
}

export const STYLE_PRESETS: Record<StyleId, StylePreset> = {
  vega: {
    id: "vega",
    name: "Vega",
    description: "Klasik, seimbang, universal.",
    density: 1.15,
    defaultRadius: "medium",
    shadow: "0 10px 30px -12px rgba(0, 0, 0, 0.15)",
    cardPadding: "1.25rem",
    controlHeight: "2.5rem",
    sectionGap: "2.5rem",
    radiusScale: 1,
  },
  nova: {
    id: "nova",
    name: "Nova",
    description: "Padat, kompak, profesional.",
    density: 1,
    defaultRadius: "medium",
    shadow: "0 4px 12px -6px rgba(0, 0, 0, 0.12)",
    cardPadding: "1rem",
    controlHeight: "2.25rem",
    sectionGap: "2rem",
    radiusScale: 0.9,
  },
  maia: {
    id: "maia",
    name: "Maia",
    description: "Lembut, lega, ramah.",
    density: 1.35,
    defaultRadius: "large",
    shadow: "0 16px 40px -16px rgba(0, 0, 0, 0.18)",
    cardPadding: "1.75rem",
    controlHeight: "2.75rem",
    sectionGap: "3.5rem",
    radiusScale: 1.15,
  },
  lyra: {
    id: "lyra",
    name: "Lyra",
    description: "Tajam, kotak, teknis.",
    density: 1,
    defaultRadius: "small",
    shadow: "none",
    cardPadding: "1.125rem",
    controlHeight: "2.375rem",
    sectionGap: "2.25rem",
    radiusScale: 0.75,
  },
  mira: {
    id: "mira",
    name: "Mira",
    description: "Sangat padat, ala dashboard.",
    density: 0.9,
    defaultRadius: "small",
    shadow: "none",
    cardPadding: "0.875rem",
    controlHeight: "2rem",
    sectionGap: "1.5rem",
    radiusScale: 0.85,
  },
};

/* ============================================================
   Base color — permukaan netral
   ============================================================ */

export type BaseColorId =
  | "neutral"
  | "stone"
  | "zinc"
  | "mauve"
  | "olive"
  | "mist"
  | "taupe";

export interface BaseColorSet {
  background: string;
  card: string;
  popover: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  border: string;
  input: string;
  sidebar: string;
}

export interface BaseColorPreset {
  id: BaseColorId;
  name: string;
  light: BaseColorSet;
  dark: BaseColorSet;
}

const MIST_LIGHT: BaseColorSet = {
  background: "#f8fafc",
  card: "#ffffff",
  popover: "#ffffff",
  muted: "#f1f5f9",
  mutedForeground: "#64748b",
  accent: "#f1f5f9",
  accentForeground: "#0f172a",
  border: "#e2e8f0",
  input: "#e2e8f0",
  sidebar: "#f5f8fb",
};

export const BASE_COLORS: Record<BaseColorId, BaseColorPreset> = {
  neutral: {
    id: "neutral",
    name: "Neutral",
    light: {
      background: "#ffffff",
      card: "#ffffff",
      popover: "#ffffff",
      muted: "#f4f4f5",
      mutedForeground: "#71717a",
      accent: "#f4f4f5",
      accentForeground: "#18181b",
      border: "#e4e4e7",
      input: "#e4e4e7",
      sidebar: "#fafafa",
    },
    dark: {
      background: "#0a0a0a",
      card: "#111113",
      popover: "#131316",
      muted: "#1e1e22",
      mutedForeground: "#a1a1aa",
      accent: "#1e1e22",
      accentForeground: "#fafafa",
      border: "#27272b",
      input: "#27272b",
      sidebar: "#0d0d0f",
    },
  },
  stone: {
    id: "stone",
    name: "Stone",
    light: {
      background: "#fafaf9",
      card: "#ffffff",
      popover: "#ffffff",
      muted: "#f5f5f4",
      mutedForeground: "#78716c",
      accent: "#f5f5f4",
      accentForeground: "#1c1917",
      border: "#e7e5e4",
      input: "#e7e5e4",
      sidebar: "#f7f6f5",
    },
    dark: {
      background: "#0c0c0b",
      card: "#141412",
      popover: "#161614",
      muted: "#232321",
      mutedForeground: "#a8a29e",
      accent: "#232321",
      accentForeground: "#fafaf9",
      border: "#292524",
      input: "#292524",
      sidebar: "#0f0f0e",
    },
  },
  zinc: {
    id: "zinc",
    name: "Zinc",
    light: {
      background: "#fafafa",
      card: "#ffffff",
      popover: "#ffffff",
      muted: "#f4f4f5",
      mutedForeground: "#71717a",
      accent: "#f4f4f5",
      accentForeground: "#18181b",
      border: "#e4e4e7",
      input: "#e4e4e7",
      sidebar: "#f7f7f8",
    },
    dark: {
      background: "#09090b",
      card: "#101012",
      popover: "#121214",
      muted: "#1c1c1f",
      mutedForeground: "#9f9fa9",
      accent: "#1c1c1f",
      accentForeground: "#fafafa",
      border: "#262629",
      input: "#262629",
      sidebar: "#0c0c0e",
    },
  },
  mauve: {
    id: "mauve",
    name: "Mauve",
    light: {
      background: "#fafafc",
      card: "#ffffff",
      popover: "#ffffff",
      muted: "#f3f3f7",
      mutedForeground: "#736f7e",
      accent: "#f3f3f7",
      accentForeground: "#1f1b2e",
      border: "#e3e1ea",
      input: "#e3e1ea",
      sidebar: "#f7f6fa",
    },
    dark: {
      background: "#0b0a10",
      card: "#121119",
      popover: "#14131b",
      muted: "#201e2a",
      mutedForeground: "#a29db1",
      accent: "#201e2a",
      accentForeground: "#fafafc",
      border: "#2a2736",
      input: "#2a2736",
      sidebar: "#0e0d13",
    },
  },
  olive: {
    id: "olive",
    name: "Olive",
    light: {
      background: "#fafaf7",
      card: "#ffffff",
      popover: "#ffffff",
      muted: "#f4f4ef",
      mutedForeground: "#70705f",
      accent: "#f4f4ef",
      accentForeground: "#1c1c14",
      border: "#e4e4d8",
      input: "#e4e4d8",
      sidebar: "#f7f7f2",
    },
    dark: {
      background: "#0a0a08",
      card: "#121210",
      popover: "#141412",
      muted: "#1f1f1a",
      mutedForeground: "#a3a391",
      accent: "#1f1f1a",
      accentForeground: "#fafaf5",
      border: "#282824",
      input: "#282824",
      sidebar: "#0e0e0b",
    },
  },
  mist: {
    id: "mist",
    name: "Mist",
    light: MIST_LIGHT,
    dark: {
      background: "#0a0f16",
      card: "#101722",
      popover: "#131b28",
      muted: "#1c2634",
      mutedForeground: "#94a3b8",
      accent: "#1c2634",
      accentForeground: "#f1f5f9",
      border: "#243044",
      input: "#243044",
      sidebar: "#0d131d",
    },
  },
  taupe: {
    id: "taupe",
    name: "Taupe",
    light: {
      background: "#faf8f6",
      card: "#ffffff",
      popover: "#ffffff",
      muted: "#f4f0ec",
      mutedForeground: "#7c746b",
      accent: "#f4f0ec",
      accentForeground: "#221d18",
      border: "#e6e0d9",
      input: "#e6e0d9",
      sidebar: "#f7f4f1",
    },
    dark: {
      background: "#0c0b09",
      card: "#141210",
      popover: "#161412",
      muted: "#211e1a",
      mutedForeground: "#a89f94",
      accent: "#211e1a",
      accentForeground: "#faf8f5",
      border: "#2a2621",
      input: "#2a2621",
      sidebar: "#100e0c",
    },
  },
};

/* ============================================================
   Theme color — warna utama (brand project)
   ============================================================ */

export type ThemeColorId =
  | "neutral"
  | "red"
  | "orange"
  | "amber"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "rose";

export interface ThemeColorPreset {
  id: ThemeColorId;
  name: string;
  light: { primary: string; primaryForeground: string };
  dark: { primary: string; primaryForeground: string };
}

export const THEME_COLORS: Record<ThemeColorId, ThemeColorPreset> = {
  neutral: {
    id: "neutral", name: "Neutral",
    light: { primary: "#18181b", primaryForeground: "#fafafa" },
    dark: { primary: "#fafafa", primaryForeground: "#18181b" },
  },
  red: {
    id: "red", name: "Red",
    light: { primary: "#ef4444", primaryForeground: "#ffffff" },
    dark: { primary: "#f87171", primaryForeground: "#450a0a" },
  },
  orange: {
    id: "orange", name: "Orange",
    light: { primary: "#f97316", primaryForeground: "#ffffff" },
    dark: { primary: "#fb923c", primaryForeground: "#431407" },
  },
  amber: {
    id: "amber", name: "Amber",
    light: { primary: "#f59e0b", primaryForeground: "#422006" },
    dark: { primary: "#fbbf24", primaryForeground: "#451a03" },
  },
  green: {
    id: "green", name: "Green",
    light: { primary: "#22c55e", primaryForeground: "#052e16" },
    dark: { primary: "#4ade80", primaryForeground: "#052e16" },
  },
  emerald: {
    id: "emerald", name: "Emerald",
    light: { primary: "#10b981", primaryForeground: "#022c22" },
    dark: { primary: "#34d399", primaryForeground: "#022c22" },
  },
  teal: {
    id: "teal", name: "Teal",
    light: { primary: "#14b8a6", primaryForeground: "#042f2e" },
    dark: { primary: "#2dd4bf", primaryForeground: "#042f2e" },
  },
  cyan: {
    id: "cyan", name: "Cyan",
    light: { primary: "#06b6d4", primaryForeground: "#083344" },
    dark: { primary: "#22d3ee", primaryForeground: "#083344" },
  },
  sky: {
    id: "sky", name: "Sky",
    light: { primary: "#0ea5e9", primaryForeground: "#0c4a6e" },
    dark: { primary: "#38bdf8", primaryForeground: "#0c4a6e" },
  },
  blue: {
    id: "blue", name: "Blue",
    light: { primary: "#3b82f6", primaryForeground: "#ffffff" },
    dark: { primary: "#60a5fa", primaryForeground: "#172554" },
  },
  indigo: {
    id: "indigo", name: "Indigo",
    light: { primary: "#6366f1", primaryForeground: "#ffffff" },
    dark: { primary: "#818cf8", primaryForeground: "#1e1b4b" },
  },
  violet: {
    id: "violet", name: "Violet",
    light: { primary: "#8b5cf6", primaryForeground: "#ffffff" },
    dark: { primary: "#a78bfa", primaryForeground: "#2e1065" },
  },
  purple: {
    id: "purple", name: "Purple",
    light: { primary: "#a855f7", primaryForeground: "#ffffff" },
    dark: { primary: "#c084fc", primaryForeground: "#3b0764" },
  },
  rose: {
    id: "rose", name: "Rose",
    light: { primary: "#f43f5e", primaryForeground: "#ffffff" },
    dark: { primary: "#fb7185", primaryForeground: "#4c0519" },
  },
};

/* ============================================================
   Radius
   ============================================================ */

export type RadiusId = "none" | "small" | "medium" | "large" | "xlarge";

export interface RadiusPreset {
  id: RadiusId;
  name: string;
  radius: string;
}

export const RADIUS_PRESETS: RadiusPreset[] = [
  { id: "none", name: "None", radius: "0px" },
  { id: "small", name: "Small", radius: "0.375rem" },
  { id: "medium", name: "Medium", radius: "0.625rem" },
  { id: "large", name: "Large", radius: "1rem" },
  { id: "xlarge", name: "Extra Large", radius: "1.5rem" },
];

/* ============================================================
   Tipografi
   ============================================================ */

export type FontId =
  | "geist"
  | "inter"
  | "figtree"
  | "manrope"
  | "dmsans"
  | "ibmplex"
  | "jetbrains";

export interface FontPreset {
  id: FontId;
  name: string;
  stack: string;
  mono: boolean;
  googleFonts: string[];
  sample: string;
}

export const FONT_PRESETS: FontPreset[] = [
  {
    id: "geist",
    name: "Geist",
    stack: "'Geist', ui-sans-serif, system-ui, sans-serif",
    mono: false,
    googleFonts: ["Geist:wght@400..900"],
    sample: "The quick brown fox jumps over the lazy dog.",
  },
  {
    id: "inter",
    name: "Inter",
    stack: "'Inter', ui-sans-serif, system-ui, sans-serif",
    mono: false,
    googleFonts: ["Inter:wght@400..900"],
    sample: "The quick brown fox jumps over the lazy dog.",
  },
  {
    id: "figtree",
    name: "Figtree",
    stack: "'Figtree', ui-sans-serif, system-ui, sans-serif",
    mono: false,
    googleFonts: ["Figtree:wght@400..900"],
    sample: "The quick brown fox jumps over the lazy dog.",
  },
  {
    id: "manrope",
    name: "Manrope",
    stack: "'Manrope', ui-sans-serif, system-ui, sans-serif",
    mono: false,
    googleFonts: ["Manrope:wght@200..800"],
    sample: "The quick brown fox jumps over the lazy dog.",
  },
  {
    id: "dmsans",
    name: "DM Sans",
    stack: "'DM Sans', ui-sans-serif, system-ui, sans-serif",
    mono: false,
    googleFonts: ["DM+Sans:opsz,wght@9..40,400..1000"],
    sample: "The quick brown fox jumps over the lazy dog.",
  },
  {
    id: "ibmplex",
    name: "IBM Plex Sans",
    stack: "'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif",
    mono: false,
    googleFonts: ["IBM+Plex+Sans:wght@400;500;600;700"],
    sample: "The quick brown fox jumps over the lazy dog.",
  },
  {
    id: "jetbrains",
    name: "JetBrains Mono",
    stack: "'JetBrains Mono', ui-monospace, monospace",
    mono: true,
    googleFonts: ["JetBrains+Mono:wght@400;500;600;700"],
    sample: "const site = 'buat.in'; // milik Anda",
  },
];

/* ============================================================
   Chart palette
   ============================================================ */

export type ChartPaletteId = "neutral" | "theme" | "categorical";

export interface ChartPalette {
  id: ChartPaletteId;
  name: string;
  description: string;
  colors: string[];
}

export const CHART_PALETTES: ChartPalette[] = [
  {
    id: "neutral",
    name: "Neutral",
    description: "Skala abu-abu yang tenang.",
    colors: ["#71717a", "#a1a1aa", "#d4d4d8", "#e4e4e7", "#f4f4f5"],
  },
  {
    id: "theme",
    name: "Ikuti warna utama",
    description: "Mengikuti warna utama project agar chart selaras dengan brand.",
    // Nilai aktual dihitung di resolveTheme karena mengikuti primary yang aktif.
    colors: [],
  },
  {
    id: "categorical",
    name: "Categorical",
    description: "Lima warna khas untuk kategori.",
    colors: ["#e11d48", "#f97316", "#eab308", "#10b981", "#3b82f6"],
  },
];

/* ============================================================
   Normalisasi preset lama → baru
   ============================================================ */

export const BRAND = "#e6007e";

const LEGACY_FONT: Record<string, FontId> = {
  modern: "geist",
  geometric: "geist",
  humanist: "figtree",
  editorial: "geist",
};

const LEGACY_COLOR: Record<string, ThemeColorId> = {
  neutral: "neutral",
  slate: "neutral",
  warm: "orange",
  blue: "blue",
  indigo: "indigo",
  green: "green",
  orange: "orange",
};

const LEGACY_RADIUS: Record<string, RadiusId> = {
  none: "none",
  soft: "medium",
  rounded: "large",
  pill: "xlarge",
};

export interface NormalizedPresets {
  style: StyleId;
  baseColor: BaseColorId;
  theme: ThemeColorId;
  radius: RadiusId;
  font: FontId;
  fontHeading: FontId | "inherit";
  chart: ChartPaletteId;
  appearance: "light" | "dark";
  fontMono: FontId | "inherit";
  density: string;
  shadow: string;
}

export const DEFAULT_THEME_PRESETS: NormalizedPresets = {
  style: "nova",
  baseColor: "neutral",
  theme: "blue",
  radius: "medium",
  font: "geist",
  fontHeading: "inherit",
  chart: "neutral",
  appearance: "light",
  fontMono: "inherit",
  density: "balanced",
  shadow: "soft",
};

const isStyle = (v: unknown): v is StyleId =>
  typeof v === "string" && v in STYLE_PRESETS;
const isBaseColor = (v: unknown): v is BaseColorId =>
  typeof v === "string" && v in BASE_COLORS;
const isThemeColor = (v: unknown): v is ThemeColorId =>
  typeof v === "string" && v in THEME_COLORS;
const isRadius = (v: unknown): v is RadiusId =>
  typeof v === "string" && RADIUS_PRESETS.some((r) => r.id === v);
const isFont = (v: unknown): v is FontId =>
  typeof v === "string" && FONT_PRESETS.some((f) => f.id === v);
const isChart = (v: unknown): v is ChartPaletteId =>
  typeof v === "string" && CHART_PALETTES.some((c) => c.id === v);

export function normalizePresets(p: ThemePresetSelection): NormalizedPresets {
  const density = p.density ?? DEFAULT_THEME_PRESETS.density;
  const shadow = p.shadow ?? DEFAULT_THEME_PRESETS.shadow;

  const style: StyleId =
    (isStyle(p.style) ? p.style : undefined) ??
    (density === "compact" ? "mira" : density === "spacious" ? "maia" : "nova");

  const radius: RadiusId =
    (isRadius(p.radius) ? p.radius : undefined) ??
    (p.radius ? LEGACY_RADIUS[p.radius] : undefined) ??
    STYLE_PRESETS[style].defaultRadius;

  return {
    style,
    baseColor: (isBaseColor(p.baseColor) ? p.baseColor : undefined) ?? "neutral",
    theme:
      (isThemeColor(p.theme) ? p.theme : undefined) ??
      LEGACY_COLOR[p.color ?? ""] ??
      "blue",
    radius,
    font: (isFont(p.font) ? p.font : undefined) ?? LEGACY_FONT[p.font ?? ""] ?? "geist",
    fontHeading:
      p.fontHeading === "inherit" || isFont(p.fontHeading)
        ? p.fontHeading
        : "inherit",
    chart: (isChart(p.chart) ? p.chart : undefined) ?? "neutral",
    appearance: p.appearance === "dark" ? "dark" : "light",
    fontMono: isFont(p.fontMono) && FONT_PRESETS.find((f) => f.id === p.fontMono)?.mono
      ? p.fontMono
      : "inherit",
    density,
    shadow,
  };
}

/* ============================================================
   Resolved tokens
   ============================================================ */

export interface ResolvedTokens {
  appearance: "light" | "dark";
  /** ID style preset aktif — dipakai sebagai `data-bi-style` di kanvas/preview. */
  styleId: StyleId;
  background: string;
  foreground: string;
  card: string;
  popover: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  border: string;
  input: string;
  ring: string;
  destructive: string;
  radius: string;
  fontHeading: string;
  fontBody: string;
  fontMono: string;
  spacingScale: number;
  shadow: string;
  cardPadding: string;
  controlHeight: string;
  sectionGap: string;
  chart: [string, string, string, string, string];
}

export function getStylePreset(id: string): StylePreset {
  return STYLE_PRESETS[id as StyleId] ?? STYLE_PRESETS.nova;
}

export function getBaseColor(id: string): BaseColorPreset {
  return BASE_COLORS[id as BaseColorId] ?? BASE_COLORS.neutral;
}

export function getThemeColor(id: string): ThemeColorPreset {
  return THEME_COLORS[id as ThemeColorId] ?? THEME_COLORS.blue;
}

export function getRadiusPreset(id: string): RadiusPreset {
  return RADIUS_PRESETS.find((r) => r.id === id) ?? RADIUS_PRESETS[2];
}

export function getFontPreset(id: string): FontPreset {
  const normalized = (LEGACY_FONT[id] ?? id) as FontId;
  return FONT_PRESETS.find((f) => f.id === normalized) ?? FONT_PRESETS[0];
}

/**
 * Warna utama dapat di-override dari customizer. Saat itu terjadi, foreground
 * preset tidak lagi selalu punya kontras yang benar (mis. primary putih dengan
 * foreground putih). Pilih foreground netral yang terbaca untuk nilai hex.
 */
function readablePrimaryForeground(color: string, fallback: string): string {
  const normalized = color.trim().replace(/^#/, "");
  const hex =
    normalized.length === 3
      ? normalized
          .split("")
          .map((part) => `${part}${part}`)
          .join("")
      : normalized;

  if (!/^[0-9a-f]{6}$/i.test(hex)) return fallback;

  const channels = [0, 2, 4].map((start) =>
    Number.parseInt(hex.slice(start, start + 2), 16) / 255
  );
  const linear = channels.map((channel) =>
    channel <= 0.03928
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4
  );
  const luminance =
    0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];

  return luminance > 0.42 ? "#18181b" : "#ffffff";
}

function scaledRadius(radius: string, scale: number): string {
  if (scale === 1 || radius === "0px") return radius;

  const match = /^(-?[\d.]+)(px|rem|em)$/.exec(radius);
  if (!match) return radius;

  const value = Number.parseFloat(match[1]) * scale;
  return `${Number.parseFloat(value.toFixed(4))}${match[2]}`;
}

export function resolveTheme(theme: Theme): ResolvedTokens {
  const p = normalizePresets(theme.presets);
  const style = STYLE_PRESETS[p.style];
  const base = BASE_COLORS[p.baseColor][p.appearance];
  const tc = THEME_COLORS[p.theme][p.appearance];
  const radius = RADIUS_PRESETS.find((r) => r.id === p.radius) ?? RADIUS_PRESETS[2];
  const primary = theme.overrides.primary ?? tc.primary;
  const primaryForeground = theme.overrides.primary
    ? readablePrimaryForeground(theme.overrides.primary, tc.primaryForeground)
    : tc.primaryForeground;
  const secondary = theme.overrides.secondary ?? base.muted;
  const secondaryForeground = theme.overrides.secondary
    ? readablePrimaryForeground(theme.overrides.secondary, base.accentForeground)
    : base.accentForeground;
  const body = getFontPreset(p.font);
  const heading =
    p.fontHeading === "inherit" ? body : getFontPreset(p.fontHeading);
  const mono =
    p.fontMono !== "inherit"
      ? getFontPreset(p.fontMono)
      : FONT_PRESETS.find((f) => f.id === "jetbrains")!;

  const chart: [string, string, string, string, string] =
    p.chart === "theme"
      ? [primary, secondary, base.mutedForeground, theme.overrides.border ?? base.border, base.accentForeground]
      : (CHART_PALETTES.find((c) => c.id === p.chart)?.colors as [string, string, string, string, string]) ??
        (CHART_PALETTES[0].colors as [string, string, string, string, string]);

  return {
    appearance: p.appearance,
    styleId: style.id,
    background: theme.overrides.background ?? base.background,
    foreground: theme.overrides.foreground ?? base.accentForeground,
    card: base.card,
    popover: base.popover,
    primary,
    primaryForeground,
    secondary,
    secondaryForeground,
    muted: base.muted,
    mutedForeground: base.mutedForeground,
    accent: base.accent,
    accentForeground: base.accentForeground,
    border: theme.overrides.border ?? base.border,
    input: theme.overrides.border ?? base.input,
    ring: primary,
    destructive: "#dc2626",
    radius: scaledRadius(radius.radius, style.radiusScale),
    fontHeading: heading.stack,
    fontBody: body.stack,
    fontMono: mono.stack,
    spacingScale: style.density,
    shadow: style.shadow,
    cardPadding: style.cardPadding,
    controlHeight: style.controlHeight,
    sectionGap: style.sectionGap,
    chart,
  };
}

/* Legacy exports yang masih dipakai file lain */
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

export const COLOR_PALETTES: ColorPalette[] = Object.values(THEME_COLORS).map(
  (t) => ({
    id: t.id,
    name: t.name,
    background: "#ffffff",
    foreground: "#18181b",
    primary: t.light.primary,
    primaryForeground: t.light.primaryForeground,
    secondary: "#f4f4f5",
    muted: "#71717a",
    border: "#e4e4e7",
  })
);

export const DENSITY_PRESETS = [
  { id: "compact", name: "Padat", spacingScale: 1 },
  { id: "balanced", name: "Seimbang", spacingScale: 1.25 },
  { id: "spacious", name: "Lega", spacingScale: 1.5 },
];

export const SHADOW_PRESETS = [
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
  return COLOR_PALETTES.find((p) => p.id === id) ?? COLOR_PALETTES[3];
}

export function getDensityPreset(id: string) {
  return DENSITY_PRESETS.find((p) => p.id === id) ?? DENSITY_PRESETS[1];
}

export function getShadowPreset(id: string) {
  return SHADOW_PRESETS.find((p) => p.id === id) ?? SHADOW_PRESETS[1];
}

export const SCALE_BASE = 16;

export function scalePx(unit: number, tokens: ResolvedTokens): string {
  return `${Math.round(unit * tokens.spacingScale)}px`;
}

/** Semua link Google Fonts yang dipakai preset tipografi (untuk editor). */
export const FONT_LINKS: string[] = FONT_PRESETS.flatMap((f) =>
  f.googleFonts.map(
    (g) => `https://fonts.googleapis.com/css2?family=${g}&display=swap`
  )
);
