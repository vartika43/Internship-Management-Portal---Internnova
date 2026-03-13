const express = require("express");
const router = express.Router();
const {
  getStudentsWithInternships,
  getLogsByStudent,
  approve,
  getAllLogs,
<<<<<<< HEAD
  getInternshipAttendance,
=======
>>>>>>> a98a36b35ff0b99c15b82464e1347e504a7a0010
} = require("../controllers/attendanceController");
const { protect, facultyOnly } = require("../middleware/authMiddleware");

router.get("/students", protect, facultyOnly, getStudentsWithInternships);
router.get("/", protect, facultyOnly, getAllLogs);
router.get("/logs/:studentId", protect, facultyOnly, getLogsByStudent);
router.put("/approve/:id", protect, facultyOnly, approve);
<<<<<<< HEAD
router.get("/internship-attendance", protect, facultyOnly, getInternshipAttendance);
=======
>>>>>>> a98a36b35ff0b99c15b82464e1347e504a7a0010

module.exports = router;
