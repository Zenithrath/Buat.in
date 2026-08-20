"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDndContext, useDroppable } from "@dnd-kit/core";
import {
  rectSortingStrategy,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Box,
  Copy,
  GripVertical,
  Trash2,
} from "lucide-react";
import { getComponent } from "@/lib/registry";
import { getTemplateSource } from "@/templates";
import { projectTokenStyle, propString, themeTokenStyle } from "@/lib/registry/shared";
import { getActivePage, useBuilderStore } from "@/lib/store/project-store";
import { resolveTheme } from "@/lib/theme/presets";
import type { Node, Theme } from "@/lib/schema/types";
import { SectionPreview } from "@/components/preview/SectionPreview";
import { PreviewDeviceProvider } from "@/components/preview/PreviewDeviceContext";
import { PreviewEditingProvider } from "@/components/preview/PreviewEditingContext";
import {
  CanvasChildrenProvider,
  type CanvasChildrenOptions,
} from "@/components/preview/CanvasChildrenContext";
import { cn } from "@/lib/utils";
import { handleLinkNavigationClick } from "@/lib/preview/link-navigation";
import { CANVAS_ROOT_ID, GRID_DROP_PREFIX } from "./BuilderDndProvider";
import { SourceTemplateCanvas } from "./SourceTemplateCanvas";

const DEVICE_WIDTHS: Record<string, number> = {
  desktop: 1440,
  tablet: 768,
  mobile: 390,
};

const DEVICE_LABELS: Record<string, string> = {
  desktop: "Desktop",
  tablet: "Tablet",
  mobile: "Ponsel",
};

const DASHBOARD_VIEWPORT_HEIGHTS: Record<string, number> = {
  desktop: 900,
  tablet: 1024,
  mobile: 844,
};

const DASHBOARD_SIDEBAR_DEFAULT_WIDTHS: Record<string, number> = {
  desktop: 240,
  tablet: 184,
  mobile: 116,
};

const DASHBOARD_SIDEBAR_LIMITS: Record<string, { min: number; max: number }> = {
  desktop: { min: 180, max: 360 },
  tablet: { min: 152, max: 280 },
  mobile: { min: 104, max: 152 },
};

interface DragData {
  type?: "new" | "sort";
  componentType?: string;
}

function SelectionToolbar({
  name,
  onDuplicate,
  onRemove,
}: {
  name: string;
  onDuplicate: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="absolute left-2 top-2 z-30 flex max-w-[calc(100%-1rem)] items-center gap-1 rounded-md bg-brand px-2 py-1 text-brand-foreground shadow-md">
      <span className="max-w-36 truncate font-mono text-[10px] font-bold">{name}</span>
      <span className="h-3 w-px shrink-0 bg-brand-foreground/30" />
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onDuplicate();
        }}
        className="rounded p-0.5 text-white/90 transition-colors hover:bg-white/20"
        title="Duplikat komponen"
        aria-label="Duplikat komponen"
      >
        <Copy size={12} />
      </button>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onRemove();
        }}
        className="rounded p-0.5 text-white/90 transition-colors hover:bg-rose-500"
        title="Hapus komponen"
        aria-label="Hapus komponen"
      >
        <Trash2 size={12} />
      </button>
    </div>
  );
}

function isInteractiveTarget(target: EventTarget | null) {
  return target instanceof HTMLElement && Boolean(
    target.closest("a, button, input, textarea, select, [contenteditable='true'], [data-inline-edit]")
  );
}

/** Style section (latar & perataan) agar opsi section terlihat di kanvas. */
function sectionFrameStyle(node: Node): {
  style: React.CSSProperties;
  dataBg?: string;
  active: boolean;
} {
  const styles = node.styles;
  const bg = styles.background ?? "default";
  const align = styles.textAlign ?? "center";
  const explicit =
    bg !== "default" || (styles.textAlign && styles.textAlign !== "center");
  if (!explicit) return { style: {}, active: false };
  const bgValue =
    bg === "custom"
      ? styles.backgroundCustom || undefined
      : bg === "muted"
        ? "var(--bi-muted)"
        : bg === "primary"
          ? "var(--bi-primary)"
          : bg === "glass"
            ? "color-mix(in srgb, var(--bi-card) 55%, transparent)"
            : bg === "transparent"
              ? "transparent"
              : undefined;
  return {
    style: { background: bgValue, textAlign: align } as React.CSSProperties,
    dataBg: bg,
    active: true,
  };
}

function SortableCanvasNode({
  node,
  theme,
  selected,
  onSelect,
  onDuplicate,
  onRemove,
  className,
  parentId = null,
  selectedId,
}: {
  node: Node;
  theme: Theme;
  selected: boolean;
  onSelect: () => void;
  onDuplicate: () => void;
  onRemove: () => void;
  className?: string;
  parentId?: string | null;
  selectedId?: string | null;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: node.id, data: { type: "sort", parentId } });
  const manifest = getComponent(node.componentType);

  if (node.metadata.hidden) return null;

  const frame = sectionFrameStyle(node);

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 30 : undefined,
        ...frame.style,
      }}
      className={cn("relative min-w-0", frame.active && "bi-section-frame", className)}
      data-bg={frame.dataBg}
    >
      <div
        className={cn(
          "group relative h-full select-none transition-shadow",
          selected
            ? "z-10 ring-2 ring-brand ring-offset-2"
            : "hover:ring-1 hover:ring-brand/50"
        )}
        onClick={(event) => {
          if (isInteractiveTarget(event.target)) {
            event.preventDefault();
            event.stopPropagation();
            return;
          }
          event.stopPropagation();
          onSelect();
        }}
        onDoubleClick={(event) => event.preventDefault()}
      >
        {selected ? (
          <SelectionToolbar
            name={node.name || manifest?.name || node.componentType}
            onDuplicate={onDuplicate}
            onRemove={onRemove}
          />
        ) : null}
        <button
          type="button"
          {...attributes}
          {...listeners}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          className={cn(
            "absolute right-2 top-2 z-20 flex size-7 cursor-grab items-center justify-center rounded-md border border-border/70 bg-card/90 text-muted-foreground opacity-0 shadow-sm transition-opacity hover:border-brand/40 hover:text-brand active:cursor-grabbing",
            "group-hover:opacity-100 focus-visible:opacity-100",
            isDragging && "opacity-100"
          )}
          title="Seret untuk mengubah urutan"
          aria-label="Seret untuk mengubah urutan"
        >
          <GripVertical size={14} />
        </button>
        {node.componentType === "grid-container" ? (
          <CanvasNestedChildren
            node={node}
            theme={theme}
            selectedId={selectedId ?? null}
          />
        ) : (
          <SectionPreview node={node} theme={theme} />
        )}
        {node.componentType === "grid-container" ||
        node.componentType === "section-basic" ||
        manifest?.canContainChildren === false ? null : (
          <CanvasNodeSlot node={node} theme={theme} selectedId={selectedId ?? null} />
        )}
      </div>
    </div>
  );
}

function CanvasNodeSlot({
  node,
  theme,
  selectedId,
}: {
  node: Node;
  theme: Theme;
  selectedId: string | null;
}) {
  const hasChildren = node.children.length > 0;
  return (
    <CanvasNestedChildren
      node={node}
      theme={theme}
      selectedId={selectedId}
      layout="stack"
      className={cn(
        "bi-node-slot mt-2 min-h-9 rounded-lg border border-dashed transition-colors duration-150",
        hasChildren
          ? "border-border/70"
          : "border-transparent opacity-40 hover:border-brand/50 hover:opacity-100 group-hover:opacity-80"
      )}
      emptyClassName="min-h-9 border-0 bg-transparent p-2 text-[10px] font-medium text-muted-foreground/60"
      emptyMessage="Seret komponen ke sini — section ini menampung isi"
    />
  );
}

function CanvasNestedChildren({
  node,
  theme,
  selectedId,
  layout = "grid",
  className,
  emptyClassName,
  emptyMessage,
}: {
  node: Node;
  theme: Theme;
  selectedId: string | null;
  layout?: "grid" | "stack";
  className?: string;
  emptyClassName?: string;
  emptyMessage?: string;
}) {
  const tokens = resolveTheme(theme);
  const select = useBuilderStore((state) => state.select);
  const duplicateSection = useBuilderStore((state) => state.duplicateSection);
  const removeSection = useBuilderStore((state) => state.removeSection);
  const { setNodeRef, isOver } = useDroppable({
    id: `${GRID_DROP_PREFIX}${node.id}`,
  });
  const columns = propString(node, "columns");
  const gap = propString(node, "gap");
  const gridColumns =
    columns === "1"
      ? "grid-cols-1"
      : columns === "2"
        ? "grid-cols-1 md:grid-cols-2"
        : columns === "3"
          ? "grid-cols-1 md:grid-cols-3"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
  const gridGap = gap === "sm" ? "gap-2" : gap === "lg" ? "gap-6" : "gap-4";
  const isGrid = layout === "grid";

  return (
    <div
      ref={setNodeRef}
      data-canvas-child-container={node.id}
      className={cn(
        isGrid ? "bi-grid-container w-full rounded-md p-2 transition-colors" : "w-full transition-colors",
        className,
        isOver && "bg-brand/10 ring-2 ring-brand ring-inset"
      )}
      style={themeTokenStyle(tokens) as React.CSSProperties}
    >
      <SortableContext
        items={node.children.map((child) => child.id)}
        strategy={isGrid ? rectSortingStrategy : verticalListSortingStrategy}
      >
        {node.children.length > 0 ? (
          <div className={isGrid ? cn("grid", gridColumns, gridGap) : "space-y-4"}>
            {node.children.map((child) => (
              <SortableCanvasNode
                key={child.id}
                node={child}
                theme={theme}
                parentId={node.id}
                selected={selectedId === child.id}
                selectedId={selectedId}
                onSelect={() => select(child.id)}
                onDuplicate={() => duplicateSection(child.id)}
                onRemove={() => removeSection(child.id)}
              />
            ))}
          </div>
        ) : (
          <div
            className={cn(
              "flex min-h-28 items-center justify-center rounded-lg border-2 border-dashed border-border bg-background/60 p-6 text-center text-xs text-muted-foreground",
              emptyClassName
            )}
          >
            {emptyMessage ?? "Seret komponen ke sini untuk mulai menyusun isi."}
          </div>
        )}
      </SortableContext>
    </div>
  );
}

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
  const visibleSections = sections.filter((section) => !section.metadata.hidden);
  const sidebar = visibleSections.find(
    (section) => section.componentType === "app-sidebar" || section.componentType === "sidebar-icon"
  );
  const header = visibleSections.find(
    (section) => section.componentType === "dashboard-header"
  );
  const kpiCards = visibleSections.filter((section) => section.componentType === "kpi-card");
  const charts = visibleSections.filter((section) => section.componentType === "chart-card");
  const tables = visibleSections.filter((section) => section.componentType === "data-table");
  const others = visibleSections.filter(
    (section) =>
      section.id !== sidebar?.id &&
      !["dashboard-header", "kpi-card", "chart-card", "data-table"].includes(
        section.componentType
      )
  );
  const isMobile = device === "mobile";
  const isTablet = device === "tablet";
  const viewportHeight =
    DASHBOARD_VIEWPORT_HEIGHTS[device] ?? DASHBOARD_VIEWPORT_HEIGHTS.desktop;
  const updateNode = useBuilderStore((state) => state.updateNode);
  const sidebarLimits =
    DASHBOARD_SIDEBAR_LIMITS[device] ?? DASHBOARD_SIDEBAR_LIMITS.desktop;
  const sidebarStyles = (sidebar?.styles ?? {}) as Record<string, string | undefined>;
  const savedSidebarWidth = Number.parseInt(sidebarStyles.sidebarWidth ?? "", 10);
  const defaultSidebarWidth =
    DASHBOARD_SIDEBAR_DEFAULT_WIDTHS[device] ??
    DASHBOARD_SIDEBAR_DEFAULT_WIDTHS.desktop;
  const clampedSavedWidth = Number.isFinite(savedSidebarWidth)
    ? Math.min(sidebarLimits.max, Math.max(sidebarLimits.min, savedSidebarWidth))
    : defaultSidebarWidth;
  const [sidebarWidthDraft, setSidebarWidthDraft] = useState<number | null>(null);
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
  const sidebarWidth = sidebarWidthDraft ?? clampedSavedWidth;
  const sidebarWidthRef = useRef(sidebarWidth);

  useEffect(() => {
    if (!isResizingSidebar) sidebarWidthRef.current = sidebarWidth;
  }, [isResizingSidebar, sidebarWidth]);

  const startSidebarResize = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!sidebar) return;

    event.preventDefault();
    event.stopPropagation();
    const startX = event.clientX;
    const startWidth = sidebarWidth;
    setIsResizingSidebar(true);

    const onPointerMove = (moveEvent: PointerEvent) => {
      const nextWidth = Math.min(
        sidebarLimits.max,
        Math.max(sidebarLimits.min, startWidth + moveEvent.clientX - startX)
      );
      sidebarWidthRef.current = nextWidth;
      setSidebarWidthDraft(nextWidth);
    };

    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      const finalWidth = Math.round(sidebarWidthRef.current);
      setIsResizingSidebar(false);
      setSidebarWidthDraft(null);
      updateNode(sidebar.id, (current) => ({
        ...current,
        styles: {
          ...current.styles,
          sidebarWidth: String(finalWidth),
        } as Node["styles"],
      }));
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  const nodeProps = (node: Node) => ({
    node,
    theme,
    selected: selectedId === node.id,
    selectedId,
    onSelect: () => onSelect(node.id),
    onDuplicate: () => onDuplicate(node.id),
    onRemove: () => onRemove(node.id),
  });

  return (
    <div
      className="flex w-full overflow-hidden bg-muted/20"
      style={{ height: viewportHeight }}
    >
      {sidebar ? (
        <div
          className="group/sidebar relative h-full shrink-0 border-r border-border/70 bg-card"
          style={{ width: sidebarWidth, minWidth: sidebarWidth, maxWidth: sidebarWidth }}
        >
          <SortableCanvasNode {...nodeProps(sidebar)} className="h-full w-full" />
          <div
            role="separator"
            aria-orientation="vertical"
            aria-label="Ubah lebar sidebar"
            aria-valuemin={sidebarLimits.min}
            aria-valuemax={sidebarLimits.max}
            aria-valuenow={Math.round(sidebarWidth)}
            title="Seret untuk mengubah lebar sidebar"
            onPointerDown={startSidebarResize}
            className={cn(
              "absolute -right-1.5 top-0 z-40 flex h-full w-3 cursor-col-resize items-center justify-center touch-none",
              "after:h-12 after:w-0.5 after:rounded-full after:bg-brand/60 after:opacity-0 after:transition-opacity",
              "hover:after:opacity-100",
              isResizingSidebar && "bg-brand/10 after:opacity-100"
            )}
          />
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        {header ? <SortableCanvasNode {...nodeProps(header)} className="shrink-0" /> : null}
        <div className="min-h-0 flex-1 space-y-4 overflow-auto p-4">
          {kpiCards.length > 0 ? (
            <div
              className={cn(
                "grid gap-4",
                isMobile ? "grid-cols-1" : isTablet ? "grid-cols-2" : "grid-cols-4"
              )}
            >
              {kpiCards.map((node) => (
                <SortableCanvasNode key={node.id} {...nodeProps(node)} />
              ))}
            </div>
          ) : null}
          {charts.length > 0 ? (
            <div className={cn("grid gap-4", isMobile ? "grid-cols-1" : "grid-cols-2")}>
              {charts.map((node) => (
                <SortableCanvasNode key={node.id} {...nodeProps(node)} />
              ))}
            </div>
          ) : null}
          {tables.map((node) => (
            <SortableCanvasNode key={node.id} {...nodeProps(node)} />
          ))}
          {others.map((node) => (
            <SortableCanvasNode key={node.id} {...nodeProps(node)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CanvasRoot({ children }: { children: React.ReactNode }) {
  const { setNodeRef } = useDroppable({ id: CANVAS_ROOT_ID });
  return (
    <div ref={setNodeRef} className="min-h-full">
      {children}
    </div>
  );
}

function DropIndicator({ visible }: { visible: boolean }) {
  return (
    <div
      className={cn(
        "mx-4 h-1 rounded-full bg-brand transition-all",
        visible ? "my-1 opacity-100" : "h-0 opacity-0"
      )}
    />
  );
}

function EmptyCanvas({ dragActive }: { dragActive: boolean }) {
  return (
    <div
      className={cn(
        "m-8 flex min-h-[500px] select-none flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed transition-colors",
        dragActive ? "border-brand bg-brand/5" : "border-border bg-card/30"
      )}
    >
      <div className="rounded-full bg-brand/10 p-4 text-brand">
        <Box size={28} />
      </div>
      <div className="text-center">
        <p className="text-sm font-bold text-foreground">
          {dragActive ? "Lepaskan komponen di sini" : "Kanvas kosong"}
        </p>
        <p className="mt-1 max-w-xs text-xs text-muted-foreground">
          {dragActive
            ? "Komponen akan ditambahkan ke halaman."
            : "Seret komponen dari panel kiri atau pilih template untuk mulai merancang."}
        </p>
      </div>
    </div>
  );
}

export function Canvas() {
  const document = useBuilderStore((state) => state.document);
  const activePageId = useBuilderStore((state) => state.activePageId);
  const setActivePage = useBuilderStore((state) => state.setActivePage);
  const selectedId = useBuilderStore((state) => state.selectedId);
  const select = useBuilderStore((state) => state.select);
  const selectAll = useBuilderStore((state) => state.selectAll);
  const duplicateSection = useBuilderStore((state) => state.duplicateSection);
  const removeSection = useBuilderStore((state) => state.removeSection);
  const zoomLevel = useBuilderStore((state) => state.zoomLevel);
  const setZoomLevel = useBuilderStore((state) => state.setZoomLevel);
  const { active, over } = useDndContext();

  const sections = getActivePage(document, activePageId).sections;
  const device = document.settings.device;
  const tokens = useMemo(() => resolveTheme(document.theme), [document.theme]);
  const deviceWidth = DEVICE_WIDTHS[device] ?? DEVICE_WIDTHS.desktop;
  const isDashboard = document.projectType === "dashboard";

  const [isPanning, setIsPanning] = useState(false);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [spaceDown, setSpaceDown] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const panStart = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);

  const activeData = active?.data.current as DragData | undefined;
  const dragType = activeData?.type ?? "sort";
  const dragId = active ? String(active.id) : null;
  const dragActive = Boolean(active);
  const overId = over ? String(over.id) : null;
  const insertionIndex = overId
    ? overId === CANVAS_ROOT_ID
      ? sections.length
      : sections.findIndex((section) => section.id === overId)
    : null;

  useEffect(() => {
    const isTextEditor = (target: EventTarget | null) =>
      target instanceof HTMLElement &&
      (target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === " " && !isTextEditor(event.target)) {
        event.preventDefault();
        setSpaceDown(true);
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "a") {
        if (!isTextEditor(event.target)) {
          event.preventDefault();
          selectAll();
        }
      }
    };
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === " ") setSpaceDown(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [selectAll]);

  useEffect(() => {
    const element = canvasRef.current;
    if (!element) return;
    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
        setZoomLevel(zoomLevel + (event.deltaY > 0 ? -10 : 10));
      }
    };
    element.addEventListener("wheel", handleWheel, { passive: false });
    return () => element.removeEventListener("wheel", handleWheel);
  }, [setZoomLevel, zoomLevel]);

  useEffect(() => {
    const element = canvasRef.current;
    if (!element) return;
    // Phase CAPTURE: berjalan sebelum event.stopPropagation() dari komponen
    // preview (mis. InlineEditableText), sehingga klik tautan di kanvas selalu
    // dicegat. Tautan antar halaman project berpindah halaman di dalam
    // builder (setActivePage), anchor digulirkan, tautan eksternal/404
    // diblokir agar tidak keluar dari editor.
    const handleClick = (event: MouseEvent) =>
      handleLinkNavigationClick(event, {
        mode: "canvas",
        pages: document.pages,
        onNavigateToPage: (pageId) => {
          setActivePage(pageId);
          select(null);
          element.scrollTo({ top: 0, behavior: "smooth" });
        },
      });
    element.addEventListener("click", handleClick, true);
    return () => element.removeEventListener("click", handleClick, true);
  }, [document.pages, setActivePage, select]);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      if (spaceDown || event.button === 1) {
        event.preventDefault();
        setIsPanning(true);
        panStart.current = {
          x: event.clientX,
          y: event.clientY,
          ox: panOffset.x,
          oy: panOffset.y,
        };
      }
    },
    [panOffset, spaceDown]
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      if (!isPanning || !panStart.current) return;
      setPanOffset({
        x: panStart.current.ox + event.clientX - panStart.current.x,
        y: panStart.current.oy + event.clientY - panStart.current.y,
      });
    },
    [isPanning]
  );

  const stopPanning = useCallback(() => {
    setIsPanning(false);
    panStart.current = null;
  }, []);

  const nodeProps = (node: Node) => ({
    node,
    theme: document.theme,
    selected: selectedId === node.id,
    selectedId,
    onSelect: () => select(node.id),
    onDuplicate: () => duplicateSection(node.id),
    onRemove: () => removeSection(node.id),
  });

  const renderCanvasChildren = useCallback(
    (containerNode: Node, options: CanvasChildrenOptions = {}) => (
      <CanvasNestedChildren
        key={`canvas-children-${containerNode.id}`}
        node={containerNode}
        theme={document.theme}
        selectedId={selectedId}
        layout={options.layout}
        className={options.className}
        emptyClassName={options.emptyClassName}
        emptyMessage={options.emptyMessage}
      />
    ),
    [document.theme, selectedId]
  );

  const zoomScale = zoomLevel / 100;

  if (document.sourceTemplateId && getTemplateSource(document.sourceTemplateId)) {
    return (
      <SourceTemplateCanvas
        document={document}
        device={device}
        zoom={zoomScale}
      />
    );
  }

  return (
    <div
      ref={canvasRef}
      className={cn(
        "relative flex-1 overflow-auto",
        spaceDown ? "cursor-grab" : "cursor-default",
        isPanning && "cursor-grabbing"
      )}
      style={{
        backgroundColor: "hsl(var(--muted) / 0.35)",
        backgroundImage:
          "radial-gradient(circle, hsl(var(--border) / 0.85) 1px, transparent 1px)",
        backgroundPosition: "center center",
        backgroundSize: "24px 24px",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopPanning}
      onMouseLeave={stopPanning}
      onClick={() => select(null)}
    >
      <div
        className="flex min-h-full min-w-max justify-center p-10"
        style={{
          // Hindari transform/zoom pada ancestor contentEditable: Chromium
          // punya bug sticky-caret (kursor berhenti maju, teks jadi terbalik/
          // mirror). Pada zoom 100% tidak ada scaling sama sekali.
          ...(zoomScale !== 1
            ? {
                zoom: zoomScale,
                transform:
                  panOffset.x === 0 && panOffset.y === 0
                    ? undefined
                    : `translate(${panOffset.x / zoomScale}px, ${panOffset.y / zoomScale}px)`,
              }
            : panOffset.x === 0 && panOffset.y === 0
              ? undefined
              : { transform: `translate(${panOffset.x}px, ${panOffset.y}px)` }),
        }}
      >
        <div
          className="overflow-hidden rounded-xl ring-1 ring-border shadow-2xl shadow-black/25 transition-[width] duration-200"
          style={{
            ...themeTokenStyle(tokens),
            ...projectTokenStyle(tokens),
            width: deviceWidth,
            minWidth: deviceWidth,
            minHeight: device === "mobile" ? 760 : 720,
            backgroundColor: tokens.background,
            color: tokens.foreground,
          } as React.CSSProperties}
          onClick={(event) => event.stopPropagation()}
        >
          <PreviewEditingProvider enabled>
            <CanvasChildrenProvider renderChildren={renderCanvasChildren}>
              <PreviewDeviceProvider device={device}>
                <CanvasRoot>
                <div
                  className="container-type min-h-full select-none"
                data-device={device}
                data-bi-style={tokens.styleId}
                style={{
                  ...themeTokenStyle(tokens),
                  ...projectTokenStyle(tokens),
                  backgroundColor: tokens.background,
                  color: tokens.foreground,
                } as React.CSSProperties}
                >
                {sections.length === 0 ? (
                  <EmptyCanvas dragActive={dragActive} />
                ) : (
                  <SortableContext
                    items={sections.map((section) => section.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {isDashboard ? (
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
                      <div className="flex flex-col">
                        {sections.map((section, index) => (
                          <div key={section.id}>
                            <DropIndicator
                              visible={
                                insertionIndex === index &&
                                !(dragType === "sort" && dragId === section.id)
                              }
                            />
                            <SortableCanvasNode {...nodeProps(section)} />
                          </div>
                        ))}
                        <DropIndicator visible={insertionIndex === sections.length} />
                      </div>
                    )}
                  </SortableContext>
                )}
                </div>
                </CanvasRoot>
              </PreviewDeviceProvider>
            </CanvasChildrenProvider>
          </PreviewEditingProvider>
        </div>
      </div>

      <div className="pointer-events-none fixed bottom-8 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-lg border bg-background/85 px-3 py-1.5 font-mono text-[10px] font-semibold text-muted-foreground shadow backdrop-blur-sm">
        <span>{DEVICE_LABELS[device] ?? "Desktop"} · {deviceWidth}px</span>
        <span className="opacity-50">|</span>
        <span>{zoomLevel}%</span>
        <span className="hidden sm:inline opacity-50">|</span>
        <span className="hidden sm:inline">Ctrl+Scroll zoom · Space+drag geser</span>
      </div>
    </div>
  );
}
