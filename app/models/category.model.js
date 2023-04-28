const mongoose = require("mongoose");

const Category = mongoose.model(
    "Category",
    new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        order: Number,
        image:  {
            type: String,
            required: true
        },
    }, {
        timestamps: true
    })
);

module.exports = Category;