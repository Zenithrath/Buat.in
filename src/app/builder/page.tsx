"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FilePlus2, ArrowRight, Loader2, Layout, LayoutDashboard } from "lucide-react";
import {
  createBlankProject,
  createDashboardTemplate,
  createTemplateProject,
} from "@/lib/schema/defaults";
import { autosaveProject } from "@/lib/store/project-store";
import { uid } from "@/lib/utils";
import type { ProjectType } from "@/lib/schema/types";

export default function NewProjectPage() {
  const router = useRouter();
  const [creating, setCreating] = useState<string | null>(null);

  function create(kind: "blank" | "landing-template" | "dashboard-template", projectType: ProjectType = "landing") {
    setCreating(kind);
    const projectId = uid();
    const doc =
      kind === "blank"
        ? createBlankProject(projectId, projectType)
        : kind === "dashboard-template"
        ? createDashboardTemplate(projectId)
        : createTemplateProject(projectId, "landing");

    autosaveProject(doc);
    router.push(`/builder/${projectId}`);
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link
            href="/"
            className="flex items-center gap-2 text-base font-bold tracking-tight text-foreground"
          >
            Buat<span className="text-primary">.</span>in
          </Link>
          <Link
            href="/"
            className="rounded-md border border-border px-4 py-2 text-[13px] font-semibold text-foreground transition-colors hover:border-muted hover:bg-muted"
          >
            ← Kembali
          </Link>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-5 py-12">
        <div className="mb-10 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-primary">
            [ MULAI DESIGN ]
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Pilih Titik Awal Project Anda
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Mulai dari kanvas kosong atau gunakan template utuh yang siap Anda ubah.
          </p>
        </div>

        <div className="grid w-full max-w-4xl gap-5 sm:grid-cols-3">
          {/* Option 1: Blank Landing Page */}
          <button
            type="button"
            disabled={creating !== null}
            onClick={() => create("blank", "landing")}
            className="group flex flex-col items-start rounded-xl border border-border bg-card p-6 text-left transition-all hover:border-primary hover:shadow-md"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground">
              <FilePlus2 size={18} />
            </span>
            <p className="mt-4 text-base font-bold text-foreground">Kanvas Kosong</p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              Mulai dari nol dan bebas menyusun komponen Landing Page atau Dashboard.
            </p>
            <span className="mt-4 flex items-center gap-1.5 text-xs font-bold text-primary opacity-90 transition-all group-hover:translate-x-1">
              {creating === "blank" ? (
                <>
                  <Loader2 size={13} className="animate-spin" /> Membuat...
                </>
              ) : (
                <>
                  Buat Kosong <ArrowRight size={13} />
                </>
              )}
            </span>
          </button>

          {/* Option 2: Landing Page Template */}
          <button
            type="button"
            disabled={creating !== null}
            onClick={() => create("landing-template", "landing")}
            className="group flex flex-col items-start rounded-xl border border-primary/50 bg-primary/5 p-6 text-left transition-all hover:border-primary hover:bg-primary/10 hover:shadow-md"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Layout size={18} />
            </span>
            <span className="mt-4 font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-primary">
              Landing Page
            </span>
            <p className="mt-1 text-base font-bold text-foreground">
              Template Toko & SaaS
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              Lengkap dengan Navbar, Hero, Catalog Produk, Tentang Kami, dan Footer.
            </p>
            <span className="mt-4 flex items-center gap-1.5 text-xs font-bold text-primary opacity-90 transition-all group-hover:translate-x-1">
              {creating === "landing-template" ? (
                <>
                  <Loader2 size={13} className="animate-spin" /> Membuat...
                </>
              ) : (
                <>
                  Pakai Template Landing <ArrowRight size={13} />
                </>
              )}
            </span>
          </button>

          {/* Option 3: Dashboard Template */}
          <button
            type="button"
            disabled={creating !== null}
            onClick={() => create("dashboard-template", "dashboard")}
            className="group flex flex-col items-start rounded-xl border border-primary/50 bg-primary/5 p-6 text-left transition-all hover:border-primary hover:bg-primary/10 hover:shadow-md"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <LayoutDashboard size={18} />
            </span>
            <span className="mt-4 font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-primary">
              Dashboard
            </span>
            <p className="mt-1 text-base font-bold text-foreground">
              Analytics Admin Dashboard
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              Lengkap dengan Navigation Sidebar, Header, KPI Cards, Chart Area, & Data Table.
            </p>
            <span className="mt-4 flex items-center gap-1.5 text-xs font-bold text-primary opacity-90 transition-all group-hover:translate-x-1">
              {creating === "dashboard-template" ? (
                <>
                  <Loader2 size={13} className="animate-spin" /> Membuat...
                </>
              ) : (
                <>
                  Pakai Template Dashboard <ArrowRight size={13} />
                </>
              )}
            </span>
          </button>
        </div>
      </main>

      <footer className="border-t border-border py-6 text-center font-mono text-[11px] text-muted-foreground">
        Buat.in — Master Figma-like Visual Builder
      </footer>
    </div>
  );
}