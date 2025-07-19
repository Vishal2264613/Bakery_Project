const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.get("/", getUsers); // Get all users
router.get("/:id", getUserById); // Get user by ID
router.post("/", createUser); // Create new user
router.put("/:id", updateUser); // Update user by ID
router.delete("/:id", deleteUser); // Delete user by ID

module.exports = router;
