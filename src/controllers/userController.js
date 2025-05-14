const asyncHandler = require("express-async-handler");
const User = require("../models/user");

// GET all users
exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});

// GET user by ID
exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json(user);
});

// POST create new user (already handled in authController.js as register)
exports.createUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("Username and password are required");
  }

  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(409);
    throw new Error("Username already exists");
  }

  const user = new User({ username, password });
  await user.save();
  res.status(201).json({ id: user._id, username: user.username });
});

// PUT update user
exports.updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
  ).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json(user);
});

// DELETE user
exports.deleteUser = asyncHandler(async (req, res) => {
  const result = await User.findByIdAndDelete(req.params.id);
  if (!result) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(204).send();
});
