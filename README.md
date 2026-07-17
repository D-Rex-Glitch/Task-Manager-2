# TaskFlow - MERN Stack Task Manager

A modern, full-featured **Task Management Web Application** built with the MERN stack (MongoDB, Express, React, Node.js).

## ✨ Features

- ✅ **Add, Edit & Delete Tasks** with full form validation
- 📋 **Task Fields**: Title, Description, Priority (High/Medium/Low), Due Date, Status
- 🔄 **Status Management**: Pending → In Progress → Completed (with checkbox toggle)
- 🔍 **Filter & Search**: Filter by Priority, Status, or search by keyword
- 📊 **Stats Dashboard**: Live counts of tasks by status
- ⚠️ **Overdue Detection**: Tasks past due date are highlighted in red
- 💾 **MongoDB Atlas**: Cloud-based persistent data storage
- 📱 **Fully Responsive**: Works on mobile, tablet, and desktop
- 🎨 **Premium Dark UI**: Glassmorphism design with smooth animations

---

## 🛠️ Tech Stack

| Layer     | Technology                    |
|-----------|-------------------------------|
| Frontend  | React 18, Vite, Axios         |
| Backend   | Node.js, Express.js           |
| Database  | MongoDB Atlas (Mongoose ODM)  |
| Styling   | Vanilla CSS (Glassmorphism)   |
| Fonts     | Plus Jakarta Sans (Google)    |

---

## 📁 Project Structure

```
Task Manager/
├── backend/
│   ├── models/
│   │   └── Task.js          # Mongoose Task schema
│   ├── routes/
│   │   └── tasks.js         # CRUD API routes
│   ├── server.js            # Express server entry point
│   ├── .env                 # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── tasks.js     # Axios API client
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── StatsPanel.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   └── TaskForm.jsx
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

---

## 🚀 Setup & Installation

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the Repository

```bash
git clone https://github.com/D-Rex-Glitch/Task-Manager-2.git
cd Task-Manager-2
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory (already included):

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.hu5qazm.mongodb.net/taskmanager?retryWrites=true&w=majority
PORT=5000
```

Start the backend server:

```bash
npm run dev     # Development (with nodemon auto-reload)
# or
npm start       # Production
```

The API will be running at: `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will be running at: `http://localhost:5173`

> **Note**: Vite's dev proxy automatically forwards `/api` requests to `http://localhost:5000`, so no CORS configuration is needed.

---

## 📡 API Endpoints

| Method | Endpoint          | Description                        |
|--------|-------------------|------------------------------------|
| GET    | `/api/tasks`      | Get all tasks (supports filtering) |
| GET    | `/api/tasks/:id`  | Get a single task by ID            |
| POST   | `/api/tasks`      | Create a new task                  |
| PUT    | `/api/tasks/:id`  | Update an existing task            |
| DELETE | `/api/tasks/:id`  | Delete a task                      |
| GET    | `/api/health`     | Health check                       |

### Filter Query Parameters (GET `/api/tasks`)

| Parameter  | Values                         | Example                    |
|------------|--------------------------------|----------------------------|
| `priority` | `High`, `Medium`, `Low`        | `?priority=High`           |
| `status`   | `Pending`, `In Progress`, `Completed` | `?status=Pending`   |
| `search`   | Any string                     | `?search=meeting`          |

---

## 🗃️ Task Schema

```json
{
  "_id": "ObjectId",
  "title": "String (required, max 100 chars)",
  "description": "String (optional, max 500 chars)",
  "priority": "High | Medium | Low",
  "status": "Pending | In Progress | Completed",
  "dueDate": "Date (required)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

---

## 🎨 UI Features

- **Dark glassmorphism** design with deep navy & purple accent theme
- **Priority color coding**: 🔴 High | 🟡 Medium | 🟢 Low
- **Status badges** with distinct colors
- **Overdue task highlighting** in red with 🚨 icon
- **Due soon** warning (within 3 days) with ⚠️ icon
- **Checkbox toggle** to quickly mark tasks complete
- **Smooth animations** on card hover and modal open
- **Toast notifications** for all actions
- **Responsive grid layout** for all screen sizes

---

## 👨‍💻 Development Scripts

### Backend
```bash
npm run dev    # Start with nodemon (auto-reload)
npm start      # Start without auto-reload
```

### Frontend
```bash
npm run dev     # Start Vite dev server
npm run build   # Build for production
npm run preview # Preview production build
```

---

## 🔧 Troubleshooting

**MongoDB connection fails:**
- Check that your IP is whitelisted in MongoDB Atlas Network Access
- Verify the `MONGO_URI` in your `.env` file
- Ensure the database user has read/write permissions

**Frontend can't reach backend:**
- Make sure the backend server is running on port 5000
- The Vite proxy handles `/api` forwarding automatically

---

## 📄 License

MIT License - feel free to use and modify.
