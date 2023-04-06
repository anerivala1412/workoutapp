const mongoose = require("mongoose");

const Training = mongoose.model(
    "Training",
    new mongoose.Schema({
        image: String,
        name: String,
        timing: Date,
        order: Number,
        stage: {
            type: String,
            enum: ['Beginner', 'Intermediate ', "Advance"],
            default: 'Beginner'
        },
        categories: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        }]

    }, {
        timestamps: true
    })
);
module.exports = Training;