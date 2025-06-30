# 🔗 Secure URL Shortener

A Dockerized full-stack URL shortener built with **React (CRA)**, **Express**, and **PostgreSQL**.  
Shorten long URLs and retrieve them via clean short links.

---

## 🧩 Tech Stack

- **Frontend:** React (CRA), Axios
- **Backend:** Node.js, Express, `pg`
- **Database:** PostgreSQL
- **Containerized with:** Docker & Docker Compose

---

## 🗂️ Folder Structure

```
├── backend/
│   ├── Dockerfile
│   ├── .env
│   └── src/
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── .env
│   └── src/
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Environment Setup

### 📁 `backend/.env`

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgres://postgres:postgres@postgres:5432/urlshortener
BASE_URL=http://backend:5000
```

### 📁 `frontend/.env`

```env
REACT_APP_API_BASE_URL=http://backend:5000/api/v1
REACT_APP_REDIRECT_BASE_URL=http://backend:5000
CHOKIDAR_USEPOLLING=true
```

---

## 🐳 Docker Compose Setup

### ✅ Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)

### ▶️ Run the Project

```bash
docker compose up --build
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- PostgreSQL: `localhost:5432`

All services are automatically linked via Docker Compose.

---

## 📌 Available Endpoints

**Method - Endpoint - Description**

- **POST** _/api/v1/shorten_ - **Generate short URL**
- **GET** _/:code_ - **Redirect to original URL**
- **GET** _/api/v1/analytics/:code_ - **Get click count & creation timestamp**

---

## Bonus Implemented

✅ Click Analytics via /analytics/:code

✅ Connection pooling with pg module

✅ Fully dockerized for easy deployment

---

## 📌 Notes

- ⚠️ Don't use `localhost` inside containers — use service names like `backend`, `postgres`.
- 🧠 App is production-ready with multi-stage Docker build and Nginx for frontend.
- 🔁 Restart Docker after updating `.env` files.

---

## 🧪 Test It Out

1. Go to `http://localhost:3000`
2. Paste a long URL
3. Click "Shorten"
4. Get a shortened link like `http://localhost:5000/abc123`

---

## 👨‍💻 Author

Prince Prabhat  
Made with ❤️ and containers 🐳
