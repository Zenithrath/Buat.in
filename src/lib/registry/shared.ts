import type { Node } from "@/lib/schema/types";
import type { ResolvedTokens } from "@/lib/theme/presets";
import { scalePx } from "@/lib/theme/presets";
import type { ExportContext, ExportResult } from "./types";

export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function sanitizeUrl(url: unknown): string {
  const trimmed = String(url ?? "").trim();
  if (!trimmed) return "#";
  if (trimmed === "#") return "#";
  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith("http://") ||
    lower.startsWith("https://") ||
    lower.startsWith("mailto:") ||
    lower.startsWith("tel:") ||
    lower.startsWith("#") ||
    // Path halaman internal (multi-page): "/tentang", "/", "./tentang.html"
    lower.startsWith("/") ||
    lower.startsWith("./")
  ) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

const PADDING_SCALE: Record<string, number> = {
  none: 0,
  sm: 16,
  md: 24,
  lg: 40,
  xl: 64,
};

const CONTENT_WIDTH: Record<string, number | null> = {
  narrow: 720,
  default: 1120,
  full: null,
};

export interface SectionStyleProps {
  padding: string;
  background: string;
  textAlign: string;
  contentWidth: number | null;
}

export function resolveSectionStyles(
  node: Node,
  tokens: ResolvedTokens
): SectionStyleProps {
  const styles = node.styles;
  const bg = styles.background ?? "default";
  return {
    padding: scalePx(PADDING_SCALE[styles.padding ?? "lg"] ?? PADDING_SCALE.lg, tokens),
    background:
      bg === "custom"
        ? styles.backgroundCustom || tokens.background
        : backgroundToken(bg, tokens),
    textAlign: styles.textAlign ?? "center",
    contentWidth: CONTENT_WIDTH[styles.contentWidth ?? "default"] ?? 1120,
  };
}

export function sectionStyleVars(node: Node, tokens: ResolvedTokens): string {
  const s = resolveSectionStyles(node, tokens);
  return [
    `--bi-pad: ${s.padding}`,
    `--bi-bg: ${s.background}`,
    `--bi-align: ${s.textAlign}`,
    `--bi-cw: ${s.contentWidth ? `${s.contentWidth}px` : "100%"}`,
  ].join("; ");
}

export function backgroundToken(
  bg: string,
  tokens: ResolvedTokens
): string {
  switch (bg) {
    case "muted":
      return tokens.muted;
    case "primary":
      return tokens.primary;
    case "glass":
      return `color-mix(in srgb, ${tokens.card} 55%, transparent)`;
    case "transparent":
      return "transparent";
    default:
      return tokens.background;
  }
}

export function sectionWrapper(
  node: Node,
  ctx: ExportContext,
  innerHtml: string,
  sectionClass = "bi-section",
  tag: "section" | "header" | "footer" = "section"
): ExportResult {
  const vars = sectionStyleVars(node, ctx.tokens);
  const bg = node.styles.background ?? "default";
  return {
    html: `<${tag} class="${sectionClass}" style="${vars}" data-bg="${escapeHtml(bg)}">${innerHtml}</${tag}>`,
    css: `.${sectionClass} {
  background: var(--bi-bg, ${ctx.tokens.background});
  padding: var(--bi-pad, 40px);
  text-align: var(--bi-align, center);
  font-family: var(--bi-font-body, inherit);
  color: var(--bi-fg, inherit);
}

.${sectionClass}[data-bg="glass"] {
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
}

.${sectionClass} .bi-container {
  max-width: var(--bi-cw, 1120px);
}

.${sectionClass} a {
  color: inherit;
}

@media (prefers-reduced-motion: reduce) {
  .${sectionClass} * {
    transition: none !important;
  }
}`,
  };
}

export function imageUrl(node: Node, key: string): string {
  return String(node.props[key] ?? "");
}

export function propString(node: Node, key: string): string {
  return String(node.props[key] ?? "");
}

export function themeTokenStyle(
  tokens: ResolvedTokens
): Record<string, string> {
  return {
    "--bi-bg": tokens.background,
    "--bi-fg": tokens.foreground,
    "--bi-card": tokens.card,
    "--bi-popover": tokens.popover,
    "--bi-primary": tokens.primary,
    "--bi-primary-fg": tokens.primaryForeground,
    "--bi-secondary": tokens.secondary,
    "--bi-secondary-fg": tokens.secondaryForeground,
    "--bi-muted": tokens.muted,
    "--bi-muted-fg": tokens.mutedForeground,
    "--bi-accent": tokens.accent,
    "--bi-accent-fg": tokens.accentForeground,
    "--bi-border": tokens.border,
    "--bi-input": tokens.input,
    "--bi-ring": tokens.ring,
    "--bi-destructive": tokens.destructive,
    "--bi-radius": tokens.radius,
    "--bi-font-heading": tokens.fontHeading,
    "--bi-font-body": tokens.fontBody,
    "--bi-font-mono": tokens.fontMono,
    "--bi-shadow": tokens.shadow,
    "--bi-control-height": tokens.controlHeight,
    "--bi-card-padding": tokens.cardPadding,
    "--bi-section-gap": tokens.sectionGap,
    "--bi-chart-1": tokens.chart[0],
    "--bi-chart-2": tokens.chart[1],
    "--bi-chart-3": tokens.chart[2],
    "--bi-chart-4": tokens.chart[3],
    "--bi-chart-5": tokens.chart[4],
  };
}

/**
 * Token project dengan nama semantik (--primary, --background, ...).
 * Dipakai untuk "scope" di area situs pengguna di kanvas dan preview
 * tema, sehingga primitif Tailwind (bg-primary, text-foreground, dll.)
 * yang dirender di dalam scope ikut token project — bukan token editor.
 */
export function projectTokenStyle(
  tokens: ResolvedTokens
): Record<string, string> {
  return {
    "--background": tokens.background,
    "--foreground": tokens.foreground,
    "--card": tokens.card,
    "--card-foreground": tokens.foreground,
    "--popover": tokens.popover,
    "--popover-foreground": tokens.foreground,
    "--primary": tokens.primary,
    "--primary-foreground": tokens.primaryForeground,
    "--secondary": tokens.secondary,
    "--secondary-foreground": tokens.secondaryForeground,
    "--muted": tokens.muted,
    "--muted-foreground": tokens.mutedForeground,
    "--accent": tokens.accent,
    "--accent-foreground": tokens.accentForeground,
    "--destructive": tokens.destructive,
    "--destructive-foreground": "#ffffff",
    "--border": tokens.border,
    "--input": tokens.input,
    "--ring": tokens.ring,
    "--radius": tokens.radius,
    "--font-sans": tokens.fontBody,
    "--font-heading": tokens.fontHeading,
    "--font-mono": tokens.fontMono,
    "--chart-1": tokens.chart[0],
    "--chart-2": tokens.chart[1],
    "--chart-3": tokens.chart[2],
    "--chart-4": tokens.chart[3],
    "--chart-5": tokens.chart[4],
  };
}
