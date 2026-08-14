import type { ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { propString } from "@/lib/registry/shared";

interface SidebarLink {
  id: string;
  label: string;
  active?: boolean;
}

export function appSidebarExport(node: Node): ExportResult {
  const brandName = propString(node, "brandName") || "Acme Analytics";
  const brandTag = propString(node, "brandTag") || "PRO";
  const userName = propString(node, "userName") || "Alex Rivers";
  const userRole = propString(node, "userRole") || "Administrator";

  let links: SidebarLink[] = [];
  try {
    links = JSON.parse(propString(node, "linksJson"));
  } catch {
    links = [
      { id: "s1", label: "Overview", active: true },
      { id: "s2", label: "Analytics", active: false },
      { id: "s3", label: "Transaksi", active: false },
      { id: "s4", label: "Pengguna", active: false },
    ];
  }

  const linksHtml = links
    .map(
      (l) => `
      <a href="#" class="bi-sidebar-link ${l.active ? "active" : ""}">
        <span>${l.label}</span>
      </a>`
    )
    .join("\n");

  const html = `
<aside class="bi-app-sidebar">
  <div class="bi-sidebar-brand">
    <div class="bi-brand-logo">${brandName.charAt(0)}</div>
    <div>
      <h2 class="bi-brand-title">${brandName}</h2>
      <span class="bi-brand-sub">Dashboard System</span>
    </div>
    ${brandTag ? `<span class="bi-brand-tag">${brandTag}</span>` : ""}
  </div>
  <nav class="bi-sidebar-nav">
    <p class="bi-nav-heading">Menu Utama</p>
    ${linksHtml}
  </nav>
  <div class="bi-sidebar-user">
    <div class="bi-user-avatar">${userName.charAt(0)}</div>
    <div class="bi-user-info">
      <p class="bi-user-name">${userName}</p>
      <p class="bi-user-role">${userRole}</p>
    </div>
  </div>
</aside>`;

  const css = `
.bi-app-sidebar {
  width: var(--bi-sidebar-width, 256px);
  height: 100%;
  min-height: 480px;
  background-color: var(--card);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-sizing: border-box;
}
.bi-sidebar-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 1.5rem;
}
.bi-brand-logo {
  width: 32px;
  height: 32px;
  background: var(--primary);
  color: var(--primary-foreground);
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
.bi-brand-title {
  font-size: 0.875rem;
  font-weight: 700;
  margin: 0;
}
.bi-brand-sub {
  font-size: 0.625rem;
  color: var(--muted-foreground);
}
.bi-brand-tag {
  margin-left: auto;
  font-size: 0.5625rem;
  font-weight: 700;
  background: var(--primary);
  color: var(--primary-foreground);
  padding: 2px 6px;
  border-radius: 4px;
}
.bi-sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.bi-nav-heading {
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--muted-foreground);
  margin: 0 0 0.5rem 0;
}
.bi-sidebar-link {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  color: var(--muted-foreground);
  text-decoration: none;
  border-radius: var(--radius);
  transition: background 0.15s;
}
.bi-sidebar-link.active {
  background: var(--primary);
  color: var(--primary-foreground);
  font-weight: 600;
}
.bi-sidebar-user {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.bi-user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 9999px;
  background: var(--primary);
  color: var(--primary-foreground);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.75rem;
}
.bi-user-name {
  font-size: 0.75rem;
  font-weight: 600;
  margin: 0;
}
.bi-user-role {
  font-size: 0.625rem;
  color: var(--muted-foreground);
  margin: 0;
}
`;

  return { html, css };
}
