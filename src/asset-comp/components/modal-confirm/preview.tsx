"use client";

import { AlertTriangle, Archive, CheckCircle2, LogOut, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { projectTokenStyle, propString, themeTokenStyle } from "@/lib/registry/shared";
import { InlineEditableText } from "@/components/preview/InlineEditable";
import { usePreviewDevice } from "@/components/preview/PreviewDeviceContext";

const ICONS = { alert: AlertTriangle, trash: Trash2, archive: Archive, logout: LogOut };

function copy(node: Node, key: string, fallback: string) {
  return propString(node, key).trim() || fallback;
}

export function ModalConfirmPreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const device = usePreviewDevice();
  const canvasMobile = device === "mobile";
  const [open, setOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const eyebrow = copy(node, "eyebrow", "Aksi yang jelas");
  const heading = copy(
    node,
    "heading",
    "Beri ruang untuk memastikan pilihan sebelum tindakan dijalankan."
  );
  const triggerText = copy(node, "triggerText", "Tampilkan konfirmasi");
  const title = copy(node, "title", "Lanjutkan perubahan ini?");
  const description = copy(
    node,
    "description",
    "Pastikan semua detail sudah sesuai sebelum melanjutkan ke langkah berikutnya."
  );
  const confirmText = copy(node, "confirmText", "Ya, lanjutkan");
  const cancelText = copy(node, "cancelText", "Periksa lagi");
  const statusMessage = copy(node, "statusMessage", "Pilihan Anda berhasil dikonfirmasi.");
  const iconName = propString(node, "icon").trim() as keyof typeof ICONS;
  const Icon = ICONS[iconName] ?? AlertTriangle;
  const dialogId = `modal-confirm-${node.id.replace(/[^a-zA-Z0-9_-]/g, "") || "preview"}`;
  const sectionSpacing =
    device === null ? "px-5 py-10 sm:px-8" : canvasMobile ? "px-4 py-8" : "px-8 py-10";
  const dialogClass = canvasMobile
    ? "w-full max-w-none rounded-[calc(var(--radius)*1.05)] border border-border bg-card p-4 text-foreground shadow-2xl"
    : "w-full max-w-md rounded-[calc(var(--radius)*1.15)] border border-border bg-card p-5 text-foreground shadow-2xl sm:p-6";

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <section
      className={`relative flex min-h-64 w-full items-center overflow-hidden border-y border-border bg-secondary/30 ${sectionSpacing}`}
      style={{ ...themeTokenStyle(tokens), ...projectTokenStyle(tokens) }}
    >
      <div className="max-w-lg">
        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-primary">
          <InlineEditableText node={node} propKey="eyebrow" fallback="Aksi yang jelas" value={eyebrow} />
        </p>
        <h3 className={`mt-2 font-[family-name:var(--font-heading)] font-extrabold tracking-[-0.05em] text-foreground ${canvasMobile ? "text-xl leading-tight" : "text-2xl"}`}>
          <InlineEditableText
            node={node}
            propKey="heading"
            fallback="Beri ruang untuk memastikan pilihan sebelum tindakan dijalankan."
            value={heading}
            multiline
          />
        </h3>
        <button
          type="button"
          onClick={() => {
            setConfirmed(false);
            setOpen(true);
          }}
          aria-controls={dialogId}
          aria-expanded={open}
          className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-bold text-background transition-transform hover:-translate-y-0.5"
        >
          <InlineEditableText node={node} propKey="triggerText" fallback="Tampilkan konfirmasi" value={triggerText} />
        </button>
        {confirmed ? (
          <p aria-live="polite" className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-foreground">
            <CheckCircle2 size={14} className="text-primary" aria-hidden="true" />
            <InlineEditableText
              node={node}
              propKey="statusMessage"
              fallback="Pilihan Anda berhasil dikonfirmasi."
              value={statusMessage}
            />
          </p>
        ) : null}
      </div>

      {open ? (
        <div
          className={`fixed inset-0 z-[80] flex items-center justify-center bg-foreground/45 backdrop-blur-[2px] ${canvasMobile ? "p-2.5" : "p-4"}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <section
            id={dialogId}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={`${dialogId}-title`}
            aria-describedby={`${dialogId}-description`}
            className={dialogClass}
          >
            <div className="flex items-start justify-between gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                <Icon size={21} aria-hidden="true" />
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={cancelText}
                title={cancelText}
                className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X size={17} aria-hidden="true" />
              </button>
            </div>
            <h2 id={`${dialogId}-title`} className={`mt-5 font-[family-name:var(--font-heading)] font-extrabold tracking-[-0.05em] ${canvasMobile ? "text-xl leading-tight" : "text-2xl"}`}>
              <InlineEditableText node={node} propKey="title" fallback="Lanjutkan perubahan ini?" value={title} multiline />
            </h2>
            <p id={`${dialogId}-description`} className="mt-3 text-sm leading-6 text-muted-foreground">
              <InlineEditableText
                node={node}
                propKey="description"
                fallback="Pastikan semua detail sudah sesuai sebelum melanjutkan ke langkah berikutnya."
                value={description}
                multiline
              />
            </p>
            <div className={`mt-6 grid gap-3 ${canvasMobile ? "grid-cols-1" : "grid-cols-2"}`}>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="min-h-11 rounded-[calc(var(--radius)*.75)] border border-border bg-card px-3 text-sm font-bold text-foreground transition-colors hover:bg-muted"
              >
                <InlineEditableText node={node} propKey="cancelText" fallback="Periksa lagi" value={cancelText} />
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfirmed(true);
                  setOpen(false);
                }}
                className="min-h-11 rounded-[calc(var(--radius)*.75)] bg-primary px-3 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                <InlineEditableText node={node} propKey="confirmText" fallback="Ya, lanjutkan" value={confirmText} />
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </section>
  );
}
