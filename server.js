const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// 🔹 Health check (Render ke liye VERY IMPORTANT)
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// 🔹 API routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/complaints", require("./routes/complaint"));

// 🔹 Serve frontend (HTML/CSS)
app.use(express.static(path.join(__dirname, "frontend")));

// 🔹 Fallback → index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// 🔹 Start server ONLY after DB connected
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ DB connection failed:", err.message);
    process.exit(1);
  }
};

startServer();