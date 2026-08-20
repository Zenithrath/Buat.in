import type { ExportContext, ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { escapeHtml, propString } from "@/lib/registry/shared";

export function sourceTemplateExport(
  node: Node,
  _ctx: ExportContext
): ExportResult {
  const templateId = propString(node, "sourceTemplateId");

  return {
    html: `<div class="bi-source-template" data-template-id="${escapeHtml(templateId)}"></div>`,
    css: ".bi-source-template{min-height:100vh;width:100%;}",
  };
}
