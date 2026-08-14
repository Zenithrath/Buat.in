# PRD — Batch V2: Modernisasi Komponen & Template Baru

| | |
|---|---|
| **Dokumen** | Product Requirements Document — Batch V2 (Komponen & Template) |
| **Tanggal** | 14 Agustus 2026 |
| **Status** | Disetujui untuk eksekusi |
| **Referensi** | PRD utama: `prd-visual-website-builder.md` |
| **Lokasi kode** | Komponen: `src/asset-comp/` · Template: `src/templates/` |

---

## 1. Ringkasan

Batch ini bertujuan membuat library komponen Buat.in **modern setara referensi design**
(freefrontend.com — untuk komponen & gaya visual) dan **kaya varian template setara**
referensi industri (themewagon.com — untuk template), dengan dua aturan keras:

1. **Style editor (builder) tidak berubah** — yang dimodernisasi hanya komponen
   hasil desain user (asset-comp), bukan sidebar/panel editor.
2. **Output tetap deterministik & statis** — interaksi komponen di hasil export
   memakai **vanilla JavaScript kecil** di `js/main.js` (tanpa framework, tanpa
   dependency eksternal). Sesuai prinsip PRD utama: *tanpa runtime proprietary*.
   Bila interaksi memungkinkan murni CSS (checkbox hack, `<details>`, `:has()`),
   itu lebih disukai.

**Referensi utama komponen:** freefrontend.com — katalognya mencakup 11 keluarga
menu: **Circle, Horizontal, Dropdown, Mega Menu, Mobile, Sidebar, Fullscreen,
Off-canvas, Sliding, Toggle**, plus efek hover modern (ghost text, neon glow,
wobbly/snake underline, sliding pill, text-stroke). Batch ini mengadopsi keluarga
tersebut ke asset-comp (lihat §3.6), dengan gaya visual modern (lihat §2.3).

Dua keputusan produk utama batch ini:

- **Komponen per gaya terpisah** — daftar "Navbar" di panel Add berisi item
  terpisah (Navbar Glass, Navbar Mega Menu, Navbar Fullscreen, dst.), bukan satu
  komponen dengan dropdown gaya.
- **Pemisahan katalog Landing vs Dashboard** — saat membuat project, user memilih
  tipe project (Landing Page / Dashboard). Panel Add di builder hanya menampilkan
  komponen yang relevan dengan tipe tersebut.

---

## 2. Konsep Produk

### 2.1 Alur Pembuatan Project (baru)

```
/builder (halaman baru)
├── Kanvas Kosong — Landing Page      → projectType = "landing"
├── Kanvas Kosong — Dashboard         → projectType = "dashboard"
├── Template Landing (4 pilihan)
└── Template Dashboard (1 pilihan)
```

Setiap komponen di registry diberi field baru `scope`:

| Nilai `scope` | Arti | Contoh |
|---|---|---|
| `"landing"` | Hanya muncul di project Landing | navbar-mega, pricing-table |
| `"dashboard"` | Hanya muncul di project Dashboard | dashboard-activity-list, app-sidebar |
| `"both"` | Muncul di keduanya | grid-container, modal-center, card-feature |

Panel Add (`LeftPanel.tsx`) memfilter `componentRegistry` dengan
`c.scope === "both" || c.scope === doc.projectType`.

### 2.2 Infrastruktur Registry (perubahan teknis wajib)

1. **`src/lib/registry/types.ts`**
   - `ComponentManifest` + field `scope: "landing" | "dashboard" | "both"`.
   - `ExportResult` + field `js?: string` (vanilla JS milik komponen).
2. **`src/lib/export/html.ts`**
   - Kumpulkan `js` dari semua komponen terpakai (dedup sama seperti CSS) →
     digabung ke `js/main.js`, sebelum handler statis yang sudah ada
     (nav mobile, dashboard nav, search, print).
3. **`src/lib/schema/defaults.ts`**
   - `createDefaultNode()` ditambah case untuk semua komponen baru.
4. **`src/app/builder/page.tsx`**
   - Kanvas Kosong dipecah jadi 2 kartu (Landing / Dashboard).
   - Ditambah kartu untuk 4 template landing baru (total 7 kartu).

### 2.3 Gaya Visual Modern (Referensi: freefrontend.com)

Bahasa desain yang diadopsi ke semua komponen baru (diterjemahkan orisinal,
tidak menyalin kode referensi; semua warna/radius/font dari token tema `--bi-*`):

| Elemen gaya | Penerapan di asset-comp |
|---|---|
| **Glassmorphism** | `navbar-glass` (pill floating + `backdrop-filter: blur`), modal sheet, FAB |
| **Sliding indicator** | Navbar dengan indicator pill/underline yang bergeser mengikuti hover/active (CSS `:has()`/anchor positioning bila browser mendukung; fallback transition biasa) |
| **Staggered reveal** | Menu fullscreen & dropdown: item muncul berurutan via `transition-delay` CSS |
| **Elastic/easing halus** | Semua toggle memakai `transition` transform/opacity (compositor-only, tanpa reflow) |
| **Morphing hamburger** | Ikon hamburger → X dengan animasi line (FAB & navbar mobile) |
| **Circle/fan-out menu** | `menu-circle` — item menyebar melingkar via checkbox hack (CSS-only) |
| **Ghost text / neon glow / wobbly underline / text-stroke** | Efek hover pada tautan navbar (pilihan `styleControls` — lihat §3.6) |
| **Dark & light** | Semua komponen pakai token `--bi-*` sehingga otomatis ikut tema project |
| **Custom scrollbar** | Sidebar/panel scrollable memakai scrollbar tipis (CSS) |
| **Off-canvas drawer** | `menu-offcanvas` — panel geser dari kiri/kanan + overlay |

Prinsip animasi: hanya `transform`/`opacity` (hardware-accelerated), jangan
menganimasikan `width`/`height`/`margin` (menghindari reflow).

---

## 3. Daftar Komponen Baru (20 komponen)

Semua komponen wajib punya 4 file di `src/asset-comp/components/<id>/`:
`manifest.ts` · `index.ts` · `preview.tsx` · `export.ts`, plus:
- Pakai token tema `--bi-*` (bukan warna hardcode).
- Responsive: grid → 1 kolom di mobile, navbar → hamburger di mobile.
- `contentControls` lengkap agar semua teks bisa diedit di Inspector.
- Preview interaktif memakai React state (Radix tersedia).
- Export memakai vanilla JS kecil (bila perlu interaksi).

### 3.1 Navigasi — Navbar (kategori `navbar`, scope `landing`)

| # | ID | Nama | Deskripsi | Props utama | Interaksi | Inspirasi |
|---|---|---|---|---|---|---|
| 1 | `navbar-glass` | Navbar Glass | Pill floating di tengah, sticky, backdrop-blur glassmorphism | logoText, link1–3Text/Url, ctaText/Url | Desktop: hover link. Mobile: hamburger → panel dropdown di bawah navbar | Glassmorphic Advanced Navigation System |
| 2 | `navbar-mega` | Navbar Mega Menu | Navbar dengan mega menu multi-kolom (judul kategori + daftar tautan) | logoText, columnsJson `[{heading, links:[{label,url}]}]`, ctaText/Url | Desktop: klik/hover tombol → panel mega menu. Mobile: hamburger → fullscreen list | Mega Dropdown Navigation (Arby) |
| 3 | `navbar-fullscreen` | Navbar Fullscreen | Hamburger → overlay fullscreen dengan staggered reveal teks | logoText, linksJson `[{label,url}]`, ctaText/Url | Klik hamburger → overlay fullscreen (JS toggle class); stagger via transition-delay CSS | Split-Screen Staggered / Fullscreen Overlay Nav |
| 4 | `navbar-centered` | Navbar Centered | Logo di tengah atas, nav di bawahnya, CTA kanan | logoText, link1–4Text/Url, ctaText/Url | Sama pola navbar-minimal | ThemeWagon: furni, kaira |
| 5 | `navbar-split` | Navbar Split | Logo kiri, menu kanan + CTA, garis bawah tipis | logoText, link1–3Text/Url, ctaText/Url | Sama pola navbar-minimal | ThemeWagon: nexusai, monoline |
| 6 | `dropdown-menu` | Dropdown Menu | Tombol + dropdown list tautan (bisa berdiri sendiri di section mana pun) | buttonText, itemsJson `[{label,url}]`, align `"left"\|"right"` | Klik tombol → dropdown; tutup saat klik luar / Esc | Emerging Dropdown, Futuristic Dropdown |

### 3.2 Modal (kategori `content`, scope `both`)

| # | ID | Nama | Deskripsi | Props utama | Interaksi | Inspirasi |
|---|---|---|---|---|---|---|
| 7 | `modal-center` | Modal Dialog | Container: tombol trigger → dialog tengah (overlay gelap, rounded, close) | triggerText, title, description, closeText; **children** sebagai isi | JS `data-modal-open/close`, klik overlay & Esc menutup. Preview: Radix Dialog | Radix Dialog / pola modern dialog |
| 8 | `modal-sheet` | Modal Sheet | Trigger → panel dari bawah (mobile) / samping kanan (desktop) | triggerText, title; **children** sebagai isi | JS toggle class; preview: React state | Bottom sheet mobile (Kaira/CozaStore mobile) |
| 9 | `modal-confirm` | Modal Konfirmasi | Icon + judul + deskripsi + 2 tombol (bukan container) | icon (pilihan), title, description, confirmText, cancelText | JS toggle; preview: React state | Pattern confirm dialog modern |

**Catatan:** Modal menyimpan **children** (render recursive, pola `grid-container`
yang sudah ada) → user bisa taruh form-contact di dalam modal-center.

### 3.3 Konten & Kartu (kategori `content`, scope `landing` — `card-feature` & `stats-banner` `both`)

| # | ID | Nama | Deskripsi | Props utama | Inspirasi |
|---|---|---|---|---|---|
| 10 | `card-feature` | Kartu Fitur | Satu kartu: ikon + judul + deskripsi + tautan. Dipasang ber-3 dengan grid-container | icon (select dari ~12 ikon lucide), title, description, linkText/Url | ThemeWagon: NexusAI, DataNova, Monoline |
| 11 | `pricing-table` | Tabel Harga | 3 kolom plan harga, satu bisa ditandai "populer" | plan1–3: name, price, period, featuresJson, highlighted; ctaText/Url | ThemeWagon: NexusAI, Monoline |
| 12 | `testimonial-grid` | Testimoni | Grid quote: avatar inisial + nama + peran + kutipan | itemsJson `[{quote,name,role,initials}]`, columns `"1\|2\|3"` | ThemeWagon: semua template bisnis |
| 13 | `team-grid` | Tim | Grid anggota: avatar inisial + nama + peran + sosial | itemsJson `[{name,role,initials,socials}]` | ThemeWagon: furni, eduweb |
| 14 | `stats-banner` | Angka Statistik | Banner 3–4 angka besar + label (dibungkus section berwarna) | stat1–4: value, label, suffix; sectionBg | ThemeWagon fun-fact counters |
| 15 | `gallery-grid` | Galeri | Grid gambar (URL opsional; fallback gradien + inisial) dengan hover zoom | imagesJson `[{url,alt}]`, columns `"2\|3\|4"` | ThemeWagon: Brivon (photography), Clark |
| 16 | `faq-accordion` | FAQ Akordeon | Daftar tanya-jawab, buka-tutup per item | itemsJson `[{question,answer}]` | ThemeWagon: semua template (FAQ Section) |

**Catatan:** `faq-accordion` memakai elemen `<details>/<summary>` native →
buka-tutup **tanpa JavaScript sama sekali** di export (paling deterministik).

### 3.4 Form (kategori `form`, scope `landing`)

| # | ID | Nama | Deskripsi | Props utama | Interaksi |
|---|---|---|---|---|---|
| 17 | `form-contact` | Form Kontak | Nama + email + pesan + tombol kirim | heading, subheading, buttonText, note | Validasi ringan (required) + pesan sukses statis via JS vanilla (simulasi kirim) |
| 18 | `form-newsletter` | Form Newsletter | Input email + tombol subscribe, tampil horizontal | heading, placeholder, buttonText | Sukses state via JS vanilla (untuk footer ecommerce) |

### 3.5 Dashboard (kategori `dashboard`, scope `dashboard`)

| # | ID | Nama | Deskripsi | Props utama | Inspirasi |
|---|---|---|---|---|---|
| 19 | `dashboard-activity-list` | List Aktivitas | List item: avatar inisial + judul + deskripsi + waktu + badge status | itemsJson `[{initials,title,description,time,status}]`, status `"success\|pending\|warning"` | ThemeWagon: Mazer, DASHMIN, Sneat |
| 20 | `sidebar-icon` | Sidebar Icon | Sidebar ikon-only yang bisa di-expand (collapsible) | logoText, linksJson `[{icon,label,url}]`, defaultOpen | CSS Var Only Sidebar Toggle, Side Nav with Icons |

### 3.6 Keluarga Menu ala FreeFrontend (kategori `navigation`)

Keluarga menu ini memetakan katalog freefrontend.com ke asset-comp. Prioritas:
**P0** = wajib batch ini · **P1** = wajib batch ini (showcase) · **P2** = cadangan,
dikerjakan setelah semua P0/P1 selesai (disiplin anti scope-creep).

| # | ID | Nama | Keluarga freefrontend | Deskripsi | Interaksi | Prioritas |
|---|---|---|---|---|---|---|
| 21 | `menu-offcanvas` | Menu Off-canvas | Off-canvas Menus | Panel geser dari kiri/kanan (drawer) berisi tautan + overlay; bisa dipakai sebagai menu utama landing | Tombol toggle → drawer slide-in (JS kelas toggle + overlay klik untuk tutup) | **P0** |
| 22 | `menu-circle` | Menu Circle (Fan-out) | Circle Menus | Hamburger morphing → item menu menyebar melingkar/fan-out di sekitar tombol | Checkbox hack CSS-only (tanpa JS di export); preview pakai React state | **P1** |
| 23 | `menu-radial` | Menu Radial Dial | Circle Menus | Menu aksi sekunder berbentuk dial melingkar (ikon + label) | Checkbox/`@property` CSS; fallback JS kecil bila perlu | P2 |
| 24 | `menu-dock` | Dock (macOS) | Horizontal Menus | Dock ikon yang membesar saat hover (magnify) | CSS `:hover`/`:has()`; tanpa JS | P2 |
| 25 | `nav-mega` (alias) | — | — | *Sudah terwakili oleh `navbar-mega` (§3.1 no.2)* | — | — |
| 26 | `nav-toggle` (alias) | Toggle Menus | — | *Sudah terwakili oleh `menu-circle` + morphing hamburger di navbar* | — | — |

**Efek hover navbar (opsional, via `styleControls` select di komponen navbar):**

| Nilai `hoverEffect` | Deskripsi | Implementasi |
|---|---|---|
| `underline` (default) | Garis bawah halus saat hover | `::after` scaleX transition |
| `wobbly` | Garis bawah "ular" yang mengisi dari satu sisi | SVG path `stroke-dashoffset` animation |
| `ghost` | Teks ganda membayang vertikal saat hover | Stack `text-shadow` (animasi) |
| `neon` | Glow menyala di ikon/teks | `filter: drop-shadow` + `--clr` |
| `pill` | Indicator pill yang bergeser mengikuti item (desktop) | CSS `:has()` + transform; fallback: pill statis di item active |
| `stroke` | Outline teks (text-stroke) pada hover, menu besar | `-webkit-text-stroke` |

**Catatan:** `menu-offcanvas` (P0) dan `menu-circle` (P1) masuk batch ini;
`menu-radial` & `menu-dock` (P2) dicatat di PRD sebagai cadangan — tidak
dikerjakan dulu agar tidak melebar dari target batch (sesuai disiplin §7 PRD utama).

---

## 4. Komponen Existing yang Dimodernisasi (polish, tanpa ubah arsitektur)

| ID | Upgrade |
|---|---|
| `navbar-minimal` | Hover underline smooth, spacing modern, mobile sheet lebih rapi |
| `hero-centered` | Badge pill modern, spacing section lebih lapang |
| `footer-basic` | Multi-kolom modern (brand + tautan + kontak), sosial icon |
| `product-grid-basic` | Card hover lift + shadow, badge harga modern |
| `cta-basic` | Layout modern: judul besar + tombol, background tint |
| `kpi-card`, `chart-card`, `data-table`, `app-sidebar`, `dashboard-header` | Hanya polish kecil bila diperlukan (sudah modern) |

---

## 5. Template Baru (4 template landing)

Registrasi di `src/templates/index.ts` (field `category: "landing"`).
Setiap template satu file baru di `src/templates/landing/`:

### 5.1 `landing-portfolio` — Portofolio Kreatif
**File:** `src/templates/landing/portfolio.ts`

| # | Section | Komponen | Keterangan |
|---|---|---|---|
| 1 | Navigasi | `navbar-fullscreen` | Hamburger → fullscreen menu, kesan editorial |
| 2 | Hero | `hero-centered` | Judul besar, badge, CTA |
| 3 | Galeri | `gallery-grid` | Grid 3 kolom karya |
| 4 | Tentang | `about-basic` | Profil singkat |
| 5 | Testimoni | `testimonial-grid` | 3 kolom |
| 6 | CTA | `cta-basic` | Ajakan kolaborasi |
| 7 | Footer | `footer-basic` | — |

**Gaya:** dark theme, tipografi besar (inspirasi: Brivon, Clark).

### 5.2 `landing-startup` — Startup / SaaS Landing
**File:** `src/templates/landing/startup.ts`

| # | Section | Komponen | Keterangan |
|---|---|---|---|
| 1 | Navigasi | `navbar-glass` | Pill floating glass |
| 2 | Hero | `hero-centered` | Value proposition |
| 3 | Fitur | `grid-container` (3) + `card-feature` ×3 | Ikon + judul + teks |
| 4 | Statistik | `stats-banner` | 4 angka |
| 5 | Harga | `pricing-table` | 3 plan, 1 populer |
| 6 | Testimoni | `testimonial-grid` | 3 kolom |
| 7 | FAQ | `faq-accordion` | 4–5 pertanyaan |
| 8 | CTA | `cta-basic` | — |
| 9 | Footer | `footer-basic` | — |

**Gaya:** inspirasi: NexusAI, DataNova.

### 5.3 `landing-fashion` — eCommerce Fashion
**File:** `src/templates/landing/fashion.ts`

| # | Section | Komponen | Keterangan |
|---|---|---|---|
| 1 | Navigasi | `navbar-split` | Logo kiri, menu kanan |
| 2 | Hero | `hero-centered` | Koleksi musim ini |
| 3 | Katalog | `product-grid-basic` | 4 produk |
| 4 | Promo | `cta-basic` | Strip promo diskon |
| 5 | Galeri | `gallery-grid` | Lookbook |
| 6 | Testimoni | `testimonial-grid` | 3 kolom |
| 7 | Newsletter | `form-newsletter` | Di atas footer |
| 8 | Footer | `footer-basic` | — |

**Gaya:** inspirasi: Kaira, Electro.

### 5.4 `landing-company` — Company Profile
**File:** `src/templates/landing/company.ts`

| # | Section | Komponen | Keterangan |
|---|---|---|---|
| 1 | Navigasi | `navbar-centered` | Logo tengah |
| 2 | Hero | `hero-centered` | Company tagline |
| 3 | Statistik | `stats-banner` | 4 angka pencapaian |
| 4 | Layanan | `grid-container` (3) + `card-feature` ×3 | Jasa layanan |
| 5 | Tim | `team-grid` | 4 anggota |
| 6 | Testimoni | `testimonial-grid` | 3 kolom |
| 7 | CTA | `cta-basic` | Ajakan konsultasi |
| 8 | Footer | `footer-basic` | — |

**Gaya:** inspirasi: Furni, Monoline.

### 5.5 Dashboard (tetap 1)
`dashboard-analytics` tetap; opsional diupgrade dengan
`dashboard-activity-list` menggantikan/melengkapi section aktivitas proyek.

---

## 6. Ringkasan Angka

| Item | Sebelum | Sesudah |
|---|---|---|
| Komponen registry | 12 | **34** (12 existing + 22 baru) |
| — di antaranya keluarga menu ala freefrontend | — | 4 keluarga terwakili: Mega (`navbar-mega`), Fullscreen (`navbar-fullscreen`), Off-canvas (`menu-offcanvas`), Circle (`menu-circle`) |
| Template landing | 2 | **6** (+4) |
| Template dashboard | 1 | 1 |
| Kategori komponen dipakai | navbar, hero, product, about, cta, footer, dashboard, layout | + form, content, navigation, data |
| File komponen baru | — | 22 × 4 file = 88 file |
| File template baru | — | 4 file + 1 update registry |
| Cadangan (P2, tidak dikerjakan batch ini) | — | `menu-radial`, `menu-dock` |

**Catatan:** `navbar-mega` = keluarga Mega Menu, `navbar-fullscreen` = keluarga
Fullscreen, `menu-offcanvas` = keluarga Off-canvas, `menu-circle` = keluarga
Circle → 4 dari 11 keluarga freefrontend masuk batch ini (horizontal, dropdown,
sidebar, mobile, sliding, toggle terwakili oleh navbar varian, dropdown-menu,
sidebar-icon, morphing hamburger, dan efek hover §3.6).

---

## 7. Urutan Pengerjaan

```
Fase 1 — Infrastruktur
  1.1 types.ts: scope + ExportResult.js
  1.2 html.ts: koleksi JS komponen → main.js
  1.3 defaults.ts: createDefaultNode untuk 20 komponen baru
  1.4 builder/page.tsx: blank Landing / blank Dashboard + 4 kartu template baru
  1.5 LeftPanel.tsx: filter katalog berdasarkan projectType

Fase 2 — Komponen dasar (enabler template)
  2.1 card-feature, stats-banner, pricing-table, testimonial-grid,
      team-grid, gallery-grid, faq-accordion, form-contact, form-newsletter
  2.2 upgrade polish: navbar-minimal, hero-centered, footer-basic,
      product-grid-basic, cta-basic

Fase 3 — Navigasi & modal
  3.1 navbar-glass, navbar-centered, navbar-split
  3.2 navbar-mega, navbar-fullscreen, dropdown-menu
  3.3 modal-center, modal-sheet, modal-confirm
  3.4 menu-offcanvas, menu-circle + efek hover navbar (styleControls)

Fase 4 — Dashboard
  4.1 dashboard-activity-list, sidebar-icon

Fase 5 — Template
  5.1 landing/portfolio.ts, landing/startup.ts,
      landing/fashion.ts, landing/company.ts
  5.2 templateRegistry + kartu /builder

Fase 6 — Verifikasi & rilis
  6.1 npx tsc --noEmit, npm run lint, npm run build
  6.2 Test export tiap komponen baru (ZIP valid, JS handler jalan)
  6.3 Test 4 template: render, preview 3 breakpoint, export
  6.4 Update PRD utama (angka komponen/template)
```

---

## 8. Kriteria Penerimaan (Definition of Done per Komponen Baru)

Setiap komponen baru dianggap selesai bila:

- [ ] Muncul di panel Add hanya pada tipe project yang sesuai (`scope`)
- [ ] Punya manifest lengkap: id, name, category, tier, priceKey, version,
      defaultProps, contentControls (semua teks bisa diedit di Inspector)
- [ ] Terdaftar di `createDefaultNode()` (defaults.ts) — bisa ditambah dari
      command palette & panel Add tanpa error
- [ ] Preview renderer bekerja di canvas + preview page (desktop/tablet/mobile)
- [ ] Export adapter menghasilkan HTML + CSS valid; JS vanilla (bila perlu)
      ter-append ke `js/main.js` dan berfungsi di file statis murni; interaksi
      murni CSS (checkbox hack, `:has()`, `<details>`) diutamakan tanpa JS
- [ ] Responsive: grid → 1 kolom di mobile; navbar → hamburger di mobile
- [ ] Pakai token tema `--bi-*`; deterministik (input sama → output sama)
- [ ] Tidak ada dependency eksternal/framework di hasil export
- [ ] `npm run lint` & `npx tsc --noEmit` hijau

## 9. Kriteria Penerimaan Template Baru

- [ ] Terdaftar di `templateRegistry` dengan category yang benar
- [ ] Muncul sebagai kartu di `/builder` dengan deskripsi jelas
- [ ] Semua section yang dipakai komponennya sudah ada di registry (tidak
      boleh referensi komponen yang belum dibuat)
- [ ] Preview halaman (canvas + `/builder/[id]/preview`) rapi di 3 breakpoint
- [ ] Export ZIP berhasil; HTML langsung jalan tanpa build step
- [ ] Konten default realistis & berbahasa Indonesia

---

## 10. Risiko & Mitigasi

| Risiko | Mitigasi |
|---|---|
| Volume besar (20 komponen) → kualitas menurun | Fase berurutan; setiap fase diverifikasi lint+tsc sebelum lanjut |
| JS vanilla per komponen bisa bentrok | Semua handler memakai event delegation + atribut `data-*` khusus per komponen (`data-modal-*`, `data-dropdown-*`); tidak ada global selector generik |
| Modal container (children) rumit | Replikasi pola `grid-container` yang sudah terbukti (render children recursive + kumpul CSS) |
| Template rusak karena komponen belum ada | Urutan pengerjaan menjamin komponen selesai sebelum template yang memakainya |
| Preview interaktif vs export berbeda perilaku | Pola seragam: preview = React state; export = vanilla JS dengan perilaku setara |

---

## 11. Struktur Folder Final

```
src/
├── asset-comp/                          # ← KOMPONEN (semua di sini)
│   └── components/
│       ├── navbar-minimal/              # existing
│       ├── navbar-glass/                # baru
│       ├── navbar-mega/                 # baru
│       ├── navbar-fullscreen/           # baru
│       ├── navbar-centered/             # baru
│       ├── navbar-split/                # baru
│       ├── dropdown-menu/               # baru
│       ├── menu-offcanvas/              # baru (P0)
│       ├── menu-circle/                 # baru (P1)
│       ├── modal-center/                # baru
│       ├── modal-sheet/                 # baru
│       ├── modal-confirm/               # baru
│       ├── card-feature/                # baru
│       ├── pricing-table/               # baru
│       ├── testimonial-grid/            # baru
│       ├── team-grid/                   # baru
│       ├── stats-banner/                # baru
│       ├── gallery-grid/                # baru
│       ├── faq-accordion/               # baru
│       ├── form-contact/                # baru
│       ├── form-newsletter/             # baru
│       ├── dashboard-activity-list/     # baru
│       ├── sidebar-icon/                # baru
│       └── ... (existing: hero, product, about, cta, footer,
│               app-sidebar, dashboard-header, kpi, chart, table, grid)
└── templates/                           # ← TEMPLATE (folder terpisah)
    ├── index.ts                         # registry template
    ├── landing/
    │   ├── saas.ts                      # existing
    │   ├── storefront.ts                # existing
    │   ├── portfolio.ts                 # baru
    │   ├── startup.ts                   # baru
    │   ├── fashion.ts                   # baru
    │   └── company.ts                   # baru
    └── dashboard/
        └── analytics.ts                 # existing
```