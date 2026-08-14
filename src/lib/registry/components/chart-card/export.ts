import type { Node } from "@/lib/schema/types";
import type { ExportContext, ExportResult } from "@/lib/registry/types";
import { chartCardExport } from "@/asset-comp/components/chart-card/export";

export function chartCardExportAdapter(
  node: Node,
  _ctx: ExportContext
): ExportResult {
  return chartCardExport(node);
}
