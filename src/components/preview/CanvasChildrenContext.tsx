"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Node } from "@/lib/schema/types";

/**
 * Container previews (modal, grid, dan seterusnya) also render on the
 * read-only preview route.  The builder supplies this optional renderer so a
 * container can expose its children as draggable, selectable Canvas nodes
 * without coupling asset components to the editor implementation.
 */
export type CanvasChildLayout = "grid" | "stack";

export type CanvasChildrenOptions = {
  layout?: CanvasChildLayout;
  className?: string;
  emptyClassName?: string;
  emptyMessage?: string;
};

type CanvasChildrenRenderer = (
  node: Node,
  options?: CanvasChildrenOptions
) => ReactNode;

const CanvasChildrenContext = createContext<CanvasChildrenRenderer | null>(null);

export function CanvasChildrenProvider({
  renderChildren,
  children,
}: {
  renderChildren: CanvasChildrenRenderer;
  children: ReactNode;
}) {
  return (
    <CanvasChildrenContext.Provider value={renderChildren}>
      {children}
    </CanvasChildrenContext.Provider>
  );
}

export function useCanvasChildrenRenderer() {
  return useContext(CanvasChildrenContext);
}
