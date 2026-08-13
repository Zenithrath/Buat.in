import type { Node } from "@/lib/schema/types";
import { escapeHtml, sanitizeUrl, sectionWrapper } from "@/lib/registry/shared";
import type { ExportContext, ExportResult } from "@/lib/registry/types";

export const NAV_CSS = `.bi-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--bi-bg) 88%, transparent);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--bi-border);
}

.bi-nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding-block: 16px;
}

.bi-nav-logo {
  font-family: var(--bi-font-heading);
  font-weight: 800;
  font-size: 1.2rem;
  color: var(--bi-fg);
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.bi-nav-logo-dot {
  width: 10px;
  height: 10px;
  border-radius: 9999px;
  background: var(--bi-primary);
}

.bi-nav-links {
  display: flex;
  align-items: center;
  gap: 28px;
}

.bi-nav-links a {
  color: var(--bi-muted);
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.15s ease;
}

.bi-nav-links a:hover {
  color: var(--bi-fg);
}

.bi-nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.bi-nav-toggle {
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--bi-border);
  border-radius: var(--bi-radius);
  background: var(--bi-bg);
  color: var(--bi-fg);
  cursor: pointer;
}

.bi-nav-toggle svg {
  width: 20px;
  height: 20px;
}

@container (max-width: 700px) {
  .bi-nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    background: var(--bi-bg);
    border-bottom: 1px solid var(--bi-border);
    padding: 8px 16px;
  }

  .bi-nav-links a {
    padding: 12px 8px;
    border-bottom: 1px solid var(--bi-border);
  }

  .bi-nav-links a:last-child {
    border-bottom: none;
  }

  .bi-nav[data-nav-open="true"] .bi-nav-links {
    display: flex;
  }

  .bi-nav-toggle {
    display: inline-flex;
  }

  .bi-nav-cta {
    display: none;
  }
}`;

export function navbarExportAdapter(
  node: Node,
  ctx: ExportContext
): ExportResult {
  const { html: wrapper, css } = sectionWrapper(
    node,
    ctx,
    "",
    "bi-nav",
    "header"
  );
  const logo = escapeHtml(node.props.logoText || "Logo");
  const ctaText = escapeHtml(node.props.ctaText);
  const ctaUrl = sanitizeUrl(node.props.ctaUrl);

  const links = [1, 2, 3]
    .map((i) => {
      const text = node.props[`link${i}Text`];
      if (!text) return "";
      return `<a href="${sanitizeUrl(node.props[`link${i}Url`])}">${escapeHtml(
        text
      )}</a>`;
    })
    .join("");

  const inner = `<div class="bi-container bi-nav-inner" style="padding-inline:0">
  <a class="bi-nav-logo" href="#">${logo}</a>
  <nav class="bi-nav-links">
    ${links}
  </nav>
  <div class="bi-nav-actions">
    ${
      ctaText
        ? `<a class="bi-btn bi-btn-primary bi-nav-cta" href="${ctaUrl}">${ctaText}</a>`
        : ""
    }
    <button type="button" class="bi-nav-toggle" aria-label="Buka menu">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"/></svg>
    </button>
  </div>
</div>`;

  return {
    html: wrapper
      .replace("</header>", `${inner}</header>`)
      .replace(`class="bi-nav"`, 'class="bi-nav" data-nav-open="false"'),
    css: NAV_CSS + "\n" + css,
  };
}