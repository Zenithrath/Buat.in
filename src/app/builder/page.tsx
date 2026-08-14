"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FilePlus2, LayoutTemplate, ArrowRight, Loader2 } from "lucide-react";
import {
  createBlankProject,
  createTemplateProject,
} from "@/lib/schema/defaults";
import { autosaveProject } from "@/lib/store/project-store";
import { uid } from "@/lib/utils";

export default function NewProjectPage() {
  const router = useRouter();
  const [creating, setCreating] = useState<string | null>(null);

  function create(kind: "blank" | "template") {
    setCreating(kind);
    const projectId = uid();
    const doc =
      kind === "blank"
        ? createBlankProject(projectId)
        : createTemplateProject(projectId);
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
            Buat<span className="text-brand">.</span>in
          </Link>
          <Link
            href="/"
            className="rounded-md border border-border px-4 py-2 text-[13px] font-semibold text-foreground transition-colors hover:border-muted hover:bg-muted"
          >
            ← Kembali
          </Link>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-5 py-16">
        <div className="mb-12 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            [ PROJECT BARU ]
          </p>
          <h1 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Buat website baru
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Mulai dari kosong, atau pakai template dasar — keduanya gratis.
          </p>
        </div>

        <div className="grid w-full max-w-3xl gap-5 sm:grid-cols-2">
          <button
            type="button"
            disabled={creating !== null}
            onClick={() => create("blank")}
            className="group flex flex-col items-start rounded-xl border border-border bg-card p-8 text-left transition-all hover:border-muted hover:bg-card"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-border text-foreground">
              <FilePlus2 size={20} />
            </span>
            <p className="mt-5 text-base font-bold text-foreground">Kanvas Kosong</p>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
              Mulai dari nol dan susun sendiri komponennya sesuai keinginan.
            </p>
            <span className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground opacity-0 transition-all group-hover:text-brand group-hover:opacity-100">
              {creating === "blank" ? (
                <>
                  <Loader2 size={13} className="animate-spin" /> Membuat...
                </>
              ) : (
                <>
                  Buat project <ArrowRight size={13} />
                </>
              )}
            </span>
          </button>

          <button
            type="button"
            disabled={creating !== null}
            onClick={() => create("template")}
            className="group flex flex-col items-start rounded-xl border border-brand/50 bg-brand/5 p-8 text-left transition-all hover:border-brand hover:bg-brand/10"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand text-white">
              <LayoutTemplate size={20} />
            </span>
            <span className="mt-5 font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-brand">
              Direkomendasikan
            </span>
            <p className="mt-1.5 text-base font-bold text-foreground">
              Template Website Dasar
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
              Halaman toko lengkap: navbar, hero, produk, tentang, ajakan, dan
              footer. Tinggal ganti isinya.
            </p>
            <span className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground opacity-0 transition-all group-hover:text-brand group-hover:opacity-100">
              {creating === "template" ? (
                <>
                  <Loader2 size={13} className="animate-spin" /> Membuat...
                </>
              ) : (
                <>
                  Buat project <ArrowRight size={13} />
                </>
              )}
            </span>
          </button>
        </div>
      </main>

      <footer className="border-t border-border py-6 text-center font-mono text-[11px] text-muted-foreground">
        Buat.in — Visual Website Builder · V0 Prototype
      </footer>
    </div>
  );
}