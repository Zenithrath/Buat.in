"use client";

import { use, useEffect } from "react";
import Link from "next/link";
import { loadProject, useBuilderStore } from "@/lib/store/project-store";
import { EditorShell } from "@/components/builder/EditorShell";

export default function BuilderPage({ params }: PageProps<"/builder/[id]">) {
  const { id } = use(params);
  const setDocument = useBuilderStore((s) => s.setDocument);
  const markLoadError = useBuilderStore((s) => s.markLoadError);
  const loadError = useBuilderStore((s) => s.loadError);

  useEffect(() => {
    const doc = loadProject(id);
    if (doc) {
      setDocument(doc);
    } else {
      markLoadError();
    }
  }, [id, setDocument, markLoadError]);

  if (loadError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-50 px-4 text-center">
        <h1 className="text-xl font-bold text-zinc-900">
          Project tidak ditemukan
        </h1>
        <p className="max-w-sm text-sm text-zinc-500">
          Project ini mungkin belum pernah dibuat, atau data penyimpanan lokal
          sudah terhapus.
        </p>
        <Link
          href="/builder"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Buat website baru
        </Link>
      </div>
    );
  }

  return <EditorShell />;
}