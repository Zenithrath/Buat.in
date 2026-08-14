"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { getComponent } from "@/lib/registry";

export function SectionPreview({ node, theme }: { node: Node; theme: Theme }) {
  const manifest = getComponent(node.componentType);
  if (!manifest) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-dashed border-destructive bg-destructive/5 p-8 text-sm text-destructive">
        Komponen &quot;{node.componentType}&quot; tidak ditemukan
      </div>
    );
  }
  const Renderer = manifest.previewRenderer;
  return <Renderer node={node} theme={theme} />;
}