# PRD Buat.in — Rencana Pembaruan (V3: Model Section + Item)

Status dokumen: aktif. Update terakhir: 15 Agu 2026.
Dokumen ini menggantikan seluruh PRD sebelumnya. Ditulis ulang dengan struktur baru:
halaman terdiri dari Section bernama, dan di dalam Section ada Item yang bisa
diedit bebas.

## 1. Ringkasan

Buat.in adalah visual website builder. Pengguna menyusun halaman dari Section
yang sudah bernama (misalnya Section Navbar, Section Hero, Section Footer),
lalu mengisi Item di dalamnya (misalnya logo, tautan, tombol). Setiap Item
bisa digaya bebas lewat panel kanan (inspektor). Hasil akhirnya adalah file
HTML, CSS, dan JS statis yang bisa diekspor dan dimiliki pengguna.

Tujuan update V3:
1. Merombak cara berpikir dari "komponen kaku" menjadi "Section berisi Item".
2. Menyediakan Section kosong/basic tanpa gaya untuk dibangun dari nol.
3. Menyediakan template gaya Section (misalnya Navbar Glassmorph, Navbar
   Simple 1) yang tetap bisa diedit Item-nya.
4. Menutup seluruh gap yang tercatat di PRD lama: komponen, template,
   kontrol gambar/logo, verifikasi snapshot, dan audit AI slop.

## 2. Model Baru: Section + Item

### 2.1 Definisi

- Halaman = daftar Section yang disusun dari atas ke bawah.
- Section = wadah bernama dengan satu fungsi, contoh: Section Navbar,
  Section Hero, Section Sidebar, Section Footer, Section Paragraf 1,
  Section Paragraf 2.
- Item = elemen nyata di dalam Section, contoh:
  - Navbar: item logo, item tautan, item tombol CTA.
  - Hero: item judul, item paragraf, item gambar, item tombol.
- Setiap Item punya:
  - Data (teks, tautan, sumber gambar).
  - Gaya (warna, ukuran font, jarak, radius, bayangan, perataan).
- Gaya Item memakai token tema project (warna, font, radius, jarak) sebagai
  default, tetapi bisa di-override per Item dari panel kanan.

### 2.2 Pengaturan Struktur Halaman

- Panel kiri (Add) menampilkan Section apa saja yang bisa ditambahkan,
  dikelompokkan: Navbar, Hero, Konten, Form, Dashboard, Footer.
- Saat Section dipilih, panel kanan menampilkan dua tab:
  - Tab Isi: daftar Item beserta datanya (teks, tautan, gambar).
  - Tab Gaya: properti visual Section dan Item yang sedang dipilih.
- Item bisa ditambah, dihapus, disusun ulang di dalam Section.
- Section bisa disusun ulang di dalam halaman, digandakan, atau dihapus.

### 2.3 Dua Jenis Entry Point

- Section Kosong (Basic): Section polos tanpa gaya, berisi Item kosong.
  Pengguna memilih sendiri strukturnya. Contoh: Section Paragraf 1 berisi
  satu item teks; Section Paragraf 2 berisi gambar dan paragraf.
- Section Template: desain jadi dengan gaya khas (misal Navbar Glassmorph,
  Navbar Simple 1, Hero Split, Footer Daftar Tautan). Semua Item di dalamnya
  tetap bisa diedit dan gayanya tetap bisa diubah.

### 2.4 Migrasi dari Model Lama

- Komponen yang ada (34 komponen) dipetakan ulang menjadi Section + Item:
  - Komponen navbar menjadi Section Navbar dengan item logo, tautan, CTA.
  - Komponen hero menjadi Section Hero dengan item judul, paragraf, gambar,
    tombol.
  - Komponen kpi-card menjadi Section Dashboard KPI dengan item nilai,
    label, tren.
- Dokumen project lama tetap bisa dibuka; pemetaan otomatis dilakukan saat
  muat. Tidak ada data pengguna yang hilang.

## 3. Gap yang Harus Ditutup (Dari PRD Lama)

### 3.1 Komponen Baru yang Belum Ada

Landing:
- Kontak dan info bisnis: jam operasional, alamat, peta lokasi.
- Karousel atau slider testimoni.
- Portofolio dan kasus kerja.
- Proses dan langkah layanan.
- Strip logo klien.
- Banner promo.
- Breadcrumb.
- Tombol kembali ke atas (back-to-top).
- Bukti sosial dan rating bintang.

Dashboard:
- Bar filter dan pencarian.
- Ringkasan ring atau sparkline.
- Kalender dan timeline.
- Panel notifikasi.
- Form tambah data.
- Pagination.
- Progress bar.
- Stack avatar.

Syarat tiap komponen baru:
- Manifest lengkap: id, nama, kategori, scope, properti default, kontrol isi,
  dan skema item.
- Preview di kanvas sama persis dengan hasil ekspor.
- Ekspor mandiri: CSS berpola bi-, JS vanilla bila perlu, tanpa framework.

### 3.2 Template Baru yang Belum Ada

Landing:
- Klinik dan layanan kesehatan.
- Restoran dan kuliner.
- Event dan konferensi.
- Sekolah dan kursus.
- Properti.
- Travel dan agency.
- Showcase aplikasi mobile.
- Non-profit dan donasi.

Dashboard:
- E-commerce (produk dan pesanan).
- Manajemen project.
- Keuangan pribadi.
- Helpdesk dan tiket.

Syarat tiap template baru:
- Menggunakan Section dan Item yang sudah tersedia.
- Konten default realistis, spesifik, dan berbahasa Indonesia.
- Rapi di tiga ukuran: desktop 1440, tablet 768, mobile 390.

### 3.3 Kontrol Gambar dan Logo

- Tambah tipe kontrol gambar di inspektor: unggah dari komputer, tempel URL,
  atau placeholder otomatis (inisial nama).
- Logo navbar dan komponen lain memakai kontrol ini.
- Saat ekspor, gambar yang diunggah masuk folder assets/ dengan nama file
  yang dibersihkan, bukan base64 raksasa di dalam HTML.
- Preview kanvas dan hasil ekspor harus tampil konsisten.

### 3.4 Verifikasi Snapshot Otomatis

- Ekspor dari dokumen contoh diambil tangkapan layarnya otomatis pada lebar
  390, 768, dan 1440.
- Tidak boleh ada overflow horizontal.
- Dipakai untuk menolak regresi saat menambah komponen atau mengubah tema.

### 3.5 Audit AI Slop

- Periksa semua teks default di template dan komponen.
- Buang frasa generik seperti "Tingkatkan bisnis Anda" dan "Solusi terbaik
  untuk kebutuhan Anda".
- Ganti dengan contoh konkret dan spesifik.
- Setiap template harus punya pola hero yang berbeda satu sama lain.

### 3.6 Perbaikan Responsive

- Audit semua Section di tiga device, di kanvas dan di ekspor.
- Tabel data di mobile: scroll horizontal atau susun ke kolom.
- Grid banyak kolom di mobile menjadi satu kolom.
- Modal dan sheet menyesuaikan layar kecil.
- Sidebar dashboard mengecil ke ikon di layar kecil.
- Navbar di mobile selalu memakai menu hamburger, di semua varian.

## 4. Prinsip yang Tidak Boleh Dilanggar

- Ekspor adalah HTML, CSS, dan JS statis murni. Tidak ada runtime Buat.in.
- Preview kanvas tidak boleh jauh berbeda dari hasil ekspor.
- Semua teks untuk pengguna dalam Bahasa Indonesia.
- Semua Item memakai token tema sebagai default, override hanya per Item.
- Komponen baru wajib punya ekspor mandiri sebelum dirilis.

## 5. Urutan Pengerjaan

1. Rombak model menjadi Section + Item (struktur data, panel kiri, panel
   kanan, preview, ekspor). Semua project lama tetap bisa dibuka.
2. Sedikan Section kosong/basic dan template gaya Section awal.
3. Selesaikan bug kecil yang sedang berjalan: kontrol URL di sidebar, pilihan
   modal di ikon bel, dan pengetikan teks yang terbalik.
4. Tambah komponen baru (landing dulu, lalu dashboard).
5. Tambah template baru (landing dulu, lalu dashboard).
6. Kontrol gambar dan logo, lengkap dengan folder assets/ saat ekspor.
7. Snapshot otomatis dan audit AI slop.
8. Audit responsive menyeluruh.

## 6. Definisi Selesai per Item Pekerjaan

- Section atau Item baru: tersedia di panel, preview benar, ekspor valid,
  tidak ada error di konsol.
- Template baru: tersedia di halaman builder, preview rapi di tiga ukuran,
  ekspor langsung berjalan tanpa langkah build.
- Kontrol gambar: unggah muncul di kanvas dan ekspor; ZIP berisi folder
  assets/.
- Snapshot: tangkapan layar di tiga lebar tidak ada overflow horizontal.
- Audit AI slop: tidak ada frasa generik di teks default template.
- Kode: perintah lint dan tsc berjalan tanpa error.
