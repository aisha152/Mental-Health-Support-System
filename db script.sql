/* MindWell Hub — Minimal Schema */

-- Drop and create fresh database for this system only
DROP DATABASE IF EXISTS mindwell_hub;
CREATE DATABASE IF NOT EXISTS mindwell_hub;
USE mindwell_hub;

-- 1) Users
CREATE TABLE IF NOT EXISTS User (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login DATETIME
) ENGINE=InnoDB;

-- 2) Roles (keep minimal roles only)
CREATE TABLE IF NOT EXISTS Role (
  role_id INT PRIMARY KEY AUTO_INCREMENT,
  role_name VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- 3) User↔Role mapping
CREATE TABLE IF NOT EXISTS UserRole (
  user_id INT NOT NULL,
  role_id INT NOT NULL,
  PRIMARY KEY (user_id, role_id),
  FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES Role(role_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 4) Mood entries
CREATE TABLE IF NOT EXISTS MentalMoodEntry (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  user_email VARCHAR(255) NOT NULL,
  mood VARCHAR(32) NOT NULL,
  mood_score INT NULL,
  note TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_mood_user (user_id, user_email),
  FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- 5) Self assessments
CREATE TABLE IF NOT EXISTS MentalAssessment (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  user_email VARCHAR(255) NOT NULL,
  assessment_type VARCHAR(64) NOT NULL DEFAULT 'PHQ-9',
  score INT NOT NULL,
  severity VARCHAR(32) NOT NULL,
  answers_json TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_assessment_user (user_id, user_email),
  FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Seed essential roles only (idempotent)
INSERT IGNORE INTO Role (role_name) VALUES
  ('Admin'),
  ('Therapist'),
  ('User');

