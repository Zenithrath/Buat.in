"use client";

import { useMemo } from "react";
import { useBuilderStore } from "@/lib/store/project-store";
import { buildExportFiles } from "@/lib/export/html";
import { Modal } from "@/components/ui/modal";

export function PreviewModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const document = useBuilderStore((s) => s.document);

  const html = useMemo(() => {
    if (!open) return "";
    const files = buildExportFiles(document);
    return files.find((f) => f.path === "index.html")?.content ?? "";
  }, [document, open]);

  return (
    <Modal open={open} onClose={onClose} title="Pratinjau Situs" wide>
      <div className="overflow-hidden rounded-lg border border-border">
        <iframe
          title="Pratinjau situs"
          srcDoc={html}
          className="h-[70vh] w-full bg-white"
          sandbox="allow-scripts"
        />
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Pratinjau ini adalah file <code className="font-mono">index.html</code>{" "}
        hasil export sesungguhnya.
      </p>
    </Modal>
  );
}