const mongoose = require("mongoose");

const SubCategory = mongoose.model(
    "SubCategory",
    new mongoose.Schema({
        title: String,
        order: Number,
        image: String,
    })
);

module.exports = SubCategory;