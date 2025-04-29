const express = require("express");
const authRouter = require("./auth");
// const inventoryRouter = require("./inventory");
// const itemRouter = require("./item");

const router = express.Router();

router.use("/auth", authRouter);
// router.use("/inventories", inventoryRouter);
// router.use("/items", itemRouter);

module.exports = router;