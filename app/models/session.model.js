const mongoose = require("mongoose");

const Session = mongoose.model(
    "Session",
    new mongoose.Schema({
        title:  {
            type: String,
            required: true
        },
        bodyType: {
            type: String,
            enum: ['Full', 'Upper', "Lower", "ALL"],
            default: 'ALL',
            required: true
        },
        stage: {
            type: String,
            enum: ['Beginner', 'Intermediate ', "Advance"],
            default: 'Beginner',
            required: true
        },
        seat:  {
            type: Number,
            required: true
        },
        startDateTime:  {
            type: Date,
            required: true
        },
        description:  {
            type: String,
            required: true
        },
        cost:  {
            type: Number,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        tumbnail:  {
            type: String,
            required: true
        },
        order: Number,
        videoUrl:  {
            type: String,
            required: true
        },
        image:  {
            type: String,
            required: true
        },
    }, {
        timestamps: true
    })
);

module.exports = Session;