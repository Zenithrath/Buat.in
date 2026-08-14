import type { ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { propString } from "@/lib/registry/shared";

export function dashboardHeaderExport(node: Node): ExportResult {
  const title = propString(node, "title") || "Overview Dashboard";
  const breadcrumb = propString(node, "breadcrumb") || "Dashboard / Analytics";
  const searchPlaceholder = propString(node, "searchPlaceholder") || "Cari data...";
  const actionText = propString(node, "actionText") || "Export Laporan";

  const html = `
<header class="bi-dashboard-header">
  <div>
    <p class="bi-header-crumb">${breadcrumb}</p>
    <h1 class="bi-header-title">${title}</h1>
  </div>
  <div class="bi-header-actions">
    <input type="text" class="bi-header-search" placeholder="${searchPlaceholder}" />
    <button class="bi-header-btn">${actionText}</button>
  </div>
</header>`;

  const css = `
.bi-dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background-color: var(--card);
  border-bottom: 1px solid var(--border);
}
.bi-header-crumb {
  font-size: 0.6875rem;
  color: var(--muted-foreground);
  margin: 0;
}
.bi-header-title {
  font-size: 1.125rem;
  font-weight: 700;
  margin: 0;
}
.bi-header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.bi-header-search {
  height: 32px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background-color: var(--background);
  padding: 0 0.75rem;
  font-size: 0.75rem;
}
.bi-header-btn {
  height: 32px;
  border-radius: var(--radius);
  background-color: var(--primary);
  color: var(--primary-foreground);
  border: none;
  padding: 0 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
}
`;

  return { html, css };
}
