# Buat.in — Visual Website Builder

Visual website builder: user drag-and-drop mendesain website **gratis**, lalu
bayar **sekali** saat export untuk **menerima source code asli**
(HTML/CSS/JS statis, nanti React/Vite). Tanpa lock-in, tanpa langganan
bulanan.

> Design visually → Export HTML → Own the source.

## Status: V0 Engineering Prototype

Bukti loop inti berjalan end-to-end: `JSON → CANVAS → EXPORT HTML → ZIP`.

| Komponen | Status |
|---|---|
| Project JSON schema (`schemaVersion`, theme, pages, nodes) | ✅ |
| Component registry (manifest + preview + export adapter terpisah) | ✅ |
| 6 komponen: Navbar Minimal, Hero Centered, Grid Produk, Tentang, Ajakan, Footer | ✅ |
| Theme system: 7 palet warna, 4 radius, 4 tipografi, kerapatan, bayangan, warna kustom | ✅ |
| Canvas structured + drag & drop (dnd-kit) + reorder + duplicate + delete | ✅ |
| Inspector: Konten / Tata Letak / Gaya + panel Tema & SEO | ✅ |
| Preview device: desktop / tablet / mobile (container queries) | ✅ |
| Undo/Redo + autosave localStorage | ✅ |
| Export HTML (index.html, css, js, README, DEPLOYMENT, LICENSE, manifest) | ✅ |
| ZIP dirakit di browser (JSZip) + download | ✅ |
| Pratinjau hasil export (iframe srcdoc = file asli) | ✅ |
| Auth, payment, React export, upload asset | ⏳ V0.2+ |

## Menjalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:3000` → **Buka Builder** → pilih *Kanvas Kosong* atau
*Template Website Dasar*.

## Arsitektur Inti

```
ProjectDocument (JSON)
   ↓
Component Registry (manifest: contentControls, previewRenderer, exportAdapter)
   ↓
Canvas: JSON → Preview Renderer (React, token-based, container queries)
   ↓
Export: JSON → Export Adapter → HTML/CSS string → Source manifest → ZIP (browser)
```

- **Preview & export dipisah secara arsitektur** (`preview.tsx` vs `export.ts`
  per komponen) — preview renderer hanya untuk canvas, export adapter
  deterministik menghasilkan HTML/CSS murni tanpa runtime.
- **Deterministic, non-AI**: input + template sama → output sama.
- **Token-based theme** — satu sumber gaya; output export readable & editable.
- Persistence V0 memakai **localStorage** (mock Supabase).

## Struktur Folder

```
src/
├── app/                    # / (landing), /builder, /builder/[id] (editor)
├── components/
│   ├── builder/            # TopBar, LeftPanel, Canvas, Inspector, modals
│   ├── preview/            # SectionPreview, SectionShell
│   └── ui/                 # Button, Input, Tabs, Modal (hand-rolled)
└── lib/
    ├── schema/             # types + defaults (ProjectDocument, Node)
    ├── registry/           # manifest + components/{id}/{manifest,preview,export}
    ├── theme/              # presets + resolver token
    ├── store/              # zustand + history + autosave
    └── export/             # html pipeline, manifest, zip
```

## Roadmap Berikutnya (PRD)

V0.2 editor core → V0.3 responsive engine → V0.4 Supabase persistence →
V0.5 component system → V0.6 theme engine → V0.7 React export → V0.8 pricing →
V0.9 payment → V1.0 launch. Detail lengkap di `prd-visual-website-builder.md`.