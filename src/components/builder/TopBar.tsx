"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
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
import { useBuilderStore } from "@/lib/store/project-store";
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
      window.open(`/builder/${doc.projectId}/preview`, "_blank");
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