const mongoose = require("mongoose");

const EStore = mongoose.model(
    "EStore",
    new mongoose.Schema({
        title: String,
        description: String,
        order: Number,
        image: String,
    }, {
        timestamps: true
    })
);

module.exports = EStore;