import type { ProjectDocument } from "@/lib/schema/types";
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

  const bodyParts: string[] = [];
  const cssParts: string[] = [];
  const usedCss = new Set<string>();

  for (const section of doc.pages[0].sections) {
    const manifest = componentMap[section.componentType];
    if (!manifest) continue;
    const result = manifest.exportAdapter(section, ctx);
    bodyParts.push(result.html);
    if (!usedCss.has(result.css)) {
      usedCss.add(result.css);
      cssParts.push(result.css);
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
${bodyParts.join("\n")}
<script src="js/main.js"></script>
</body>
</html>
`;

  const stylesCss = `${buildThemeVarsCss(tokens)}
${CORE_CSS}
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