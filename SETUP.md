# InternNova Setup Guide

## Prerequisites
- Node.js 18+
- MongoDB
- npm or yarn

## Backend Setup

1. Navigate to server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file (copy from `.env.example`):
   ```
   MONGO_URI=mongodb://localhost:27017/internova
   JWT_SECRET=your-secret-key-change-in-production
   PORT=5000
   ```

4. Create first admin user (run in MongoDB shell or use a script):
   ```javascript
   // In MongoDB shell or Compass, insert a user with hashed password
   // Or register as faculty, then use MongoDB to change role to admin
   ```

   To create admin via API: First register a user, then use MongoDB Compass or shell to update:
   ```javascript
   db.users.updateOne(
     { email: "admin@university.edu" },
     { $set: { role: "admin" } }
   )
   ```

5. Start the server:
   ```bash
   npm run dev
   ```

## Frontend Setup

1. Navigate to client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` (optional, for custom API URL):
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the client:
   ```bash
   npm start
   ```

## Default Routes

| Role | Login Redirect |
|------|----------------|
| Student | /student/dashboard |
| Faculty | /faculty/dashboard |
| Admin | /admin/dashboard |

## Creating First Admin
1. Register a new user at /register (choose Faculty or Student)
2. Use MongoDB to update the user's role to "admin":
   ```javascript
   db.users.updateOne({ email: "your@email.com" }, { $set: { role: "admin" } })
   ```
3. Log in with that email and password - you'll be redirected to Admin Dashboard
