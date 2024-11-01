const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
require("dotenv").config(); // Remove if no longer needed

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, "Home")));

// Removed Twilio configuration and client setup

// Removed the /send-otp endpoint

// Serve the new Bills Page HTML
app.get("/bills", (req, res) => {
  res.sendFile(path.join(__dirname, "Home", "billsPage.html"));
});

// Serve the Bills Page CSS
app.get("/billsPage.css", (req, res) => {
  res.sendFile(path.join(__dirname, "Home", "billsPage.css"));
});

// Serve the Bills Page JS
app.get("/billsPage.js", (req, res) => {
  res.sendFile(path.join(__dirname, "Home", "billsPage.js"));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
