const express = require("express");
const router = express.Router();
const upload = require("../config/upload");
const {
  create: createNOC,
  getPending,
  getMyRequests,
  approve,
  reject,
} = require("../controllers/nocRequestController");
const { protect, adminOnly, studentOnly } = require("../middleware/authMiddleware");

router.post("/", protect, studentOnly, upload.single("offerLetter"), createNOC);
router.get("/my", protect, studentOnly, getMyRequests);
router.get("/pending", protect, adminOnly, getPending);
router.put("/:id/approve", protect, adminOnly, approve);
router.put("/:id/reject", protect, adminOnly, reject);

module.exports = router;
