const NOCRequest = require("../models/NOCRequest");

exports.create = async (req, res) => {
  try {
    const offerLetterUrl = req.file ? "/uploads/" + req.file.filename : "";
    const noc = await NOCRequest.create({
      ...req.body,
      studentId: req.user._id,
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
    ).populate("studentId", "name email");
    if (!noc) return res.status(404).json({ message: "Request not found" });
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
