const AttendanceLog = require("../models/AttendanceLog");
const Application = require("../models/Application");
const Internship = require("../models/Internship");
<<<<<<< HEAD
const InternshipRecord = require("../models/InternshipRecord");
=======
>>>>>>> a98a36b35ff0b99c15b82464e1347e504a7a0010

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
<<<<<<< HEAD

// GET /api/attendance/internship-attendance
// Returns flattened attendance rows for all internshipRecords
exports.getInternshipAttendance = async (req, res) => {
  try {
    const records = await InternshipRecord.find({});

    const rows = [];

    records.forEach((record) => {
      const common = {
        studentName: record.student_name || "",
        rollNumber: record.roll_number || "",
        internship:
          record.name_of_the_organization_from_where_internship_is_done || "",
        semester: record.semester || "",
        program: record.program || "",
      };

      if (record.attend_ance_jan !== undefined) {
        const attendance = record.attend_ance_jan;
        rows.push({
          ...common,
          month: "Jan",
          attendance,
          status: attendance === "Y" ? "Present" : "Missing/Absent",
        });
      }

      if (record.attend_ance_feb !== undefined) {
        const attendance = record.attend_ance_feb;
        rows.push({
          ...common,
          month: "Feb",
          attendance,
          status: attendance === "Y" ? "Present" : "Missing/Absent",
        });
      }
    });

    res.json(rows);
  } catch (err) {
    console.error("Error fetching internship attendance:", err);
    res
      .status(500)
      .json({ message: "Failed to load internship attendance records" });
  }
};
=======
>>>>>>> a98a36b35ff0b99c15b82464e1347e504a7a0010
