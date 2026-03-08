const express = require("express");
const router = express.Router();
const { apply, getMyApplications, getByInternship } = require("../controllers/applicationController");
const { protect, studentOnly, facultyOnly } = require("../middleware/authMiddleware");

router.post("/", protect, studentOnly, apply);
router.get("/my", protect, studentOnly, getMyApplications);
router.get("/internship/:internshipId", protect, facultyOnly, getByInternship);

module.exports = router;
