---
title: Panduan Memulai Cepat
description: Langkah demi langkah untuk menjalankan dan menguji sistem OmniResolve-AI secara lokal.
---

Dokumen ini memandu Anda untuk menyiapkan, menjalankan, dan menguji sistem **OmniResolve-AI** di mesin lokal Anda menggunakan Docker Compose.

---

## 1. Prasyarat

Sebelum memulai, pastikan perangkat Anda telah terpasang:
- **Docker** & **Docker Compose** (atau Podman / Podman Compose)
- **Node.js** & **npm/bun** (jika ingin menjalankan visualizer secara manual di luar container)
- **Telegram Account** (untuk berinteraksi dengan Bot dan grup operasional)

---

## 2. Salin Konfigurasi Lingkungan (`.env`)

Salin berkas konfigurasi contoh `.env.example` menjadi `.env` di direktori root proyek:

```bash
cp .env.example .env
```

Buka file `.env` tersebut dan lengkapi variabel-variabel wajib berikut:
- `LLM_API_KEY`: API Key SumoPod untuk Claude 3 Haiku.
- `TELEGRAM_BOT_TOKEN`: Token Telegram Bot yang didapatkan dari `@BotFather`.
- `TELEGRAM_ADMIN_CHAT_ID`: Chat ID Telegram Anda untuk menerima persetujuan HITL.

---

## 3. Jalankan Seluruh Layanan dengan Docker

Jalankan perintah berikut di root repositori untuk mendownload, membangun image, dan menjalankan seluruh kontainer (Backend API, Database PostgreSQL + pgvector, dan Office Visualizer):

```bash
docker compose up --build -d
```

### Memverifikasi Status Kontainer

Pastikan ketiga kontainer berjalan lancar dengan status `healthy`:

```bash
docker compose ps
```

Anda akan melihat port layanan yang terpetakan:
- **FastAPI API Backend:** `http://localhost:8000`
- **Office Visualizer:** `http://localhost:8001` (atau versi produksi online di [omniresolve.pixelwar.tech](https://omniresolve.pixelwar.tech/))
- **PostgreSQL Database:** `localhost:5432`

---

## 4. Lakukan Seeding Data Awal

Untuk memuat data uji coba ritel Qhomemart (70+ pesanan, log kurir, log CCTV) dan basis pengetahuan RAG (SOP, FAQ, katalog produk), lakukan seeding awal:

1. **Seed Database Ritel (SQL):**
   ```bash
   docker exec -i omni_postgres psql -U omni_user -d omni_resolve < db/seed.sql
   ```

2. **Seed Basis Pengetahuan RAG (Vektor):**
   Akses visualizer di **`http://localhost:8001`** atau versi produksi online di **`https://omniresolve.pixelwar.tech/`**, masuk ke menu **🗄️ Archive** (masukkan Admin Key), lalu klik tombol **"Seed Initial Data"** di pojok kanan atas.

---

## 5. Uji Coba Simulasi Komplain

1. Cari Telegram Bot Anda di aplikasi Telegram dan ketik `/start`.
2. Kirim pesan pengaduan, misalnya: *"Halo, saya ingin mengadu. Sofa kain saya yang ada di pesanan ORD-QHM-005 datang dalam keadaan basah kuyup karena terpal truk bocor saat hujan deras kemarin."*
3. Buka **Office Visualizer (`http://localhost:8001` atau `https://omniresolve.pixelwar.tech/`)** di browser Anda untuk melihat karakter pixel art dari para sub-agent (Liaison, Auditor, Negotiator, Orchestrator) berinteraksi secara real-time untuk memproses pengaduan Anda!

