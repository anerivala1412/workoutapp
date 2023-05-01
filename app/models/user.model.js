const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username:  {
            type: String,
            required: true
        },
        email:  {
            type: String,
            required: true
        },
        password:  {
            type: String,
            required: true
        },
        profile: String,
        roles: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
            required: true
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