const mongoose = require("mongoose");

const Activity = mongoose.model(
    "Activity",
    new mongoose.Schema({
        order: {
            type: Number,
            default: 0
        },
        steps: {
            type: Number,
            default: 0
        },
        avgPace: {
            type: Number,
            default: 0
        },
        sleep: {
            type: Number,
            default: 0
        },
        calories: {
            type: Number,
            default: 0
        },
        targetSteps: {
            type: Number,
            default: 0
        },
        coveredSteps: {
            type: Number,
            default: 0
        },
        avgHeartRate: {
            type: Number,
            default: 0
        },
        coveredDistance: {
            type: Number,
            default: 0
        },
        activityType: {
            type: String,
            enum: ['Walk', 'Running', "Cycling", "Workout", "Yoga"],
            default: 'Walk'
        },


    }, {
        timestamps: true
    })
);

module.exports = Activity;