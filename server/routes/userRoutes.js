const express = require("express");
const router = express.Router();
const upload = require("../config/upload");
const {
  getAll,
  getById,
  create,
  update,
  delete: deleteUser,
  updateProfile,
} = require("../controllers/userController");
const { protect, adminOnly, studentOnly } = require("../middleware/authMiddleware");

router.get("/", protect, adminOnly, getAll);
router.get("/profile/me", protect, (req, res) => res.json(req.user));
router.put("/profile/me", protect, studentOnly, upload.single("resume"), updateProfile);
router.get("/:id", protect, adminOnly, getById);
router.post("/", protect, adminOnly, create);
router.put("/:id", protect, adminOnly, update);
router.delete("/:id", protect, adminOnly, deleteUser);

module.exports = router;
