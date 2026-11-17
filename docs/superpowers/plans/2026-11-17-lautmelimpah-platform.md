# LautMelimpah Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bangun platform web B2B LautMelimpah (Next.js) — katalog komoditas, Inquiry List + RFQ, halaman legalitas & logistik, admin panel — siap deploy container, DB di container MySQL yang sudah ada.

**Architecture:** Next.js 15 App Router (semua route server-rendered, Server Actions untuk mutasi), Prisma ORM ke MySQL container eksternal (`mysql_net`), state Inquiry List di client (zustand + localStorage), RFQ dikirim via Server Action → simpan DB → email Resend. Admin: login cookie signed `jose`, CRUD produk/dokumen/leads.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, framer-motion, zustand, @prisma/client, Resend, jose, zod, vitest, Docker (node:22-alpine), Docker Compose.

**Spec:** `prd_lautmelimpah_seafood_export_platform.md` (fitur & skema) + `design.md` (keputusan desain klien) + `AGENTS.md` (rules). Ketiganya wajib dibaca executor sebelum Task 1.

## Global Constraints

**Sumber kebenaran (jangan melanggar):**
- Skema tabel & nama kolom: PRD §4.2 **verbatim** (`categories`, `products`, `compliance_documents`, `inquiries`, `inquiry_items` + kolomnya). Jangan rename.
- Palet/tema: `design.md` §3 — off-white `#F7F7F7`, ink `#0D2A1C`, accent `#F6E016`, font Source Serif 4 + Libre Franklin, radius `soft`.
- Bahasa UI: **English** saja. Harga tidak pernah tampil; CTA satu label: `Request a quotation`.
- Dilarang mengarang: angka kapasitas/stok, testimoni, rating, logo klien, statistik (design.md §7).

**Anti-halusinasi (untuk executor model kecil/junior) — WAJIB:**
1. Hanya buat/ubah file yang tertulis di task. File lain = JANGAN disentuh.
2. Hanya install dependency yang tertulis di task, versi persis. DILARANG menambah dep lain "biar enak".
3. Setiap langkah "Run:" punya "Expected:". Kalau output ≠ expected, BERHENTI dan laporkan — jangan improve-sendiri, jangan ganti perintah.
4. Jangan mengarang nama file/API/flag yang tidak tertulis. Kalau butuh sesuatu yang tidak ada di plan, berhenti dan tanya.
5. Copy potongan kode di plan **verbatim**. Bagian yang plan bilang "implement body" = tulis sendiri minimal, bukan salin dari proyek lain.
6. Jangan refactor/menghapus kode di luar scope task, walau "terlihat jelek".
7. Satu commit per task, pesan commit sesuai template task. `git add` hanya file task itu.
8. Kalau browser/error beda dari Expected lebih dari typo, STOP — jangan "fix" dengan menambah library.

**Infra tetap:**
- DB: container **sudah ada** bernama `mysql` (mysql:8.4), network `mysql_net`, user `app` / password `app` / database baru `lautmelimpah`. App container join network eksternal `mysql_net` — JANGAN buat container MySQL baru, JANGAN install MySQL lokal.
- `DATABASE_URL=mysql://app:app@mysql:3306/lautmelimpah` (di `.env`, tidak di-commit).
- Deploy: Dockerfile multi-stage `node:22-alpine`, `output: 'standalone'`, port 3000.
- Email: Resend. Tanpa `RESEND_API_KEY` → mode dev: log email ke console, TIDAK error (agar task bisa dites lokal).

**Versi terkunci (jangan upgrade):** next `15.x` hasil `create-next-app@latest` pada hari scaffold (lockfile mengunci), prisma `6.x`, zustand `5.x`, zod `3.x`/`4.x` (apa pun yang `npm i` pasang hari itu), framer-motion `12.x`, resend `4.x`, jose `6.x`, vitest `3.x`, tailwind `4.x` bawaan scaffold.

## Review Focus

1. **RFQ tanpa produk / kuantitas kosong** — Server Action wajib menolak (zod) dan form menampilkan error per field, bukan crash 500. → Task 7 test.
2. **Email gagal kirim (Resend 4xx)** — RFQ tetap tersimpan di DB, user tetap dapat konfirmasi, error hanya di log server. → Task 7 test.
3. **Inquiry List hilang saat refresh** — cart wajib persist di localStorage dan rehidrasi tanpa duplikat item. → Task 6 test.
4. **Slug produk duplikat/URL aneh** — `[slug]` 404 rapi untuk slug tak dikenal. → Task 5 test.
5. **Admin tanpa login** — semua route `/admin/*` (kecuali `/admin/login`) redirect ke login; akses langsung ke Server Action admin ditolak. → Task 9 test.

---

### Task 1: Scaffold Next.js + Tailwind + token tema

**Files:**
- Create: seluruh scaffold `create-next-app` di root repo (folder kerja saat ini, di samping PRD)
- Create: `src/app/globals.css` (timpa token tema)
- Create: `.env` (gitignored), `.env.example`

**Interfaces:**
- Produces: app Next.js 15 App Router TypeScript + Tailwind, `npm run dev` jalan di :3000, token CSS variable tema (`--background:#F7F7F7; --foreground:#0D2A1C; --primary:#F6E016; --radius:0.625rem`).

- [ ] **Step 1: Scaffold**

```bash
cd /home/aptika/project/eksporlaut-porto
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-turbopack
```

Expected: folder `src/app`, `package.json` berisi `"next": "15."`. Kalau ada prompt interaktif menjawab default Enter; kalau folder tidak kosong ditanya, pilih overwrite file konflik saja.

- [ ] **Step 2: Install deps inti (versi mayor sesuai Global Constraints)**

```bash
npm i zustand zod framer-motion resend jose @prisma/client
npm i -D prisma vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom
```

Expected: exit 0, `package.json` berisi semua nama di atas.

- [ ] **Step 3: shadcn/ui init + komponen yang dipakai**

```bash
npx shadcn@latest init -d
npx shadcn@latest add button card badge table label input textarea select drawer dialog dropdown-menu form toast
```

Expected: `src/components/ui/` berisi `button.tsx`, `card.tsx`, `badge.tsx`, `table.tsx`, `label.tsx`, `input.tsx`, `textarea.tsx`, `select.tsx`, `drawer.tsx`, `dialog.tsx`, `dropdown-menu.tsx`, `form.tsx`, `toast.tsx` (atau `sonner.tsx` bila init memilih sonner — boleh salah satu).

- [ ] **Step 4: Token tema di `src/app/globals.css`**

Ganti blok `:root` bawaan shadcn dengan nilai persis:

```css
:root {
  --background: #F7F7F7;
  --foreground: #0D2A1C;
  --card: #FFFFFF;
  --card-foreground: #0D2A1C;
  --primary: #0D2A1C;
  --primary-foreground: #F7F7F7;
  --secondary: #EBEBEB;
  --secondary-foreground: #0D2A1C;
  --muted: #EBEBEB;
  --muted-foreground: #5F6B64;
  --accent: #F6E016;
  --accent-foreground: #0D2A1C;
  --destructive: #B3261E;
  --border: rgba(13,42,28,0.14);
  --input: rgba(13,42,28,0.20);
  --ring: #0D2A1C;
  --radius: 0.625rem;
}
```

Catatan desain (design.md §3): accent kuning `#F6E016` HANYA untuk CTA besar/fokus; teks biasa tidak boleh kuning. Tambahkan di bawah blok: `@theme inline { --font-display: "Source Serif 4", Georgia, serif; --font-sans: "Libre Franklin", system-ui, sans-serif; }` dan link Google Fonts dua family itu di `src/app/layout.tsx` (`<link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400..700&family=Libre+Franklin:wght@400..600&display=swap" rel="stylesheet" />`).

- [ ] **Step 5: Env**

`.env` (dan salin ke `.env.example` tanpa nilai rahasia):

```
DATABASE_URL="mysql://app:app@mysql:3306/lautmelimpah"
ADMIN_EMAIL="admin@lautmelimpah.example"
ADMIN_PASSWORD_HASH=""
RESEND_API_KEY=""
RFQ_SALES_INBOX="sales@lautmelimpah.example"
```

Pastikan `.gitignore` sudah berisi `.env` (bawaan scaffold Next sudah).

- [ ] **Step 6: Verifikasi**

```bash
npm run build
```

Expected: `✓ Compiled successfully` dan `Generating static pages` tanpa error.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "chore: scaffold next.js 15 + tailwind + shadcn with lautmelimpah tokens"
```

---

### Task 2: Docker + koneksi MySQL container

**Files:**
- Create: `Dockerfile`, `docker-compose.yml`, `.dockerignore`

**Interfaces:**
- Consumes: Task 1 app (`output: 'standalone'` di `next.config.ts`).
- Produces: `docker compose up -d --build` → app di `:3000`, terhubung ke MySQL `mysql_net`, bisa `npm run db:push` dari host.

- [ ] **Step 1: `next.config.ts`**

```ts
import type { NextConfig } from "next";
const nextConfig: NextConfig = { output: "standalone" } satisfies NextConfig;
export default nextConfig;
```

- [ ] **Step 2: `Dockerfile`** (multi-stage persis):

```dockerfile
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production PORT=3000
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

- [ ] **Step 3: `docker-compose.yml`** (network eksternal, TANPA service mysql):

```yaml
services:
  web:
    build: .
    ports: ["3000:3000"]
    env_file: .env
    networks: [mysql_net]
networks:
  mysql_net:
    external: true
```

`.dockerignore`: `node_modules`, `.next`, `.git`, `.env`.

- [ ] **Step 4: Buat database `lautmelimpah` di container yang ada**

```bash
docker exec mysql mysql -uapp -papp -e "CREATE DATABASE IF NOT EXISTS lautmelimpah CHARACTER SET utf8mb4;"
```

Expected: exit 0, output kosong. Error "Access denied" → STOP, lapor.

- [ ] **Step 5: Verifikasi container jalan**

```bash
docker compose up -d --build && sleep 5 && curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
```

Expected: `200`.

- [ ] **Step 6: Commit**

```bash
git add Dockerfile docker-compose.yml .dockerignore next.config.ts && git commit -m "feat: dockerize app on existing mysql_net"
```

---

### Task 3: Skema Prisma + seed

**Files:**
- Create: `prisma/schema.prisma`, `prisma/seed.ts`, script `db:*` di `package.json`
- Test: `prisma/seed.verify.test.ts` (vitest, cek koneksi + jumlah baris seed)

**Interfaces:**
- Produces: model `Category`, `Product`, `ComplianceDocument`, `Inquiry`, `InquiryItem` — nama tabel & kolom **persis PRD §4.2**, enum sama (`AVAILABLE|SEASONAL|LIMITED`, `FOB_JAKARTA|FOB_BELITUNG|CIF|CNF`, `SEA_REEFER|AIR_CARGO`, `NEW|QUOTED|NEGOTIATING|CLOSED_WON|CLOSED_LOST`, `COMPANY_LEGALITY|FOOD_SAFETY|EXPORT_CERTIFICATE`). Tipe Prisma: `Int @id @default(autoincrement())`, `DateTime @default(now())`, string wajib sesuai PRD.
- Produces: 6 kategori (Reef Fish, Crustaceans, Cephalopods, Pelagic, Dried Seafood) + 6 produk dari tabel PRD §2 (nama Latin, HS code, size grade, MOQ, availability), 6 dokumen legalitas PRD §3.4 (NIB, NPWP, HACCP, SKP, HC/BPPMHKP, Halal BPJPH, COO, SHTI).

- [ ] **Step 1: `prisma/schema.prisma`** dengan `generator client` + `datasource db { provider = "mysql"; url = env("DATABASE_URL") }` dan 5 model di atas (relasi: Product.category Category @relation(fields:[categoryId], references:[id]), Inquiry.items InquiryItem[], InquiryItem.inquiry + InquiryItem.product, onDelete sesuai PRD: inquiry CASCADE, product RESTRICT).

- [ ] **Step 2: Migrate + generate**

```bash
npx prisma migrate dev --name init
```

Expected: `✔ Generated Prisma Client`, tabel `categories products compliance_documents inquiries inquiry_items` terbentuk. Tambahkan `"db:push": "prisma db push", "db:seed": "tsx prisma/seed.ts", "db:studio": "prisma studio"` di `package.json` scripts + `npm i -D tsx`.

- [ ] **Step 3: `prisma/seed.ts`** — upsert data Interfaces di atas (produk: slug kebab-case dari name_en, `image_url` sementara `/img/placeholder.svg`, `is_featured` true untuk grouper/crab/squid). Jalankan `npm run db:seed`; Expected: exit 0.

- [ ] **Step 4: Test koneksi & seed**

`prisma/seed.verify.test.ts`: import `PrismaClient`, hitung `product.count()` → expect `6`, `complianceDocument.count()` → expect `≥6`, `category.count()` → expect `6`. Tambah vitest config minimal (`vitest.config.ts` environment node, `test.include` `**/*.test.ts`).

```bash
npx vitest run prisma
```

Expected: 1 file passed.

- [ ] **Step 5: Commit** — `git add prisma package.json package-lock.json vitest.config.ts && git commit -m "feat: prisma schema + seed from PRD 4.2"`

---

### Task 4: Layout shell + nav + footer + InquiryDrawer kosong

**Files:**
- Create: `src/components/site/navbar.tsx`, `src/components/site/footer.tsx`, `src/components/site/inquiry-drawer.tsx`, `src/lib/inquiry-store.ts`
- Modify: `src/app/layout.tsx`
- Test: `src/lib/inquiry-store.test.ts`

**Interfaces:**
- Produces: `useInquiryStore` (zustand + persist localStorage): `{ items: InquiryItem[]; add(productId: number, name: string, form?: string, size?: string): void; remove(productId: number): void; setQuantity(productId: number, q: string): void; clear(): void }`; `InquiryItem = { productId: number; name: string; requestedForm?: string; requestedSize?: string; estimatedQuantity: string }`.
- Produces: `Navbar` (link: Commodities, Quality & Legality, Logistics; tombol primary `Request a quotation` → `/inquiry`; ikon drawer `Inquiry (n)`), `InquiryDrawer` (Drawer shadcn dari kanan; dipicu tombol nav; isi nanti Task 6).

- [ ] **Step 1: Test store dulu (TDD)** — `inquiry-store.test.ts`: add 2 item beda productId → length 2; add productId sama → length 2, quantity tetap satu entri (update bukan duplikat); remove → length berkurang; setQuantity mengubah field. Jalankan `npx vitest run src/lib` → Expected FAIL (file belum ada).

- [ ] **Step 2: Implement `src/lib/inquiry-store.ts`** (zustand `create` + `persist` middleware, name `"lautmelimpah-inquiry"`). `npx vitest run src/lib` → Expected PASS.

- [ ] **Step 3: Navbar + Footer + InquiryDrawer** pakai komponen shadcn (`Button`, `Badge`, `Drawer`); footer 3 kolom link halaman + baris legal `© 2026 LautMelimpah` + `Photographs via Wikimedia Commons` (selama masih stand-in). Mount keduanya di `layout.tsx`, `<html lang="en">`.

- [ ] **Step 4: Verifikasi** — `npm run build` Expected ✓; buka `http://localhost:3000`: nav & footer tampil, klik ikon drawer membuka drawer kosong bertuliskan `Your inquiry list is empty.`

- [ ] **Step 5: Commit** — `git add src/components src/lib src/app/layout.tsx && git commit -m "feat: site shell with inquiry store and drawer"`

---

### Task 5: Katalog — `/commodities` + `/commodities/[slug]`

**Files:**
- Create: `src/app/commodities/page.tsx`, `src/app/commodities/[slug]/page.tsx`, `src/components/site/product-card.tsx`, `src/components/site/spec-table.tsx`
- Modify: `src/app/page.tsx` (section preview 3 produk featured)
- Test: `src/app/commodities/page.test.tsx`

**Interfaces:**
- Consumes: Prisma models Task 3, `useInquiryStore.add` Task 4, komponen shadcn.
- Produces: `ProductCard({ product }: { product: Product & { category: Category } })` — foto, `Badge` kategori, nama + latin (italic), `Badge` outline `Price upon request`, tombol `Add to Inquiry List`; `SpecTable({ product })` — rows: HS Code, Size/Grading, Product Forms, Freezing, Packaging, MOQ, Availability (+peak_months bila SEASONAL).

- [ ] **Step 1: Halaman list** — server component; `prisma.product.findMany({ include: { category: true }, orderBy: { id: 'asc' } })`; filter via `searchParams` (`?category=<slug>`, `?freezing=<substring>` pada `freezing_methods`) pakai `where` bersyarat. Judul `Commodities`; subjudul `Six commodities from Belitung waters. Prices on request.`

- [ ] **Step 2: Halaman detail** — `findUnique({ where: { slug } })`; `null` → `notFound()`; tampil foto kiri, `SpecTable` kanan (6/6 grid), tombol `Add to Inquiry List` (client component kecil `AddToInquiryButton` yang panggil store + toast `Added to inquiry list`), `Link` sekunder `Request a quotation` → `/inquiry`.

- [ ] **Step 3: Preview di home** — `src/app/page.tsx`: hero sesuai arah Task 6, section `Featured commodities` = 3 kartu `is_featured: true`.

- [ ] **Step 4: Test route** — `page.test.tsx` (jsdom): mock module prisma (vi.mock) return 1 produk; render halaman list; expect teks nama produk dan `Price upon request` muncul. `npx vitest run src/app` → Expected PASS.

- [ ] **Step 5: Verifikasi manual** — `npm run dev`; `/commodities` tampil 6 kartu; klik satu → detail dengan spec table; slug ngawur `/-x` → halaman 404.

- [ ] **Step 6: Commit** — `git add src/app src/components/site && git commit -m "feat: commodity catalog and detail pages"`

---

### Task 6: ⏸ DESIGN GATE — Home page hero + visual (impeccable) — BERHENTI UNTUK USER

**Files:**
- Modify: `src/app/page.tsx` (hero + sections home), `src/components/site/bubbles.tsx` (Create)
- Brief: `design.md` §2–§4 (palet D, gelembung diving, 5 section: hero/source/commodities preview/cold chain/close)

**ATURAN KHUSUS TASK INI:** gunakan skill **impeccable** (`npx impeccable` / skill file `~/.omp/agent/skills/impeccable/`) mode *Persuade*: `impeccable context` → new-work → `generate` 2–3 varian visual untuk (a) hero home, (b) section cold-chain. Varian disajikan LIVE di browser (`impeccable live` / dev server :3000 + halaman `/design-preview` berisi varian berdampingan, route sementara yang dihapus di Step akhir).

**Interfaces:**
- Consumes: token tema Task 1, `ProductCard` Task 5, data `prisma` (featured products), framer-motion.
- Produces: home final terpilih; `Bubbles` client component (framer-motion, 12 span naik, tombol `Pause`, `useReducedMotion` → tanpa animasi).

- [ ] **Step 1: `npx impeccable context`** di cwd project; ikuti arahannya untuk surface `home` mode Persuade; baca `design.md` sebagai brief.

- [ ] **Step 2: Build varian** di route sementara `src/app/design-preview/page.tsx`: Varian A/B/C hero (A: foto full-bleed + box teks solid + bubbles; B: split 6/6 foto + teks di ground; C: statement tipografi besar di ground off-white + strip foto) — semua pakai copy hero design.md §5 (h1 `Belitung seafood exporter`, lead `For international buyers…6 commodities…`), tombol `Request a quotation` + `See the commodities`.

- [ ] **Step 3: Bubbles component** hanya aktif di varian A: `motion.span` animasi `y: ["110vh","-10vh"]` durasi acak 9–14s, `repeat: Infinity`, tombol pause toggle `aria-pressed`, `useReducedMotion()` true → render tanpa motion.

- [ ] **Step 4: 🛑 STOP POINT — minta user cek browser**

Jalankan `npm run dev` dan beri tahu user: buka `http://localhost:3000/design-preview`, pilih varian hero (+ varian cold-chain bila dibuat). **JANGAN lanjut Step 5 sebelum user menjawab.** Catat pilihan user di `design.md` §3 baris baru: `> Pilihan final user (tanggal): Varian X karena …`.

- [ ] **Step 5: Terapkan varian terpilih** di `src/app/page.tsx` (hero terpilih + section source/commodities/cold-chain/close sesuai design.md §4), hapus `src/app/design-preview/`.

- [ ] **Step 6: Verifikasi** — `npm run build` ✓; screenshot manual 1440 & 390 (browser devtools): hero satu layar penuh, tombol terlihat tanpa scroll, bubbles jalan dan bisa di-pause.

- [ ] **Step 7: Commit** — `git add src/app src/components/site design.md && git commit -m "feat: home page with user-selected hero design"`

---

### Task 7: RFQ — `/inquiry` + Server Action + email Resend

**Files:**
- Create: `src/app/inquiry/page.tsx`, `src/app/inquiry/actions.ts`, `src/lib/email.ts`, `src/lib/rfq-schema.ts`
- Test: `src/app/inquiry/actions.test.ts`, `src/lib/rfq-schema.test.ts`

**Interfaces:**
- Consumes: `useInquiryStore` Task 4, Prisma Task 3.
- Produces: `submitRfq(input: RfqInput): Promise<{ ok: true; code: string } | { ok: false; fieldErrors: Partial<Record<keyof RfqInput, string>> }>`; `RfqInput = { buyerName, companyName, country, email, phoneWhatsapp?, preferredIncoterm, shippingMode, destinationPort?, additionalNotes?, items: { productId: number; requestedForm?: string; requestedSize?: string; estimatedQuantity: string }[] }` (zod schema `rfqSchema`, semua enum sesuai PRD §4.2). `inquiry_code` format `RFQ-<YYYYMMDD>-<4 char random uppercase>`.

- [ ] **Step 1: Test zod schema (TDD)** — `rfq-schema.test.ts`: valid payload pass; `items: []` → fieldError di `items`; email tanpa `@` → error; estimatedQuantity kosong → error per item. Run → FAIL.

- [ ] **Step 2: Implement `rfq-schema.ts`** → Run → PASS.

- [ ] **Step 3: Test action (TDD)** — `actions.test.ts`: vi.mock `@/lib/email` (`sendRfqEmails = vi.fn().mockResolvedValue({ delivered: true })`) dan mock prisma; case 1 valid → `{ ok: true, code: "RFQ-…" }` dan `inquiry.create` dipanggil dengan `inquiry_code` match `/^RFQ-\d{8}-[A-Z]{4}$/`; case 2 `sendRfqEmails` reject → tetap `{ ok: true }` (email gagal tidak gagalkan RFQ, hanya `console.error`). Run → FAIL.

- [ ] **Step 4: Implement `actions.ts`** (validate → generate code → `prisma.$transaction` create inquiry + items → try/catch email) dan `email.ts` (`sendRfqEmails`: Resend bila `process.env.RESEND_API_KEY` ada — `resend.emails.send` 2 email: ke `RFQ_SALES_INBOX` (ringkasan item) + ke buyer (konfirmasi); else `console.log("[dev-email]", …)` return `{ delivered: false }`). Run test → PASS.

- [ ] **Step 5: Halaman `/inquiry`** — render item dari store (form/size/quantity editable, tombol remove), di bawahnya form RFQ (react-hook-form + zodResolver atau controlled sederhana; field label persis: Buyer name, Company, Country, Email, Phone/WhatsApp (optional), Incoterm (Select), Shipping mode (Select), Destination port (optional), Notes (optional)); submit → panggil `submitRfq`; sukses → tampilkan `Request received. Your reference: <code>.` + `store.clear()`; gagal → error di bawah field terkait (`aria-describedby`).

- [ ] **Step 6: Verifikasi manual** — dev server, isi form penuh → sukses; cek `npm run db:studio` row `inquiries` + `inquiry_items` ada; console menunjukkan `[dev-email]`.

- [ ] **Step 7: Commit** — `git add src/app/inquiry src/lib && git commit -m "feat: RFQ inquiry page, server action and email"`

---

### Task 8: Halaman statis — `/quality-legality` + `/logistics`

**Files:**
- Create: `src/app/quality-legality/page.tsx`, `src/app/logistics/page.tsx`, `src/components/site/cold-chain.tsx`
- Modify: tidak ada

**Interfaces:**
- Consumes: Prisma `compliance_documents` Task 3, gaya section Task 6.
- Produces: dua halaman konten PRD §3.3–§3.4 verbatim structure (bukan kata-per-kata): Quality & Legality = intro cold chain + grid dokumen dari DB (badge per `document_type`); Logistics = 2 kolom Sea Freight (FOB Tanjung Priok, FOB Tanjung Pandan, CIF/CNF) & Air Freight (CGK via TJQ, 24–36 jam).

- [ ] **Step 1: quality-legality** — server component; `findMany({ where: { isActive: true }, orderBy: { id: 'asc' } })`; kartu per dokumen: judul, `Badge` issuer, nomor registrasi (atau `Registered` bila null), deskripsi singkat. Section `Cold chain` pakai `ColdChain` (3 langkah: Landed & chilled → Certified UPI processing → Reefer/Air freight) — copy dari design.md §5 tanpa angka rekaan.

- [ ] **Step 2: logistics** — dua `Card` besar (Sea / Air) berisi rute sebagai `SpecTable`-style rows (Port, Incoterm, Typical use); catatan container 20ft/40ft reefer; tanpa tabel harga.

- [ ] **Step 3: Verifikasi** — `npm run build` ✓; buka kedua route: semua dokumen seed tampil, nav link aktif.

- [ ] **Step 4: Commit** — `git add src/app/quality-legality src/app/logistics src/components/site/cold-chain.tsx && git commit -m "feat: quality-legality and logistics pages"`

---

### Task 9: Admin — login + produk + leads

**Files:**
- Create: `src/app/admin/login/page.tsx`, `src/app/admin/layout.tsx`, `src/app/admin/page.tsx` (dashboard), `src/app/admin/products/page.tsx`, `src/app/admin/leads/page.tsx`, `src/app/admin/actions.ts`, `src/lib/auth.ts`, `src/middleware.ts`
- Test: `src/lib/auth.test.ts`, `src/app/admin/actions.test.ts`

**Interfaces:**
- Produces: `createSessionToken(email: string): Promise<string>` / `verifySessionToken(token: string): Promise<{ email: string } | null>` (jose HS256, secret `process.env.ADMIN_SESSION_SECRET`, exp 8 jam, cookie `admin_session` httpOnly). `requireAdmin()` dipanggil awal SETIAP admin action → throw redirect bila invalid. Login: bandingkan `ADMIN_EMAIL` + `ADMIN_PASSWORD_HASH` (sha256 hex dari env; dev: simpan hash sha256 "admin123" di `.env`, tulis nilainya saat Task ini).
- Admin pages: dashboard (count leads per status), products (Table + Dialog form create/edit: semua field produk; delete dengan confirm; toggle `is_featured`), leads (Table inquiries + items expand, Select status → action `updateLeadStatus`).

- [ ] **Step 1: Test auth (TDD)** — `auth.test.ts`: `await createSessionToken("a@b.c")` → string JWT 3 segmen; `verifySessionToken` dengan secret sama → `{ email: "a@b.c" }`; secret beda → null. Run → FAIL.

- [ ] **Step 2: Implement `auth.ts`** → PASS.

- [ ] **Step 3: Test guard action (TDD)** — `actions.test.ts`: mock auth `verifySessionToken → null`; panggil `updateLeadStatus` → expect throw/redirect. Run → FAIL.

- [ ] **Step 4: Implement `actions.ts` + middleware + halaman** → PASS. Middleware: semua `/admin/*` kecuali `/admin/login` tanpa cookie valid → redirect `/admin/login`.

- [ ] **Step 5: Verifikasi manual** — `/admin` tanpa login → redirect; login `ADMIN_EMAIL`/`admin123` → dashboard; buat 1 produk baru → muncul di `/commodities`; ubah status 1 lead → tersimpan.

- [ ] **Step 6: Commit** — `git add src/app/admin src/lib/auth.ts src/middleware.ts && git commit -m "feat: admin auth, product management and lead pipeline"`

---

### Task 10: Deploy container final + dokumentasi

**Files:**
- Create: `README.md` (section: dev, db, deploy, env vars), `.env.example` (lengkapi `ADMIN_SESSION_SECRET`)
- Modify: `docker-compose.yml` (pastikan `depends_on` tidak dipakai ke mysql; restart policy `unless-stopped`)

**Interfaces:**
- Consumes: semua task.

- [ ] **Step 1: `.env.example` final** — semua var Global Constraints + `ADMIN_SESSION_SECRET=""` (catatan: isi `openssl rand -hex 32`).

- [ ] **Step 2: `docker compose up -d --build`** dari bersih (`docker compose down`) → `curl -w "%{http_code}" localhost:3000` Expected `200`; `/commodities` `200`; `/admin` redirect `307` ke login.

- [ ] **Step 3: README** — cara jalan dev (`npm i`, `.env`, `docker exec mysql mysql -uapp -papp -e "CREATE DATABASE …"`, `npx prisma migrate dev`, `npm run db:seed`, `npm run dev`), cara deploy (`docker compose up -d --build`), daftar env var + cara generate secret/hash password admin (`echo -n "password" | sha256sum`).

- [ ] **Step 4: Commit** — `git add README.md .env.example docker-compose.yml && git commit -m "docs: deployment and dev setup on existing mysql container"`

---

## Eksekusi

Urutan wajib: Task 1→10; Task 6 punya **STOP POINT untuk user** (pilih desain di browser) — executor tidak boleh melewatinya. Setelah Task 10: `git log --oneline` = 10 commit fitur + review branch.
