"use client";

import { useState } from "react";
import { FileCode2, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useBuilderStore } from "@/lib/store/project-store";
import { buildExportFiles } from "@/lib/export/html";
import { buildProjectZip, downloadZip } from "@/lib/export/zip";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";

type Phase = "choose" | "generating" | "done" | "error";

export function ExportModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const document = useBuilderStore((s) => s.document);
  const [target, setTarget] = useState<"html" | "react">("html");
  const [phase, setPhase] = useState<Phase>("choose");
  const [error, setError] = useState("");

  async function handleExport() {
    if (phase === "generating") return;
    setPhase("generating");
    setError("");
    try {
      const blob = await buildProjectZip(document);
      downloadZip(blob, `${document.name || "website"}.zip`);
      setPhase("done");
    } catch (e) {
      console.error(e);
      setError("Terjadi kesalahan saat membuat ZIP. Coba lagi.");
      setPhase("error");
    }
  }

  function reset() {
    setPhase("choose");
    setError("");
  }

  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
        reset();
      }}
      title="Export Source Code"
      wide
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setTarget("html")}
            className={cn(
              "rounded-xl border-2 p-4 text-left transition-colors",
              target === "html"
                ? "border-blue-500 bg-blue-50/50"
                : "border-zinc-200 hover:border-zinc-300"
            )}
          >
            <p className="text-sm font-semibold text-zinc-900">
              HTML / CSS / JS Statis
            </p>
            <p className="mt-1 text-xs leading-relaxed text-zinc-500">
              Satu halaman mandiri. Hosting di mana saja — Netlify, Vercel,
              GitHub Pages, atau hosting biasa.
            </p>
            <span className="mt-2 inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
              Tersedia
            </span>
          </button>
          <button
            type="button"
            disabled
            className="cursor-not-allowed rounded-xl border-2 border-zinc-100 p-4 text-left opacity-60"
          >
            <p className="text-sm font-semibold text-zinc-900">
              React + Vite (TypeScript)
            </p>
            <p className="mt-1 text-xs leading-relaxed text-zinc-500">
              Project React yang bisa dilanjutkan developer.
            </p>
            <span className="mt-2 inline-block rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-500">
              Segera hadir
            </span>
          </button>
        </div>

        <div>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-zinc-600">
            <FileCode2 size={13} /> Isi ZIP
          </p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 rounded-lg bg-zinc-50 p-3 font-mono text-[11px] text-zinc-500">
            {buildExportFiles(document)
              .filter((f) => !f.path.includes("manifest"))
              .map((f) => (
                <div key={f.path} className="truncate">
                  {f.path}
                </div>
              ))}
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-xs text-zinc-500">
          <span>
            <strong className="text-zinc-700">{document.pages[0].sections.length}</strong>{" "}
            komponen · export target: HTML
          </span>
          <span className="font-medium text-emerald-600">Gratis di V0 (prototipe)</span>
        </div>

        {phase === "done" ? (
          <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2.5 text-sm text-emerald-700">
            <CheckCircle2 size={16} /> ZIP berhasil dibuat — cek folder
            unduhan Anda.
          </div>
        ) : null}
        {phase === "error" ? (
          <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-600">
            <AlertCircle size={16} /> {error}
          </div>
        ) : null}

        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Tutup
          </Button>
          <Button
            variant="primary"
            onClick={handleExport}
            disabled={phase === "generating" || target !== "html"}
          >
            {phase === "generating" ? (
              <>
                <Loader2 size={14} className="animate-spin" /> Membuat ZIP...
              </>
            ) : (
              "Unduh Project.zip"
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}