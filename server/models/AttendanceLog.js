const mongoose = require("mongoose");

const attendanceLogSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    internshipId: { type: mongoose.Schema.Types.ObjectId, ref: "Internship", required: true },
    date: { type: Date, required: true },
    hours: { type: Number, default: 0 },
    remarks: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    approvedAt: { type: Date },
  },
  { timestamps: true }
);

const AttendanceLog = mongoose.model("AttendanceLog", attendanceLogSchema);

module.exports = AttendanceLog;
