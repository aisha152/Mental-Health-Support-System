const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey";

// Helper: get role_id by role_name (case-insensitive)
function getRoleIdByName(roleName) {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT role_id FROM Role WHERE LOWER(role_name) = LOWER(?) LIMIT 1",
      [roleName],
      (err, results) => {
        if (err) return reject(err);
        if (!results || results.length === 0) return resolve(null);
        resolve(results[0].role_id);
      }
    );
  });
}

// POST /api/signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role_name } = req.body || {};
    if (!name || !email || !password || !role_name) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Check if user already exists
    db.query("SELECT user_id FROM User WHERE email = ?", [email], async (err, rows) => {
      if (err) return res.status(500).json({ message: "Database error" });
      if (rows && rows.length > 0) {
        return res.status(409).json({ message: "Email already registered." });
      }

      const hashed = await bcrypt.hash(password, 10);

      // Insert user
      db.query(
        "INSERT INTO User (username, email, password) VALUES (?, ?, ?)",
        [name, email, hashed],
        async (err2, result) => {
          if (err2) return res.status(500).json({ message: "Failed to create user" });
          const userId = result.insertId;

          // Resolve role_id from provided role_name
          let roleId;
          try {
            roleId = await getRoleIdByName(role_name);
          } catch (e) {
            return res.status(500).json({ message: "Failed to resolve role" });
          }

          if (!roleId) {
            return res.status(400).json({ message: "Invalid role selected." });
          }

          // Map user to role
          db.query(
            "INSERT INTO UserRole (user_id, role_id) VALUES (?, ?)",
            [userId, roleId],
            (err3) => {
              if (err3) return res.status(500).json({ message: "Failed to assign role" });
              return res.status(201).json({ message: "User registered successfully." });
            }
          );
        }
      );
    });
  } catch (error) {
    console.error("/signup error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// POST /api/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required." });
    }

    db.query(
      "SELECT user_id, username, email, password FROM User WHERE email = ? LIMIT 1",
      [email],
      async (err, rows) => {
        if (err) return res.status(500).json({ message: "Database error" });
        if (!rows || rows.length === 0) {
          return res.status(401).json({ message: "Invalid credentials." });
        }

        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return res.status(401).json({ message: "Invalid credentials." });
        }

        // Fetch user's role
        db.query(
          "SELECT r.role_name FROM Role r JOIN UserRole ur ON r.role_id = ur.role_id WHERE ur.user_id = ? LIMIT 1",
          [user.user_id],
          (err2, roleRows) => {
            if (err2) return res.status(500).json({ message: "Failed to fetch role" });
            const roleName = roleRows && roleRows.length > 0 ? roleRows[0].role_name : "User";

            const payload = { user_id: user.user_id, email: user.email, role: roleName };
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "12h" });

            // Update last_login
            db.query("UPDATE User SET last_login = NOW() WHERE user_id = ?", [user.user_id], () => {
              // Ignore update error silently; not critical to login response
              return res.status(200).json({ token, role: roleName });
            });
          }
        );
      }
    );
  } catch (error) {
    console.error("/login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;