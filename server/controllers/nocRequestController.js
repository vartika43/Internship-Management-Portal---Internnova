const NOCRequest = require("../models/NOCRequest");
<<<<<<< HEAD
const InternshipRecord = require("../models/InternshipRecord");
const User = require("../models/User");
=======
>>>>>>> a98a36b35ff0b99c15b82464e1347e504a7a0010

exports.create = async (req, res) => {
  try {
    const offerLetterUrl = req.file ? "/uploads/" + req.file.filename : "";
<<<<<<< HEAD
    const student = await User.findById(req.user._id);

    const noc = await NOCRequest.create({
      ...req.body,
      studentId: req.user._id,
      studentName: student?.name || "",
      rollNumber: student?.rollNumber || "",
=======
    const noc = await NOCRequest.create({
      ...req.body,
      studentId: req.user._id,
>>>>>>> a98a36b35ff0b99c15b82464e1347e504a7a0010
      offerLetterUrl,
    });
    const populated = await NOCRequest.findById(noc._id).populate(
      "studentId",
      "name email"
    );
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyRequests = async (req, res) => {
  try {
    const requests = await NOCRequest.find({ studentId: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPending = async (req, res) => {
  try {
    const requests = await NOCRequest.find({ approvalStatus: "pending" })
      .populate("studentId", "name email department year")
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

<<<<<<< HEAD
// GET /api/noc-requests
exports.getAll = async (req, res) => {
  try {
    const requests = await NOCRequest.find()
      .populate("studentId", "name email department year")
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/noc-requests/student/:studentId
exports.getByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Students can only see their own; faculty/admin can see any
    if (
      req.user.role === "student" &&
      String(req.user._id) !== String(studentId)
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const requests = await NOCRequest.find({ studentId }).sort({
      createdAt: -1,
    });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

=======
>>>>>>> a98a36b35ff0b99c15b82464e1347e504a7a0010
exports.approve = async (req, res) => {
  try {
    const noc = await NOCRequest.findByIdAndUpdate(
      req.params.id,
      {
        approvalStatus: "approved",
        approvedBy: req.user._id,
        approvedAt: new Date(),
      },
      { new: true }
<<<<<<< HEAD
    ).populate("studentId", "name email department year");
    if (!noc) return res.status(404).json({ message: "Request not found" });

    // When approved, upsert corresponding internshipRecords entry
    if (noc.approvalStatus === "approved") {
      const student = noc.studentId;
      await InternshipRecord.findOneAndUpdate(
        {
          student: student._id,
          name_of_the_organization_from_where_internship_is_done:
            noc.companyName,
        },
        {
          student: student._id,
          student_name: student.name,
          roll_number: noc.rollNumber || "",
          program: student.department || "",
          semester: student.year || "",
          name_of_the_organization_from_where_internship_is_done:
            noc.companyName,
          internship_duration: noc.duration,
          placement_internshi_p_ppo: "Internship",
          noc: "Y",
        },
        { upsert: true, new: true }
      );
    }

=======
    ).populate("studentId", "name email");
    if (!noc) return res.status(404).json({ message: "Request not found" });
>>>>>>> a98a36b35ff0b99c15b82464e1347e504a7a0010
    res.json(noc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.reject = async (req, res) => {
  try {
    const noc = await NOCRequest.findByIdAndUpdate(
      req.params.id,
      {
        approvalStatus: "rejected",
        approvedBy: req.user._id,
        approvedAt: new Date(),
        remarks: req.body.remarks || "",
      },
      { new: true }
    ).populate("studentId", "name email");
    if (!noc) return res.status(404).json({ message: "Request not found" });
    res.json(noc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
