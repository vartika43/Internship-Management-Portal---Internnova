const AttendanceLog = require("../models/AttendanceLog");
const Application = require("../models/Application");
const Internship = require("../models/Internship");

exports.getStudentsWithInternships = async (req, res) => {
  try {
    const acceptedApps = await Application.find({ status: "accepted" })
      .populate("studentId", "name email department year")
      .populate("internshipId", "title companyName");
    const students = acceptedApps.map((a) => ({
      _id: a.studentId._id,
      name: a.studentId.name,
      email: a.studentId.email,
      department: a.studentId.department,
      year: a.studentId.year,
      internship: a.internshipId,
    }));
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getLogsByStudent = async (req, res) => {
  try {
    const logs = await AttendanceLog.find({ studentId: req.params.studentId })
      .populate("internshipId", "title companyName")
      .sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.approve = async (req, res) => {
  try {
    const log = await AttendanceLog.findByIdAndUpdate(
      req.params.id,
      {
        status: "approved",
        approvedBy: req.user._id,
        approvedAt: new Date(),
      },
      { new: true }
    )
      .populate("studentId", "name email")
      .populate("internshipId", "title companyName");
    if (!log) return res.status(404).json({ message: "Log not found" });
    res.json(log);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const log = await AttendanceLog.create(req.body);
    const populated = await AttendanceLog.findById(log._id)
      .populate("studentId", "name email")
      .populate("internshipId", "title companyName");
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllLogs = async (req, res) => {
  try {
    const logs = await AttendanceLog.find()
      .populate("studentId", "name email")
      .populate("internshipId", "title companyName")
      .sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
