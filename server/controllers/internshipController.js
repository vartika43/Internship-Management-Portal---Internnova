const Internship = require("../models/Internship");

exports.getAll = async (req, res) => {
  try {
    const internships = await Internship.find({ status: "active" })
      .populate("postedBy", "name email")
      .sort({ createdAt: -1 });
    res.json(internships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id).populate(
      "postedBy",
      "name email"
    );
    if (!internship) return res.status(404).json({ message: "Internship not found" });
    res.json(internship);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const internship = await Internship.create({
      ...req.body,
      postedBy: req.user._id,
    });
    const populated = await Internship.findById(internship._id).populate(
      "postedBy",
      "name email"
    );
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const internship = await Internship.findOneAndUpdate(
      { _id: req.params.id, postedBy: req.user._id },
      req.body,
      { new: true }
    ).populate("postedBy", "name email");
    if (!internship) return res.status(404).json({ message: "Internship not found" });
    res.json(internship);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getByFaculty = async (req, res) => {
  try {
    const internships = await Internship.find({ postedBy: req.user._id })
      .populate("postedBy", "name email")
      .sort({ createdAt: -1 });
    res.json(internships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
