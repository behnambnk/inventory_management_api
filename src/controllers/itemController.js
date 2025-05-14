const Item = require('../models/item');
const asyncHandler = require('express-async-handler');

const createItem = asyncHandler(async (req, res) => {
    const user = req.user;
    console.log("Received create item request:", req.body);

    const { name, age, price, description } = req.body;
    const item = new Item({ name, price, description, age, userId: user.userId });
    await item.save();
    res.status(201).json({ message: "Item created" });
});



module.exports = {
    createItem
};
