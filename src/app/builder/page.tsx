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
    <div className="flex min-h-screen flex-col bg-white text-zinc-900">
      <header className="border-b border-zinc-200">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="text-lg font-extrabold tracking-tight text-zinc-900">
            Buat<span className="text-green-500">.</span>in
          </Link>
          <Link
            href="/"
            className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50"
          >
            ← Kembali
          </Link>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Buat website baru
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Mulai dari kosong, atau pakai template dasar — keduanya gratis.
          </p>
        </div>

        <div className="grid w-full max-w-3xl gap-5 sm:grid-cols-2">
          <button
            type="button"
            disabled={creating !== null}
            onClick={() => create("blank")}
            className="group flex flex-col items-start rounded-3xl border border-zinc-200 bg-white p-8 text-left transition-all hover:border-zinc-900 hover:shadow-xl hover:shadow-zinc-900/5"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 text-white">
              <FilePlus2 size={22} />
            </span>
            <p className="mt-5 text-base font-bold text-zinc-900">Kanvas Kosong</p>
            <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">
              Mulai dari nol dan susun sendiri komponennya sesuai keinginan.
            </p>
            <span className="mt-5 flex items-center gap-1.5 text-xs font-bold text-zinc-900 opacity-0 transition-opacity group-hover:opacity-100">
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
            className="group flex flex-col items-start rounded-3xl border border-zinc-200 bg-white p-8 text-left transition-all hover:border-green-500 hover:shadow-xl hover:shadow-green-500/10"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500 text-zinc-900">
              <LayoutTemplate size={22} />
            </span>
            <span className="mt-5 rounded-full bg-green-500/10 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-green-700">
              Direkomendasikan
            </span>
            <p className="mt-2 text-base font-bold text-zinc-900">
              Template Website Dasar
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">
              Halaman toko lengkap: navbar, hero, produk, tentang, ajakan, dan
              footer. Tinggal ganti isinya.
            </p>
            <span className="mt-5 flex items-center gap-1.5 text-xs font-bold text-green-600 opacity-0 transition-opacity group-hover:opacity-100">
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

      <footer className="border-t border-zinc-100 py-6 text-center text-xs text-zinc-400">
        Buat.in — Visual Website Builder · V0 Prototype
      </footer>
    </div>
  );
}