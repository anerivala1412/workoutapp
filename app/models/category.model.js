const mongoose = require("mongoose");

const Category = mongoose.model(
    "Category",
    new mongoose.Schema({
        title: String,
        order: Number,
        image: String,
        // bodyType: {
        //     type: String,
        //     enum: ['Full', 'Upper', "Lower", "ALL"],
        //     default: 'ALL'
        // },

    }, {
        timestamps: true
    })
);

module.exports = Category;