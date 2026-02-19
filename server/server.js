const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// request logger
app.use((req, res, next) => {
  console.log(`📩 ${req.method} ${req.url}`);
  next();
});

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Internnova Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
