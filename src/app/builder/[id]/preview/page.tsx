"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { getActivePage, loadProject } from "@/lib/store/project-store";
import type { ProjectDocument } from "@/lib/schema/types";
import { resolveTheme, FONT_LINKS } from "@/lib/theme/presets";
import { projectTokenStyle, themeTokenStyle } from "@/lib/registry/shared";
import { SectionPreview } from "@/components/preview/SectionPreview";
import { RegistryStyles } from "@/components/builder/RegistryStyles";
import { handleLinkNavigationClick } from "@/lib/preview/link-navigation";
import { buildDashboardCss } from "@/lib/export/html";

const DASHBOARD_GROUPS = ["dashboard-header", "kpi-card", "chart-card"];

export default function DedicatedPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pagePath = searchParams.get("page");
  // localStorage hanya tersedia setelah hydration. Mulai dari status loading yang
  // sama pada server dan client agar halaman preview tidak mengalami hydration
  // mismatch sebelum project lokal dimuat.
  const [doc, setDoc] = useState<ProjectDocument | null | undefined>(undefined);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDoc(loadProject(id));
    }, 0);
    return () => window.clearTimeout(timer);
  }, [id]);

  useEffect(() => {
    if (doc === undefined || doc === null) return;
    const project = doc;
    const knownPages = new Set(project.pages.map((p) => p.path));
    const base = `/builder/${id}/preview`;
    // Phase CAPTURE: berjalan sebelum event.stopPropagation() dari komponen
    // preview (mis. InlineEditableText), sehingga klik tautan selalu dicegat.
    // Perilaku disamakan dengan situs hasil ekspor: link antar halaman pindah
    // halaman, #anchor digulirkan halus, tautan eksternal tetap terbuka.
    function onDocClick(event: MouseEvent) {
      handleLinkNavigationClick(event, {
        mode: "preview",
        pages: project.pages,
        onNavigateToPage: (_pageId, path) => {
          router.replace(
            path === "/"
              ? base
              : `${base}?page=${encodeURIComponent(path)}${knownPages.has(path) ? "" : "&fallback=1"}`
          );
        },
        onUnknownPath: (path) => {
          router.replace(`${base}?page=${encodeURIComponent(path)}&fallback=1`);
        },
      });
    }
    document.addEventListener("click", onDocClick, true);
    return () => document.removeEventListener("click", onDocClick, true);
  }, [doc, id, router]);

  if (doc === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4 text-sm text-muted-foreground">
        Memuat project...
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background p-4 text-center">
        <h1 className="text-xl font-bold text-foreground">Project Tidak Ditemukan</h1>
        <p className="text-xs text-muted-foreground">
          Project ID {id} tidak ditemukan di penyimpanan lokal.
        </p>
        <Link
          href="/builder"
          className="mt-2 rounded-md bg-primary px-4 py-2 text-xs font-bold text-primary-foreground"
        >
          Kembali ke Builder
        </Link>
      </div>
    );
  }

  const activePage = pagePath
    ? doc.pages.find((p) => p.path === pagePath) ?? getActivePage(doc, null)
    : getActivePage(doc, null);
  const pageMissing = Boolean(pagePath && !doc.pages.some((p) => p.path === pagePath));
  const tokens = resolveTheme(doc.theme);
  const sections = (activePage.sections ?? []).filter(
    (section) => !section.metadata.hidden
  );
  const hasImportedPage = sections.some(
    (section) => section.componentType === "imported-page"
  );
  const isDashboard =
    !hasImportedPage && (doc.projectType === "dashboard" ||
    sections.some(
      (s) => s.componentType === "app-sidebar" || s.componentType === "sidebar-icon"
    ));

  const sidebar = sections.find(
    (s) => s.componentType === "app-sidebar" || s.componentType === "sidebar-icon"
  );
  const header = sections.find((s) => s.componentType === "dashboard-header");
  const kpis = sections.filter((s) => s.componentType === "kpi-card");
  const charts = sections.filter((s) => s.componentType === "chart-card");
  const rest = sections.filter(
    (section) => section.id !== sidebar?.id && !DASHBOARD_GROUPS.includes(section.componentType)
  );
  return (
    <div
      className="min-h-screen w-full transition-colors"
      style={{
        ...themeTokenStyle(tokens),
        ...projectTokenStyle(tokens),
        backgroundColor: tokens.background,
        color: tokens.foreground,
      } as React.CSSProperties}
    >
      <RegistryStyles />
      {isDashboard ? <style>{buildDashboardCss()}</style> : null}
      {FONT_LINKS.map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
      {pageMissing ? (
        <div className="fixed inset-x-0 top-0 z-50 bg-foreground px-4 py-2 text-center text-xs font-semibold text-background">
          Halaman &quot;{pagePath}&quot; belum ada — menampilkan Beranda. Buat halaman dengan path ini di Inspector.
        </div>
      ) : null}
      <div
        className="w-full min-h-screen"
        style={{
          ...themeTokenStyle(tokens),
          ...projectTokenStyle(tokens),
          backgroundColor: tokens.background,
          color: tokens.foreground,
        } as React.CSSProperties}
      >
        {sections.length === 0 ? (
          <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2 p-8 text-center text-muted-foreground text-sm">
            Halaman ini belum memiliki komponen.
          </div>
        ) : hasImportedPage ? (
          <div className="w-full min-h-screen">
            {sections.map((node) => (
              <SectionPreview key={node.id} node={node} theme={doc.theme} />
            ))}
          </div>
        ) : isDashboard ? (
          <div className="bi-dashboard">
            {sidebar ? (
              <aside
                className="bi-dashboard-side"
                style={{
                  "--bi-sidebar-width": `${Math.min(
                    360,
                    Math.max(180, Number.parseInt(sidebar.styles.sidebarWidth ?? "240", 10) || 240)
                  )}px`,
                } as React.CSSProperties}
              >
                <SectionPreview node={sidebar} theme={doc.theme} />
              </aside>
            ) : null}
            <main className="bi-dashboard-main">
              {header ? (
                <div className="bi-dashboard-header">
                  <SectionPreview node={header} theme={doc.theme} />
                </div>
              ) : null}
              <div className="bi-dashboard-content">
                {kpis.length > 0 ? (
                  <div className="bi-dashboard-kpis">
                    {kpis.map((node) => (
                      <SectionPreview key={node.id} node={node} theme={doc.theme} />
                    ))}
                  </div>
                ) : null}
                {charts.length > 0 ? (
                  <div className="bi-dashboard-charts">
                    {charts.map((node) => (
                      <SectionPreview key={node.id} node={node} theme={doc.theme} />
                    ))}
                  </div>
                ) : null}
                {rest.map((node) => (
                  <SectionPreview key={node.id} node={node} theme={doc.theme} />
                ))}
              </div>
            </main>
          </div>
        ) : (
          sections.map((node) => (
            <SectionPreview key={node.id} node={node} theme={doc.theme} />
          ))
        )}
      </div>
    </div>
  );
}
