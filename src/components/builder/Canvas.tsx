"use client";

import { useMemo, useState } from "react";
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  useDroppable,
  closestCenter,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Copy, Trash2, GripVertical } from "lucide-react";
import { useBuilderStore } from "@/lib/store/project-store";
import { resolveTheme } from "@/lib/theme/presets";
import { projectTokenStyle, themeTokenStyle } from "@/lib/registry/shared";
import { SectionPreview } from "@/components/preview/SectionPreview";
import { cn } from "@/lib/utils";
import type { Node } from "@/lib/schema/types";

export const CANVAS_ROOT_ID = "canvas-root";

const DEVICE_WIDTHS: Record<string, number | null> = {
  desktop: null,
  tablet: 768,
  mobile: 390,
};

interface DragInfo {
  type: "new" | "sort";
  id: string;
  componentType?: string;
  overIndex: number | null;
}

export function Canvas() {
  const document = useBuilderStore((s) => s.document);
  const selectedId = useBuilderStore((s) => s.selectedId);
  const select = useBuilderStore((s) => s.select);
  const addSection = useBuilderStore((s) => s.addSection);
  const removeSection = useBuilderStore((s) => s.removeSection);
  const duplicateSection = useBuilderStore((s) => s.duplicateSection);
  const moveSection = useBuilderStore((s) => s.moveSection);

  const sections = document.pages[0].sections;
  const device = document.settings.device;
  const tokens = useMemo(() => resolveTheme(document.theme), [document.theme]);
  const deviceWidth = DEVICE_WIDTHS[device];

  const [drag, setDrag] = useState<DragInfo | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 120, tolerance: 8 } })
  );

  function computeOverIndex(
    overId: string | undefined | null,
    listLength: number,
    isSortedOver: boolean
  ): number {
    if (!overId) return listLength;
    if (overId === CANVAS_ROOT_ID) return listLength;
    const idx = sections.findIndex((s) => s.id === overId);
    if (idx === -1) return listLength;
    return isSortedOver ? idx : idx + 1;
  }

  function handleDragStart(event: DragStartEvent) {
    const data = event.active.data.current as
      | { type: "new"; componentType: string }
      | { type: "sort" }
      | undefined;
    if (!data) return;
    setDrag({
      type: data.type,
      id: String(event.active.id),
      componentType: data.type === "new" ? data.componentType : undefined,
      overIndex: null,
    });
  }

  function handleDragOver(event: DragOverEvent) {
    if (!drag) return;
    const { over } = event;
    const isSorted = Boolean(over && over.id !== CANVAS_ROOT_ID);
    const overIndex = computeOverIndex(
      over ? String(over.id) : null,
      sections.length,
      isSorted
    );
    setDrag((d) => (d ? { ...d, overIndex } : d));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    const data = active.data.current as
      | { type: "new"; componentType: string }
      | { type: "sort" }
      | undefined;

    if (data?.type === "new" && data.componentType) {
      const overIndex = computeOverIndex(
        over ? String(over.id) : null,
        sections.length,
        Boolean(over && over.id !== CANVAS_ROOT_ID)
      );
      addSection(data.componentType, overIndex);
    } else if (data?.type === "sort" && over) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = computeOverIndex(
        String(over.id),
        sections.length,
        true
      );
      if (oldIndex !== -1) moveSection(oldIndex, newIndex);
    }
    setDrag(null);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setDrag(null)}
    >
      <div className="flex-1 overflow-y-auto bg-secondary/40 px-6 py-8">
        <div
          className="mx-auto rounded-lg shadow-lg shadow-black/30 ring-1 ring-border transition-[width] duration-200"
          style={{
            width: deviceWidth ? `${deviceWidth}px` : "100%",
            maxWidth: 1100,
            background: tokens.background,
          }}
        >
          <CanvasRoot>
            <div
              className="container-type"
              style={
                {
                  ...themeTokenStyle(tokens),
                  ...projectTokenStyle(tokens),
                } as React.CSSProperties
              }
            >
              {sections.length === 0 ? (
                <EmptyCanvas dragActive={drag !== null} />
              ) : (
                <SortableContext
                  items={sections.map((s) => s.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="flex flex-col">
                    {sections.map((section, index) => (
                      <SortableSection
                        key={section.id}
                        section={section}
                        index={index}
                        selected={selectedId === section.id}
                        dragging={drag?.id === section.id}
                        onSelect={() => select(section.id)}
                        onDuplicate={() => duplicateSection(section.id)}
                        onRemove={() => removeSection(section.id)}
                      />
                    ))}
                    {drag && drag.overIndex !== null ? (
                      <DropIndicator visible={true} />
                    ) : null}
                  </div>
                </SortableContext>
              )}
            </div>
          </CanvasRoot>
        </div>
      </div>
    </DndContext>
  );
}

function CanvasRoot({ children }: { children: React.ReactNode }) {
  const { setNodeRef } = useDroppable({ id: CANVAS_ROOT_ID });
  return <div ref={setNodeRef}>{children}</div>;
}

function EmptyCanvas({ dragActive }: { dragActive: boolean }) {
  return (
    <div
      className={cn(
        "flex min-h-64 flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-10 text-center",
        dragActive ? "border-brand bg-brand/5" : "border-border bg-background"
      )}
    >
      <p className="text-sm font-medium text-muted-foreground">
        {dragActive
          ? "Lepaskan di sini untuk menambahkan komponen"
          : "Kanvas kosong — seret komponen dari panel kiri"}
      </p>
      <p className="text-xs text-muted-foreground/70">
        Mulai dari Navbar, Hero, atau komponen lain sesuai kebutuhan Anda.
      </p>
    </div>
  );
}

function DropIndicator({ visible }: { visible: boolean }) {
  return (
    <div
      className={cn(
        "mx-3 h-0.5 rounded-full bg-brand transition-all",
        visible ? "my-1 opacity-100" : "opacity-0"
      )}
    />
  );
}

function SortableSection({
  section,
  index,
  selected,
  dragging,
  onSelect,
  onDuplicate,
  onRemove,
}: {
  section: Node;
  index: number;
  selected: boolean;
  dragging: boolean;
  onSelect: () => void;
  onDuplicate: () => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: section.id, data: { type: "sort" } });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 30 : undefined,
        position: "relative",
      }}
    >
      <div
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a, button")) {
            e.preventDefault();
            return;
          }
          onSelect();
        }}
        className={cn(
          "group relative transition-shadow",
          selected
            ? "shadow-[0_0_0_2px_#e6007e] z-10"
            : "hover:shadow-[0_0_0_1px_rgba(0,0,0,0.12)]"
        )}
      >
        {selected ? (
          <div className="absolute left-0 top-0 z-20 -translate-y-full flex items-center gap-0.5 rounded-t-md bg-brand px-1 py-0.5">
            <span className="px-1.5 text-[11px] font-medium text-white">
              {index + 1}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDuplicate();
              }}
              className="rounded p-1 text-white/90 hover:bg-brand-hover"
              title="Duplikat"
            >
              <Copy size={12} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="rounded p-1 text-white/90 hover:bg-red-400"
              title="Hapus"
            >
              <Trash2 size={12} />
            </button>
          </div>
        ) : null}

        <div
          {...attributes}
          {...listeners}
          className={cn(
            "absolute right-1 top-1 z-20 rounded p-1 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground",
            dragging && "opacity-100"
          )}
          title="Seret untuk menggeser urutan"
        >
          <GripVertical size={14} />
        </div>

        <SectionPreview node={section} theme={useBuilderStore.getState().document.theme} />
      </div>
      {!selected ? <div className="h-1.5 bg-transparent" /> : null}
    </div>
  );
}