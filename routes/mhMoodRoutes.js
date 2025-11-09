const express = require("express");
const router = express.Router();
const jwtAuth = require("../middleware/jwtAuth");
const moodCtrl = require("../controllers/mhMoodController");

// Record a mood entry
router.post("/mood", jwtAuth, moodCtrl.createMood);

// List mood entries (mine by default; all=true for admin email)
router.get("/mood", jwtAuth, moodCtrl.listMood);

module.exports = router;