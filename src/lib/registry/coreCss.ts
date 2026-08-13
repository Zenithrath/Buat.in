export const CORE_CSS = `/* ===== Buat.in shared primitives ===== */
:root {
  container-type: inline-size;
  --bi-bg: #ffffff;
  --bi-fg: #18181b;
  --bi-primary: #2563eb;
  --bi-primary-fg: #ffffff;
  --bi-secondary: #eff6ff;
  --bi-muted: #64748b;
  --bi-border: #e2e8f0;
  --bi-radius: 8px;
  --bi-font-heading: 'Inter', system-ui, sans-serif;
  --bi-font-body: 'Inter', system-ui, sans-serif;
  --bi-shadow: 0 10px 30px -12px rgba(0, 0, 0, 0.15);
}

*, *::before, *::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: var(--bi-font-body);
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
  padding: 0.8rem 1.75rem;
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
  overflow: hidden;
  box-shadow: var(--bi-shadow);
}
`;

export function buildThemeVarsCss(tokens: {
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
  shadow: string;
}): string {
  return `:root {
  --bi-bg: ${tokens.background};
  --bi-fg: ${tokens.foreground};
  --bi-primary: ${tokens.primary};
  --bi-primary-fg: ${tokens.primaryForeground};
  --bi-secondary: ${tokens.secondary};
  --bi-muted: ${tokens.muted};
  --bi-border: ${tokens.border};
  --bi-radius: ${tokens.radius};
  --bi-font-heading: ${tokens.fontHeading};
  --bi-font-body: ${tokens.fontBody};
  --bi-shadow: ${tokens.shadow};
}`;
}