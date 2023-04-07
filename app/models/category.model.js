const mongoose = require("mongoose");

const Category = mongoose.model(
    "Category",
    new mongoose.Schema({
        title: String,
        order: Number,
        image: String,
    }, {
        timestamps: true
    })
);

module.exports = Category;