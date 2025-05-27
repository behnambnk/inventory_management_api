const User = require("../models/user");
const jwt = require("jsonwebtoken");
const tokenSecret = "supersecrettoken";
const asyncHandler = require('express-async-handler');


exports.signup = asyncHandler(async (req, res) => {
  console.log("Received signup request:", req.body);
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });
  await user.save();
  res.status(201).json({ message: "User created" });
});

exports.login = asyncHandler( async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ userId: user._id, username: user.username }, tokenSecret, { expiresIn: "3600h" });
  res.json({ authToken: token });
});