# MERN Authentication & Dashboard Project

##  Project Description

This is a full-stack web application built using **Node.js, Express.js, MySQL, and React.js**.
The project includes user authentication and a dashboard where users can manage items with CRUD operations.

---

##  Technologies Used

* Backend: Node.js, Express.js, MySQL
* Frontend: React.js
* Others: Axios, JWT, bcrypt

---

## MySQL Database Setup

1. Open MySQL / phpMyAdmin
2. Create database:

```
CREATE DATABASE mern_auth_db;
USE mern_auth_db;
```

3. Create tables:

```
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(255)
);

CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(255),
  description TEXT,
  status VARCHAR(20) DEFAULT 'active'
);
```

---

## Backend Setup

1. Open terminal:

```
cd backend
```

2. Install dependencies:

```
npm install
```

3. Run server: 

```
npx nodemon server.js
```
npm start

4. Server runs on:

```
http://localhost:5000
```

---

## Frontend Setup

1. Open new terminal:

```
cd frontend
```

2. Install dependencies:

```
npm install
```

3. Start React app:

```
npm start
```

4. App runs on:

```
http://localhost:3000
```

---

##  How to Run Project

1. Start backend server
2. Start frontend server
3. Open browser:

```
http://localhost:3000
```

---

## API Endpoints

### Authentication

* POST /api/auth/register → Register user
* POST /api/auth/login → Login user
* POST /api/auth/forgot-password → Forgot password (demo)
* POST /api/auth/reset-password → Reset password (demo)

### Items (Dashboard)

* GET /api/items → Get all items
* POST /api/items → Create item
* PUT /api/items/:id → Update item
* DELETE /api/items/:id → Delete item

### Stats

* GET /api/stats → Get dashboard statistics

---

## Screenshots

Add screenshots in the `screenshots` folder:

* Login Page
* Register Page
* Dashboard
* Items List
* Database Tables

---

## Features

* User Authentication (Login & Register)
* Dashboard with CRUD operations
* Item status management
* Real-time statistics
* Simple and user-friendly UI

---

## Conclusion

This project demonstrates a complete full-stack application with authentication and dashboard functionality using MERN stack with MySQL.
