const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    internshipId: { type: mongoose.Schema.Types.ObjectId, ref: "Internship", required: true },
    status: {
      type: String,
      enum: ["applied", "interview", "rejected", "accepted"],
      default: "applied",
    },
  },
  { timestamps: true }
);

applicationSchema.index({ studentId: 1, internshipId: 1 }, { unique: true });

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
