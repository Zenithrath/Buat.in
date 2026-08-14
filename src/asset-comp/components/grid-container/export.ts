import type { ExportContext, ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { propString } from "@/lib/registry/shared";
import { componentMap } from "@/lib/registry";

function renderChildren(node: Node, ctx: ExportContext): { html: string; css: string[] } {
  const htmlParts: string[] = [];
  const cssParts: string[] = [];
  for (const child of node.children ?? []) {
    const manifest = componentMap[child.componentType];
    if (!manifest) continue;
    const result = manifest.exportAdapter(child, ctx);
    htmlParts.push(result.html);
    cssParts.push(result.css);
  }
  return { html: htmlParts.join("\n"), css: cssParts };
}

export function gridContainerExport(node: Node, ctx: ExportContext): ExportResult {
  const cols = propString(node, "columns") || "4";
  const gap = propString(node, "gap") || "md";

  const children = renderChildren(node, ctx);
  const childrenHtml =
    children.html ||
    `<div class="bi-grid-empty">Kontainer kosong — tambahkan komponen di editor.</div>`;

  const html = `
<div class="bi-grid-container cols-${cols} gap-${gap}">
  ${childrenHtml}
</div>`;

  const css = `
.bi-grid-container {
  display: grid;
  gap: 1rem;
  width: 100%;
}
.bi-grid-container.cols-1 { grid-template-columns: 1fr; }
.bi-grid-container.cols-2 { grid-template-columns: repeat(2, 1fr); }
.bi-grid-container.cols-3 { grid-template-columns: repeat(3, 1fr); }
.bi-grid-container.cols-4 { grid-template-columns: repeat(4, 1fr); }
.bi-grid-container.gap-sm { gap: 0.5rem; }
.bi-grid-container.gap-lg { gap: 1.5rem; }
.bi-grid-empty {
  grid-column: 1 / -1;
  padding: 2rem;
  text-align: center;
  font-size: 0.75rem;
  color: var(--muted-foreground);
  border: 1px dashed var(--border);
  border-radius: var(--radius);
}
@media (max-width: 768px) {
  .bi-grid-container { grid-template-columns: 1fr !important; }
}
${children.css.join("\n")}
`;

  return { html, css };
}
