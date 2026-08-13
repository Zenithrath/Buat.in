"use client";

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
} from "lucide-react";
import { useBuilderStore } from "@/lib/store/project-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/controls";

const DEVICES = [
  { id: "desktop", label: "Desktop", icon: Monitor },
  { id: "tablet", label: "Tablet", icon: Tablet },
  { id: "mobile", label: "Mobile", icon: Smartphone },
] as const;

export function TopBar({
  onPreview,
  onExport,
}: {
  onPreview: () => void;
  onExport: () => void;
}) {
  const document = useBuilderStore((s) => s.document);
  const renameProject = useBuilderStore((s) => s.renameProject);
  const setDevice = useBuilderStore((s) => s.setDevice);
  const undo = useBuilderStore((s) => s.undo);
  const redo = useBuilderStore((s) => s.redo);
  const past = useBuilderStore((s) => s.past);
  const future = useBuilderStore((s) => s.future);
  const saveStatus = useBuilderStore((s) => s.saveStatus);

  return (
    <div className="flex h-12 shrink-0 items-center gap-3 border-b border-zinc-200 bg-white px-3">
      <Link
        href="/"
        className="flex items-center gap-1.5 text-sm font-extrabold tracking-tight text-zinc-900"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded bg-blue-600 text-[10px] font-bold text-white">
          B
        </span>
        Buat.in
      </Link>

      <div className="h-5 w-px bg-zinc-200" />

      <Input
        value={document.name}
        onChange={(e) => renameProject(e.target.value)}
        className="h-8 w-56 border-transparent bg-transparent px-2 font-medium hover:border-zinc-200"
        aria-label="Nama project"
      />

      <div className="flex items-center gap-0.5">
        <Button
          variant="ghost"
          size="sm"
          onClick={undo}
          disabled={past.length === 0}
          title="Undo (Ctrl+Z)"
        >
          <Undo2 size={15} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={redo}
          disabled={future.length === 0}
          title="Redo (Ctrl+Y)"
        >
          <Redo2 size={15} />
        </Button>
      </div>

      <div className="mx-auto" />

      <div className="flex items-center gap-0.5 rounded-lg bg-zinc-100 p-0.5">
        {DEVICES.map((device) => (
          <button
            key={device.id}
            type="button"
            onClick={() => setDevice(device.id)}
            title={device.label}
            className={cn(
              "flex h-7 w-9 items-center justify-center rounded-md transition-colors",
              document.settings.device === device.id
                ? "bg-white text-zinc-900 shadow-sm"
                : "text-zinc-400 hover:text-zinc-600"
            )}
          >
            <device.icon size={15} />
          </button>
        ))}
      </div>

      <div
        className={cn(
          "flex items-center gap-1 text-[11px]",
          saveStatus === "saving"
            ? "text-amber-500"
            : saveStatus === "saved"
              ? "text-emerald-500"
              : "text-zinc-300"
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
      <Button variant="primary" size="sm" onClick={onExport}>
        <Download size={14} /> Export
      </Button>
    </div>
  );
}