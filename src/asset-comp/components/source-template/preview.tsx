"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { getTemplateSource } from "@/templates";
import { propString } from "@/lib/registry/shared";

export function SourceTemplatePreview({ node }: { node: Node; theme: Theme }) {
  const templateId = propString(node, "sourceTemplateId");
  const source = getTemplateSource(templateId);

  if (!source) {
    return (
      <div className="flex min-h-48 items-center justify-center border border-dashed border-destructive bg-destructive/5 p-6 text-sm text-destructive">
        Source template tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="relative min-h-[520px] w-full overflow-hidden border border-border bg-white">
      <iframe
        title={source.folder}
        src={`/api/template-source/${templateId}/${source.entry}`}
        className="h-[min(76vw,900px)] min-h-[520px] w-full border-0"
        loading="lazy"
      />
    </div>
  );
}
