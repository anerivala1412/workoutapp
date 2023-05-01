const mongoose = require("mongoose");

const Training = mongoose.model(
    "Training",
    new mongoose.Schema({
        image: {
            type: String,
            required: true
        },
        name:  {
            type: String,
            required: true
        },
        timing:  {
            type: Date,
            required: true
        },
        order: Number,
        stage: {
            type: String,
            enum: ['Beginner', 'Intermediate ', "Advance"],
            default: 'Beginner',
            required: true
        },
        categories: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        }]

    }, {
        timestamps: true
    })
);
module.exports = Training;