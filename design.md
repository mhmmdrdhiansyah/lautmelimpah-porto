# Design — LautMelimpah Home Page (mockup statis)

## 1. Brief

- **Kind:** service (perusahaan trading ekspor hasil laut; orang yang di-hire/dikontak, bukan tempat dikunjungi) → page type `service`, site-kind `other`.
- **Yang dijual:** komoditas hasil laut Belitung (grouper, rajungan, cumi, tenggiri, kakap, teripang) — harga tertutup, RFQ via email.
- **Pembeli:** importir/distributor, HORECA, pengolahan makanan (Asia Timur, AS, Timur Tengah, Eropa).
- **Aksi utama (satu, kata per kata di nav/hero/close/bar):** Request a quotation → `mailto:` stand-in sampai endpoint form ada.
- **Bahasa halaman:** Inggris (per PRD §1.1).
- **Material nyata:** tidak ada logo file, foto, harga, alamat → foto stand-in Wikimedia Commons (dilaporkan per frame), identitas dari teks + mark deal.

## 2. Keputusan klien (wawancara, 2026-11-17)

1. **Arah desain: Opsi D** — palet deal `offwhite-bottle-yellow`: off-white `#F7F7F7`, ink hijau-botol `#0D2A1C`, accent kuning `#F6E016` (kontras 11.42:1, AAA). Kuning dibaca "pelampung selam" — cocok tema laut.
2. **Suasana diving:** ingin banyak animasi, "laut seperti masuk ke web, ada gelembung udara, seakan diving". Diterjemahkan: motion gelembung udara di dalam foto hero saja (satu tempat, CSS, tombol Pause, mati di reduced-motion). Sisa halaman foto-dominan tanpa efek (aturan kind other).
2b. **Palet D dikonfirmasi ulang** (2026-11-17) setelah ditawarkan 4 opsi laut (D/E biru es-teal/F slate-olive/G putty-hijau laut) — alasan: kontras CTA paling tegas (11.42:1).
3. **Referensi website:** tidak ada — "tidak menemukan web yang seperti ini".
4. **Ruang lingkup mockup:** home saja, dengan preview katalog di dalamnya.
5. **Warna brand PRD §5 (Navy/Teal/Amber) dipilih pada putaran pertama, lalu diganti ke D** — PRD §5.1 perlu revisi nanti agar sinkron.

## 3. Deal (dari dealer skill, diulang saat build — riwayat deal lama terhapus)

| Part | Nilai | Catatan |
|---|---|---|
| Hero | `photo` (full-bleed, kata di sisi tenang, facts di kaki) | foto bawah laut/karang |
| Palet | `offwhite-bottle-yellow` | keputusan klien #1 |
| Type | `source-serif` (Source Serif 4 + Libre Franklin) | kredibel-klassik; take-first |
| Radius | `soft` | default |
| Nav | `nav-centre` | 4 kata + 1 tombol aksi |
| Footer | `footer-columns` | |
| Close | `close-type` | h2 + tombol besar |
| Rhythm | `dark-band` | kontras gelap di `#coldchain` (band paling kuat) |
| Buttons | `tonal` | |
| Mark | `stack` | + name 20px display face |
| Moment | `pinned-chapters` ×1 | alur *cold chain* 2 langkah |

Kenapa palet cocok: off-white menjaga foto produk bersih (B2B katalog), ink hijau-laut gelap = kedalaman laut, kuning = pelampung/CFD warna keselamatan selam.

## 4. Plan per layar (1440×900; 390 di kolom akhir)

| # | id | Ide satu | Gambar (kind) | Layar | Moment |
|---|---|---|---|---|---|
| 1 | hero | "Seafood export dari Belitung" + fakta keras (6 komoditas, asal Belitung) | foto karang/bawah laut (object) 1920w + crop 780×975 ponsel + gelembung | 1 | — (foto = hero) |
| 2 | source | Satu sumber: perairan Belitung, 6 komoditas diperkenalkan sebagai rows | foto pulau karang aerial (world) split 6/6 | 1 | — |
| 3 | commodities | Preview katalog: 3 tile komoditas + grade nyata, "Prices on request" | 3 foto (squid, crab/pasar, grade catch) (object/use) | 1 | — |
| 4 | coldchain | Rantai dingin 2 langkah: landed→chilled, reefer→pelabuhanmu | foto pelabuhan + kontainer (use) | 2 (pinned) | pinned-chapters |
| 5 | footer.closing | Request a quotation + direktori | close-type (type) | 1 | — |

Total 6 layar. At 390: setiap foto setelah teksnya; rows source dipangkas (cut, bukan shrink).

## 5. Copy (fakta dari PRD, tanpa rekaan)

- h1: "Belitung seafood exporter" — kategori + tempat; lead sebut pembeli ("For international buyers"), angka 6, tempat Belitung.
- Fakta hero: Origin Belitung Island · Export ports Tanjung Priok & Tanjung Pandan · Compliance HACCP/SKP/HC · MOQ dari 1 reefer container.
- Judul section/tile memuat noun + digit spek nyata dari PRD (U-10–10/20, 0–2 °C, 500–1200 g).
- Tombol: satu label aksi "Request a quotation" di nav, hero, close, bar; sekunder hero "See the commodities".
- Tanpa harga publik (PRD §1.2); email stand-in `.example` sampai endpoint ada.
- Kontak: alamat district saja (Tanjung Pandan, Belitung) — PRD tidak beri jalan; tanpa nomor telepon.

## 6. Deviasi yang disepakati

- Motion gelembung di hero pada kind `other` (efek biasanya tech-only) → permintaan eksplisit klien, satu tempat, pause, reduced-motion off.
- Warna brand halaman ≠ PRD §5.1 sementara → PRD perlu update setelah arah final.

## 7. Nilai pembeda (jawaban klien, 2026-11-17)

Urutan alasan buyer memilih LautMelimpah:
1. **Stok banyak & jenis berlimpah dan berbeda** — ragam komoditas yang jarang ada di eksportir lain.
2. **Kualitas terbaik, harga bersahabat.**
3. **Respons cepat** — RFQ dijawab tanpa lama.
4. **Legalitas aman** — dokumen lengkap, buyer berani.
5. **Lokasi lebih dekat ke Asia Tenggara** — Belitung lebih dekat Singapura/Malaysia dibanding hub lain.

→ Konsekuensi desain: pembeda disampaikan kualitatif (tanpa angka kapasitas — klien putuskan tidak perlu sedetail itu). Klaim "respons cepat" cukup satu kalimat tanpa janji jam.

## 8. Yang belum (butuh jawaban klien / brainstorming)

1. Struktur halaman lain (commodities, quality-legality, logistics, inquiry, admin) — out of scope mockup ini.
2. Nama domain + email resmi sales.
3. Logo file (sekarang mark deal `stack`).
4. Foto asli Belitung (sekarang 7 stand-in).
5. ~~Bahasa~~ → **putusan klien: EN saja, tanpa versi Indonesia.**
6. Stack sudah tetap di PRD §4.1 (Next.js 15 + Tailwind + shadcn/ui + Prisma + MySQL); mockup statis = desain referensi, token diterjemahkan ke Tailwind saat scaffold. Urutan: mockup statis final → scaffold Next.js.
