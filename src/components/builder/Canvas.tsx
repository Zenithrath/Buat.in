"use client";

import { useMemo, useState, useCallback, useEffect, useRef } from "react";
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
import {
  Copy,
  Trash2,
  GripVertical,
  Box,
  LayoutDashboard,
  BarChart3,
  CreditCard,
  Users,
  Settings,
} from "lucide-react";
import { useBuilderStore } from "@/lib/store/project-store";
import { resolveTheme } from "@/lib/theme/presets";
import { projectTokenStyle, themeTokenStyle, propString } from "@/lib/registry/shared";
import { getComponent } from "@/lib/registry";
import { SectionPreview } from "@/components/preview/SectionPreview";
import { cn } from "@/lib/utils";
import type { Node, Theme } from "@/lib/schema/types";

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

interface DragData {
  type?: "new" | "sort";
  componentType?: string;
}

/** Detect if a set of sections represents a dashboard layout */
function isDashboardLayout(sections: Node[]): boolean {
  return sections.some(
    (s) => s.componentType === "app-sidebar" || s.componentType === "dashboard-header"
  );
}

/** Dashboard layout renderer — sidebar left, rest in main area */
function DashboardLayoutCanvas({
  sections,
  theme,
  selectedId,
  onSelect,
  onDuplicate,
  onRemove,
  device,
}: {
  sections: Node[];
  theme: Theme;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDuplicate: (id: string) => void;
  onRemove: (id: string) => void;
  device: string;
}) {
  const sidebar = sections.find((s) => s.componentType === "app-sidebar");
  const header = sections.find((s) => s.componentType === "dashboard-header");
  const kpiCards = sections.filter((s) => s.componentType === "kpi-card");
  const charts = sections.filter((s) => s.componentType === "chart-card");
  const tables = sections.filter((s) => s.componentType === "data-table");
  const others = sections.filter(
    (s) =>
      !["app-sidebar", "dashboard-header", "kpi-card", "chart-card", "data-table"].includes(
        s.componentType
      )
  );

  const isMobile = device === "mobile";
  const isTablet = device === "tablet";

  const updateNode = useBuilderStore((s) => s.updateNode);
  const sidebarStyles = (sidebar?.styles ?? {}) as Record<string, string>;
  const storedWidth = parseInt(sidebarStyles.sidebarWidth ?? "", 10);
  const defaultWidth = isTablet ? 208 : 240;
  const [dragWidth, setDragWidth] = useState<number | null>(null);
  const [resizing, setResizing] = useState(false);
  const width =
    resizing && dragWidth
      ? dragWidth
      : Number.isFinite(storedWidth) && storedWidth > 0
      ? storedWidth
      : defaultWidth;

  const widthRef = useRef(width);

  function startResize(e: React.PointerEvent) {
    if (!sidebar) return;
    e.preventDefault();
    e.stopPropagation();
    setResizing(true);
    const startX = e.clientX;
    const startW = width;
    const onMove = (ev: PointerEvent) => {
      const w = Math.min(360, Math.max(168, startW + ev.clientX - startX));
      widthRef.current = w;
      setDragWidth(w);
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      setResizing(false);
      const finalW = widthRef.current;
      setDragWidth(null);
      if (sidebar && finalW) {
        updateNode(sidebar.id, (n) => ({
          ...n,
          styles: { ...n.styles, sidebarWidth: String(Math.round(finalW)) } as Node["styles"],
        }));
      }
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }

  const frameCls = cn(
    "flex w-full min-h-screen bg-muted/20",
    isMobile ? "flex-col" : "flex-row"
  );

  return (
    <div className={frameCls} style={{ minHeight: 700 }}>
      {/* Sidebar — hidden on mobile (bottom bar instead), compact on tablet */}
      {sidebar && !isMobile ? (
        <div
          className="shrink-0 relative group/node transition-[width] duration-100"
          style={{ width }}
          onClick={() => onSelect(sidebar.id)}
        >
          {selectedId === sidebar.id && (
            <SelectionBadge
              name="App Sidebar"
              onDuplicate={() => onDuplicate(sidebar.id)}
              onRemove={() => onRemove(sidebar.id)}
            />
          )}
          <div
            className={cn(
              "h-full ring-offset-0",
              selectedId === sidebar.id
                ? "ring-2 ring-primary"
                : "hover:ring-1 hover:ring-primary/40"
            )}
          >
            <SectionPreview node={sidebar} theme={theme} />
          </div>

          {/* Resize handle */}
          <div
            role="separator"
            aria-orientation="vertical"
            title="Seret untuk mengubah lebar sidebar"
            onPointerDown={startResize}
            onPointerUp={(e) => e.stopPropagation()}
            className={cn(
              "absolute right-0 top-0 h-full w-1.5 cursor-col-resize z-20",
              "flex items-center justify-center bg-transparent",
              "hover:bg-primary/30 active:bg-primary/60",
              resizing && "bg-primary/60"
            )}
          >
            <span className="h-10 w-0.5 rounded-full bg-muted-foreground/50 opacity-0 group-hover:opacity-100" />
          </div>
        </div>
      ) : null}

      {/* Main content area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Dashboard Header */}
        {header ? (
          <div
            className="relative group/node shrink-0 cursor-pointer"
            onClick={() => onSelect(header.id)}
          >
            {selectedId === header.id && (
              <SelectionBadge
                name="Dashboard Header"
                onDuplicate={() => onDuplicate(header.id)}
                onRemove={() => onRemove(header.id)}
              />
            )}
            <div
              className={cn(
                "transition-all",
                selectedId === header.id
                  ? "ring-2 ring-primary ring-offset-0"
                  : "hover:ring-1 hover:ring-primary/40"
              )}
            >
              <SectionPreview node={header} theme={theme} />
            </div>
          </div>
        ) : null}

        {/* Scrollable content area */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {/* KPI Cards grid */}
          {kpiCards.length > 0 && (
            <div
              className={cn(
                "grid gap-4",
                isMobile
                  ? "grid-cols-1"
                  : isTablet
                  ? "grid-cols-2"
                  : "grid-cols-2 lg:grid-cols-4"
              )}
            >
              {kpiCards.map((card) => (
                <ClickableNode
                  key={card.id}
                  node={card}
                  theme={theme}
                  selected={selectedId === card.id}
                  onSelect={() => onSelect(card.id)}
                  onDuplicate={() => onDuplicate(card.id)}
                  onRemove={() => onRemove(card.id)}
                />
              ))}
            </div>
          )}

          {/* Charts row */}
          {charts.length > 0 && (
            <div
              className={cn(
                "grid gap-4",
                isMobile ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"
              )}
            >
              {charts.map((chart) => (
                <ClickableNode
                  key={chart.id}
                  node={chart}
                  theme={theme}
                  selected={selectedId === chart.id}
                  onSelect={() => onSelect(chart.id)}
                  onDuplicate={() => onDuplicate(chart.id)}
                  onRemove={() => onRemove(chart.id)}
                />
              ))}
            </div>
          )}

          {/* Tables */}
          {tables.map((table) => (
            <ClickableNode
              key={table.id}
              node={table}
              theme={theme}
              selected={selectedId === table.id}
              onSelect={() => onSelect(table.id)}
              onDuplicate={() => onDuplicate(table.id)}
              onRemove={() => onRemove(table.id)}
            />
          ))}

          {/* Any other non-dashboard sections */}
          {others.map((node) => (
            <ClickableNode
              key={node.id}
              node={node}
              theme={theme}
              selected={selectedId === node.id}
              onSelect={() => onSelect(node.id)}
              onDuplicate={() => onDuplicate(node.id)}
              onRemove={() => onRemove(node.id)}
            />
          ))}
        </div>

        {/* Mobile bottom navigation bar */}
        {sidebar && isMobile ? (
          <MobileBottomBar
            node={sidebar}
            selected={selectedId === sidebar.id}
            onSelect={() => onSelect(sidebar.id)}
          />
        ) : null}
      </div>
    </div>
  );
}

const BOTTOM_BAR_ICONS: Record<string, React.ReactNode> = {
  "layout-dashboard": <LayoutDashboard size={16} />,
  "bar-chart-3": <BarChart3 size={16} />,
  "credit-card": <CreditCard size={16} />,
  users: <Users size={16} />,
  settings: <Settings size={16} />,
};

interface BottomBarLink {
  id: string;
  label: string;
  icon?: string;
  active?: boolean;
}

function MobileBottomBar({
  node,
  selected,
  onSelect,
}: {
  node: Node;
  selected: boolean;
  onSelect: () => void;
}) {
  let links: BottomBarLink[] = [];
  try {
    const raw = propString(node, "linksJson");
    links = raw ? JSON.parse(raw) : [];
  } catch {
    links = [];
  }

  if (links.length === 0) {
    links = [
      { id: "s1", label: "Overview", icon: "layout-dashboard", active: true },
      { id: "s2", label: "Analytics", icon: "bar-chart-3", active: false },
      { id: "s3", label: "Transaksi", icon: "credit-card", active: false },
      { id: "s4", label: "Pengguna", icon: "users", active: false },
      { id: "s5", label: "Pengaturan", icon: "settings", active: false },
    ];
  }

  return (
    <div
      className={cn(
        "shrink-0 flex items-stretch justify-around border-t bg-card px-1 py-1.5 cursor-pointer",
        selected && "ring-2 ring-primary ring-inset"
      )}
      onClick={onSelect}
      title="Menu navigasi (App Sidebar)"
    >
      {links.map((link) => (
        <span
          key={link.id || link.label}
          className={cn(
            "flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-md px-1 py-1 text-[9px] font-semibold",
            link.active ? "text-primary" : "text-muted-foreground"
          )}
        >
          <span>{BOTTOM_BAR_ICONS[link.icon ?? ""] ?? <Box size={15} />}</span>
          <span className="truncate max-w-full">{link.label}</span>
        </span>
      ))}
    </div>
  );
}

function SelectionBadge({
  name,
  onDuplicate,
  onRemove,
}: {
  name: string;
  onDuplicate: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="absolute left-0 top-0 z-30 -translate-y-full flex items-center gap-1 rounded-t-md bg-primary px-2 py-0.5 text-white shadow-md">
      <span className="font-mono text-[10px] font-bold truncate max-w-32">{name}</span>
      <div className="h-3 w-px bg-white/30" />
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onDuplicate(); }}
        className="rounded p-0.5 text-white/90 hover:bg-white/20"
        title="Duplikat"
      >
        <Copy size={11} />
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onRemove(); }}
        className="rounded p-0.5 text-white/90 hover:bg-rose-500"
        title="Hapus"
      >
        <Trash2 size={11} />
      </button>
    </div>
  );
}

function ClickableNode({
  node,
  theme,
  selected,
  onSelect,
  onDuplicate,
  onRemove,
}: {
  node: Node;
  theme: Theme;
  selected: boolean;
  onSelect: () => void;
  onDuplicate: () => void;
  onRemove: () => void;
}) {
  const manifest = getComponent(node.componentType);
  return (
    <div
      className={cn(
        "relative cursor-pointer rounded-lg transition-all",
        selected ? "ring-2 ring-primary ring-offset-2 z-10" : "hover:ring-1 hover:ring-primary/40"
      )}
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
    >
      {selected && (
        <SelectionBadge
          name={node.name || manifest?.name || node.componentType}
          onDuplicate={onDuplicate}
          onRemove={onRemove}
        />
      )}
      <SectionPreview node={node} theme={theme} />
    </div>
  );
}

export function Canvas() {
  const document = useBuilderStore((s) => s.document);
  const selectedId = useBuilderStore((s) => s.selectedId);
  const select = useBuilderStore((s) => s.select);
  const selectAll = useBuilderStore((s) => s.selectAll);
  const addSection = useBuilderStore((s) => s.addSection);
  const removeSection = useBuilderStore((s) => s.removeSection);
  const duplicateSection = useBuilderStore((s) => s.duplicateSection);
  const moveSection = useBuilderStore((s) => s.moveSection);
  const zoomLevel = useBuilderStore((s) => s.zoomLevel);
  const setZoomLevel = useBuilderStore((s) => s.setZoomLevel);

  const sections = document.pages[0].sections;
  const device = document.settings.device;
  const tokens = useMemo(() => resolveTheme(document.theme), [document.theme]);
  const deviceWidth = DEVICE_WIDTHS[device];
  const isDashboard = isDashboardLayout(sections);

  const [drag, setDrag] = useState<DragInfo | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [spaceDown, setSpaceDown] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const panStart = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);

  // Ctrl+A select all, Escape deselect, Space pan
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === " " && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        setSpaceDown(true);
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "a") {
        e.preventDefault();
        if (typeof selectAll === "function") selectAll();
      }
      if (e.key === "Escape") {
        select(null);
      }
    }
    function handleKeyUp(e: KeyboardEvent) {
      if (e.key === " ") setSpaceDown(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [select, selectAll]);

  // Ctrl+Wheel Zoom
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    function onWheel(e: WheelEvent) {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -10 : 10;
        setZoomLevel(Math.min(200, Math.max(25, zoomLevel + delta)));
      }
    }
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoomLevel, setZoomLevel]);

  // Space + drag panning
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (spaceDown || e.button === 1) {
        setIsPanning(true);
        panStart.current = { x: e.clientX, y: e.clientY, ox: panOffset.x, oy: panOffset.y };
        e.preventDefault();
      }
    },
    [spaceDown, panOffset]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isPanning && panStart.current) {
        setPanOffset({
          x: panStart.current.ox + (e.clientX - panStart.current.x),
          y: panStart.current.oy + (e.clientY - panStart.current.y),
        });
      }
    },
    [isPanning]
  );

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
    panStart.current = null;
  }, []);

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
    const data = event.active.data.current as DragData | undefined;
    if (!data) return;
    setDrag({
      type: data.type ?? "sort",
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
    const data = active.data.current as DragData | undefined;
    if (data?.type === "new" && data.componentType) {
      const overIndex = computeOverIndex(
        over ? String(over.id) : null,
        sections.length,
        Boolean(over && over.id !== CANVAS_ROOT_ID)
      );
      addSection(data.componentType, overIndex);
    } else if (data?.type === "sort" && over) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = computeOverIndex(String(over.id), sections.length, true);
      if (oldIndex !== -1) moveSection(oldIndex, newIndex);
    }
    setDrag(null);
  }

  const zoomScale = zoomLevel / 100;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setDrag(null)}
    >
      <div
        ref={canvasRef}
        className={cn(
          "flex-1 overflow-auto relative",
          spaceDown ? "cursor-grab" : "cursor-default",
          isPanning && "cursor-grabbing"
        )}
        style={{
          // Figma-like dot grid background
          backgroundImage: "radial-gradient(circle, hsl(var(--border) / 0.8) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          backgroundPosition: "center center",
          backgroundColor: "hsl(var(--muted) / 0.3)",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={() => select(null)}
      >
        {/* Canvas frame — transforms with zoom + pan */}
        <div
          className="min-h-full flex justify-center items-start p-10 transition-transform duration-100 origin-top"
          style={{
            transform: `scale(${zoomScale}) translate(${panOffset.x / zoomScale}px, ${panOffset.y / zoomScale}px)`,
          }}
        >
          <div
            className="rounded-xl shadow-2xl shadow-black/25 ring-1 ring-border overflow-hidden transition-[width] duration-200"
            style={{
              width: deviceWidth ? `${deviceWidth}px` : "100%",
              maxWidth: 1400,
              minHeight: 700,
              background: tokens.background,
            }}
            onClick={(e) => e.stopPropagation()}
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
                ) : isDashboard ? (
                  // Dashboard: true flex layout with sidebar + main area
                  <DashboardLayoutCanvas
                    sections={sections}
                    theme={document.theme}
                    selectedId={selectedId}
                    onSelect={select}
                    onDuplicate={duplicateSection}
                    onRemove={removeSection}
                    device={device}
                  />
                ) : (
                  // Landing page: vertical stack with drag-to-reorder
                  <SortableContext
                    items={sections.map((s) => s.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="flex flex-col">
                      {sections.map((section) => (
                        <SortableSection
                          key={section.id}
                          section={section}
                          selected={selectedId === section.id}
                          dragging={drag?.id === section.id}
                          onSelect={() => select(section.id)}
                          onDuplicate={() => duplicateSection(section.id)}
                          onRemove={() => removeSection(section.id)}
                        />
                      ))}
                      {drag && drag.overIndex !== null ? (
                        <DropIndicator visible />
                      ) : null}
                    </div>
                  </SortableContext>
                )}
              </div>
            </CanvasRoot>
          </div>
        </div>

        {/* Zoom hint overlay */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-lg bg-background/80 border px-3 py-1.5 text-[10px] font-mono font-semibold text-muted-foreground shadow backdrop-blur-sm pointer-events-none">
          <span>{zoomLevel}%</span>
          <span className="opacity-50">|</span>
          <span>Ctrl+Scroll = Zoom</span>
          <span className="opacity-50">|</span>
          <span>Space+Drag = Pan</span>
          <span className="opacity-50">|</span>
          <span>Ctrl+A = Select All</span>
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
        "flex min-h-[500px] flex-col items-center justify-center gap-4 border-2 border-dashed m-8 rounded-xl transition-all",
        dragActive ? "border-primary bg-primary/5" : "border-border bg-card/30"
      )}
    >
      <div className="rounded-full bg-primary/10 p-4 text-primary">
        <Box size={28} />
      </div>
      <div className="text-center">
        <p className="text-sm font-bold text-foreground">
          {dragActive ? "Lepaskan komponen di sini" : "Kanvas Kosong"}
        </p>
        <p className="text-xs text-muted-foreground mt-1 max-w-xs">
          {dragActive
            ? "Komponen akan ditambahkan ke halaman"
            : "Pilih dari tab Template atau Komponen di panel kiri untuk mulai merancang."}
        </p>
      </div>
    </div>
  );
}

function DropIndicator({ visible }: { visible: boolean }) {
  return (
    <div
      className={cn(
        "mx-4 h-1 rounded-full bg-primary transition-all",
        visible ? "my-1 opacity-100" : "opacity-0"
      )}
    />
  );
}

function SortableSection({
  section,
  selected,
  dragging,
  onSelect,
  onDuplicate,
  onRemove,
}: {
  section: Node;
  selected: boolean;
  dragging: boolean;
  onSelect: () => void;
  onDuplicate: () => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: section.id, data: { type: "sort" } });

  const manifest = getComponent(section.componentType);
  const isHidden = section.metadata?.hidden;

  if (isHidden) return null;

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
          "group relative transition-all",
          selected
            ? "ring-2 ring-primary ring-offset-2 z-10"
            : "hover:ring-1 hover:ring-primary/40"
        )}
      >
        {selected ? (
          <div className="absolute left-0 top-0 z-20 -translate-y-full flex items-center gap-1.5 rounded-t-md bg-primary px-2 py-0.5 text-white shadow-md">
            <span className="font-mono text-[10px] font-bold">
              {section.name || manifest?.name || section.componentType}
            </span>
            <div className="h-3 w-px bg-white/30" />
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onDuplicate(); }}
              className="rounded p-0.5 text-white/90 hover:bg-white/20"
              title="Duplikat"
            >
              <Copy size={12} />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onRemove(); }}
              className="rounded p-0.5 text-white/90 hover:bg-rose-500"
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
            "absolute right-2 top-2 z-20 rounded bg-card/80 p-1 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground shadow-sm cursor-grab active:cursor-grabbing",
            dragging && "opacity-100"
          )}
          title="Seret untuk menggeser urutan"
        >
          <GripVertical size={14} />
        </div>

        <SectionPreview node={section} theme={useBuilderStore.getState().document.theme} />
      </div>
      {!selected ? <div className="h-0.5 bg-transparent" /> : null}
    </div>
  );
}