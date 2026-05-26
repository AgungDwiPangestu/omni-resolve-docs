---
title: Referensi API REST
description: Ringkasan endpoint RESTful API FastAPI yang disediakan oleh OmniResolve-AI untuk integrasi eksternal dan administrasi RAG.
---

Layanan FastAPI OmniResolve-AI berjalan secara bawaan di port `8000` (`http://localhost:8000`) dan menyediakan Swagger UI lengkap di `/docs` untuk memudahkan interaksi dengan API.

---

## 1. Endpoint Keluhan (Complaints API)

Endpoint ini digunakan oleh integrasi pihak ketiga atau Telegram Bot untuk mengirim keluhan pelanggan baru ke pipeline LangGraph.

### `POST /api/v1/complaints`
*   **Fungsi:** Mengirim pesan baru ke sistem untuk langsung dievaluasi oleh multi-agent pipeline.
*   **Request Body:**
    ```json
    {
      "message": "Granit yang saya pesan ORD-QHM-010 pecah 2 dus saat pengiriman",
      "session_id": "session_abc123"
    }
    ```
*   **Response:** `200 OK` dengan session ID pelacakan status.

### `GET /api/v1/complaints/status/{session_id}`
*   **Fungsi:** Melacak status penyelesaian kasus terkini.
*   **Response:** Status state LangGraph lengkap (`liaison_active`, `auditing`, `negotiating`, `resolved`, dll.).

---

## 2. Endpoint Administrasi RAG (Knowledge Admin API)

Endpoint khusus untuk mengelola basis data vektor PgVector. Endpoint ini dipanggil secara asinkron oleh halaman **🗄️ Archive** di Visualizer.

### `POST /api/v1/admin/knowledge/seed`
*   **Fungsi:** Mengisi database PgVector dengan SOP, FAQ, dan Katalog Produk dasar Qhomemart.
*   **Response:**
    ```json
    {
      "message": "Knowledge base seeded successfully",
      "total_ingested": 15
    }
    ```

### `GET /api/v1/admin/knowledge/stats`
*   **Fungsi:** Mengambil statistik data aktif di setiap koleksi vektor.
*   **Response:**
    ```json
    {
      "collections": {
        "sop_policies": { "document_count": 7, "description": "SOP Qhomemart" },
        "faq_patterns": { "document_count": 5, "description": "FAQ Qhomemart" },
        "resolved_cases": { "document_count": 12, "description": "Auto-Feedback Loop" }
      }
    }
    ```

### `POST /api/v1/admin/knowledge/ingest`
*   **Fungsi:** Menambahkan dokumen kustom baru secara manual.
*   **Request Body:**
    ```json
    {
      "collection": "sop_policies",
      "documents": [
        {
          "content": "Kebijakan kompensasi barang keramik rusak: Penggantian baru 100% jika...",
          "metadata": { "source": "manual-upload", "category": "ceramic" }
        }
      ]
    }
    ```

### `DELETE /api/v1/admin/knowledge/{collection}`
*   **Fungsi:** Mengosongkan data di salah satu koleksi vektor vektor (Danger Zone).

---

## 3. Layanan Live Events (SSE / WebSocket)

API ini mentransmisikan perubahan state internal dari LangGraph secara langsung ke Office Visualizer (`http://localhost:8001`).

### `GET /api/v1/visualizer/events`
*   **Fungsi:** Server-Sent Events (SSE) yang menyiarkan pergerakan koordinat sub-agen pixel art saat memproses pengaduan baru.
