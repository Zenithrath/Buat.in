"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  FilePlus2,
  Layout,
  LayoutDashboard,
  Loader2,
  Sparkles,
} from "lucide-react";
import { createBlankProject, createTemplateProject } from "@/lib/schema/defaults";
import { autosaveProject } from "@/lib/store/project-store";
import type { ProjectType } from "@/lib/schema/types";
import { templateRegistry, type TemplateDefinition } from "@/templates";
import { cn, uid } from "@/lib/utils";

// TemplatePreview ditarik melalui chain import (SectionPreview → registry →
// asset-comp → previews → store) yang membentuk siklus modul; evaluasinya saat
// prerender statis memicu TDZ. Dimuat dinamis (client-only) agar halaman tetap
// static-safe; rute /builder/[id] tidak terpengaruh karena rutenya dinamis.
const TemplatePreview = dynamic(
  () => import("@/components/builder/TemplatePreview").then((m) => m.TemplatePreview),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-48 items-center justify-center rounded-lg bg-muted/50">
        <Loader2 size={16} className="animate-spin text-muted-foreground" />
      </div>
    ),
  }
);

type TemplateFilter = "all" | "landing" | "dashboard" | "auth";

export default function NewProjectPage() {
  const router = useRouter();
  const [creating, setCreating] = useState<string | null>(null);
  const [filter, setFilter] = useState<TemplateFilter>("all");

  const filteredTemplates = useMemo(
    () =>
      templateRegistry.filter(
        (template) => filter === "all" || template.category === filter
      ),
    [filter]
  );

  function openDocument(documentId: string) {
    router.push(`/builder/${documentId}`);
  }

  function createBlank(projectType: ProjectType) {
    const key = `blank-${projectType}`;
    setCreating(key);
    const projectId = uid();
    autosaveProject(createBlankProject(projectId, projectType));
    openDocument(projectId);
  }

  function createFromTemplate(template: TemplateDefinition) {
    setCreating(template.id);
    const projectId = uid();
    autosaveProject(createTemplateProject(projectId, template.id));
    openDocument(projectId);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <Link href="/" className="text-base font-black tracking-[-0.04em]">
            Buat<span className="text-brand">.</span>in
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-border px-3.5 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            ← Kembali
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-md border border-brand/20 bg-brand/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-brand">
            <Sparkles size={12} /> Mulai merancang
          </p>
          <h1 className="mt-5 font-display text-4xl font-black leading-[0.96] tracking-[-0.055em] sm:text-5xl">
            Mulai dari kanvas, atau dari fondasi yang sudah jadi.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            Pilih sesuai cara kerja Anda. Semua template dapat diubah langsung di canvas—teks, gambar, tautan, susunan bagian, dan tema.
          </p>
        </div>

        <section className="mt-10" aria-labelledby="blank-heading">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-brand" />
            <h2 id="blank-heading" className="text-sm font-bold">Kanvas kosong</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {([
              {
                type: "landing" as const,
                icon: Layout,
                title: "Landing Page Baru",
                text: "Susun halaman pemasaran, company profile, portofolio, atau toko dengan bebas.",
              },
              {
                type: "dashboard" as const,
                icon: LayoutDashboard,
                title: "Dashboard Baru",
                text: "Bangun dashboard operasional dengan sidebar, kartu metrik, grafik, dan tabel data.",
              },
            ]).map((item) => {
              const Icon = item.icon;
              const key = `blank-${item.type}`;
              const isCreating = creating === key;
              return (
                <button
                  key={item.type}
                  type="button"
                  disabled={creating !== null}
                  onClick={() => createBlank(item.type)}
                  className="group flex min-h-48 flex-col items-start rounded-xl border border-border bg-card p-6 text-left transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md"
                >
                  <span className="grid size-11 place-items-center rounded-lg bg-brand text-brand-foreground shadow-sm">
                    <Icon size={20} />
                  </span>
                  <p className="mt-5 text-lg font-bold tracking-tight">{item.title}</p>
                  <p className="mt-1.5 max-w-sm text-xs leading-5 text-muted-foreground">{item.text}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-xs font-bold text-brand">
                    {isCreating ? <Loader2 size={14} className="animate-spin" /> : <FilePlus2 size={14} />}
                    {isCreating ? "Menyiapkan…" : "Mulai kosong"}
                    {!isCreating ? <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /> : null}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="template-heading">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-brand" />
                <h2 id="template-heading" className="text-sm font-bold">Template siap ubah</h2>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Konten awalnya nyata, responsive, dan langsung bisa Anda sesuaikan.</p>
            </div>
            <div className="flex items-center gap-1.5">
              {([
                { id: "all", label: `Semua (${templateRegistry.length})` },
                { id: "landing", label: `Landing Page (${templateRegistry.filter((t) => t.category === "landing").length})` },
                { id: "dashboard", label: `Dashboard (${templateRegistry.filter((t) => t.category === "dashboard").length})` },
                { id: "auth", label: `Login & Autentikasi (${templateRegistry.filter((t) => t.category === "auth").length})` },
              ] as { id: TemplateFilter; label: string }[]).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id)}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] transition-colors",
                    filter === tab.id
                      ? "bg-brand text-brand-foreground"
                      : "bg-muted text-muted-foreground hover:bg-brand/10 hover:text-brand"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredTemplates.map((template) => {
              const isCreating = creating === template.id;
              return (
                <div
                  key={template.id}
                  role="button"
                  tabIndex={0}
                  aria-disabled={creating !== null}
                  onClick={() => !creating && createFromTemplate(template)}
                  onKeyDown={(e) => {
                    if (!creating && (e.key === "Enter" || e.key === " ")) {
                      e.preventDefault();
                      createFromTemplate(template);
                    }
                  }}
                  className={cn(
                    "group relative cursor-pointer rounded-xl border border-border bg-card p-3 text-left transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md",
                    creating !== null && "pointer-events-none opacity-70"
                  )}
                >
                  <div className="pointer-events-none mb-4 select-none overflow-hidden rounded-lg border border-border/60 bg-card">
                    <TemplatePreview template={template} autoFit />
                  </div>
                  <div className="px-1 pb-1">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-md bg-muted px-2 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                        {template.category === "dashboard" ? "Dashboard" : template.category === "auth" ? "Login & autentikasi" : "Landing page"}
                      </span>
                      {template.tier === "pro" ? <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-brand">Pro</span> : null}
                    </div>
                    <h3 className="mt-3 text-sm font-bold tracking-tight">{template.name}</h3>
                    <p className="mt-1 line-clamp-2 min-h-9 text-[11px] leading-4 text-muted-foreground">{template.description}</p>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <span className="flex flex-wrap gap-1">
                        {template.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="rounded bg-secondary px-1.5 py-0.5 text-[9px] font-medium text-secondary-foreground">{tag}</span>
                        ))}
                      </span>
                      <span className="inline-flex shrink-0 items-center gap-1 text-[11px] font-bold text-brand">
                        {isCreating ? <Loader2 size={13} className="animate-spin" /> : <>Gunakan <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" /></>}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
