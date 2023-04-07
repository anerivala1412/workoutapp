const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        profile: String,
        roles: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }],
        coin: {
            type: Number,
            default: 0
        }

    }, {
        timestamps: true
    })
);

module.exports = User;