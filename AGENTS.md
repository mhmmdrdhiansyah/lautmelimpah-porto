# Agent Rules — LautMelimpah (B2B Seafood Export Platform)

Wajib dibaca sebelum menulis/mengubah code. Pelanggaran = pekerjaan belum selesai.

## 0. Sumber kebenaran

- **PRD:** `prd_lautmelimpah_seafood_export_platform.md` — scope fitur, skema MySQL, stack.
- **Design:** `design.md` — keputusan desain hasil wawancara klien (palet, gelembung diving,
  plan layar, copy). Jangan melawan dokumen ini; kalau klien minta ubah, ubah dokumennya dulu.

## 1. Stack (PRD §4.1) — jangan ganti tanpa persetujuan

- Next.js 15 (App Router), TypeScript, Tailwind CSS + shadcn/ui, Framer Motion.
- Database MySQL + Prisma ORM (skema tabel di PRD §4.2 — jangan ubah nama kolom).
- Email RFQ: Resend atau Nodemailer SMTP.

## 2. Desain terkunci (design.md)

- Palet: off-white `#F7F7F7` · ink hijau-botol `#0D2A1C` · accent kuning `#F6E016` (CTA saja).
- Font: Source Serif 4 (display) + Libre Franklin (text), radius `soft`.
- Motion gelembung hanya di hero, satu tempat, ada Pause, mati di `prefers-reduced-motion`.
- Bahasa halaman: **Inggris saja** (PRD §1.1). Tanpa versi Indonesia.
- Harga tidak pernah tampil publik — semua CTA menuju "Request a quotation" (RFQ).

## 3. Copy & konten

- Semua klaim dari PRD atau klien. **Dilarang mengarang angka** (kapasitas, jumlah stok,
  testimoni, statistik). Pembeda bisnis disampaikan kualitatif (lihat design.md §7).
- Satu label aksi utama: "Request a quotation" — sama di nav, hero, close, phone bar.
- Email stand-in `sales@lautmelimpah.example` sampai klien kasih alamat resmi; ganti sekali,
  di satu konstanta.

## 4. Responsive & aksesibilitas — sejak commit pertama

- Setiap view dicek di 1440, 1024, 768, 390 (dan 320 tidak overflow) sebelum selesai.
- Kontras teks ≥ 4.5:1 (accent kuning hanya di elemen besar/CTA, bukan teks kecil).
- Semua kontrol punya nama (`aria-label`/label terlihat), fokus ring kontras di foto gelap.

## 5. Urutan kerja yang disepakati

1. Mockup statis home (desain referensi) → lolos quality gate skill desain.
2. Scaffold Next.js + Tailwind (token dari design.md §3) → halaman home.
3. Halaman lain per PRD §5.2: commodities, quality-legality, logistics, inquiry, admin.
4. Integrasi Prisma + MySQL + email RFQ.

## 6. Yang menunggu suplai klien

- Logo file (sementara: mark `stack` + wordmark teks).
- Foto asli Belitung & komoditas (sementara: stand-in Wikimedia Commons, kredit di footer).
- Domain + email sales resmi.
