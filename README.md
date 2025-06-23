# 🧠 BE-AMASTORE — Backend API for Online Product Dashboard

This is a backend API built with **Express.js**, **MongoDB Atlas**, and **Backblaze B2** for file/image uploads. Deployed on **Vercel** as serverless functions or as a Dockerized container in production environments.  
This API powers the Admin Dashboard and Public Katalog Frontend (Next.js or other frontend).

---

## 🛠️ Tech Stack

- ⚙️ **Express.js** — REST API
- 🌱 **MongoDB Atlas** — Cloud Database
- ☁️ **Backblaze B2 S3** — File/image upload
- 🧪 **Vercel Functions** — Serverless API deployment
- 📦 **Docker Compose** — For containerized development
- 🔐 **JWT (Optional)** — For admin authentication
- 📈 **Prometheus** — Metrics scraping and monitoring
- 📊 **Grafana** — Metrics dashboard and visualization

---

## 🚀 Live Deployment

API Base URL:  
`https://be-amastore.vercel.app/api`

---

## 📊 Monitoring (Prometheus + Grafana)

This backend integrates **Prometheus** and **Grafana** for real-time monitoring of system metrics.

### 🔍 Metrics Provided
- Total HTTP requests (`http_requests_total`)
- CPU usage (`process_cpu_seconds_total`)
- Memory usage (`process_resident_memory_bytes`)
- Event loop lag (`nodejs_eventloop_lag_seconds`)
- MongoDB connection state via `/ping-db` endpoint

### 📦 Setup (Dockerized)

Prometheus and Grafana are included via Docker Compose:

```bash
docker-compose up --build
