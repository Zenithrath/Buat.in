import type { Node, ProjectDocument } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { CORE_CSS, buildThemeVarsCss } from "@/lib/registry/coreCss";
import { componentMap } from "@/lib/registry";
import { escapeHtml } from "@/lib/registry/shared";
import {
  buildFontsHtml,
  buildGeneratorManifest,
  GENERATOR_VERSION,
  TEMPLATE_VERSION,
} from "./manifest";

export interface ExportFile {
  path: string;
  content: string;
}

export function buildExportFiles(doc: ProjectDocument): ExportFile[] {
  const tokens = resolveTheme(doc.theme);
  const ctx = { theme: doc.theme, tokens };

  const sections = doc.pages[0].sections;
  const isDashboard =
    doc.projectType === "dashboard" ||
    sections.some((s) => s.componentType === "app-sidebar");

  const cssParts: string[] = [];
  const usedCss = new Set<string>();

  const pushCss = (css: string) => {
    if (!css || usedCss.has(css)) return;
    usedCss.add(css);
    cssParts.push(css);
  };

  const renderSection = (section: Node): string => {
    const manifest = componentMap[section.componentType];
    if (!manifest) return "";
    const result = manifest.exportAdapter(section, ctx);
    pushCss(result.css);
    return result.html;
  };

  let bodyHtml = "";
  let dashboardCss = "";

  if (isDashboard) {
    const sidebar = sections.find((s) => s.componentType === "app-sidebar");
    const header = sections.find((s) => s.componentType === "dashboard-header");
    const kpis = sections.filter((s) => s.componentType === "kpi-card");
    const charts = sections.filter((s) => s.componentType === "chart-card");
    const rest = sections.filter(
      (s) =>
        !["app-sidebar", "dashboard-header", "kpi-card", "chart-card"].includes(
          s.componentType
        )
    );

    const rawWidth = sidebar
      ? parseInt((sidebar.styles as Record<string, string>).sidebarWidth ?? "", 10)
      : 0;
    const sidebarWidth = Number.isFinite(rawWidth) && rawWidth > 0 ? rawWidth : 240;

    bodyHtml = `<div class="bi-dashboard">
  <div class="bi-dashboard-side" style="--bi-sidebar-width:${sidebarWidth}px">
    ${sidebar ? renderSection(sidebar) : ""}
  </div>
  <div class="bi-dashboard-main">
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
  </div>
</div>`;
    dashboardCss = buildDashboardCss();
  } else {
    for (const section of sections) {
      bodyHtml += renderSection(section);
    }
  }

  const title = doc.seo.title || doc.name;
  const description =
    doc.seo.description ||
    `Website ${doc.name} — dibuat dengan Buat.in.`;

  const indexHtml = `<!doctype html>
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
`;

  const stylesCss = `${buildThemeVarsCss(tokens)}
${CORE_CSS}
${dashboardCss}
${cssParts.join("\n")}`;

  const mainJs = `// Buat.in — interaksi minimal
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
`;

  const generatorManifest = JSON.stringify(
    buildGeneratorManifest(doc),
    null,
    2
  );

  return [
    { path: "index.html", content: indexHtml },
    { path: "css/styles.css", content: stylesCss },
    { path: "js/main.js", content: mainJs },
    { path: "README.md", content: buildReadme(doc) },
    { path: "DEPLOYMENT.md", content: buildDeploymentGuide(doc) },
    { path: "LICENSE.md", content: buildLicense() },
    { path: "generator-manifest.json", content: generatorManifest + "\n" },
  ];
}

export function buildDashboardCss(): string {
  return `
/* ── Frame Dashboard (Buat.in) ─────────────────────── */
.bi-dashboard {
  display: flex;
  align-items: flex-start;
  min-height: 100vh;
}
.bi-dashboard-side {
  flex-shrink: 0;
  width: var(--bi-sidebar-width, 240px);
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
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

/* Mobile: sidebar menjadi bottom navigation bar */
@media (max-width: 767px) {
  .bi-dashboard { flex-direction: column; }
  .bi-dashboard-side {
    width: 100% !important;
    height: auto;
    position: fixed;
    bottom: 0;
    top: auto;
    left: 0;
    right: 0;
    z-index: 50;
    box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.08);
  }
  .bi-dashboard-side .bi-app-sidebar {
    width: 100% !important;
    min-height: 0;
    height: auto;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: 0.25rem;
    padding: 0.5rem;
    border-right: none;
    border-top: 1px solid var(--border);
    overflow-x: auto;
  }
  .bi-dashboard-side .bi-sidebar-brand { display: none; }
  .bi-dashboard-side .bi-sidebar-user { display: none; }
  .bi-dashboard-side .bi-nav-heading { display: none; }
  .bi-dashboard-side .bi-sidebar-nav {
    flex-direction: row;
    gap: 0.25rem;
    align-items: center;
  }
  .bi-dashboard-side .bi-sidebar-link {
    flex-direction: column;
    gap: 0.125rem;
    font-size: 0.625rem;
    padding: 0.375rem 0.625rem;
    text-align: center;
  }
  .bi-dashboard-main { padding-bottom: 56px; }
  .bi-dashboard-kpis { grid-template-columns: repeat(2, 1fr); }
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
├── index.html              # Halaman utama (satu halaman)
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