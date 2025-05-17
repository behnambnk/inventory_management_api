# Inventory Management API

This is the backend REST API for the Inventory Management system, built with **Node.js**, **Express**, and **MongoDB** using **Mongoose**. It supports user authentication, item management, and category management.

---

## 📦 Features

- User registration and login (JWT-based auth)
- CRUD for items and categories
- Mongoose models with relationships
- Express middleware (auth, error handling)
- MongoDB Atlas integration
- Designed for deployment on QUT IFN666 web server with Caddy

---

## 📁 Project Structure

```
src/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
```

---

## 🔧 Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create a `.env` file

```
PORT=3001
MONGODB_URI=<your MongoDB Atlas URI>
JWT_SECRET=<your_secret>
```

### 3. Start the server

```bash
npm run dev
```

---

## 🚀 Deployment (QUT Server)

- Exposed at:  
  `https://n11404329.ifn666.com/assessment02/api`

- Reverse proxy via Caddy:
```caddy
handle_path /assessment02/api/* {
  reverse_proxy localhost:3001
}
```

- For persistent dev server without systemd:

```bash
nohup npm run dev > ~/api.log 2>&1 &
```

---

## 📫 API Endpoints

| Method | Endpoint              | Description            |
|--------|-----------------------|------------------------|
| POST   | `/api/auth/signup`    | Register user          |
| POST   | `/api/auth/login`     | Login user             |
| GET    | `/api/items`          | Get all items          |
| POST   | `/api/items`          | Create item            |
| GET    | `/api/categories`     | Get all categories     |
| POST   | `/api/categories`     | Create category        |

> All `/items` and `/categories` routes require auth.

---

## 🧪 Test API with Hoppscotch

Import the collection file and use:
- Base URL: `https://n11404329.ifn666.com/assessment02/api`

---

## 📝 License

MIT
