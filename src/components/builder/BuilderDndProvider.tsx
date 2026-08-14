"use client";

import { useState } from "react";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { Blocks, GripVertical } from "lucide-react";
import { getComponent } from "@/lib/registry";
import { useBuilderStore } from "@/lib/store/project-store";
import type { Node } from "@/lib/schema/types";

export const CANVAS_ROOT_ID = "canvas-root";
export const GRID_DROP_PREFIX = "grid-drop:";

interface DragData {
  type?: "new" | "sort";
  componentType?: string;
}

interface ActiveDrag {
  id: string;
  type: "new" | "sort";
  componentType?: string;
}

interface NodeLocation {
  node: Node;
  parentId: string | null;
  index: number;
}

function findNodeLocation(
  nodes: Node[],
  id: string,
  parentId: string | null = null
): NodeLocation | null {
  for (let index = 0; index < nodes.length; index += 1) {
    const node = nodes[index];
    if (node.id === id) return { node, parentId, index };
    const nested = findNodeLocation(node.children ?? [], id, node.id);
    if (nested) return nested;
  }
  return null;
}

/**
 * The palette and canvas are siblings in the editor layout. Keeping the dnd-kit
 * context above both is important: a draggable in the left panel otherwise
 * cannot ever reach a droppable area in the canvas.
 */
export function BuilderDndProvider({ children }: { children: React.ReactNode }) {
  const sections = useBuilderStore((s) => s.document.pages[0].sections);
  const addSection = useBuilderStore((s) => s.addSection);
  const addChild = useBuilderStore((s) => s.addChild);
  const moveNode = useBuilderStore((s) => s.moveNode);
  const [activeDrag, setActiveDrag] = useState<ActiveDrag | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 140, tolerance: 8 },
    })
  );

  const getDropTarget = (overId: string): { parentId: string | null; index: number } | null => {
    if (overId === CANVAS_ROOT_ID) return { parentId: null, index: sections.length };
    if (overId.startsWith(GRID_DROP_PREFIX)) {
      const parentId = overId.slice(GRID_DROP_PREFIX.length);
      const parent = findNodeLocation(sections, parentId)?.node;
      return parent ? { parentId, index: parent.children.length } : null;
    }
    const target = findNodeLocation(sections, overId);
    return target ? { parentId: target.parentId, index: target.index } : null;
  };

  const handleDragStart = (event: DragStartEvent) => {
    const data = event.active.data.current as DragData | undefined;
    setActiveDrag({
      id: String(event.active.id),
      type: data?.type ?? "sort",
      componentType: data?.componentType,
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const data = event.active.data.current as DragData | undefined;
    const overId = event.over ? String(event.over.id) : null;

    // A drop outside the canvas must be a no-op. The old implementation
    // appended components even when users cancelled a drag outside the frame.
    if (!overId) {
      setActiveDrag(null);
      return;
    }

    const target = getDropTarget(overId);
    if (!target) {
      setActiveDrag(null);
      return;
    }

    if (data?.type === "new" && data.componentType) {
      if (target.parentId) {
        addChild(target.parentId, data.componentType, target.index);
      } else {
        addSection(data.componentType, target.index);
      }
    } else if (data?.type === "sort") {
      const source = findNodeLocation(sections, String(event.active.id));
      if (
        source &&
        !(source.parentId === target.parentId && source.index === target.index)
      ) {
        moveNode(source.node.id, target.parentId, target.index);
      }
    }

    setActiveDrag(null);
  };

  const overlayLabel = activeDrag
    ? activeDrag.type === "new"
      ? getComponent(activeDrag.componentType ?? "")?.name ?? "Komponen baru"
      : findNodeLocation(sections, activeDrag.id)?.node.name ?? "Komponen"
    : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveDrag(null)}
    >
      {children}
      <DragOverlay dropAnimation={null}>
        {activeDrag ? (
          <div className="flex items-center gap-2 rounded-md border border-brand/40 bg-card px-3 py-2 text-xs font-semibold text-foreground shadow-md">
            {activeDrag.type === "new" ? <Blocks size={14} /> : <GripVertical size={14} />}
            {overlayLabel}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
