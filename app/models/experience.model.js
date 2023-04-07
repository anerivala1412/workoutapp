const mongoose = require("mongoose");

const Experience = mongoose.model(
    "Experience",
    new mongoose.Schema({
        beforeImage: String,
        afterImage: String,
        workout: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Training"
        },
        trainer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Trainer"
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        likes: {
            type: Number,
            default: 0
        }
    }, {
        timestamps: true
    })
);

module.exports = Experience;