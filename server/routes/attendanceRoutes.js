const express = require("express");
const router = express.Router();
const {
  getStudentsWithInternships,
  getLogsByStudent,
  approve,
  getAllLogs,
} = require("../controllers/attendanceController");
const { protect, facultyOnly } = require("../middleware/authMiddleware");

router.get("/students", protect, facultyOnly, getStudentsWithInternships);
router.get("/", protect, facultyOnly, getAllLogs);
router.get("/logs/:studentId", protect, facultyOnly, getLogsByStudent);
router.put("/approve/:id", protect, facultyOnly, approve);

module.exports = router;
