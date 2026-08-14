import type { ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { propString } from "@/lib/registry/shared";

export function footerExport(node: Node): ExportResult {
  const copyrightText = propString(node, "copyrightText") || "© 2026";

  const html = `
<footer class="bi-footer">
  <p>${copyrightText}</p>
</footer>`;

  const css = `
.bi-footer { border-top: 1px solid var(--border); padding: 2rem 1.5rem; text-align: center; font-size: 0.75rem; color: var(--muted-foreground); background: var(--card); }
`;

  return { html, css };
}
