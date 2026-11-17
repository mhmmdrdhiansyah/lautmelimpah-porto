# Product Requirements Document (PRD)
## LautMelimpah — B2B Seafood Export & Sourcing Platform

**Versi Dokumen:** 2.0 (Updated)  
**Nama Brand / Perusahaan:** LautMelimpah  
**Lokasi Operasional Utama:** Pulau Belitung (Tanjung Pandan & Manggar), Kepulauan Bangka Belitung, Indonesia  
**Tech Stack:** Fullstack JavaScript (Next.js, React, Tailwind CSS, Prisma ORM) & MySQL  

---

## 1. Ringkasan Eksekutif & Identitas Brand

### 1.1 Gambaran Produk
**LautMelimpah** adalah platform web B2B (*Business-to-Business*) yang berfungsi sebagai etalase digital, pusat verifikasi legalitas & kepatuhan mutu, serta sistem manajemen permintaan penawaran (*Request for Quotation* / RFQ) bagi perusahaan *trading* ekspor hasil laut yang berbasis di Pulau Belitung. Website ini dirancang dalam **Bahasa Inggris** untuk menjangkau *buyer* internasional secara profesional.

### 1.2 Model Bisnis & Posisi Nilai (*Value Proposition*)
* **Model Bisnis:** *Seafood Export Trading & Sourcing Partner*. LautMelimpah mengagregasi tangkapan nelayan lokal serta hasil budidaya di perairan Pulau Belitung, lalu bermitra dengan Unit Pengolahan Ikan (UPI) bersertifikat untuk proses *handling*, pembekuan (*cold chain*), pengemasan standar ekspor, dan pengurusan dokumen kepabeanan.
* **Mekanisme Harga:** **Tertutup (*Price Upon Request*)**. Tidak ada harga yang dipublikasikan secara terbuka. *Buyer* memasukkan produk dan estimasi volume ke dalam daftar permintaan (*Inquiry List*), kemudian negosiasi harga dilakukan melalui email resmi (*Quotation / Proforma Invoice*) sesuai spesifikasi, volume, dan *Incoterms* yang dipilih.

### 1.3 Target Pengguna (*Buyer* Internasional)
1. **Importir & Distributor Hasil Laut (*Seafood Importers & Wholesalers*):** Fokus pasar Asia Timur (Hong Kong, Tiongkok, Jepang, Taiwan, Korea Selatan), Asia Tenggara (Singapura, Malaysia), Amerika Serikat, Timur Tengah, dan Eropa.
2. **Jaringan HORECA (Hotel, Restoran, Katering):** Pencari ikan karang segar/beku kualitas sashimi atau premium.
3. **Industri Pengolahan Makanan (*Seafood Processors*):** Pencari bahan baku seperti daging rajungan (*pasteurized crab meat*) dan cumi kupas.

---

## 2. Komoditas Utama (Riset Hasil Laut Pulau Belitung)

Seluruh komoditas bersumber dari perairan Pulau Belitung (Tanjung Pandan, Manggar, Selat Gaspar, dan Laut Natuna Selatan) yang terkenal dengan perairan jernih dan ekosistem karang yang kaya:

| No | Komoditas (Nama Inggris / Lokal) | Nama Latin | Bentuk Olahan Ekspor (*Product Forms*) | Metode Penyimpanan | Target Pasar Utama |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | **Coral & Tiger Grouper** (Kerapu Sunu / Macan) | *Plectropomus leopardus* / *Epinephelus fuscoguttatus* | Live Fish, Chilled Whole Gutted, Frozen Fillet | Live (Oxygenated), Chilled, IQF | Hong Kong, Singapura, Taiwan, Tiongkok |
| **2** | **Blue Swimming Crab** (Rajungan Kupas) | *Portunus pelagicus* | Pasteurized Crab Meat (Colossal, Jumbo Lump, Backfin, Claw) | Chilled ($0^\circ\text{C}$ – $2^\circ\text{C}$) / Frozen | Amerika Serikat, Jepang, Singapura |
| **3** | **Squid & Cuttlefish** (Cumi-Cumi & Sotong) | *Loligo spp.* / *Sepia spp.* | Whole Round (WR), Cleaned Tube, Squid Ring | Block Frozen, IQF | Tiongkok, Korea Selatan, Jepang, Uni Eropa |
| **4** | **Spanish Mackerel** (Ikan Tenggiri) | *Scomberomorus commerson* | Whole Round (WR), Headless Gutted (HGT), Steak / Loin | Block Frozen, IQF | Singapura, Malaysia, Taiwan, Timur Tengah |
| **5** | **Red Snapper & Emperor Fish** (Kakap Merah & Lencam) | *Lutjanus malabaricus* / *Lethrinus spp.* | Whole Gutted & Scaled (WGS), Skin-on / Skinless Fillet | Chilled, IQF | Australia, Amerika Serikat, Eropa, Singapura |
| **6** | **Dried Sea Cucumber** (Teripang / Gamat Asap) | *Holothuroidea* | Dried / Smoked Whole (*Teripang Kering*) | Dry Ambient | Hong Kong, Tiongkok, Singapura |

---

## 3. Fitur Utama Website (*Functional Requirements*)

### 3.1 Katalog Komoditas Dinamis (Integrasi MySQL)
* **Filter Multi-Parameter:** Filter berdasarkan kategori (*Reef Fish, Crustaceans, Cephalopods, Pelagic, Dried Seafood*), metode penyimpanan (*Live, Chilled, IQF, Block Frozen*), dan ketersediaan musim.
* **Spesifikasi Teknis Mendalam per Produk:**
  * Nama Inggris, Nama Lokal, dan Nama Latin (*Scientific Name*).
  * *HS Code* (Harmonized System Code untuk kepabeanan).
  * *Size / Grading* (misal: `500-800g`, `800-1200g`, `1200g UP` atau `U-10`, `10/20`).
  * *Product Forms* & *Glazing Percentage* (untuk produk beku).
  * *Packaging* (Master Carton + Inner Polybag, atau Styrofoam Box untuk *chilled/air cargo*).
  * *Minimum Order Quantity* (MOQ) & estimasi kapasitas muat kontainer.
  * Status Ketersediaan Musiman (*Available Year-Round* / *Seasonal Peak Months*).

### 3.2 Sistem *Inquiry Cart* & Formulir RFQ (Tanpa Harga Publik)
* Setiap kartu dan halaman detail produk memiliki tombol **"Add to Inquiry List"** disertai lencana **"Price Upon Request"**.
* **Drawer / Halaman Inquiry List:** *Buyer* dapat mengumpulkan beberapa komoditas sekaligus dalam satu permintaan, menentukan estimasi kuantitas (dalam Metric Ton / Kg / Container), memilih bentuk olahan, serta memilih skema pengiriman (*Incoterms*).
* **Notifikasi Otomatis:** Saat *buyer* mengirimkan RFQ, data tersimpan ke database MySQL dan sistem otomatis mengirim email notifikasi ke tim *sales* **LautMelimpah** serta email konfirmasi ke *buyer*.

### 3.3 Jalur Pengiriman Ekspor (*Export Logistics & Popular Routes*)
Menampilkan informasi transparan mengenai rute pengiriman paling umum, efisien, dan digemari eksportir hasil laut dari Pulau Belitung ke pasar global:

1. **Pengiriman Laut (*Sea Freight - Reefer Container 20ft & 40ft*):**
   * **FOB Tanjung Priok (Jakarta - IDJKT):** *Hub* utama ekspor kontainer laut Indonesia dengan jadwal kapal langsung (*direct vessel*) terbanyak ke Amerika Serikat, Eropa, Jepang, Tiongkok, dan Timur Tengah (barang dikirim via *feeder vessel* berpendingin dari Belitung ke Jakarta).
   * **FOB Tanjung Pandan (Belitung - IDTJQ):** Rute langsung (*direct/regional feeder*) khusus untuk pengiriman ke **Singapura** dan **Malaysia** dengan waktu tempuh singkat.
   * **CIF / CNF (*Cost, Insurance, and Freight*):** Pengiriman langsung hingga pelabuhan tujuan *buyer* (*Port of Destination*).
2. **Pengiriman Udara (*Air Freight - Untuk Produk Live & Chilled Premium*):**
   * **FOB Soekarno-Hatta International Airport (CGK, Jakarta):** Kargo udara domestik dari Bandara H.AS. Hanandjoeddin (TJQ) Belitung menuju hub internasional CGK untuk diterbangkan ke Hong Kong, Singapura, Taiwan, Jepang, dan Timur Tengah dalam waktu kurang dari 24–36 jam.

### 3.4 Pusat Legalitas, Sertifikasi & Ketertelusuran (*Compliance & Legality Hub*)
Halaman khusus untuk membangun kepercayaan penuh *buyer* luar negeri bahwa **LautMelimpah** beroperasi secara legal dan memenuhi standar keamanan pangan internasional (baik melalui legalitas perusahaan maupun kemitraan dengan UPI bersertifikat):

* **Legalitas Perusahaan Eksportir:**
  * Nomor Induk Berusaha (NIB) dengan KBLI Perdagangan Besar Hasil Perikanan & Ekspor.
  * NPWP Perusahaan & Status Eksportir Terdaftar.
* **Sertifikasi Keamanan Pangan & Mutu (Mitra UPI & Karantina):**
  * **HACCP (*Hazard Analysis Critical Control Point*):** Jaminan standar keamanan pangan pengolahan.
  * **SKP (*Sertifikat Kelayakan Pengolahan*):** Sertifikasi resmi dari Kementerian Kelautan dan Perikanan (KKP) RI.
  * **Health Certificate (HC):** Diterbitkan resmi oleh **BPPMHKP / BKIPM** (Badan Pengendalian dan Pengawasan Mutu Hasil Kelautan dan Perikanan) untuk setiap *shipment*.
  * **Halal Certification (BPJPH Indonesia):** Penting untuk pasar Timur Tengah, Malaysia, dan segmen global.
* **Dokumen Kepabeanan & Ketertelusuran (*Traceability*):**
  * **Certificate of Origin (COO / SKA):** Form E (Tiongkok), Form D (ASEAN), Form JIEPA (Jepang), Form IJEPA, dll. untuk fasilitas pembebasan/keringanan bea masuk bagi *buyer*.
  * **SHTI (*Sertifikat Hasil Tangkapan Ikan* / Catch Certificate):** Bukti penangkapan ikan legal dan bebas *IUU Fishing* (wajib untuk pasar Uni Eropa, Jepang, dan AS).

### 3.5 Panel Admin Internal (`/admin`)
* Login terproteksi bagi pengelola **LautMelimpah**.
* Manajemen Produk (Tambah/Edit/Hapus komoditas, ubah status stok musiman, unggah foto).
* Manajemen Dokumen Legalitas (Unggah/perbarui daftar sertifikat & nomor registrasi yang ditampilkan di *website*).
* Manajemen *Leads* RFQ (Melihat daftar permintaan masuk, detail perusahaan *buyer*, dan memperbarui status negosiasi: *New, Quoted, Negotiating, Closed*).

---

## 4. Arsitektur Teknis & Skema Database MySQL

### 4.1 Stack Teknologi (Fullstack JavaScript)
* **Framework Utama:** Next.js 15 (App Router) — mencakup Frontend (React) dan Backend (Server Actions / API Routes).
* **Styling & Komponen UI:** Tailwind CSS + `shadcn/ui`.
* **Animasi & Interaksi:** Framer Motion.
* **Database & ORM:** MySQL + Prisma ORM.
* **Layanan Email:** Resend atau Nodemailer (SMTP).

### 4.2 Struktur Tabel MySQL

```sql
-- 1. Kategori Komoditas
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_en VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Katalog Produk Hasil Laut Belitung
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name_en VARCHAR(150) NOT NULL,
    local_name_id VARCHAR(150),
    latin_name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) NOT NULL UNIQUE,
    hs_code VARCHAR(20),
    origin_area VARCHAR(100) DEFAULT 'Belitung Island, Indonesia',
    processing_types VARCHAR(255) NOT NULL,
    freezing_methods VARCHAR(150) NOT NULL,
    size_grades VARCHAR(255) NOT NULL,
    packaging_spec VARCHAR(255) NOT NULL,
    moq_spec VARCHAR(100) NOT NULL,
    availability_status ENUM('AVAILABLE', 'SEASONAL', 'LIMITED') DEFAULT 'AVAILABLE',
    peak_months VARCHAR(100),
    description_en TEXT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
);

-- 3. Dokumen Legalitas & Sertifikasi Kepatuhan
CREATE TABLE compliance_documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title_en VARCHAR(150) NOT NULL,
    issuer VARCHAR(150) NOT NULL,          -- Contoh: "KKP / BPPMHKP Indonesia", "BPJPH"
    document_type ENUM('COMPANY_LEGALITY', 'FOOD_SAFETY', 'EXPORT_CERTIFICATE') NOT NULL,
    registration_number VARCHAR(100),      -- Opsional (bisa disamarkan sebagian untuk privasi)
    description_en TEXT NOT NULL,
    badge_icon_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Permintaan Penawaran (RFQ / Inquiries)
CREATE TABLE inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    inquiry_code VARCHAR(30) NOT NULL UNIQUE,
    buyer_name VARCHAR(150) NOT NULL,
    company_name VARCHAR(150) NOT NULL,
    country VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone_whatsapp VARCHAR(50),
    preferred_incoterm ENUM('FOB_JAKARTA', 'FOB_BELITUNG', 'CIF', 'CNF') DEFAULT 'FOB_JAKARTA',
    shipping_mode ENUM('SEA_REEFER', 'AIR_CARGO') DEFAULT 'SEA_REEFER',
    destination_port VARCHAR(150),
    additional_notes TEXT,
    status ENUM('NEW', 'QUOTED', 'NEGOTIATING', 'CLOSED_WON', 'CLOSED_LOST') DEFAULT 'NEW',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Detail Item Produk dalam Setiap RFQ
CREATE TABLE inquiry_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    inquiry_id INT NOT NULL,
    product_id INT NOT NULL,
    requested_form VARCHAR(100),
    requested_size VARCHAR(100),
    estimated_quantity VARCHAR(100) NOT NULL,
    FOREIGN KEY (inquiry_id) REFERENCES inquiries(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);
```

---

## 5. Arahan Desain UI/UX & Aset Visual

### 5.1 Identitas Visual **LautMelimpah**
* **Konsep:** *Belitung Maritime Provenance & Global B2B Trust* — Memadukan kejernihan perairan Belitung sebagai jaminan kualitas sumber bahan baku dengan struktur informasi korporat yang tegas, padat, dan kredibel.
* **Palet Warna:**
  * **Primary (Deep Ocean Navy):** `#0A2540` — Navigasi utama, tipografi judul, dan footer.
  * **Secondary (Belitung Teal):** `#0D6E8A` — Aksen perairan tropis, lencana sertifikasi, dan indikator status.
  * **Surface (Crisp Ice White):** `#F8FAFC` — Latar belakang bersih agar foto produk terlihat menonjol.
  * **CTA Accent (Coral Amber):** `#D96B43` — Khusus tombol aksi utama (*"Add to Inquiry"*, *"Request Quotation"*).
* **Tipografi:** `Plus Jakarta Sans` (Headings) dipadukan dengan `Inter` (Tabel spesifikasi teknis, HS Code, dan form RFQ).

### 5.2 Struktur Halaman (*Sitemap*)
1. **`/` (Home):** Hero Banner Belitung, ringkasan kapasitas pasokan, komoditas unggulan, ringkasan jalur logistik (Jakarta & Belitung), lencana legalitas/sertifikasi, dan ajakan RFQ.
2. **`/commodities` (Product Catalog):** Katalog lengkap berbasis MySQL dengan filter kategori & metode pembekuan.
3. **`/commodities/[slug]` (Product Detail):** Spesifikasi teknis lengkap, tabel ukuran/grade, informasi pengemasan, dan tombol *Add to Inquiry*.
4. **`/quality-legality` (Quality, Traceability & Legality):** Penjelasan alur *cold chain*, kemitraan UPI, serta daftar lengkap dokumen legalitas & sertifikasi ekspor.
5. **`/logistics` (Export Logistics & Shipping):** Detail jalur *Sea Freight* (`FOB Tanjung Priok` & `FOB Tanjung Pandan`), *Air Freight* (`FOB Soekarno-Hatta CGK`), kapasitas kontainer 20ft/40ft, dan prosedur ekspor.
6. **`/inquiry` (RFQ Cart & Submission):** Keranjang penawaran multi-produk dan formulir pengiriman permintaan harga ke tim **LautMelimpah**.
7. **`/admin` (Internal Dashboard):** Panel pengelolaan database produk, legalitas, dan *leads* RFQ.