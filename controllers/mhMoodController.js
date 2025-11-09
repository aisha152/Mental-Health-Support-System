const db = require("../config/db");

// Ensure the mood table exists
const ensureMoodTable = () => {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS MentalMoodEntry (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NULL,
      user_email VARCHAR(255) NOT NULL,
      mood VARCHAR(32) NOT NULL,
      mood_score INT NULL,
      note TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `;
  db.query(createTableSQL, (err) => {
    if (err) {
      console.error("Error ensuring MentalMoodEntry table:", err);
    }
  });
};

ensureMoodTable();

exports.createMood = (req, res) => {
  const { mood, mood_score, note } = req.body;

  if (!mood) {
    return res.status(400).json({ message: "Mood is required" });
  }

  const userId = req.user?.userId || null;
  const userEmail = req.user?.email || null;

  const sql = `
    INSERT INTO MentalMoodEntry (user_id, user_email, mood, mood_score, note)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(
    sql,
    [userId, userEmail, mood, mood_score || null, note || null],
    (err, result) => {
      if (err) {
        console.error("Error inserting mood entry:", err);
        return res.status(500).json({ message: "Server error" });
      }
      return res.status(201).json({
        message: "Mood entry recorded",
        id: result.insertId,
      });
    }
  );
};

exports.listMood = (req, res) => {
  const all = req.query.all === "true";
  const mine = req.query.mine === "true";

  let sql = "SELECT * FROM MentalMoodEntry ORDER BY created_at DESC";
  let params = [];

  // If requesting only user entries
  if (mine) {
    sql = "SELECT * FROM MentalMoodEntry WHERE user_id = ? OR user_email = ? ORDER BY created_at DESC";
    params = [req.user?.userId || 0, req.user?.email || ""];
  } else if (all) {
    // Allow privileged roles to fetch all
    const role = (req.user?.role || "").toLowerCase();
    const isPrivileged = role === "admin" || role === "therapist";
    if (!isPrivileged) {
      return res.status(403).json({ message: "Forbidden" });
    }
  } else {
    // Default to mine if no flag provided
    sql = "SELECT * FROM MentalMoodEntry WHERE user_id = ? OR user_email = ? ORDER BY created_at DESC";
    params = [req.user?.userId || 0, req.user?.email || ""];
  }

  db.query(sql, params, (err, rows) => {
    if (err) {
      console.error("Error fetching mood entries:", err);
      return res.status(500).json({ message: "Server error" });
    }
    return res.status(200).json(rows);
  });
};