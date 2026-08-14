"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  FilePlus2,
  Monitor,
  Tablet,
  Smartphone,
  Undo2,
  Redo2,
  Eye,
  Download,
  Check,
  Loader2,
  Command,
  Moon,
  Sun,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ExternalLink,
} from "lucide-react";
import { getActivePage, useBuilderStore } from "@/lib/store/project-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/controls";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const DEVICES = [
  { id: "desktop", label: "Desktop (1440)", icon: Monitor },
  { id: "tablet", label: "Tablet (768)", icon: Tablet },
  { id: "mobile", label: "Mobile (390)", icon: Smartphone },
] as const;

const APP_THEME_KEY = "buatin:app-theme";

function PageSwitcher() {
  const doc = useBuilderStore((s) => s.document);
  const activePageId = useBuilderStore((s) => s.activePageId);
  const setActivePage = useBuilderStore((s) => s.setActivePage);
  const createPage = useBuilderStore((s) => s.createPage);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    globalThis.document.addEventListener("pointerdown", onPointerDown);
    globalThis.document.addEventListener("keydown", onKeyDown);
    return () => {
      globalThis.document.removeEventListener("pointerdown", onPointerDown);
      globalThis.document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const active = getActivePage(doc, activePageId);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex h-8 items-center gap-1.5 rounded-md border border-border bg-card px-2.5 text-left transition-colors hover:border-brand/40"
      >
        <span className="max-w-40 truncate text-xs font-semibold text-foreground">
          {active.name}
        </span>
        {active.isHome ? (
          <span className="rounded bg-brand/10 px-1 py-0.5 font-mono text-[9px] font-bold text-brand uppercase">
            Beranda
          </span>
        ) : (
          <span className="max-w-24 truncate font-mono text-[10px] text-muted-foreground">
            {active.path}
          </span>
        )}
        <ChevronDown
          size={13}
          className={cn("shrink-0 text-muted-foreground transition-transform", open && "rotate-180")}
        />
      </button>

      {open ? (
        <div className="absolute left-0 top-full z-50 mt-1 w-64 rounded-lg border border-border bg-card p-1 shadow-lg">
          <p className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
            Halaman ({doc.pages.length})
          </p>
          <div className="max-h-64 overflow-y-auto">
            {doc.pages.map((page) => (
              <button
                key={page.id}
                type="button"
                onClick={() => {
                  setActivePage(page.id);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left transition-colors",
                  page.id === active.id
                    ? "bg-brand/10 text-brand"
                    : "text-foreground hover:bg-muted"
                )}
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-semibold">{page.name}</span>
                  <span className="block truncate font-mono text-[10px] text-muted-foreground">
                    {page.path} · {page.sections.length} komponen
                  </span>
                </span>
                {page.isHome ? (
                  <span className="shrink-0 rounded bg-brand/10 px-1.5 py-0.5 text-[9px] font-bold uppercase text-brand">
                    Beranda
                  </span>
                ) : null}
                {page.id === active.id ? <Check size={13} className="shrink-0" /> : null}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              createPage();
              setOpen(false);
            }}
            className="mt-1 flex w-full items-center gap-2 rounded-md border-t border-border px-2.5 py-2 text-xs font-semibold text-brand transition-colors hover:bg-brand/5"
          >
            <FilePlus2 size={13} /> Halaman baru
          </button>
        </div>
      ) : null}
    </div>
  );
}

export function TopBar({
  onExport,
  onCommand,
}: {
  onPreview?: () => void;
  onExport: () => void;
  onCommand: () => void;
}) {
  const doc = useBuilderStore((s) => s.document);
  const renameProject = useBuilderStore((s) => s.renameProject);
  const setDevice = useBuilderStore((s) => s.setDevice);
  const undo = useBuilderStore((s) => s.undo);
  const redo = useBuilderStore((s) => s.redo);
  const past = useBuilderStore((s) => s.past);
  const future = useBuilderStore((s) => s.future);
  const saveStatus = useBuilderStore((s) => s.saveStatus);
  const zoomLevel = useBuilderStore((s) => s.zoomLevel);
  const setZoomLevel = useBuilderStore((s) => s.setZoomLevel);

  const [dark, setDark] = useState<boolean>(
    () =>
      typeof window === "undefined" ||
      localStorage.getItem(APP_THEME_KEY) !== "light"
  );

  useEffect(() => {
    globalThis.document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem(APP_THEME_KEY, next ? "dark" : "light");
    globalThis.document.documentElement.classList.toggle("dark", next);
  };

  const handleOpenDedicatedPreview = () => {
    if (doc.projectId) {
      const page = getActivePage(doc, useBuilderStore.getState().activePageId);
      const query = page.isHome ? "" : `?page=${encodeURIComponent(page.path)}`;
      window.open(`/builder/${doc.projectId}/preview${query}`, "_blank");
    }
  };

  return (
    <div className="flex h-12 shrink-0 items-center gap-2 border-b bg-background px-3">
      <Link
        href="/"
        className="text-sm font-bold tracking-tight text-foreground flex items-center gap-1.5"
      >
        <span>Buat<span className="text-brand">.</span>in</span>
      </Link>

      <span className="rounded bg-brand/10 px-2 py-0.5 font-mono text-[10px] font-bold text-brand uppercase">
        {doc.projectType || "landing"}
      </span>

      <div className="h-5 w-px bg-border mx-1" />

      <PageSwitcher />

      <Input
        value={doc.name}
        onChange={(e) => renameProject(e.target.value)}
        className="h-8 w-48 border-transparent bg-transparent px-2 font-medium hover:border-input focus:border-input text-xs"
        aria-label="Nama project"
      />

      <div className="flex items-center gap-0.5">
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={undo}
                disabled={past.length === 0}
                aria-label="Undo (Ctrl+Z)"
              >
                <Undo2 size={15} />
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={redo}
                disabled={future.length === 0}
                aria-label="Redo (Ctrl+Y)"
              >
                <Redo2 size={15} />
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent>Redo (Ctrl+Y)</TooltipContent>
        </Tooltip>
      </div>

      <div className="mx-auto flex items-center gap-1">
        {/* Device Frame Viewports */}
        <div className="flex items-center gap-0.5 rounded-lg bg-muted p-0.5">
          {DEVICES.map((device) => (
            <button
              key={device.id}
              type="button"
              onClick={() => setDevice(device.id)}
              title={device.label}
              className={cn(
                "flex h-7 w-8 items-center justify-center rounded-md transition-colors",
                doc.settings.device === device.id
                  ? "bg-brand text-brand-foreground"
                  : "text-muted-foreground hover:text-brand"
              )}
            >
              <device.icon size={14} />
            </button>
          ))}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 rounded-lg border bg-card px-1.5 py-0.5 text-xs">
          <button
            type="button"
            onClick={() => setZoomLevel(zoomLevel - 10)}
            className="p-1 text-muted-foreground transition-colors hover:text-brand"
            title="Zoom out"
          >
            <ZoomOut size={13} />
          </button>
          <span className="w-10 text-center font-mono text-[11px] font-medium">
            {zoomLevel}%
          </span>
          <button
            type="button"
            onClick={() => setZoomLevel(zoomLevel + 10)}
            className="p-1 text-muted-foreground transition-colors hover:text-brand"
            title="Zoom in"
          >
            <ZoomIn size={13} />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel(100)}
            className="p-1 text-muted-foreground transition-colors hover:text-brand"
            title="Reset Zoom (100%)"
          >
            <Maximize2 size={12} />
          </button>
        </div>
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm" onClick={onCommand} className="h-8">
            <Command size={13} />
            <span className="hidden lg:inline text-xs">Perintah</span>
            <kbd className="ml-1 rounded border bg-muted px-1 font-mono text-[9px] text-muted-foreground">
              Ctrl K
            </kbd>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Palet perintah (Ctrl+K)</TooltipContent>
      </Tooltip>

      <Button
        variant="ghost"
        size="icon-sm"
        onClick={toggleTheme}
        title={dark ? "Mode terang" : "Mode gelap"}
      >
        {dark ? <Sun size={15} /> : <Moon size={15} />}
      </Button>

      <div
        className={cn(
          "flex w-20 items-center gap-1 text-[11px]",
          saveStatus === "saving"
            ? "text-muted-foreground"
            : saveStatus === "saved"
              ? "text-emerald-500"
              : "text-muted-foreground/40"
        )}
      >
        {saveStatus === "saving" ? (
          <>
            <Loader2 size={12} className="animate-spin" /> Menyimpan
          </>
        ) : saveStatus === "saved" ? (
          <>
            <Check size={12} /> Tersimpan
          </>
        ) : null}
      </div>

      <Button variant="secondary" size="sm" onClick={handleOpenDedicatedPreview} className="h-8 gap-1.5 text-xs">
        <Eye size={14} />
        <span>Pratinjau</span>
        <ExternalLink size={11} className="opacity-70" />
      </Button>
      <Button variant="brand" size="sm" onClick={onExport} className="h-8 text-xs font-bold">
        <Download size={14} /> Export
      </Button>
    </div>
  );
}