const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Public routes (or add auth middleware as needed)
router.get("/", userController.getAllUsers);
router.get("/profile", userController.getUser);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;