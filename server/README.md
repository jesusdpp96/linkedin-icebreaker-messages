# Express TypeScript Starter

This is a modular starter project built with **Node.js**, **Express**, and **TypeScript**. It includes best practices for structure, middleware, and basic routing.

## 🚀 Features

- Express server with TypeScript
- Health check endpoint
- CORS middleware support
- Environment variable support with dotenv
- Hot reload using nodemon
- Modular file structure

---

## 📁 Project Structure

```
src/
├── config/             # Configuration files (e.g., dotenv)
├── middlewares/        # Custom middlewares
├── routes/             # Route definitions
├── app.ts              # Express app configuration
└── server.ts           # Server entry point
```

---

## 🛠️ Prerequisites

- Node.js (v16 or higher)
- npm
- TypeScript configured globally or locally

---

## ⚙️ Setup Instructions

1. **Clone the repository**

Not existing yet, but if it were:

```bash
git clone <your-repo-url>
cd your-repo-folder
```

2. **Install dependencies**

```bash
npm install
```

3. **Set environment variables**

Create a `.env` file in the root directory:

```
PORT=3000
```

4. **Run the development server**

```bash
npm run dev
```

This will start the server with hot reload using `nodemon`.

---

## 📡 Health Check Endpoint

Once the server is running, test the health endpoint:

- **URL:** `http://localhost:3000/api/health`
- **Method:** `GET`
- **Response:**
```json
{
  "status": "ok"
}
```

---

## 🔧 Available Scripts

| Command        | Description                      |
|----------------|----------------------------------|
| `npm run dev`  | Start server in dev mode (nodemon) |

---

## 🧱 Technologies Used

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Nodemon](https://nodemon.io/)
- [CORS](https://www.npmjs.com/package/cors)
- [Dotenv](https://www.npmjs.com/package/dotenv)

---

## 📬 License

This project is open source and available under the [MIT License](LICENSE).

