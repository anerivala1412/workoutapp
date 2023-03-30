const mongoose = require("mongoose");

const Trainer = mongoose.model(
    "Trainer",
    new mongoose.Schema({
        image: String,
        name: String,
        speciality: String,
        order: Number,
        rate: Number,
        rating: Number,
        experience: Number,
        completedWorkout: Number,
        activeClient: Number,
        bio: String,
        phonenNumber: String,

    }, {
        timestamps: true
    })
);

module.exports = Trainer;