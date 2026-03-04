const express = require("express");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public folder
app.use(express.static(path.join(__dirname, "public")));

// API Route
app.post("/api/bookings", (req, res) => {
  console.log("Received booking data:", req.body);

  // Simulate processing delay
  setTimeout(() => {
    res.status(200).json({
      success: true,
      message: "Booking received successfully",
    });
  }, 800);
});

// IMPORTANT: Export app for Vercel
module.exports = app;