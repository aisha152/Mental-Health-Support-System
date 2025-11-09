const express = require("express");
const router = express.Router();
const jwtAuth = require("../middleware/jwtAuth");
const ctrl = require("../controllers/mhAssessmentController");

router.post("/assessments", jwtAuth, ctrl.submitAssessment);
router.get("/assessments/latest", jwtAuth, ctrl.getLatest);

module.exports = router;