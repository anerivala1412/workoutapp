const mongoose = require("mongoose");

const Session = mongoose.model(
    "Session",
    new mongoose.Schema({
        title: String,
        bodyType: {
            type: String,
            enum: ['Full', 'Upper', "Lower", "ALL"],
            default: 'ALL'
        },
        seat: Number,
        startDateTime: Date,
        description: String,
        cost: Number,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        tumbnail: String,
        order: Number,
        videoUrl: String,
        image: String,
    }, {
        timestamps: true
    })
);

module.exports = Session;