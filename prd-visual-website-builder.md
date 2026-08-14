# PRD — [Nama Produk: TBD]
## Visual Website Builder & Source Code Generator

| | |
|---|---|
| **Dokumen** | Product Requirements Document (PRD) v1.1 |
| **Tanggal** | 14 Agustus 2026 |
| **Tipe produk** | Visual website builder + source-code generator |
| **Target awal** | UMKM, freelancer, organisasi, personal brand, small business |
| **Model bisnis** | Design gratis → bayar saat export → download full source code |
| **Stack awal** | Next.js + TypeScript + Tailwind CSS + Supabase + Vercel |
| **Export target V1** | HTML/CSS/JS statis & React/Vite |
| **Export target masa depan** | Next.js, Fullstack Next.js + Supabase |

---

## Daftar Isi

1. Ringkasan Eksekutif
2. Masalah & Peluang
3. Visi & Positioning Produk
4. Target Pengguna & Persona
5. Analisis Kompetitor & Diferensiasi
6. Keunggulan Produk
7. Kekurangan & Risiko yang Harus Dipantau
8. Prinsip Inti Produk
9. Jenis Pengguna & Hak Akses
10. Alur Pengguna Utama
11. Ruang Lingkup V1 (In / Out of Scope)
12. Kebutuhan Fungsional
13. Arsitektur Teknis
14. Kebutuhan Non-Fungsional
15. Model Bisnis & Strategi Harga
16. Metrik & KPI
17. Roadmap Produk
18. Urutan Pengembangan (Build Order)
19. Kriteria Penerimaan V1
20. Definition of Done per Component
21. Model Support & Layanan Tambahan
22. Lampiran

---

## 1. Ringkasan Eksekutif

Produk ini adalah **visual website builder** — user drag-and-drop untuk mendesain website mereka sendiri, gratis, tanpa batas waktu. Yang membedakan dari kompetitor: **pembayaran hanya terjadi saat user memutuskan untuk export**, dan yang mereka beli bukan langganan hosting, tapi **source code asli** (HTML/CSS/JS atau React/Vite) yang bisa mereka bawa ke mana saja — hosting sendiri, developer sendiri, tanpa ketergantungan ke platform ini selamanya.

Statement produk:

> **Design visually → Export HTML or React → Own the source.**

V1 sengaja dibuat sempit: satu halaman (single-page) — landing page dan dashboard —, tiga template awal (2 landing + 1 dashboard), 12 komponen inti, export target HTML (React menyusul). Tujuannya membuktikan satu loop inti bekerja end-to-end sebelum menambah kompleksitas:

```
DESIGN → PREVIEW → PAY → EXPORT → OWN
```

Dokumen ini menerjemahkan konsep awal (Master Plan) menjadi PRD yang bisa langsung dipakai untuk eksekusi: siapa penggunanya, kenapa mereka akan bayar, bagaimana sistem bekerja secara teknis, apa yang membedakan dari pemain lain di pasar, dan risiko apa yang harus terus dipantau supaya asumsi bisnisnya tidak meleset.

---

## 2. Masalah & Peluang

**Masalah yang dialami target user (UMKM, freelancer, personal brand):**

- Website builder mainstream (Wix, Squarespace, kebanyakan builder lokal) mengunci mereka ke **subscription bulanan seumur hidup website itu ada** — begitu berhenti bayar, website hilang.
- Builder yang lebih "profesional" (Framer) bahkan **tidak menyediakan export code sama sekali** — situs sepenuhnya hidup di infrastruktur vendor.
- Builder yang menyediakan export code (Webflow) biasanya menaruh fitur itu di **paket termahal**, bukan opsi standar.
- Di sisi lain, tools AI code generator (v0, Bolt, Lovable) memang menghasilkan kode yang bisa dimiliki, tapi mengasumsikan user **paham development** — non-teknis tidak bisa memakainya untuk merancang layout secara visual dan terprediksi.
- Jasa custom development (freelancer/agency) mahal dan lambat untuk kebutuhan website sederhana.

**Peluang:** ada gap antara "builder yang mudah tapi mengunci" dan "tool yang bebas tapi butuh developer". Produk ini mengisi gap itu — mudah dipakai non-teknis, tapi hasil akhirnya adalah aset yang benar-benar mereka miliki.

---

## 3. Visi & Positioning Produk

Produk ini **bukan** hosting platform seperti Wix atau Framer. Produk ini adalah:

> Visual website builder yang memungkinkan user mendesain website sendiri, lalu membeli dan mengunduh source code lengkapnya.

Setelah export, **website itu sepenuhnya milik customer** — termasuk source code, assets, dependencies/config, README, deployment guide, dan license/manifest.

Positioning statement:

> **Design it. Export it. Own it.**

### Prinsip Inti Produk

| Prinsip | Artinya |
|---|---|
| **Design First** | User bebas coba builder tanpa bayar di depan. |
| **Pay on Export** | Pembayaran baru diminta saat user mau ambil source code. |
| **No Lock-In** | Tidak wajib pakai hosting, database, domain, atau subscription bulanan dari kita. |
| **Real Source Code** | Bukan format proprietary — project yang benar-benar bisa dibuka developer lain. |
| **Responsive by Default** | Desain sekali, otomatis punya layout desktop/tablet/mobile. |
| **Structured Freedom** | Drag & drop bebas, tapi sistem menjaga struktur responsive (bukan canvas graphic-design bebas). |
| **Deterministic Generation** | Generator tidak pakai AI untuk membuat source code. Input + template yang sama = output yang predictable. |

---

## 4. Target Pengguna & Persona

| Persona | Kebutuhan | Kenapa produk ini cocok |
|---|---|---|
| **UMKM/toko kecil** | Website profil/produk sederhana, budget terbatas, tidak mau komitmen bulanan | Desain gratis, bayar sekali saat export, tidak ada biaya hosting berkelanjutan yang wajib |
| **Freelancer/personal brand** | Portfolio/landing page cepat, mungkin akan sering revisi sebelum publish | Preview & desain unlimited sebelum bayar, harga transparan sebelum checkout |
| **Agency/developer kecil** | Perlu starting point yang bisa dikustom lebih lanjut untuk klien | Export React yang readable & editable, bukan black-box |
| **Organisasi/komunitas** | Website informasi dasar, tidak punya tim teknis tetap | HTML export bisa langsung dihosting statis di mana saja tanpa maintenance rumit |

---

## 5. Analisis Kompetitor & Diferensiasi

Lanskap kompetitor bisa dibagi jadi tiga kelompok, dan produk ini secara sengaja diposisikan di celah antara mereka.

### Kelompok 1 — Website builder mainstream (Wix, Framer, Webflow, Squarespace)

- **Framer**: sangat kuat di desain visual ala-Figma dan animasi, tapi **tidak punya fitur export code sama sekali** — situs selalu hidup di infrastruktur Framer. Satu-satunya cara "keluar" adalah tools pihak ketiga tidak resmi yang sering pecah (hilang animasi, asset masih nempel ke CDN Framer, dsb).
- **Webflow**: menyediakan export HTML/CSS/JS statis, tapi **hanya di paket Workspace yang lebih mahal**, dan kurva belajarnya panjang (Webflow University sendiri estimasi 2–4 minggu untuk terbiasa dengan CSS box model-nya).
- **Wix**: sangat mudah dipakai non-teknis, tapi **wajib hosting di Wix selamanya** — tidak ada jalur keluar dengan source code.

### Kelompok 2 — AI code generator ("vibe coding": v0 by Vercel, Bolt.new, Lovable)

- Ketiganya bisa menghasilkan kode yang **bisa di-export/di-sync ke GitHub** — jadi soal ownership kode, mereka sudah unggul.
- Tapi cara kerjanya **prompt/chat-based**, bukan drag-and-drop visual terstruktur — sulit dipakai orang yang ingin mengatur layout persis seperti yang mereka bayangkan tanpa menulis prompt berulang-ulang.
- Model harga berbasis **kredit/token yang bisa boros dan sulit diprediksi** — beberapa laporan pengguna menyebut biaya bisa membengkak signifikan di project yang lebih kompleks, dan kualitas AI bisa menurun begitu jumlah komponen dalam satu project makin banyak.
- v0 relatif terikat ke ekosistem Vercel/Next.js; ketiganya berorientasi ke developer atau setidaknya orang yang nyaman berinteraksi dengan kode, bukan UMKM yang ingin "susun halaman lalu selesai".

### Kelompok 3 — Visual builder yang terintegrasi ke codebase (Plasmic, Onlook, WebStudio)

- Produk-produk ini memang punya filosofi anti-lock-in yang mirip (export React/HTML asli, tidak mengunci ke platform), tapi **target penggunanya adalah developer** yang sudah punya codebase dan mengintegrasikan visual editor ke dalamnya. Non-teknis tidak akan langsung bisa pakai.
- WebStudio (open-source) paling dekat secara filosofi (export gratis, tanpa lock-in), tapi lebih cocok untuk static site sederhana dan audiensnya condong ke developer yang sadar akan isu vendor lock-in.

### Tabel Perbandingan

| Dimensi | Framer | Webflow | Wix | v0 / Bolt / Lovable | Plasmic / Onlook / WebStudio | **[Produk Ini]** |
|---|---|---|---|---|---|---|
| Target user | Designer/marketing | Agency, CMS-heavy | UMKM non-teknis | Developer/"vibe coder" | Developer dgn codebase sendiri | UMKM non-teknis, TAPI mau punya kode |
| Cara desain | Visual ala-Figma | Visual + CSS box model (belajar lama) | Visual, sangat mudah | Chat/prompt, bukan drag-drop | Visual, perlu integrasi ke code | Visual drag & drop, canvas terstruktur |
| Bisa export source code? | ❌ Tidak bisa sama sekali | ✅ Hanya di plan mahal | ❌ Umumnya tidak bisa | ✅ Ya (fokus ke aplikasi, bukan hasil desain visual) | ✅ Ya, tapi asumsi user developer | ✅ Ya — ini core value proposition |
| Model harga | Subscription wajib | Subscription + add-on export | Subscription + hosting wajib | Kredit/token, sulit diprediksi | Subscription/open-source | **Gratis desain, bayar sekali saat export** |
| Wajib hosting platform? | Ya | Bisa lepas kalau bayar export | Ya | Cenderung terikat ekosistem tertentu | Tidak | **Tidak wajib — filosofi no lock-in** |
| Ramah non-programmer? | Ya | Sedang | Ya | Tidak | Tidak | **Ya**, dan tetap menghasilkan kode yang bisa diserahkan ke developer bila perlu |
| Prediktabilitas output kode | N/A | Cukup baik, kadang perlu rapi-kan manual | N/A | Bervariasi (AI bisa "ngaco" di project kompleks) | Baik | **Deterministic** — tidak pakai AI, input sama = output sama |

### Ringkasan Diferensiasi dalam Satu Kalimat

> Wix/Framer memberi kemudahan tapi mengunci; v0/Bolt/Lovable memberi kepemilikan kode tapi butuh keahlian teknis; Plasmic/Onlook memberi kepemilikan kode tapi butuh codebase sendiri. **Produk ini adalah satu-satunya yang menargetkan non-teknis DAN memberi kepemilikan source code, dengan model bayar-sekali-saat-export, bukan subscription.**

---

## 6. Keunggulan Produk

1. **No lock-in yang benar-benar berarti** — bukan sekadar klaim marketing. Setelah export, website tetap berjalan walau platform ini tutup sekalipun (lihat §12.7, requirement HTML export).
2. **Ekonomi pay-once vs subscription fatigue** — cocok untuk UMKM yang cashflow-nya tidak stabil; tidak ada biaya bulanan yang terus jalan walau website sudah "selesai" dan jarang diubah.
3. **Output predictable karena non-AI generator** — dibanding tools "vibe coding" yang bisa menghasilkan kode berbeda-beda tiap kali diminta ulang (dan kadang gagal build di project kompleks), generator berbasis component registry + template memberi hasil yang stabil dan bisa di-debug.
4. **Structured canvas** — user tetap bebas menyusun layout, tapi sistem menjaga agar hasilnya tetap responsive dan tidak berantakan di mobile — masalah umum di tool freeform/canvas-bebas.
5. **Dua export target sekaligus (HTML statis & React)** — HTML untuk yang benar-benar tidak ingin urusan teknis, React untuk yang ingin lanjut dikembangkan developer. Ini jangkauan pasar yang lebih luas dibanding kompetitor yang hanya punya satu jalur.
6. **Harga transparan berbasis unique component/module**, bukan per-instance atau kredit yang menguap — user tahu persis apa yang mereka bayar sebelum checkout, tidak ada "kejutan tagihan" seperti yang dikeluhkan pengguna tools berbasis token.
7. **Template & component versioning terpusat** — bug atau perbaikan cukup di-fix sekali di registry, tidak perlu tambal satu-satu di ratusan website customer yang sudah export.

---

## 7. Kekurangan & Risiko yang Harus Dipantau

Bagian ini eksplisit soal apa yang **belum tentu berhasil** dan harus terus diawasi, bukan cuma daftar risiko teknis generik.

### 7.1 Risiko Produk & Pasar

| Risiko | Kenapa penting | Yang perlu dipantau |
|---|---|---|
| **Scope creep** — tergoda jadi "Framer + Webflow + Wix + Figma + v0 sekaligus" | Ini adalah risiko #1 yang disebut eksplisit di konsep awal. Tim kecil yang mencoba menyamai semua fitur builder besar akan kehabisan napas sebelum satu loop inti (design→export→own) benar-benar solid | Disiplin roadmap: jangan buka fitur baru sebelum acceptance criteria V1 (§19) lulus semua |
| **Gap dukungan pasca-pembelian** | Target user non-teknis (UMKM) bisa saja bingung cara deploy source code setelah download — mereka mungkin tidak tahu apa itu `npm install` atau cara upload HTML ke hosting | README/DEPLOYMENT.md harus benar-benar dites oleh orang non-teknis, bukan cuma developer internal; pertimbangkan paket "Deployment Assistance" berbayar sejak awal (§21) |
| **Template/komponen awal masih sedikit (3 template, 12 komponen)** | Dibanding galeri template Wix yang jumlahnya ratusan, hasil desain awal bisa terasa terbatas dan generik, berisiko bikin user drop sebelum sempat bayar | Pantau rasio "project dibuat → mencapai preview" (Design Completion metric, §16); kalau rendah, ini sinyal kualitas/variasi komponen kurang, bukan cuma soal fitur |
| **Tekanan kompetitif dari AI code-gen yang berkembang cepat** | v0/Bolt/Lovable adalah kategori yang berubah sangat cepat; ada kemungkinan mereka menambah kanvas visual yang lebih terstruktur atau model harga yang lebih ramah non-teknis | Review lanskap kompetitor tiap kuartal, bukan cuma sekali di awal |
| **Trust gap sebagai brand baru** | User belum pernah lihat bukti bahwa "bayar sekali dapat kode yang benar-benar jalan" — ini klaim yang mudah diucapkan tapi perlu dibuktikan sebelum orang mau bayar | Pertimbangkan sampel output publik (mis. 1 contoh project + isi ZIP-nya bisa dilihat strukturnya, atau garansi/refund policy yang jelas) |

### 7.2 Risiko Teknis (dari analisis awal, tetap relevan)

| Risiko | Solusi yang direncanakan |
|---|---|
| Editor terlalu bebas → hasil desain rusak | Structured canvas (§10 di dokumen asli), bukan absolute positioning |
| Responsive hasil user rusak | Strong responsive defaults + override terbatas, bukan bebas custom breakpoint |
| Pricing Pro terlalu kompleks/tidak dipahami user | Unique component/module pricing + live estimate sebelum checkout (§15) — **tapi ini masih asumsi, wajib divalidasi lewat user testing**, bukan dianggap otomatis benar |
| Ratusan output punya ratusan bug berbeda | Deterministic component registry + versioned export adapter, di-tes lewat CI sebelum rilis (§18 Template Release Process) |
| Storage cepat penuh dari asset gratis (user belum tentu bayar) | Kompresi wajib, limit ukuran/dimensi gambar, tidak ada video, ZIP tidak disimpan permanen |
| Generated React gagal build (`npm run build` error) | Template wajib lolos CI test sebelum rilis; user content tidak boleh mengubah struktur kode inti |
| Scope infrastruktur terlalu besar sejak awal | V1 dikunci ke: single-page, HTML + React saja, structured canvas. Next.js/backend export ditunda ke V1.5/V2 |

### 7.3 Risiko Legal, Pembayaran & Infrastruktur (perlu perhatian khusus, sering terlewat)

- **Vercel Hobby plan untuk production.** Vercel menyatakan paket Hobby ditujukan untuk penggunaan personal/non-komersial. Begitu produk mulai menerima pembayaran sungguhan, infrastruktur harus dipindah ke plan yang sesuai untuk penggunaan komersial — ini bukan cuma preferensi teknis, tapi kepatuhan terhadap ketentuan layanan Vercel.
- **Verifikasi pembayaran server-side wajib.** "Payment success" dari browser tidak boleh dipercaya tanpa webhook + verifikasi server (§12.8) — kalau ini bocor, resiko orang export tanpa benar-benar bayar.
- **Kewajiban pajak barang digital.** Penjualan source code sebagai produk digital di Indonesia kemungkinan berdampak pada kewajiban PPN/pajak digital — ini bukan sesuatu yang bisa diasumsikan sendiri; sebaiknya dikonsultasikan ke akuntan/konsultan pajak sebelum go-live komersial, bukan disamakan dengan aturan negara lain.
- **Kebijakan refund untuk barang digital yang sudah diunduh.** Karena source code langsung bisa dipakai begitu diunduh, kebijakan "tidak bisa refund setelah download" perlu dinyatakan eksplisit di Terms of Service sebelum checkout, bukan diasumsikan customer paham sendiri.

*(Catatan: bagian ini bukan nasihat hukum atau pajak — hanya menandai area yang perlu dicek dengan profesional sebelum peluncuran komersial.)*

---

## 8. Jenis Pengguna & Hak Akses

| | Guest | Registered User | Admin |
|---|---|---|---|
| Lihat landing page & template | ✅ | ✅ | ✅ |
| Coba demo builder | ✅ | ✅ | ✅ |
| Save project permanen | ❌ | ✅ | ✅ |
| Upload asset | ❌ | ✅ | ✅ |
| Pakai komponen Free | ❌ | ✅ | ✅ |
| Preview komponen Pro (belum bayar) | ❌ | ✅ | ✅ |
| Checkout & export | ❌ | ✅ | ✅ |
| Kelola component/template/pricing | ❌ | ❌ | ✅ |
| Kelola user & payment | ❌ | ❌ | ✅ |
| Inspeksi export gagal | ❌ | ❌ | ✅ |

---

## 9. Alur Pengguna Utama

```
LANDING PAGE
   ↓
CREATE WEBSITE
   ↓
LOGIN / REGISTER
   ↓
CREATE PROJECT → pilih Blank Canvas atau Template
   ↓
VISUAL BUILDER (drag & drop, content, image, theme, responsive)
   ↓
PREVIEW
   ↓
EXPORT → pilih target (HTML / React)
   ↓
PRICE CALCULATION (live estimate)
   ↓
CHECKOUT → PAYMENT
   ↓
GENERATE SOURCE → BUILD ZIP → DOWNLOAD
```

---

## 10. Ruang Lingkup V1 (In / Out of Scope)

### Masuk Scope V1

Visual canvas · drag & drop · component library · section library · theme system (token-based) · responsive system (desktop/tablet/mobile) · content editing · image upload · komponen Free/Pro · live price calculation · preview · save project · undo/redo · export HTML · export React · ZIP source code · README otomatis · payment flow · admin component management.

### Eksplisit DI LUAR Scope V1 (jangan dikerjakan dulu)

- Freeform/absolute positioning ala Figma
- Realtime collaboration / multiplayer editor
- Custom CSS editor / custom JavaScript user
- Custom React component milik user
- Animation timeline editor
- Custom breakpoint
- AI code generation (generator inti tetap non-AI)
- Hosting website customer, custom domain hosting
- Export ke backend/CMS, Next.js export, Supabase export
- Online store checkout / payment system di website hasil export
- Marketplace template, plugin ecosystem
- Version-control Git UI

Semua ini dipertimbangkan **setelah** editor V1 stabil (lihat Roadmap §17).

---

## 11. Kebutuhan Fungsional

### 11.1 Editor Canvas & Struktur

Struktur wajib berlapis (bukan X/Y bebas):

```
PAGE → SECTION → CONTAINER → LAYOUT (Stack/Row/Grid/Columns) → ELEMENT
```

Contoh:

```
Hero
└── Container
    └── Columns
        ├── Stack (Heading, Text, Button)
        └── Image
```

Keuntungan struktur ini: responsive lebih mudah dijaga, kode hasil export lebih bersih, layout tidak mudah rusak, komponen bisa dipakai ulang.

**Layout editor (desktop):**

```
┌──────────────────────────────────────────────────────────┐
│ Logo  Project Name  Undo Redo  Device  Preview  Export    │
├────────────┬─────────────────────────────┬────────────────┤
│ LEFT PANEL │            CANVAS            │ RIGHT PANEL    │
│ Add        │                              │ Content        │
│ Layers     │                              │ Layout         │
│ Pages      │                              │ Style          │
│ Assets     │                              │ Responsive     │
├────────────┴─────────────────────────────┴────────────────┤
│                Save Status / Project Info                  │
└──────────────────────────────────────────────────────────┘
```

### 11.2 Drag & Drop

- Drag komponen dari sidebar ke canvas, reorder section/child element, pindah antar container yang kompatibel, duplicate, delete.
- Kandidat implementasi React: **dnd-kit** (drag, drop, sorting, sensors, terintegrasi baik dengan React).
- Setiap komponen punya `allowedParents` dan `allowedChildren` — mis. `Heading` boleh masuk `Stack`/`Grid Item`, tidak boleh langsung masuk `Image`; `Section` hanya boleh di page root.

### 11.3 Component Registry & Tier

Semua komponen terdaftar terpusat dengan manifest, contoh field: `id`, `name`, `category`, `tier`, `priceKey`, `defaultProps`, `defaultStyles`, `allowedParents`, `allowedChildren`, `styleControls`, `contentControls`, `responsiveDefaults`, `supportedExportTargets`, `previewRenderer`, `exportAdapter`.

**Free tier (contoh):** Navbar Minimal, Hero Centered/Split/Product, Product Grid Basic, About Basic, FAQ Basic, Contact Basic, Footer Basic.

**Pro tier (contoh):** Hero Editorial, Advanced Navigation, Bento Feature Grid, Advanced Product Showcase, Marquee, Animated Testimonials, Advanced Gallery, Premium CTA, Advanced Pricing, Special Footer.

User **boleh pakai Pro di canvas tanpa bayar** — pembayaran hanya saat export. Preview renderer dan export adapter dipisah secara arsitektur (§13), jadi sebelum bayar user hanya dapat *visual preview*, bukan source code komponen Pro.

### 11.4 Theme System

Token-based, bukan styling manual per komponen. Token global: `background`, `foreground`, `primary`, `primaryForeground`, `secondary`, `muted`, `border`, `radius`, `fontHeading`, `fontBody`, `spacingScale`, `shadowStyle`.

Preset: **Color** (Neutral/Slate/Warm/Blue/Indigo/Green/Orange/Custom), **Style** (Minimal/Soft/Sharp/Bold/Editorial), **Radius** (None–XL), **Typography** (Modern/Geometric/Humanist/Editorial/Technical — hanya font yang boleh didistribusikan di output project), **Density** (Compact/Balanced/Spacious).

Override lokal tetap memungkinkan: `Final Style = Global Token + Local Override`.

### 11.5 Sistem Responsive (P0 — fitur inti, bukan tambahan)

- Tiga breakpoint konseptual: Desktop, Tablet, Mobile. Tidak ada custom breakpoint di V1.
- Rule utama: **auto responsive dulu, manual override kedua.**
- Penyimpanan style: `styles.base`, `styles.tabletOverride`, `styles.mobileOverride` — bukan tiga website terpisah.
- Contoh default: Hero Split (2 kolom desktop → 2 kolom gap kecil tablet → 1 kolom mobile), Product Grid (4 → 2 → 1 kolom), Navbar (nav links desktop → menu trigger mobile).

### 11.6 Right Style Inspector

Tab: **Content** (text/image/link/icon/alt text), **Layout** (display/direction/columns/gap/width/alignment/padding/margin), **Style** (color/background/border/radius/shadow/typography/opacity), **Responsive** (override per breakpoint).

### 11.7 Undo/Redo & Autosave

- Undo/redo minimal mendukung: add, remove, move, style, content, duplicate, theme changes. History disimpan di browser selama sesi saja (tidak perlu ke database di V1).
- Autosave: `edit → debounce → save ProjectDocument → Supabase`. Jangan write database tiap keystroke.

### 11.8 Export System

Lihat detail arsitektur di §13.6–13.7.

### 11.9 Payment Flow

```
Export → Create Quote → Show Breakdown → Checkout →
Payment Provider → Webhook → Verify Payment →
Mark Order Paid → Enable Export
```

**Payment success dari browser tidak boleh dipercaya tanpa verifikasi server/webhook.** Harga selalu dihitung server-side, tidak percaya total dari browser.

Untuk pasar Indonesia, payment gateway lokal seperti Midtrans atau Xendit adalah kandidat yang umum dipakai untuk kombinasi kartu, e-wallet, dan virtual account — pemilihan final tetap perlu dibandingkan berdasarkan biaya transaksi dan kemudahan integrasi saat implementasi.

### 11.10 Admin Panel

User list · project lookup · component catalog & Free/Pro flag & pricing · enable/disable component · template list · orders · payment status · export logs & failed export logs · generator version.

---

## 12. Arsitektur Teknis

### 12.1 Diagram Arsitektur

```
                         USER
                           │
                    NEXT.JS BUILDER
         ┌─────────────────┼────────────────┐
         ▼                 ▼                ▼
      CANVAS           INSPECTOR         THEME
         └─────────────────┼────────────────┘
                           ▼
                 PROJECT DOCUMENT (JSON)
              ┌────────────┴────────────┐
              ▼                         ▼
         PREVIEW ENGINE              SUPABASE
                                 (Auth, Projects,
                                  Assets, Orders,
                                  Export Metadata)
                           │
                           ▼
                        EXPORT
                           ▼
                   SERVER VALIDATION
                           ▼
                       PAYMENT (webhook-verified)
                           ▼
                    PROJECT SNAPSHOT
                           ▼
                     CODE GENERATOR
               ┌───────────┴───────────┐
               ▼                       ▼
          HTML ADAPTER             REACT ADAPTER
               └───────────┬───────────┘
                           ▼
                    SOURCE MANIFEST
                           ▼
                   BROWSER ZIP ENGINE
                           ▼
                     PROJECT.ZIP
```

Prinsip render canvas: canvas **tidak** menjalankan `drag → generate project → npm build → preview` di setiap edit. Alurnya `JSON → Component Registry → Preview Renderer → Canvas` (React component biasa), bukan build pipeline penuh.

### 12.2 Project Document / Node Model

```
ProjectDocument: schemaVersion, projectId, theme, settings, pages, nodes, assets, seo

Node: id, componentType, props, styles, responsiveStyles, children, metadata
```

### 12.3 Skema Database (Supabase / Postgres)

**profiles** (linked ke Supabase Auth)
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid (PK) | = auth.users.id |
| display_name | text | |
| avatar_url | text | |
| created_at | timestamptz | |

**projects**
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid (PK) | |
| user_id | uuid (FK) | |
| name, slug | text | |
| document_json | jsonb | konfigurasi canvas |
| schema_version | text | |
| status | text | |
| created_at / updated_at | timestamptz | |

**assets**
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid (PK) | |
| user_id, project_id | uuid (FK) | |
| storage_path | text | |
| file_name, mime_type | text | |
| size, width, height | int | |
| created_at | timestamptz | |

**component_catalog**
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid (PK) | |
| name, category | text | |
| tier | text (free/pro) | |
| price_key | text | |
| version | text | |
| supported_html, supported_react | boolean | |
| status | text | |

*(Source komponen sebenarnya tetap di codebase/template registry — tabel ini hanya metadata bisnis.)*

**export_quotes**
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid (PK) | |
| user_id, project_id | uuid (FK) | |
| snapshot_hash | text | |
| target | text (html/react) | |
| base_price, premium_price, module_price, total_price | numeric | |
| breakdown_json | jsonb | |
| expires_at | timestamptz | |

**orders**
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid (PK) | |
| user_id, quote_id | uuid (FK) | |
| payment_provider_reference | text | |
| amount | numeric | |
| status | text | |
| created_at / paid_at | timestamptz | |

*(Tidak menyimpan data kartu pembayaran.)*

**exports**
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid (PK) | |
| order_id, project_id | uuid (FK) | |
| snapshot_hash | text | |
| target | text | |
| generator_version | text | |
| status | text | |
| generated_at | timestamptz | |

### 12.4 Auth

Email magic link atau email/password; Google login opsional. Guest tetap bisa lihat demo. Login wajib untuk: save project, upload, checkout, export.

### 12.5 Keamanan / RLS

Row Level Security wajib aktif di semua tabel yang terekspos lewat Supabase API.

```
USER A → boleh read/update project miliknya sendiri
        → TIDAK boleh read project USER B
Assets → aturan sama
Service role → SERVER ONLY, tidak pernah dikirim ke browser
```

### 12.6 Image Pipeline & Direct Storage Upload

Sebelum upload: **resize → compress → convert ke format modern jika bisa → upload.** Rekomendasi V1: max width 1600px, ukuran 100–500KB, tidak ada video.

Upload langsung `Browser → Supabase Storage` (bukan lewat Vercel Function) untuk menghindari limit payload function (Vercel Functions saat ini punya batas body request/response 4.5MB) dan supaya lebih hemat.

### 12.7 Arsitektur Export

```
USER KLIK EXPORT → SERVER VALIDASI PROJECT → SERVER HITUNG HARGA →
CHECKOUT → PEMBAYARAN TERVERIFIKASI → FREEZE PROJECT SNAPSHOT →
EXPORT API → BACA SNAPSHOT → CODE GENERATOR →
SOURCE FILE MANIFEST → BROWSER → ASSEMBLE ZIP LOKAL → DOWNLOAD
```

**Kenapa ZIP dirakit di client, bukan server:** source file kebanyakan teks/config/gambar milik user. Server cukup menghasilkan *manifest* teks, browser yang mengambil asset lalu merakit ZIP. Untungnya: server tidak perlu kirim ZIP besar, tidak perlu simpan ZIP selamanya, tetap di bawah limit payload Vercel, hemat storage, proses export lebih cepat. Manifest memberi browser path asset + signed URL sementara (Supabase mendukung signed URL dengan masa berlaku terbatas).

### 12.8 Output Export

**HTML:**
```
project/
├── index.html
├── css/styles.css
├── js/main.js
├── assets/
├── README.md
├── DEPLOYMENT.md
├── LICENSE.md
└── generator-manifest.json
```
Wajib: semantic HTML, responsive CSS, SEO metadata, navigasi accessible, alt text, path asset bersih, tanpa runtime proprietary, tanpa dependency ke builder. **Setelah ZIP dibuat, website harus tetap jalan walau platform builder sudah tidak ada.**

**React (Vite + TypeScript):**
```
project/
├── src/{components,sections,data,styles}/
├── src/App.tsx, src/main.tsx
├── public/
├── package.json, vite.config.ts, tsconfig.json
├── README.md, DEPLOYMENT.md, LICENSE.md
```

Prinsip kode hasil generate: readable, editable, terformat rapi, terpisah logis, tanpa nama variabel aneh, tanpa satu file raksasa hasil generate, tanpa dependency ke platform, tanpa runtime tersembunyi, tanpa source terenkripsi. **Customer membeli source code sungguhan.**

### 12.9 Manifest & Versioning

Setiap ZIP dapat `generator-manifest.json` berisi `generatorVersion`, `templateVersion`, `target`, `generatedAt`, `componentVersions`, `schemaVersion` — berguna untuk debugging dan support.

Template versioning (mis. Hero Editorial v1.0.0 → v1.1.0 → v1.1.1): kalau ada bug, cukup fix registry sekali — bukan fix satu-satu di ratusan project customer yang sudah export.

### 12.10 Template Release Process & Test Matrix

```
Development → Responsive QA → HTML Export QA → React Export QA →
Accessibility QA → Build Test → Release
```

Setiap komponen dites dengan kombinasi: Desktop/Tablet/Mobile × Light/Dark background × Short/Long content × No image/Image × HTML export/React export.

---

## 13. Kebutuhan Non-Fungsional

- **Performance:** editor tetap responsif walau ada 20–40 node. Optimisasi: isolated editor state, hindari re-render seluruh canvas, memoize component preview, debounce autosave, lazy-load thumbnail komponen & heavy inspector controls.
- **Accessibility:** dibangun accessible sejak awal, bukan diperbaiki setelah 50 komponen jadi. Setiap export: semantic HTML, keyboard navigation, focus state, semantik button vs link, form label, alt gambar, kontras yang wajar.
- **Content Safety:** teks user di-escape/sanitize/validasi; URL divalidasi protokolnya; gambar divalidasi MIME & ukuran; HTML hasil generate tidak boleh membuka celah arbitrary script injection.
- **Export Validation** (sebelum source diberikan): schema valid, komponen ada, target didukung, tidak ada placeholder belum terisi, referensi asset valid, URL valid, konten wajib tersedia, lisensi komponen berbayar valid, source file/README/manifest sudah ter-generate.

---

## 14. Model Bisnis & Strategi Harga

**Prinsip:** jangan charge berdasarkan jumlah instance. Contoh: Editorial Hero ×1, Premium Gallery ×1, Premium Button ×20 — Premium Button **tidak** dihitung 20 kali. Harga dihitung dari **unique paid capability/component family** yang dipakai dalam snapshot project.

```
Base Export + Premium Components + Premium Modules + Export Target = Harga Akhir
```

**Live estimate** ditampilkan terus di builder ("Free blocks: 8, Pro blocks: 3, Estimated export: RpXXX") supaya tidak ada kejutan harga saat checkout. Sebelum checkout, user bisa "Replace with Free version" untuk komponen Pro yang tidak jadi dipakai.

**Contoh breakdown checkout:**
```
EXPORT SUMMARY — React Source Export
Base Export                 RpXX
Editorial Hero              +RpXX
Advanced Gallery            +RpXX
Premium Testimonials        +RpXX
TOTAL                       RpXXX
```

**Yang termasuk dalam pembelian:** source code hasil generate, dokumentasi, deployment guide, perbaikan bug template di level generator.
**Yang TIDAK otomatis termasuk:** hosting, domain, database hosting, layanan deployment, upgrade dependency, maintenance website, modifikasi custom, pengelolaan layanan pihak ketiga. Ini harus jelas **sebelum** checkout, bukan sesudah.

---

## 15. Metrik & KPI

| Kategori | Metrik |
|---|---|
| **Builder Activation** | % pembuat project yang menambah ≥3 komponen |
| **Design Completion** | % project yang mencapai preview |
| **Export Intent** | % project yang klik export |
| **Conversion** | export payment ÷ export quote |
| **Pro Engagement** | % project yang pakai ≥1 komponen Pro |

**Event yang di-track:** `project_created`, `template_selected`, `component_added/removed`, `pro_component_added`, `responsive_mode_changed`, `preview_opened`, `export_clicked`, `quote_created`, `checkout_started`, `payment_success`, `export_generated`, `export_downloaded`, `export_failed`.

---

## 16. Roadmap Produk

### Selesai (dibangun & sudah dipush — tidak lagi di roadmap aktif)

- **V0 — Engineering Prototype:** ProjectDocument schema, component registry, preview renderer, canvas, drag & drop & reorder (dnd-kit), HTML export, ZIP export (jszip).
- **V0.2 — Editor Core:** panel kiri (Add/Layers/Templates/Assets), canvas, inspector kanan (Content/Layout/Style/Responsive), select/add/delete/duplicate/reorder, edit konten & layout, theme token, undo/redo, command palette (Ctrl+K) + shortcut keyboard.
- **V0.3 — Responsive Engine:** preview 3 breakpoint (desktop/tablet/mobile), `styles.base` + `tabletOverride` + `mobileOverride`, CSS responsive di hasil export.
- **V0.5 — Component System:** registry 12 komponen dengan manifest (id, tier, priceKey, styleControls, contentControls, previewRenderer, exportAdapter).
- **V0.6 — Theme Engine:** preset warna/font/radius/density/style, override lokal (`Final Style = Global Token + Local Override`).
- **Ekstra yang sudah jalan:** 3 template (SaaS Landing, Toko Online, **Analytics Dashboard**); keluarga komponen dashboard (app-sidebar, dashboard-header, kpi-card, chart-card, data-table, grid-container); export dashboard terstruktur (sidebar sticky + header + grid KPI 4 kolom + chart 2 kolom); **responsive sidebar → bottom bar di mobile** (canvas, preview, dan hasil export); preview page khusus `/builder/[id]/preview`; README otomatis + generator-manifest.json di ZIP.

### Roadmap Aktif

> **Batch berjalan (14 Agustus 2026):** modernisasi komponen & template baru —
> 20 komponen baru + 4 template landing + pemisahan katalog Landing/Dashboard.
> Detail lengkap: [`prd-batch-v2-components-templates.md`](./prd-batch-v2-components-templates.md).

| Fase | Fokus | Status |
|---|---|---|
| **V0.4 — Project Persistence** | Supabase Auth, tabel projects, document JSON, autosave ke server, halaman dashboard daftar project, assets pipeline, RLS | **Sedang berjalan** — persistensi localStorage sudah berfungsi (save/reload aman); Supabase & auth belum |
| **V0.7 — React Export** | Base project React/Vite, adapter export, package.json, asset map, README, tes `npm install` & `npm run build` | Belum |
| **V0.8 — Commercial Logic** | Price key, pricing engine, kalkulasi unique Pro component, quote system, breakdown, snapshot hash, order model | Belum |
| **V0.9 — Payment** | Payment gateway, checkout, webhook, verifikasi pembayaran, unlock export | Belum |
| **V1.0 — Launch Candidate** | 3 template, 12 komponen polished, HTML export, responsive, save project, payment, ZIP, README, deployment docs, admin, security audit, QA mobile & produksi | Belum |
| **V1.5** | Multi-page, lebih banyak template, Next.js export, AI copy assistant, kontrol responsive lebih kaya, komponen premium tambahan | Belum |
| **V2** | Modul backend (Auth, Admin CMS, product management, leads, storage), Supabase export, blog/CMS | Belum |
| **V3** | Marketplace, komponen developer pihak ketiga, custom module, team workspace, animasi lanjutan, potensi kolaborasi realtime | Belum |

**AI Strategy:** AI tidak dibutuhkan di V1 — canvas, renderer, generator, exporter harus jalan tanpa AI. Di V1.5, AI opsional untuk: headline suggestion, teks About, deskripsi produk, CTA, SEO title/meta description, saran tema/palet. AI **tidak** dipakai untuk membuat arsitektur/codebase.

---

## 17. Urutan Pengembangan (Build Order)

```
1. ✅ Project JSON Schema        7. ✅ Theme System         13. Free/Pro Logic
2. ✅ Component Registry         8. ✅ Responsive System     14. Pricing
3. ✅ Preview Renderer           9. ✅ HTML Export           15. Payment
4. ✅ Canvas                    10. React Export            16. ✅ ZIP
5. ✅ Drag & Drop               11. Auth + Save ⏳           17. Admin
6. ✅ Inspector                 12. Assets                   18. QA → 19. Launch
```

*✅ = selesai · ⏳ = sebagian (Save project via localStorage sudah jalan, auth/backend belum) · tanpa tanda = belum dimulai.*

**Jangan mulai dari payment.** Pertanyaan yang harus terjawab dulu: *bisakah user desain website → preview → export HTML valid → export React valid?* Kalau belum, jangan bangun billing dulu.

**Jangan mulai dari 30 komponen.** Buktikan pipeline dengan 1 Navbar + 1 Hero + 1 Product + 1 About + 1 CTA + 1 Footer dulu. Kalau canvas + responsive + HTML + React sudah bekerja sempurna, baru tambah component library.

---

## 18. Kriteria Penerimaan V1

Produk V1 dianggap berhasil secara teknis jika user dapat:

**Sudah terpenuhi:**

- [x] Create project, mulai dari blank/template
- [x] Tambah section, drag/reorder
- [x] Edit content
- [x] Ubah color theme, font, radius, layout
- [x] Preview desktop/tablet/mobile
- [x] Save project, reload tanpa kehilangan data (localStorage)
- [x] Preview site
- [x] Generate source HTML, download ZIP
- [x] Jalankan HTML langsung

**Belum terpenuhi:**

- [ ] Register/login
- [ ] Upload image (UI Assets dasar sudah ada, pipeline & storage belum)
- [ ] Tambah komponen Pro dan lihat estimasi export
- [ ] Pilih target React, dapat quote yang benar
- [ ] Bayar
- [ ] Jalankan React dengan `npm install`, build sukses
- [ ] Mengikuti README dan berhasil sampai selesai (perlu dites user non-teknis)

---

## 19. Definition of Done per Component

Sebuah komponen baru belum dianggap selesai sampai:

- [ ] Visual polished
- [ ] Content editable
- [ ] Kompatibel dengan theme
- [ ] Responsive di desktop/tablet/mobile
- [ ] Status Free/Pro sudah didefinisikan
- [ ] Punya adapter HTML dan React
- [ ] Accessibility sudah dicek
- [ ] Sudah dites dengan teks panjang & gambar hilang
- [ ] Sudah dites di context dark/light
- [ ] Export sudah diverifikasi

---

## 20. Model Support & Layanan Tambahan

**Termasuk dalam pembelian:** source code hasil generate, dokumentasi, deployment guide, perbaikan bug di level generator/template.

**Tidak termasuk otomatis:** hosting, domain, database hosting, layanan deployment, upgrade dependency, maintenance website, modifikasi custom, pengelolaan layanan pihak ketiga.

**Potensi revenue tambahan di masa depan** (bukan V1, tapi layak dipikirkan lebih awal karena berkaitan dengan §7.1 soal gap dukungan non-teknis): jasa Deployment Assistance, Custom Domain Setup, Custom Modification/Development, Backend Integration, Maintenance Package. Generator ini bisa jadi *lead source* untuk jasa development di luar produk inti.

---

## 21. Lampiran

### 21.1 Glossary Singkat

| Istilah | Arti |
|---|---|
| ProjectDocument | JSON yang merepresentasikan seluruh isi canvas (theme, pages, nodes, assets) |
| Node | Satu unit komponen di dalam ProjectDocument (punya id, componentType, props, styles, children) |
| Export Adapter | Modul yang menerjemahkan Node/komponen ke output HTML atau React |
| Snapshot | Versi project yang "dibekukan" saat pembayaran diverifikasi — inilah yang benar-benar di-generate jadi source code |
| RLS (Row Level Security) | Aturan di level database Postgres yang membatasi user hanya bisa akses baris data miliknya sendiri |

### 21.2 Catatan Penutup

Dokumen ini adalah PRD kerja (living document) — bagian yang paling perlu divalidasi lebih dulu dengan calon user nyata adalah **§14 (apakah model harga unique-component benar-benar dipahami dan dianggap adil)** dan **§7.1 (apakah user non-teknis benar-benar bisa sampai ke tahap deploy sendiri setelah download)**. Kalau dua asumsi ini goyah, seluruh model bisnis "bayar sekali, tanpa hosting wajib" perlu ditinjau ulang sebelum V1 diluncurkan secara komersial.
