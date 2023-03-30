const mongoose = require("mongoose");

const Meal = mongoose.model(
    "Meal",
    new mongoose.Schema({
        image: String,
        name: String,
        calories: Number,
        carbs: Number,
        fat: Number,
        proteine: Number,
        mealType: {
            type: String,
            enum: ['Breakfast', 'Lunch', "Dinner", "Snacks"],
            default: 'Snacks'
        },
        ingredients: [],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

    }, {
        timestamps: true
    })
);

module.exports = Meal;