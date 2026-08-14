"use client";

import { useBuilderStore } from "@/lib/store/project-store";
import { Layout, LayoutDashboard, Sparkles, AlertCircle } from "lucide-react";
import { useState } from "react";

export function DesignPanel() {
  const projectType = useBuilderStore((s) => s.document.projectType);
  const setProjectType = useBuilderStore((s) => s.setProjectType);
  const [confirmModal, setConfirmModal] = useState<"landing" | "dashboard" | null>(null);

  const handleSelectType = (targetType: "landing" | "dashboard") => {
    if (projectType === targetType) return;
    setConfirmModal(targetType);
  };

  const confirmSwitch = () => {
    if (confirmModal) {
      setProjectType(confirmModal);
      setConfirmModal(null);
    }
  };

  return (
    <div className="space-y-5 p-1">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          JENIS ANTARMUKA
        </p>
        <h2 className="text-sm font-bold text-foreground mt-0.5">
          Apa yang sedang Anda rancang?
        </h2>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
          Pilihan ini menentukan rekomendasi komponen, template, dan struktur default di kanvas.
        </p>
      </div>

      <div className="space-y-3">
        <button
          type="button"
          onClick={() => handleSelectType("landing")}
          className={`flex w-full items-start gap-3.5 rounded-xl border p-3.5 text-left transition-all ${
            projectType === "landing"
              ? "border-primary bg-primary/10 ring-1 ring-primary"
              : "border-border bg-card hover:border-muted hover:bg-muted/50"
          }`}
        >
          <div
            className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
              projectType === "landing" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            <Layout size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-foreground">Landing Page</span>
              {projectType === "landing" ? (
                <span className="rounded bg-primary/20 px-1.5 py-0.5 font-mono text-[9px] font-bold text-primary">
                  Aktif
                </span>
              ) : null}
            </div>
            <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
              Untuk website perusahaan, produk SaaS, portofolio, toko online, atau brand personal.
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => handleSelectType("dashboard")}
          className={`flex w-full items-start gap-3.5 rounded-xl border p-3.5 text-left transition-all ${
            projectType === "dashboard"
              ? "border-primary bg-primary/10 ring-1 ring-primary"
              : "border-border bg-card hover:border-muted hover:bg-muted/50"
          }`}
        >
          <div
            className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
              projectType === "dashboard" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            <LayoutDashboard size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-foreground">Dashboard</span>
              {projectType === "dashboard" ? (
                <span className="rounded bg-primary/20 px-1.5 py-0.5 font-mono text-[9px] font-bold text-primary">
                  Aktif
                </span>
              ) : null}
            </div>
            <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
              Untuk admin panel, analitik, CRM, finansial, e-commerce admin, atau manajemen user.
            </p>
          </div>
        </button>
      </div>

      <div className="rounded-lg border border-dashed bg-muted/30 p-3 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1 font-semibold text-foreground mb-1">
          <Sparkles size={13} className="text-primary" /> Fleksibilitas Buat.in
        </span>
        Mesin editor tetap sama. Anda bisa menggabungkan komponen landing dan widget dashboard dalam satu project kapan saja.
      </div>

      {confirmModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-xl border bg-card p-5 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-amber-500">
              <AlertCircle size={20} />
              <h3 className="text-sm font-bold text-foreground">Konfirmasi Ubah Mode Project</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Anda akan mengubah jenis project menjadi{" "}
              <strong className="text-foreground capitalize">{confirmModal}</strong>. Komponen yang sudah ada di kanvas tidak akan dihapus.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setConfirmModal(null)}
                className="rounded-md border px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-muted"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmSwitch}
                className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Ubah Mode
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
