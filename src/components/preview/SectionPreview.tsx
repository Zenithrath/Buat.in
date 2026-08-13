"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { getComponent } from "@/lib/registry";

export function SectionPreview({ node, theme }: { node: Node; theme: Theme }) {
  const manifest = getComponent(node.componentType);
  if (!manifest) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-dashed border-red-300 bg-red-50 p-8 text-sm text-red-500">
        Komponen &quot;{node.componentType}&quot; tidak ditemukan
      </div>
    );
  }
  const Renderer = manifest.previewRenderer;
  return <Renderer node={node} theme={theme} />;
}