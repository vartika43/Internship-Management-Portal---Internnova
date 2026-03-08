const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  create,
  update,
  getByFaculty,
} = require("../controllers/internshipController");
const { protect, facultyOnly } = require("../middleware/authMiddleware");

router.get("/", getAll);
router.get("/my", protect, facultyOnly, getByFaculty);
router.get("/:id", getById);
router.post("/", protect, facultyOnly, create);
router.put("/:id", protect, facultyOnly, update);

module.exports = router;
