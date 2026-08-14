import type { Node } from "@/lib/schema/types";
import type { ExportContext, ExportResult } from "@/lib/registry/types";

export function gridContainerExportAdapter(
  node: Node,
  _ctx: ExportContext
): ExportResult {
  const cols = Number(node.props.columns) || 4;

  const html = `<div className="bi-grid-container grid-cols-${cols}">
  <!-- Grid Children Rendered Here -->
</div>`;

  const css = `.bi-grid-container { display: grid; gap: 1rem; padding: 1rem 0; }
.bi-grid-container.grid-cols-1 { grid-template-columns: 1fr; }
.bi-grid-container.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.bi-grid-container.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.bi-grid-container.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
@media (max-width: 768px) {
  .bi-grid-container { grid-template-columns: 1fr !important; }
}`;

  return { html, css };
}
