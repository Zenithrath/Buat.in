"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4">
      <div className="mb-10 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
          Buat website baru
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Mulai dari kosong, atau pakai template dasar — keduanya gratis.
        </p>
      </div>

      <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
        <button
          type="button"
          disabled={creating !== null}
          onClick={() => create("blank")}
          className="group flex flex-col items-start rounded-2xl border-2 border-zinc-200 bg-white p-6 text-left transition-all hover:border-blue-400 hover:shadow-lg"
        >
          <FilePlus2
            size={28}
            className="mb-4 text-zinc-400 group-hover:text-blue-600"
          />
          <p className="text-sm font-semibold text-zinc-900">Kanvas Kosong</p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-500">
            Mulai dari nol dan susun sendiri komponennya sesuai keinginan.
          </p>
          <span className="mt-4 flex items-center gap-1 text-xs font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
            {creating === "blank" ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <ArrowRight size={12} />
            )}
            {creating === "blank" ? "Membuat..." : "Buat project"}
          </span>
        </button>

        <button
          type="button"
          disabled={creating !== null}
          onClick={() => create("template")}
          className="group flex flex-col items-start rounded-2xl border-2 border-blue-300 bg-blue-50/50 p-6 text-left transition-all hover:border-blue-500 hover:shadow-lg"
        >
          <LayoutTemplate
            size={28}
            className="mb-4 text-blue-600"
          />
          <p className="text-sm font-semibold text-zinc-900">
            Template Website Dasar
          </p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-500">
            Halaman toko lengkap: navbar, hero, produk, tentang, ajakan, dan
            footer. Tinggal ganti isinya.
          </p>
          <span className="mt-4 flex items-center gap-1 text-xs font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
            {creating === "template" ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <ArrowRight size={12} />
            )}
            {creating === "template" ? "Membuat..." : "Buat project"}
          </span>
        </button>
      </div>
    </div>
  );
}