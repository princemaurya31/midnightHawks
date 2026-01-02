const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  category: String, // road, streetlight, water, garbage
  description: String,
  location: {
    lat: Number,
    lng: Number
  },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Complaint", complaintSchema);