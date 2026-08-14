"use client";

import { useEffect, useState } from "react";
import {
  Boxes,
  LayoutTemplate,
  Image as ImageIcon,
  Plus,
  Trash2,
  Undo2,
  Redo2,
} from "lucide-react";
import { useBuilderStore, autosaveProject } from "@/lib/store/project-store";
import { RegistryStyles } from "./RegistryStyles";
import { TopBar } from "./TopBar";
import { LeftPanel } from "./LeftPanel";
import { Canvas } from "./Canvas";
import { BuilderDndProvider } from "./BuilderDndProvider";
import { Inspector } from "./Inspector";
import { ExportModal } from "./ExportModal";
import { PreviewModal } from "./PreviewModal";
import { FONT_LINKS } from "@/lib/theme/presets";
import { componentRegistry } from "@/lib/registry";
import { blockRegistry, buildBlockNodes } from "@/lib/blocks";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Skeleton } from "@/components/ui/skeleton";
import { TooltipProvider } from "@/components/ui/tooltip";

type PanelEdge = "left" | "right";

function clampPanelWidth(width: number, min: number, max: number) {
  return Math.min(max, Math.max(min, Math.round(width)));
}

function useResizablePanelWidth({
  storageKey,
  initialWidth,
  minWidth,
  maxWidth,
}: {
  storageKey: string;
  initialWidth: number;
  minWidth: number;
  maxWidth: number;
}) {
  const [width, setWidth] = useState(() => {
    if (typeof window === "undefined") return initialWidth;
    const saved = Number(window.localStorage.getItem(storageKey));
    return Number.isFinite(saved) && saved > 0
      ? clampPanelWidth(saved, minWidth, maxWidth)
      : initialWidth;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, String(width));
  }, [storageKey, width]);

  const startResize = (event: React.PointerEvent, edge: PanelEdge) => {
    event.preventDefault();
    event.stopPropagation();
    const startX = event.clientX;
    const startWidth = width;
    const previousCursor = document.body.style.cursor;
    const previousSelect = document.body.style.userSelect;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    const onMove = (moveEvent: PointerEvent) => {
      const delta = moveEvent.clientX - startX;
      const nextWidth =
        edge === "right" ? startWidth + delta : startWidth - delta;
      setWidth(clampPanelWidth(nextWidth, minWidth, maxWidth));
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      document.body.style.cursor = previousCursor;
      document.body.style.userSelect = previousSelect;
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const nudge = (amount: number) =>
    setWidth((current) => clampPanelWidth(current + amount, minWidth, maxWidth));

  return { width, startResize, nudge };
}

function ResizableEditorPanel({
  edge,
  width,
  label,
  onResizeStart,
  onNudge,
  children,
}: {
  edge: PanelEdge;
  width: number;
  label: string;
  onResizeStart: (event: React.PointerEvent, edge: PanelEdge) => void;
  onNudge: (amount: number) => void;
  children: React.ReactNode;
}) {
  const increaseForKey = edge === "right" ? 16 : -16;

  return (
    <aside
      className={`relative h-full shrink-0 ${edge === "right" ? "border-r border-border" : "border-l border-border"}`}
      style={{ width }}
      aria-label={label}
    >
      {children}
      <div
        role="separator"
        aria-label={`Ubah lebar ${label}`}
        aria-orientation="vertical"
        tabIndex={0}
        onPointerDown={(event) => onResizeStart(event, edge)}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            onNudge(increaseForKey);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            onNudge(-increaseForKey);
          }
        }}
        className={
          edge === "right"
            ? "group absolute -right-1 top-0 z-40 flex h-full w-2 cursor-col-resize items-center justify-center focus:outline-none"
            : "group absolute -left-1 top-0 z-40 flex h-full w-2 cursor-col-resize items-center justify-center focus:outline-none"
        }
        title="Seret untuk mengubah lebar panel"
      >
        <span className="h-12 w-1 rounded-full bg-border opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100" />
      </div>
    </aside>
  );
}

export function EditorShell() {
  const document = useBuilderStore((s) => s.document);
  const loaded = useBuilderStore((s) => s.loaded);
  const selectedId = useBuilderStore((s) => s.selectedId);
  const undo = useBuilderStore((s) => s.undo);
  const redo = useBuilderStore((s) => s.redo);
  const removeSection = useBuilderStore((s) => s.removeSection);
  const duplicateSection = useBuilderStore((s) => s.duplicateSection);
  const select = useBuilderStore((s) => s.select);
  const addSection = useBuilderStore((s) => s.addSection);
  const addBlock = useBuilderStore((s) => s.addBlock);
  const setLeftTab = useBuilderStore((s) => s.setLeftTab);

  const [showPreview, setShowPreview] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const leftPanel = useResizablePanelWidth({
    storageKey: "buatin:editor-left-width",
    initialWidth: 310,
    minWidth: 236,
    maxWidth: 520,
  });
  const rightPanel = useResizablePanelWidth({
    storageKey: "buatin:editor-right-width",
    initialWidth: 340,
    minWidth: 296,
    maxWidth: 560,
  });

  useEffect(() => {
    if (!loaded || !document.projectId) return;
    const timer = setTimeout(() => {
      autosaveProject(useBuilderStore.getState().document);
    }, 800);
    return () => clearTimeout(timer);
  }, [document, loaded]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const isEditing =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable;

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((o) => !o);
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
        e.preventDefault();
        redo();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "d") {
        if (!isEditing && selectedId) {
          e.preventDefault();
          duplicateSection(selectedId);
        }
        return;
      }
      if (!isEditing && (e.key === "Delete" || e.key === "Backspace")) {
        if (selectedId) {
          e.preventDefault();
          removeSection(selectedId);
        }
      }
      if (!isEditing && e.key === "Escape") {
        select(null);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [undo, redo, removeSection, duplicateSection, select, selectedId]);

  if (!loaded) {
    return (
      <div className="flex h-screen flex-col bg-background text-foreground">
        <div className="flex h-12 items-center gap-3 border-b px-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="flex flex-1">
          <div className="w-72 shrink-0 space-y-2 border-r p-3">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
          <div className="flex-1 space-y-4 p-8">
            <Skeleton className="mx-auto h-40 w-4/5" />
            <Skeleton className="mx-auto h-24 w-3/5" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
        <RegistryStyles />
        {FONT_LINKS.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
      <TopBar
        onPreview={() => setShowPreview(true)}
        onExport={() => setShowExport(true)}
        onCommand={() => setCommandOpen(true)}
      />
      <BuilderDndProvider>
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <ResizableEditorPanel
            edge="right"
            width={leftPanel.width}
            label="Panel kiri"
            onResizeStart={leftPanel.startResize}
            onNudge={leftPanel.nudge}
          >
            <LeftPanel />
          </ResizableEditorPanel>
          <Canvas />
          <ResizableEditorPanel
            edge="left"
            width={rightPanel.width}
            label="Panel kanan"
            onResizeStart={rightPanel.startResize}
            onNudge={rightPanel.nudge}
          >
            <Inspector />
          </ResizableEditorPanel>
        </div>
      </BuilderDndProvider>
      <div className="flex h-6 shrink-0 items-center justify-between border-t bg-background px-3 text-[11px] text-muted-foreground">
        <span>
          {document.pages[0].sections.length} komponen · lebar kanvas:{" "}
          {document.settings.device === "desktop"
            ? "desktop 1440px"
            : document.settings.device === "tablet"
              ? "tablet 768px"
              : "mobile 390px"}
        </span>
        <span className="font-mono">schema v{document.schemaVersion}</span>
      </div>

      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="Ketik perintah atau cari komponen..." />
        <CommandList>
          <CommandEmpty>Tidak ada hasil.</CommandEmpty>
          <CommandGroup heading="Tindakan">
            <CommandItem
              onSelect={() => {
                setCommandOpen(false);
                undo();
              }}
            >
              <Undo2 size={14} /> Undo
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setCommandOpen(false);
                redo();
              }}
            >
              <Redo2 size={14} /> Redo
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setCommandOpen(false);
                setLeftTab("templates");
              }}
            >
              <LayoutTemplate size={14} /> Buka Panel Template
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setCommandOpen(false);
                setLeftTab("components");
              }}
            >
              <Boxes size={14} /> Buka Panel Komponen
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setCommandOpen(false);
                setLeftTab("assets");
              }}
            >
              <ImageIcon size={14} /> Buka Panel Gambar
            </CommandItem>
            {selectedId ? (
              <CommandItem
                onSelect={() => {
                  setCommandOpen(false);
                  removeSection(selectedId);
                }}
              >
                <Trash2 size={14} /> Hapus Komponen Terpilih
              </CommandItem>
            ) : null}
          </CommandGroup>
          <CommandGroup heading="Tambahkan Komponen">
            {componentRegistry.map((c) => (
              <CommandItem
                key={c.id}
                onSelect={() => {
                  setCommandOpen(false);
                  addSection(c.id);
                }}
              >
                <Boxes size={14} /> {c.name}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Blok">
            {blockRegistry.map((block) => (
              <CommandItem
                key={block.id}
                onSelect={() => {
                  setCommandOpen(false);
                  addBlock(buildBlockNodes(block));
                }}
              >
                <Plus size={14} /> Tambah Blok: {block.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <PreviewModal open={showPreview} onClose={() => setShowPreview(false)} />
      <ExportModal open={showExport} onClose={() => setShowExport(false)} />
      </div>
    </TooltipProvider>
  );
}
