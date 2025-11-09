const express = require("express");
const path = require("path");
const db = require("./config/db");
const jwtAuth = require("./middleware/jwtAuth");
const userRoutes = require("./routes/userRoutes");
const mhMoodRoutes = require("./routes/mhMoodRoutes");
const mhAssessmentRoutes = require("./routes/mhAssessmentRoutes");

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve only essential static directories; do NOT expose HTML directly
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
app.use("/css", express.static(path.join(__dirname, "public/css")));
app.use("/js", express.static(path.join(__dirname, "public/js")));

app.use((req, res, next) => {
  const allowedExact = new Set([
    "/",
    "/registration",
    "/adminDashboard",
    "/contactUs",
    "/mental/mood",
    "/mental/assessments",
  ]);
  if (
    allowedExact.has(req.path) ||
    req.path.startsWith("/api") ||
    req.path === "/favicon.ico"
  ) {
    return next();
  }
  return res.status(404).send("Not Found");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html/welcomePage.html"));
});

app.get("/registration", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html/registration.html"));
});

app.get("/adminDashboard", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public/html/Admin Panel/adminDashboard.html")
  );
});


app.get("/contactUs", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html/Contact us/contactUs.html"));
});

app.get("/mental/mood", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html/MentalHealth/mood.html"));
});

app.get("/mental/assessments", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html/MentalHealth/assessments.html"));
});


// Using Routes
app.use("/api", userRoutes);
app.use("/api/mental", mhMoodRoutes);
app.use("/api/mental", mhAssessmentRoutes);


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
