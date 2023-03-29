const mongoose = require("mongoose");

const Slide = mongoose.model(
    "Slide",
    new mongoose.Schema({
        title: String,
        order: Number,
        image: String,
        // bodyType: {
        //     type: String,
        //     enum: ['Full', 'Upper', "Lower", "ALL"],
        //     default: 'ALL'
        // },

    })
);

module.exports = Slide;