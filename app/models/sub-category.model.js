const mongoose = require("mongoose");

const SubCategory = mongoose.model(
    "SubCategory",
    new mongoose.Schema({
        title:  {
            type: String,
            required: true
        },
        order: Number,
        image:  {
            type: String,
            required: true
        },
        parentCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },

    }, {
        timestamps: true
    })
);

module.exports = SubCategory;