const express = require("express");
const router = express.Router();

const { register, login, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

// Auth routes
router.post("/register", register);
router.post("/login", login);

// Protected route
router.get("/test", protect, getMe);

module.exports = router;
