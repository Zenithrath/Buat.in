# PRD — Buat.in (Visual Website Builder)

Status dokumen: **aktif** · Update terakhir: 14 Agu 2026

## Ringkasan Produk

Buat.in adalah visual website builder: desain landing page & dashboard, ekspor
menjadi situs statis murni (HTML/CSS/JS) — tanpa runtime tersembunyi. Satu
harga, kode milik pengguna.

## Status Saat Ini (Selesai)

- Tema emas (brand `#c9a227`) untuk landing, editor, dan app; token shadcn/ui ditata ulang.
- 34 komponen (landing + dashboard) dengan accordion, pencarian, preview live, seret-dua-klik.
- 7 template (6 landing + 1 dashboard) dengan preview langsung di halaman `/builder`.
- Multi-page: tambah/ganti nama/path/hapus/duplikat halaman, satu file HTML per halaman saat export.
- Link antar halaman: pemilih halaman di kontrol tautan; link internal ditulis ulang ke file HTML di export; navigasi berfungsi di preview.
- Export ZIP (HTML/CSS/JS + manifest generator + panduan deploy), preview `?page=`, undoing/redoing multi-page.

## Roadmap (Next Steps, urut prioritas)

### 1. Perbanyak Komponen (+8–12)
- Landing: kontak + info bisnis (jam operasional, alamat), slider/karousel testimoni, portofolio/kasus kerja, proses/langkah layanan, logo strip (client logos), peta + lokasi, banner promo, breadcrumb, back-to-top, social proof/rating.
- Dashboard: filter & pencarian bar, ringkasan ringkas (ring/sparkline), kalender/timeline, notifikasi panel, form tambah data, pagination, progress bar, avatar stack.
- Setiap komponen baru: manifest dengan `contentControls` + `itemSchema` yang lengkap, `exportAdapter` mandiri (CSS scoped `bi-*`, JS opsional), preview React 1:1 dengan ekspor.

### 2. Perbaiki AI Slop
- Audit semua teks default di template & komponen: buang frasa generik ("Tingkatkan bisnis Anda", "Solusi terbaik untuk kebutuhan Anda", lorem-ish), ganti contoh konkret & spesifik.
- Audit visual: hilangkan layout seragam (hero tengah terus), variasikan penjajaran, densitas, dan struktur antar template.
- Standar kualitas: setiap template punya 1 pola hero berbeda, CTA kalimat aksi nyata, data statistik masuk akal, kontak & nama fiktif konsisten.

### 3. Perbanyak Template (+6–8)
- Landing: klinik/layanan kesehatan, restoran/kuliner, event/conference, sekolah/kursus, properti, travel/agency, aplikasi mobile (app showcase), non-profit/donasi.
- Dashboard: e-commerce (produk/pesanan), project management, keuangan pribadi, helpdesk/tiket.
- Template memakai komponen yang ada dulu; komponen baru yang dibutuhkan ditambahkan ke roadmap #1.

### 4. Perbaiki Responsive
- Audit semua komponen di 3 device (desktop/tablet/mobile) baik di canvas maupun hasil ekspor: overflow teks & gambar, tabel data mobile (horizontal scroll/stack), grid multi-kolom yang memadat, modal/sheet di layar kecil, sidebar dashboard (collapse ke ikon).
- Navigation mobile: hamburger menu pada semua varian navbar (centered/split/glass/mega/fullscreen) di ekspor, bukan hanya minimal.
- Verifikasi otomatis: snapshot ekspor di 3 ukuran viewport.

### 5. Token & Warna — Hilangkan Ambiguitas
- Masalah: "warna sekunder" vs "permukaan" hampir tidak bisa dibedakan; "Gaya" (kepadatan/densitas) belum terlihat di kanvas, hanya di ThemePreview.
- Keputusan: token permukaan (surface/background/card) dipisah tegas dari token aksen (secondary); beri preview nyata per pasangan token.
- "Gaya" dibuat benar-benar memengaruhi kanvas & ekspor (jarak section, padding kartu, radius, shadow) — atau dihapus jika tidak bisa konsisten.
- (Sudah) Perbaikan kontras dark mode: state aktif translucent kini `text-brand` (emas), bukan `brand-foreground` gelap; catatan menyesatkan "Sistem token shadcn/ui aktif di kanvas" dihapus.

### 6. Input Logo (Image Control)
- Belum ada kontrol gambar untuk logo di navbar (dan komponen lain yang butuh logo/ikon).
- Tambah tipe kontrol `image`/`logo` pada contentControls: unggah dari komputer (disimpan sebagai data URI di project), URL eksternal, atau placeholder otomatis (inisial nama).
- Terapkan ke: navbar (semua varian), footer brand, sidebar dashboard, menu offcanvas, dsb. Preview canvas & ekspor harus konsisten.
- Ekspor: logo yang diunggah masuk folder `assets/` (bukan inline base64 raksasa), nama file sanitasi.

## Prinsip (Jangan Dilanggar)

- Export = HTML statis murni, tanpa runtime Buat.in, tanpa layanan wajib.
- Preview canvas ≈ hasil ekspor (tidak boleh melenceng jauh).
- Semua teks user-facing dalam Bahasa Indonesia.
- Komponen baru wajib punya `exportAdapter` mandiri sebelum dirilis.

## Definisi Selesai per Item

- Komponen/template baru: tersedia di panel, preview benar, ekspor HTML/CSS/JS valid, tidak ada error konsol.
- AI slop: 0 frasa generik di template default (cek via daftar stopword).
- Responsive: snapshot mobile/tablet/desktop tidak overflow horizontal pada lebar 390/768/1440.
- Token: kanvas & ekspor konsisten; tidak ada token yang punya fungsi ganda.
- Logo: unggah → tampil di canvas & ekspor; ZIP berisi `assets/logo-*.png`.