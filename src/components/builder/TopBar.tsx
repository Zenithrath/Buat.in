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
} from "lucide-react";
import { useBuilderStore } from "@/lib/store/project-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/controls";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const DEVICES = [
  { id: "desktop", label: "Desktop", icon: Monitor },
  { id: "tablet", label: "Tablet", icon: Tablet },
  { id: "mobile", label: "Mobile", icon: Smartphone },
] as const;

const APP_THEME_KEY = "buatin:app-theme";

export function TopBar({
  onPreview,
  onExport,
  onCommand,
}: {
  onPreview: () => void;
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

  return (
    <div className="flex h-12 shrink-0 items-center gap-2 border-b bg-background px-3">
      <Link
        href="/"
        className="text-sm font-bold tracking-tight text-foreground"
      >
        Buat<span className="text-brand">.</span>in
      </Link>

      <div className="h-5 w-px bg-border" />

      <Input
        value={doc.name}
        onChange={(e) => renameProject(e.target.value)}
        className="h-8 w-56 border-transparent bg-transparent px-2 font-medium hover:border-input focus:border-input"
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

      <div className="mx-auto" />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm" onClick={onCommand}>
            <Command size={13} />
            <span className="hidden lg:inline">Perintah</span>
            <kbd className="ml-1 rounded border bg-muted px-1 font-mono text-[9px] text-muted-foreground">
              Ctrl K
            </kbd>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Palet perintah (Ctrl+K)</TooltipContent>
      </Tooltip>

      <div className="flex items-center gap-0.5 rounded-lg bg-muted p-0.5">
        {DEVICES.map((device) => (
          <button
            key={device.id}
            type="button"
            onClick={() => setDevice(device.id)}
            title={device.label}
            className={cn(
              "flex h-7 w-9 items-center justify-center rounded-md transition-colors",
              doc.settings.device === device.id
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <device.icon size={15} />
          </button>
        ))}
      </div>

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

      <Button variant="secondary" size="sm" onClick={onPreview}>
        <Eye size={14} /> Pratinjau
      </Button>
      <Button size="sm" onClick={onExport}>
        <Download size={14} /> Export
      </Button>
    </div>
  );
}