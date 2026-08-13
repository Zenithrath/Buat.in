"use client";

import { useEffect, useState } from "react";
import { useBuilderStore, autosaveProject } from "@/lib/store/project-store";
import { RegistryStyles } from "./RegistryStyles";
import { TopBar } from "./TopBar";
import { LeftPanel } from "./LeftPanel";
import { Canvas } from "./Canvas";
import { Inspector } from "./Inspector";
import { ExportModal } from "./ExportModal";
import { PreviewModal } from "./PreviewModal";

const FONT_LINKS = [
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
  "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap",
  "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap",
  "https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap",
];

export function EditorShell() {
  const document = useBuilderStore((s) => s.document);
  const loaded = useBuilderStore((s) => s.loaded);
  const selectedId = useBuilderStore((s) => s.selectedId);
  const undo = useBuilderStore((s) => s.undo);
  const redo = useBuilderStore((s) => s.redo);
  const removeSection = useBuilderStore((s) => s.removeSection);
  const select = useBuilderStore((s) => s.select);

  const [showPreview, setShowPreview] = useState(false);
  const [showExport, setShowExport] = useState(false);

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

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        undo();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
        e.preventDefault();
        redo();
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
  }, [undo, redo, removeSection, select, selectedId]);

  if (!loaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-50">
        <p className="text-sm text-zinc-400">Memuat project...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-zinc-50">
      <RegistryStyles />
      {FONT_LINKS.map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
      <TopBar onPreview={() => setShowPreview(true)} onExport={() => setShowExport(true)} />
      <div className="flex flex-1 overflow-hidden">
        <LeftPanel />
        <Canvas />
        <Inspector />
      </div>
      <div className="flex h-6 shrink-0 items-center justify-between border-t border-zinc-200 bg-white px-3 text-[11px] text-zinc-400">
        <span>
          {document.pages[0].sections.length} komponen · lebar kanvas:{" "}
          {document.settings.device}
        </span>
        <span className="font-mono">schema v{document.schemaVersion}</span>
      </div>

      <PreviewModal open={showPreview} onClose={() => setShowPreview(false)} />
      <ExportModal open={showExport} onClose={() => setShowExport(false)} />
    </div>
  );
}