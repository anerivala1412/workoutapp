const mongoose = require("mongoose");

const Role = mongoose.model(
    "Role",
    new mongoose.Schema({
        name:  {
            type: String,
            required: true
        },
    }, {
        timestamps: true
    }),
);

module.exports = Role;