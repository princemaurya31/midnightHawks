const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  createComplaint,
  getAllComplaints
} = require("../controllers/complaintController");

router.post("/", auth, createComplaint);
router.get("/", auth, getAllComplaints); // authority dashboard

module.exports = router;
