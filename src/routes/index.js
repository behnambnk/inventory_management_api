const express = require("express");
const authRouter = require("./auth");
const itemRouter = require("./item");
const authenticateToken = require("../middleware/authenticationToken");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/items", authenticateToken, itemRouter);

module.exports = router;