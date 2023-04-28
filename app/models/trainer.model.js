const mongoose = require("mongoose");

const Trainer = mongoose.model(
    "Trainer",
    new mongoose.Schema({
        image:  {
            type: String,
            required: true
        },
        name:  {
            type: String,
            required: true
        },
        speciality:  {
            type: String,
            required: true
        },
        order: Number,
        rate: Number,
        rating: Number,
        experience:  {
            type: Number,
            required: true
        },
        completedWorkout:  {
            type: Number,
            required: true
        },
        activeClient:  {
            type: Number,
            required: true
        },
        bio:  {
            type: String,
            required: true
        },
        phonenNumber:  {
            type: String,
            required: true
        },
        category: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        }],

    }, {
        timestamps: true
    })
);

module.exports = Trainer;