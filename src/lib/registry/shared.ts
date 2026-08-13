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
    lower.startsWith("#")
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
  return {
    padding: scalePx(PADDING_SCALE[styles.padding ?? "lg"] ?? PADDING_SCALE.lg, tokens),
    background: styles.background ?? "default",
    textAlign: styles.textAlign ?? "center",
    contentWidth: CONTENT_WIDTH[styles.contentWidth ?? "default"] ?? 1120,
  };
}

export function sectionStyleVars(node: Node, tokens: ResolvedTokens): string {
  const s = resolveSectionStyles(node, tokens);
  return [
    `--bi-pad: ${s.padding}`,
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
  return {
    html: `<${tag} class="${sectionClass}" style="${vars}">${innerHtml}</${tag}>`,
    css: `.${sectionClass} {
  background: var(--bi-bg, ${ctx.tokens.background});
  padding: var(--bi-pad, 40px);
  text-align: var(--bi-align, center);
  font-family: var(--bi-font-body, inherit);
  color: var(--bi-fg, inherit);
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
    "--bi-primary": tokens.primary,
    "--bi-primary-fg": tokens.primaryForeground,
    "--bi-secondary": tokens.secondary,
    "--bi-muted": tokens.muted,
    "--bi-border": tokens.border,
    "--bi-radius": tokens.radius,
    "--bi-font-heading": tokens.fontHeading,
    "--bi-font-body": tokens.fontBody,
    "--bi-shadow": tokens.shadow,
  };
}