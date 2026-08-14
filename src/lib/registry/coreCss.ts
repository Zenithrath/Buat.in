export const CORE_CSS = `/* ===== Buat.in shared primitives ===== */
:root {
  container-type: inline-size;
  --bi-bg: #ffffff;
  --bi-fg: #18181b;
  --bi-card: #ffffff;
  --bi-popover: #ffffff;
  --bi-primary: #2563eb;
  --bi-primary-fg: #ffffff;
  --bi-secondary: #eff6ff;
  --bi-secondary-fg: #18181b;
  --bi-muted: #64748b;
  --bi-muted-fg: #52525b;
  --bi-accent: #f4f4f5;
  --bi-accent-fg: #18181b;
  --bi-border: #e2e8f0;
  --bi-input: #e2e8f0;
  --bi-ring: #2563eb;
  --bi-destructive: #dc2626;
  --bi-radius: 8px;
  --bi-font-heading: 'Inter', system-ui, sans-serif;
  --bi-font-body: 'Inter', system-ui, sans-serif;
  --bi-font-mono: ui-monospace, monospace;
  --bi-shadow: 0 10px 30px -12px rgba(0, 0, 0, 0.15);
  --bi-control-height: 2.25rem;
  --bi-card-padding: 1rem;
  --bi-section-gap: 2rem;
  --bi-chart-1: #71717a;
  --bi-chart-2: #a1a1aa;
  --bi-chart-3: #d4d4d8;
  --bi-chart-4: #e4e4e7;
  --bi-chart-5: #f4f4f5;
  /* ===BI_SHADCN_ALIASES_START=== */
  /* shadcn-compatible aliases for exported, framework-free HTML */
  --background: var(--bi-bg);
  --foreground: var(--bi-fg);
  --card: var(--bi-card);
  --card-foreground: var(--bi-fg);
  --popover: var(--bi-popover);
  --popover-foreground: var(--bi-fg);
  --primary: var(--bi-primary);
  --primary-foreground: var(--bi-primary-fg);
  --secondary: var(--bi-secondary);
  --secondary-foreground: var(--bi-secondary-fg);
  --muted: var(--bi-muted);
  --muted-foreground: var(--bi-muted-fg);
  --accent: var(--bi-accent);
  --accent-foreground: var(--bi-accent-fg);
  --border: var(--bi-border);
  --input: var(--bi-input);
  --ring: var(--bi-ring);
  --radius: var(--bi-radius);
  --chart-1: var(--bi-chart-1);
  --chart-2: var(--bi-chart-2);
  --chart-3: var(--bi-chart-3);
  --chart-4: var(--bi-chart-4);
  --chart-5: var(--bi-chart-5);
  /* ===BI_SHADCN_ALIASES_END=== */
}

*, *::before, *::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: var(--bi-font-body);
  /* ===BI_EDITOR_STRIP_BODY_BG=== */
  background: var(--bi-bg);
  color: var(--bi-fg);
  -webkit-font-smoothing: antialiased;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

a {
  text-decoration: none;
}

.bi-container {
  width: 100%;
  max-width: var(--bi-cw, 1120px);
  margin-inline: auto;
  padding-inline: clamp(16px, 4vw, 32px);
}

.bi-section {
  background: var(--bi-bg);
  padding: var(--bi-pad, 40px);
  text-align: var(--bi-align, center);
  font-family: var(--bi-font-body);
  color: var(--bi-fg);
}

.bi-eyebrow {
  margin: 0 0 12px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--bi-primary);
}

.bi-title {
  margin: 0;
  font-family: var(--bi-font-heading);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: var(--bi-fg);
  text-wrap: balance;
}

.bi-subtitle {
  margin: 0;
  color: var(--bi-muted);
  font-size: 1.125rem;
  line-height: 1.65;
  max-width: 640px;
  margin-inline: auto;
}

.bi-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: var(--bi-control-height, 2.25rem);
  padding: 0.5rem 1.75rem;
  border-radius: var(--bi-radius);
  font-weight: 600;
  font-size: 0.95rem;
  font-family: var(--bi-font-body);
  cursor: pointer;
  text-decoration: none;
  border: none;
  transition: opacity 0.15s ease, transform 0.15s ease;
  white-space: nowrap;
}

.bi-btn:hover {
  opacity: 0.88;
}

.bi-btn:active {
  transform: translateY(1px);
}

.bi-btn-primary {
  background: var(--bi-primary);
  color: var(--bi-primary-fg);
  box-shadow: var(--bi-shadow);
}

.bi-btn-outline {
  background: transparent;
  color: var(--bi-fg);
  border: 1px solid var(--bi-border);
}

.bi-card {
  background: var(--bi-bg);
  border: 1px solid var(--bi-border);
  border-radius: var(--bi-radius);
  padding: var(--bi-card-padding, 1rem);
  overflow: hidden;
  box-shadow: var(--bi-shadow);
}

.bi-card.bi-product-card {
  padding: 0;
}
`;

export function buildThemeVarsCss(tokens: {
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
  shadow: string;
  cardPadding: string;
  controlHeight: string;
  sectionGap: string;
  chart: [string, string, string, string, string];
}): string {
  return `:root {
  --bi-bg: ${tokens.background};
  --bi-fg: ${tokens.foreground};
  --bi-card: ${tokens.card};
  --bi-popover: ${tokens.popover};
  --bi-primary: ${tokens.primary};
  --bi-primary-fg: ${tokens.primaryForeground};
  --bi-secondary: ${tokens.secondary};
  --bi-secondary-fg: ${tokens.secondaryForeground};
  --bi-muted: ${tokens.muted};
  --bi-muted-fg: ${tokens.mutedForeground};
  --bi-accent: ${tokens.accent};
  --bi-accent-fg: ${tokens.accentForeground};
  --bi-border: ${tokens.border};
  --bi-input: ${tokens.input};
  --bi-ring: ${tokens.ring};
  --bi-destructive: ${tokens.destructive};
  --bi-radius: ${tokens.radius};
  --bi-font-heading: ${tokens.fontHeading};
  --bi-font-body: ${tokens.fontBody};
  --bi-font-mono: ${tokens.fontMono};
  --bi-shadow: ${tokens.shadow};
  --bi-control-height: ${tokens.controlHeight};
  --bi-card-padding: ${tokens.cardPadding};
  --bi-section-gap: ${tokens.sectionGap};
  --bi-chart-1: ${tokens.chart[0]};
  --bi-chart-2: ${tokens.chart[1]};
  --bi-chart-3: ${tokens.chart[2]};
  --bi-chart-4: ${tokens.chart[3]};
  --bi-chart-5: ${tokens.chart[4]};
}`;
}
