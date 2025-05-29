const { get } = require('mongoose');
const Item = require('../models/item');
const Category = require('../models/category');
const asyncHandler = require('express-async-handler');

const createItem = asyncHandler(async (req, res) => {
    const user = req.user;
    console.log("Received create item request:", req.body);

    const { name, age, price, description, categoryId, longitude, latitude } = req.body;
    const item = new Item({ name, price, description, age, userId: user.userId, categoryId: categoryId, longitude, latitude });
    await item.save();
    res.status(201).json({ _id: item._id, name: item.name, price: item.price, description: item.description, age: item.age, userId: item.userId, categoryId: item.categoryId, longitude: item.longitude, latitude: item.latitude, createdAt: item.createdAt});
});

const getItems = asyncHandler(async (req, res) => {
    const user = req.user;
    const items = await Item.find({ userId: user.userId })

    for (let item of items) {
        const category = await Category.findById(item.categoryId)
        console.log("Category found:", JSON.stringify(category));
        item.category = { _id: category?._id, name: category?.name };
    }
    const formatted = items.map(item => ({
        _id: item._id,
        name: item.name,
        description: item.description,
        price: item.price,
        age: item.age,
        userId: item.userId,
        categoryName: item.category?.name,
        categoryId: item.category?._id,
        createdAt: item.createdAt,
        longitude: item.longitude,
        latitude: item.latitude,
    }));

    res.status(200).json({ items: formatted });
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
