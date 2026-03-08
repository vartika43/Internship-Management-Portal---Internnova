const Application = require("../models/Application");
const Internship = require("../models/Internship");

exports.apply = async (req, res) => {
  try {
    const { internshipId } = req.body;
    const existing = await Application.findOne({
      studentId: req.user._id,
      internshipId,
    });
    if (existing)
      return res.status(400).json({ message: "Already applied to this internship" });

    const internship = await Internship.findById(internshipId);
    if (!internship) return res.status(404).json({ message: "Internship not found" });
    if (internship.status !== "active")
      return res.status(400).json({ message: "Internship is no longer accepting applications" });

    const application = await Application.create({
      studentId: req.user._id,
      internshipId,
    });
    const populated = await Application.findById(application._id)
      .populate("studentId", "name email")
      .populate("internshipId", "title companyName");
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ studentId: req.user._id })
      .populate("internshipId", "title companyName description requiredSkills duration deadline")
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getByInternship = async (req, res) => {
  try {
    const applications = await Application.find({
      internshipId: req.params.internshipId,
    })
      .populate("studentId", "name email department year skills")
      .populate("internshipId", "title companyName");
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
