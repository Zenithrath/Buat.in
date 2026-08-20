import type { Node, Page, ProjectDocument } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { CORE_CSS, buildThemeVarsCss } from "@/lib/registry/coreCss";
import { componentMap } from "@/lib/registry";
import { escapeHtml, propString } from "@/lib/registry/shared";
import type { ExportAsset } from "@/lib/registry/types";
import {
  buildFontsHtml,
  buildGeneratorManifest,
  GENERATOR_VERSION,
  TEMPLATE_VERSION,
} from "./manifest";

export interface ExportFile {
  path: string;
  content: string;
  /** Konten berupa payload base64 biner (mis. gambar) — ditulis apa adanya. */
  base64?: boolean;
}

const IMAGE_EXTENSIONS: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
  "image/x-icon": "ico",
};

/** Ambil nama file unik untuk gambar inline, beri suffix -2, -3 bila bentrok. */
function uniqueAssetName(
  mimeType: string,
  used: Set<string>
): string {
  const extension = IMAGE_EXTENSIONS[mimeType] ?? "png";
  let candidate = `gambar-1.${extension}`;
  let counter = 1;
  while (used.has(candidate)) {
    counter += 1;
    candidate = `gambar-${counter}.${extension}`;
  }
  used.add(candidate);
  return candidate;
}

/** Daftarkan gambar data-URL ke kumpulan file ekspor, dedup, dan beri nama file unik. */
function resolveAssetFileName(
  dataUrl: string,
  assetUrls: Map<string, string>,
  assetNames: Set<string>,
  assetFiles: ExportFile[]
): string {
  const known = assetUrls.get(dataUrl);
  if (known) return known;
  const match = /^data:(image\/[\w.+-]+);base64,([A-Za-z0-9+/=]+)$/.exec(dataUrl);
  const mimeType = match?.[1] ?? "image/png";
  const payload = match?.[2] ?? "";
  const fileName = uniqueAssetName(mimeType, assetNames);
  assetUrls.set(dataUrl, fileName);
  if (payload) {
    assetFiles.push({ path: `assets/${fileName}`, content: payload, base64: true });
  }
  return fileName;
}

function pushDeclaredAssets(
  assets: ExportAsset[] | undefined,
  assetUrls: Map<string, string>,
  assetNames: Set<string>,
  assetFiles: ExportFile[]
) {
  for (const asset of assets ?? []) {
    if (!assetUrls.has(asset.dataUrl)) {
      const match = /^data:(image\/[\w.+-]+);base64,([A-Za-z0-9+/=]+)$/.exec(asset.dataUrl);
      if (!match) continue;
      const fileName = uniqueAssetName(match[1], assetNames);
      assetUrls.set(asset.dataUrl, fileName);
      assetFiles.push({ path: `assets/${fileName}`, content: match[2], base64: true });
    }
  }
}

export function buildExportFiles(doc: ProjectDocument): ExportFile[] {
  const tokens = resolveTheme(doc.theme);
  const ctx = { theme: doc.theme, tokens };

  const cssParts: string[] = [];
  const usedCss = new Set<string>();
  const jsParts: string[] = [];
  const usedJs = new Set<string>();
  const assetFiles: ExportFile[] = [];
  const assetUrls = new Map<string, string>();
  const assetNames = new Set<string>();

  /** Tulis ulang gambar inline (data URL) menjadi file di assets/ dan ganti
   *  referensinya agar website hasil ekspor tetap mandiri tanpa URL eksternal. */
  const materializeImages = (html: string): string => {
    let next = html;
    next = next.replace(/(src)="(data:(image\/[\w.+-]+);base64,[A-Za-z0-9+/=]+)"/g, (_all, _attr, dataUrl) => {
      const fileName = resolveAssetFileName(dataUrl, assetUrls, assetNames, assetFiles);
      return `src="assets/${fileName}"`;
    });
    next = next.replace(/url\("(data:(image\/[\w.+-]+);base64,[A-Za-z0-9+/=]+)"\)/g, (_all, dataUrl) => {
      const fileName = resolveAssetFileName(dataUrl, assetUrls, assetNames, assetFiles);
      return `url("assets/${fileName}")`;
    });
    return next;
  };

  const pushCss = (css: string) => {
    if (!css || usedCss.has(css)) return;
    usedCss.add(css);
    cssParts.push(css);
  };

  const pushJs = (js: string | undefined) => {
    if (!js || usedJs.has(js)) return;
    usedJs.add(js);
    jsParts.push(js);
  };

  const renderSection = (section: Node): string => {
    const manifest = componentMap[section.componentType];
    if (!manifest) return "";
    const result = manifest.exportAdapter(section, ctx);
    pushCss(result.css);
    pushJs(result.js);
    pushDeclaredAssets(result.assets, assetUrls, assetNames, assetFiles);
    let html = result.html;

    // Keep editable compact-sidebar labels identical in the exported HTML.
    // This also preserves older sidebar documents that do not yet have them.
    if (section.componentType === "sidebar-icon") {
      const workspace = escapeHtml(propString(section, "workspaceLabel").trim() || "Workspace");
      const status = escapeHtml(propString(section, "statusLabel").trim() || "Terhubung");
      html = html
        .replace("<span>Workspace</span>", `<span>${workspace}</span>`)
        .replace("<span>Terhubung</span>", `<span>${status}</span>`);
    }

    // Some early adapters share markup with React previews and still emit the
    // React-only `className` attribute. Static HTML needs the native spelling.
    html = html.replace(/\bclassName=/g, "class=");

    // Section-as-container: komponen umum menampung children-nya sendiri di
    // bawah bloknya (kecuali komponen yang merender children secara internal
    // seperti grid-container/section-basic, atau widget kecil yang ditandai
    // canContainChildren=false).
    if (
      !manifest.internalChildren &&
      manifest.canContainChildren !== false &&
      (section.children?.length ?? 0) > 0
    ) {
      const childrenHtml = section.children
        .filter((child) => !child.metadata.hidden)
        .map((child) => renderSection(child))
        .join("\n");
      if (childrenHtml) {
        pushCss(NODE_CHILDREN_CSS);
        html += `\n<div class="bi-node-children">\n${childrenHtml}\n</div>`;
      }
    }

    return html;
  };

  const renderPage = (page: Page): string => {
    const sections = (page.sections ?? []).filter((section) => !section.metadata.hidden);
    const isDashboard =
      doc.projectType === "dashboard" ||
      sections.some(
        (s) => s.componentType === "app-sidebar" || s.componentType === "sidebar-icon"
      );

    let bodyHtml = "";
    let dashboardCss = "";

    if (isDashboard) {
      const sidebar = sections.find(
        (s) => s.componentType === "app-sidebar" || s.componentType === "sidebar-icon"
      );
      const header = sections.find((s) => s.componentType === "dashboard-header");
      const kpis = sections.filter((s) => s.componentType === "kpi-card");
      const charts = sections.filter((s) => s.componentType === "chart-card");
      const rest = sections.filter(
        (section) =>
          section.id !== sidebar?.id &&
          !["dashboard-header", "kpi-card", "chart-card"].includes(section.componentType)
      );

      const savedSidebarWidth = Number.parseInt(String(sidebar?.styles.sidebarWidth ?? ""), 10);
      const sidebarWidth = Number.isFinite(savedSidebarWidth)
        ? Math.min(360, Math.max(180, savedSidebarWidth))
        : 240;

      bodyHtml = `<div class="bi-dashboard" style="--bi-sidebar-width: ${sidebarWidth}px">
  ${
    sidebar
      ? `<aside class="bi-dashboard-side">
    ${renderSection(sidebar)}
  </aside>`
      : ""
  }
  <main class="bi-dashboard-main">
    ${header ? `<div class="bi-dashboard-header">${renderSection(header)}</div>` : ""}
    <div class="bi-dashboard-content">
      ${
        kpis.length > 0
          ? `<div class="bi-dashboard-kpis">${kpis.map(renderSection).join("\n")}</div>`
          : ""
      }
      ${
        charts.length > 0
          ? `<div class="bi-dashboard-charts">${charts.map(renderSection).join("\n")}</div>`
          : ""
      }
      ${rest.map(renderSection).join("\n")}
    </div>
  </main>
</div>`;
      dashboardCss = buildDashboardCss();
      pushCss(dashboardCss);
    } else {
      for (const section of sections) {
        bodyHtml += renderSection(section);
      }
    }

    // Early newsletter adapters used one fixed input id. Keep exports from older
    // documents valid when a page contains more than one newsletter block.
    let newsletterIndex = 0;
    bodyHtml = bodyHtml.replace(
      /for="bi-newsletter-email">Email<\/label><div><input id="bi-newsletter-email"/g,
      () => {
        newsletterIndex += 1;
        const inputId = `bi-newsletter-email-${newsletterIndex}`;
        return `for="${inputId}">Email</label><div><input id="${inputId}"`;
      }
    );

    // Rewrite internal page links (e.g. href="/tentang") to their exported HTML
    // files so navigation keeps working on any static host (incl. sub-folder
    // deployments like GitHub Pages). External URLs are left untouched.
    for (const page of doc.pages) {
      const target = page.isHome
        ? "index.html"
        : `${page.path.replace(/^\/+|\/+$/g, "")}.html`;
      bodyHtml = bodyHtml.replace(
        new RegExp(`href="${page.path === "/" ? "/" : page.path}"`, "g"),
        `href="${target}"`
      );
    }

    return materializeImages(bodyHtml);
  };

  const description =
    doc.seo.description ||
    `Website ${doc.name} — dibuat dengan Buat.in.`;

  const files: ExportFile[] = [];

  for (const page of doc.pages) {
    const bodyHtml = renderPage(page);
    const title = page.isHome
      ? doc.seo.title || doc.name
      : `${page.name} — ${doc.name}`;
    const fileName = page.isHome
      ? "index.html"
      : `${page.path.replace(/^\/+|\/+$/g, "")}.html`;

    files.push({
      path: fileName,
      content: `<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  ${buildFontsHtml(doc)}
  <link rel="stylesheet" href="css/styles.css" />
</head>
<body>
${bodyHtml}
<script src="js/main.js"></script>
</body>
</html>
`,
    });
  }

  const stylesCss = `${CORE_CSS}
${buildThemeVarsCss(tokens)}
${cssParts.join("\n")}`;

  const mainJs = `${jsParts.join("\n\n")}${jsParts.length ? "\n\n" : ""}// Buat.in — interaksi minimal
// Menu navigasi mobile
document.querySelectorAll("[data-nav-toggle]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var nav = btn.closest(".bi-nav");
    if (!nav) return;
    var open = nav.getAttribute("data-nav-open") === "true";
    nav.setAttribute("data-nav-open", String(!open));
    btn.setAttribute("aria-expanded", String(!open));
    btn.setAttribute("aria-label", open ? "Buka menu" : "Tutup menu");
  });
});

// Dashboard navigation works without a framework.
document.querySelectorAll("[data-dashboard-nav]").forEach(function (nav) {
  var links = nav.querySelectorAll("[data-dashboard-nav-link]");
  links.forEach(function (link) {
    link.addEventListener("click", function () {
      links.forEach(function (item) {
        item.classList.remove("active", "is-active");
        item.removeAttribute("aria-current");
      });
      link.classList.add("active", "is-active");
      link.setAttribute("aria-current", "page");
    });
  });
});

// Dashboard search filters exported table rows in place.
document.querySelectorAll("[data-dashboard-search]").forEach(function (input) {
  input.addEventListener("input", function () {
    var query = String(input.value || "").trim().toLocaleLowerCase("id-ID");
    var scope = input.closest(".bi-dashboard") || document;
    scope.querySelectorAll("[data-dashboard-row]").forEach(function (row) {
      var searchable = (row.getAttribute("data-search-text") || row.textContent || "")
        .toLocaleLowerCase("id-ID");
      var visible = !query || searchable.indexOf(query) !== -1;
      row.hidden = !visible;
      row.setAttribute("aria-hidden", String(!visible));
    });
  });
});

// A static dashboard still provides an export action through browser print.
document.querySelectorAll('[data-dashboard-action="export"]').forEach(function (button) {
  button.addEventListener("click", function () {
    window.print();
  });
});
`;

  const generatorManifest = JSON.stringify(
    buildGeneratorManifest(doc),
    null,
    2
  );

  files.push(
    { path: "css/styles.css", content: stylesCss },
    { path: "js/main.js", content: mainJs },
    { path: "README.md", content: buildReadme(doc) },
    { path: "DEPLOYMENT.md", content: buildDeploymentGuide(doc) },
    { path: "LICENSE.md", content: buildLicense() },
    { path: "generator-manifest.json", content: generatorManifest + "\n" },
    ...assetFiles
  );

  return files;
}

const NODE_CHILDREN_CSS = `
.bi-node-children {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-sizing: border-box;
}
.bi-node-children .bi-node-children { gap: 1.5rem; }
@media (max-width: 560px) {
  .bi-node-children { gap: 1.25rem; }
}
`;

export function buildDashboardCss(): string {
  return `
/* Frame dashboard — sidebar vertikal, sama seperti di canvas. */
.bi-dashboard {
  display: flex;
  align-items: flex-start;
  min-height: 100vh;
  background: var(--bi-bg);
  color: var(--bi-fg);
}
.bi-dashboard-side {
  flex-shrink: 0;
  width: var(--bi-sidebar-width, 240px);
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  border-right: 1px solid var(--bi-border);
  background: var(--bi-card);
}
.bi-dashboard-side .bi-sidebar,
.bi-dashboard-side .bi-app-sidebar {
  width: 100% !important;
  min-height: 100%;
  height: 100%;
  border-right: 0;
}
.bi-dashboard-side .bi-icon-sidebar {
  width: 100% !important;
  min-width: 100% !important;
  height: 100%;
}
.bi-dashboard-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.bi-dashboard-header {
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 10;
}
.bi-dashboard-content {
  flex: 1;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-sizing: border-box;
}
.bi-dashboard-kpis {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
.bi-dashboard-charts {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (max-width: 1023px) {
  .bi-dashboard-kpis { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 767px) {
  .bi-dashboard-side {
    width: 5rem;
    min-width: 5rem;
  }
  .bi-dashboard-side .bi-sidebar {
    padding: 0.5rem;
    overflow: hidden;
  }
  .bi-dashboard-side .bi-sidebar-brand,
  .bi-dashboard-side .bi-sidebar-user,
  .bi-dashboard-side .bi-nav-heading { display: none; }
  .bi-dashboard-side .bi-sidebar-link {
    justify-content: center;
    padding: 0.675rem;
  }
  .bi-dashboard-side .bi-sidebar-link-label,
  .bi-dashboard-side .bi-sidebar-link-caret { display: none; }
  .bi-dashboard-content { padding: 0.875rem; gap: 0.875rem; }
  .bi-dashboard-kpis { grid-template-columns: 1fr; }
  .bi-dashboard-charts { grid-template-columns: 1fr; }
  .bi-dashboard-header { position: static; }
}
`;
}

function buildReadme(doc: ProjectDocument): string {
  return `# ${doc.name}

Website statis yang dibuat dengan **Buat.in** — visual website builder.

## Struktur Folder

\`\`\`
.
├── index.html              # Halaman beranda
├── tentang.html            # (dst.) Satu file per halaman tambahan
├── css/
│   └── styles.css          # Seluruh gaya visual (tema + komponen)
├── js/
│   └── main.js             # Interaksi dasar (menu mobile)
├── assets/                 # (opsional) gambar & file pendukung
├── README.md
├── DEPLOYMENT.md           # Panduan cara menayangkan website
├── LICENSE.md
└── generator-manifest.json # Metadata versi generator & komponen
\`\`\`

## Navigasi Antar Halaman

Setiap halaman menghasilkan satu file HTML (beranda menjadi \`index.html\`).
Tautan internal sudah otomatis ditulis ulang ke file yang benar — mis. menu
dengan \`href="/tentang"\` menjadi \`href="tentang.html"\` — sehingga navigasi
tetap berfungsi di hosting mana pun, termasuk GitHub Pages di sub-folder.

## Cara Menjalankan Secara Lokal

Buka \`index.html\` langsung di browser, atau jalankan server statis sederhana:

\`\`\`bash
npx serve .
\`\`\`

## Kustomisasi

Seluruh gaya ada di \`css/styles.css\` — ubah variabel di blok \`:root\`
(bagian paling atas) untuk mengubah warna, font, dan sudut komponen secara global.

Website ini **tidak bergantung pada Buat.in** — tanpa runtime tersembunyi dan
tanpa layanan eksternal yang wajib. Generator version: ${GENERATOR_VERSION}
(template ${TEMPLATE_VERSION}).
`;
}

function buildDeploymentGuide(doc: ProjectDocument): string {
  return `# Panduan Menayangkan Website

Website ${doc.name} adalah website statis murni. Ada banyak cara menayangkannya
secara gratis atau murah:

## Opsi 1 — Netlify Drop (paling mudah, gratis)

1. Buka https://app.netlify.com/drop
2. Seret folder ini ke halaman tersebut
3. Selesai — website langsung online

## Opsi 2 — Vercel (gratis)

1. Buka https://vercel.com
2. Pilih "Deploy" → "Deploy without Git" (dari CLI: \`npx vercel\`)
3. Ikuti langkah yang muncul

## Opsi 3 — GitHub Pages (gratis)

1. Buat repository baru di https://github.com
2. Unggah seluruh isi folder ini
3. Repository → Settings → Pages → pilih branch \`main\`
4. Website tampil di \`https://username.github.io/nama-repo\`

## Opsi 4 — Hosting bersama (murah)

1. Login ke panel hosting Anda (cPanel, dll.)
2. Unggah seluruh isi folder ini ke folder \`public_html\` (atau \`htdocs\`)
3. Website langsung tampil di domain Anda

## Menghubungkan Domain Sendiri

Setelah website online di salah satu opsi di atas, tambahkan domain Anda di
pengaturan penyedia (Netlify/Vercel/GitHub Pages semua mendukung ini).
`;
}

function buildLicense(): string {
  return `# Lisensi Penggunaan

Website ini dihasilkan oleh Buat.in untuk pemilik project: **pembeli sah**
dari source code ini.

## Yang Boleh

- Menggunakan website ini untuk keperluan pribadi maupun komersial
- Memodifikasi kode sesuka hati
- Menyewa developer pihak ketiga untuk mengembangkan lebih lanjut

## Yang Tidak Boleh

- Menjual kembali atau mendistribusikan source code ini sebagai produk
  mandiri (template) tanpa izin tertulis

## Lisensi Komponen

Seluruh komponen dan gaya visual yang dipakai sudah dirancang oleh Buat.in.
Font yang digunakan dilisensikan secara bebas untuk distribusi (Google Fonts /
SIL Open Font License).

Untuk pertanyaan lisensi, hubungi tim Buat.in.
`;
}
