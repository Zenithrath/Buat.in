export type LinkNavigationMode = "canvas" | "preview";

export interface LinkNavigationPage {
  id: string;
  path: string;
}

export interface LinkNavigationOptions {
  mode: LinkNavigationMode;
  pages: LinkNavigationPage[];
  onNavigateToPage: (pageId: string, path: string) => void;
  onUnknownPath?: (path: string) => void;
}

function normalizePath(path: string): string {
  const clean = path.split("#")[0] || "/";
  const withoutTrailing = clean.length > 1 ? clean.replace(/\/+$/, "") : "/";
  return withoutTrailing || "/";
}

export function matchPagePath(pages: LinkNavigationPage[], href: string) {
  const target = normalizePath(href);
  return pages.find((p) => normalizePath(p.path) === target);
}

/**
 * Penanganan klik tautan yang berlaku untuk mode canvas (di dalam builder)
 * maupun preview dedicated. Dipasang pada phase CAPTURE di akar area yang
 * berisi konten preview, sehingga menang sebelum event.stopPropagation()
 * milik InlineEditableText/komponen lain yang menutupinya — itu sebabnya
 * klik pada label tautan tetap bisa mencegah navigasi browser.
 *
 * - "#anchor"            → scroll halus ke elemen (jika ada), tidak navigasi.
 * - "/path" halaman      → pindah halaman project (setActivePage di canvas,
 *                          ?page=… di preview) — tidak pernah keluar builder.
 * - eksternal/protokol   → di canvas diblokir (jangan keluar editor),
 *                          di preview dibiarkan seperti situs hasil ekspor.
 * - path tak dikenal     → di canvas diblokir (hindari 404), di preview
 *                          tetap diblokir dengan fallback ke beranda.
 */
export function handleLinkNavigationClick(
  event: MouseEvent,
  options: LinkNavigationOptions
) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }
  const target = event.target as HTMLElement | null;
  const anchor = target?.closest?.("a");
  if (!anchor) return;
  const href = (anchor.getAttribute("href") ?? "").trim();
  if (!href || anchor.target === "_blank") return;

  if (href.startsWith("#")) {
    event.preventDefault();
    const fragment = href.slice(1);
    if (fragment) {
      document.getElementById(fragment)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    return;
  }

  if (href.startsWith("//") || /^[a-z][a-z0-9+.-]*:/i.test(href)) {
    if (options.mode === "canvas") event.preventDefault();
    return;
  }

  const clean = href.split("#")[0] || "/";
  const page = matchPagePath(options.pages, clean);
  if (page) {
    event.preventDefault();
    options.onNavigateToPage(page.id, page.path);
    return;
  }

  if (options.onUnknownPath) {
    event.preventDefault();
    options.onUnknownPath(clean);
    return;
  }
  event.preventDefault();
}
