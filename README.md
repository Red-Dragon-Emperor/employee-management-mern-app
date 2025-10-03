# Employee Management MERN App

This is a full-stack **Employee Management Application** built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). The app allows users to **add**, **view**, **edit**, and **delete** employee records.

---

## 🚀 Features

- 📋 List all employees
- ➕ Add a new employee
- ✏️ Edit existing employee details
- ❌ Delete employees
- 📦 Data persistence using MongoDB
- 🔁 Keyboard navigation (Arrow Up/Down) between fields

---

## 🛠️ Technologies Used

### Frontend:
- React
- Axios
- React Router DOM
- CSS Modules

### Backend:
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS Middleware

---

## 📂 Project Structure

```bash
FRONTEND/
├── node_modules/               # React frontend
├── public/
│   └── index.html
├── src/
│   ├── Component/
│   │   ├── Add.jsx
│   │   ├── Edit.jsx
│   │   └── EmployeeList.jsx
│   ├── style/
│   │   ├── Add.css
│   │   ├── Edit.css
│   │   ├── EmployeeList.css
│   │   └── global.css
│   ├── App.jsx
│   └── index.js
├── package-lock.json
└── package.json



BACKEND/                     # Node + Express backend
├── node_modules/
├── api.js
├── package-lock.json
└── package.json

