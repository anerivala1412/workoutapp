const mongoose = require("mongoose");

const Slide = mongoose.model(
    "Slide",
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
    }, {
        timestamps: true
    })
);

module.exports = Slide;