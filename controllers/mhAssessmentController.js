const db = require("../config/db");

const ensureAssessmentTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS MentalAssessment (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NULL,
      user_email VARCHAR(255) NOT NULL,
      assessment_type VARCHAR(64) NOT NULL DEFAULT 'PHQ-9',
      score INT NOT NULL,
      severity VARCHAR(32) NOT NULL,
      answers_json TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `;
  db.query(sql, (err) => {
    if (err) {
      console.error("Error ensuring MentalAssessment table:", err);
    }
  });
};

ensureAssessmentTable();

function severityFromScore(score) {
  if (score <= 4) return "minimal";
  if (score <= 9) return "mild";
  if (score <= 14) return "moderate";
  if (score <= 19) return "moderately severe";
  return "severe";
}

exports.submitAssessment = (req, res) => {
  const { answers, assessment_type } = req.body;
  if (!Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ message: "answers array is required" });
  }
  // Expect PHQ-9: 9 answers, each 0-3
  const score = answers.reduce((acc, v) => acc + (parseInt(v, 10) || 0), 0);
  const severity = severityFromScore(score);
  const userId = req.user?.userId || null;
  const userEmail = req.user?.email || null;

  const sql = `
    INSERT INTO MentalAssessment (user_id, user_email, assessment_type, score, severity, answers_json)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(
    sql,
    [
      userId,
      userEmail,
      assessment_type || "PHQ-9",
      score,
      severity,
      JSON.stringify(answers),
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting assessment:", err);
        return res.status(500).json({ message: "Server error" });
      }
      return res.status(201).json({
        message: "Assessment submitted",
        id: result.insertId,
        score,
        severity,
      });
    }
  );
};

exports.getLatest = (req, res) => {
  const all = req.query.all === "true";
  const mine = req.query.mine === "true";

  let sql = "SELECT * FROM MentalAssessment ORDER BY created_at DESC LIMIT 50";
  let params = [];

  if (mine) {
    sql =
      "SELECT * FROM MentalAssessment WHERE user_id = ? OR user_email = ? ORDER BY created_at DESC LIMIT 1";
    params = [req.user?.userId || 0, req.user?.email || ""];
  } else if (all) {
    const role = (req.user?.role || "").toLowerCase();
    const isPrivileged = role === "admin" || role === "therapist";
    if (!isPrivileged) {
      return res.status(403).json({ message: "Forbidden" });
    }
  } else {
    sql =
      "SELECT * FROM MentalAssessment WHERE user_id = ? OR user_email = ? ORDER BY created_at DESC LIMIT 1";
    params = [req.user?.userId || 0, req.user?.email || ""];
  }

  db.query(sql, params, (err, rows) => {
    if (err) {
      console.error("Error fetching assessment:", err);
      return res.status(500).json({ message: "Server error" });
    }
    return res.status(200).json(rows);
  });
};