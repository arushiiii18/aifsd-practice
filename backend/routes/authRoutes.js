const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  register,
  login,
  updatePassword,
  updateCourse,
  getDashboard, // ✅ ADD THIS
} = require("../controllers/authController");

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/dashboard", authMiddleware, getDashboard); // ✅ ADD THIS
router.put("/update-password", authMiddleware, updatePassword);
router.put("/update-course", authMiddleware, updateCourse);

module.exports = router;