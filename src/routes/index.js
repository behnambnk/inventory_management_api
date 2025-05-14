const express = require("express");
const authRouter = require("./auth");
const itemRouter = require("./item");
const categoryRouter = require("./category");
const userRouter = require("./user");
const authenticateToken = require("../middleware/authenticationToken");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/items", authenticateToken, itemRouter);
router.use("/categories", categoryRouter);
router.use("/users", authenticateToken, userRouter);

module.exports = router;