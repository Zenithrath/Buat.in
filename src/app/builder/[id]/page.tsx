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
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 text-center text-foreground">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-muted-foreground">
          [ ERROR 404 ]
        </p>
        <h1 className="font-display text-2xl font-bold">
          Project tidak ditemukan
        </h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          Project ini mungkin belum pernah dibuat, atau data penyimpanan lokal
          sudah terhapus.
        </p>
        <Link
          href="/builder"
          className="mt-2 rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
        >
          Buat website baru
        </Link>
      </div>
    );
  }

  return <EditorShell />;
}