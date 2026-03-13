const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const connectDB = require("./config/db");
<<<<<<< HEAD
const reportRoutes = require("./routes/reportRoutes");
=======
>>>>>>> a98a36b35ff0b99c15b82464e1347e504a7a0010

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("Created uploads directory");
}
const authRoutes = require("./routes/authRoutes");
const internshipRoutes = require("./routes/internshipRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const userRoutes = require("./routes/userRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const nocRequestRoutes = require("./routes/nocRequestRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// request logger
app.use((req, res, next) => {
  console.log(`📩 ${req.method} ${req.url}`);
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/noc-requests", nocRequestRoutes);
<<<<<<< HEAD
app.use("/api/reports", reportRoutes);
=======
>>>>>>> a98a36b35ff0b99c15b82464e1347e504a7a0010

app.get("/", (req, res) => {
  res.send("Internnova Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

startServer().catch((err) => {
  console.error("Server failed to start:", err);
  process.exit(1);
});
