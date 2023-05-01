const mongoose = require("mongoose");

const EStore = mongoose.model(
    "EStore",
    new mongoose.Schema({
        title:  {
            type: String,
            required: true
        },
        description:  {
            type: String,
            required: true
        },
        order: Number,
        image: {
            type: String,
            required: true
        },
    }, {
        timestamps: true
    })
);

module.exports = EStore;