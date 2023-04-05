const mongoose = require("mongoose");

const SubCategory = mongoose.model(
    "SubCategory",
    new mongoose.Schema({
        title: String,
        order: Number,
        image: String,
        parentCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        },

    }, {
        timestamps: true
    })
);

module.exports = SubCategory;