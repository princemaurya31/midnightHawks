const Complaint = require("../models/Complaint");

// ===============================
// Create Complaint
// ===============================
exports.createComplaint = async (req, res) => {
  try {
    const { category, description, location } = req.body;

    if (!category || !description || !location) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const complaint = await Complaint.create({
      user: req.user.id,
      category,
      description,
      location,
    });

    res.status(201).json(complaint);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error while creating complaint",
    });
  }
};

// ===============================
// Get All Complaints
// ===============================
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error while fetching complaints",
    });
  }
};
