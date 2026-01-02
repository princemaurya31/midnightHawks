const Complaint = require("../models/Complaint");

exports.createComplaint = async (req, res) => {
  const { category, description, location } = req.body;
  const complaint = await Complaint.create({
    user: req.user.id,
    category,
    description,
    location
  });
  res.json(complaint);
};

exports.getAllComplaints = async (req, res) => {
  const complaints = await Complaint.find().populate("user", "name email");
  res.json(complaints);
};