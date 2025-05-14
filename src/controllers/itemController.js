const { get } = require('mongoose');
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

const getItems = asyncHandler(async (req, res) => {
    const user = req.user;
    const items = await Item.find({ userId: user.userId });
    res.status(200).json({ items });
});

const updateItem = asyncHandler(async (req, res) => {
    const item = await Item.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true }
    );
    if (!item) {
        res.status(404);
        throw new Error("Item not found");
    }
    res.status(200).json(item);
});

const deleteItem = asyncHandler(async (req, res) => {
    const result = await Item.findByIdAndDelete(req.params.id);
    if (!result) {
        res.status(404);
        throw new Error("Item not found");
    }
    res.status(204).send();
});

const getItemById = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id);
    if (!item) {
        res.status(404);
        throw new Error("Item not found");
    }
    res.status(200).json(item);
});


module.exports = {
    createItem,
    getItems,
    updateItem,
    deleteItem,
    getItemById
};
