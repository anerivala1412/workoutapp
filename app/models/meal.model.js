const mongoose = require("mongoose");

const Meal = mongoose.model(
    "Meal",
    new mongoose.Schema({
        image:  {
            type: String,
            required: true
        },
        name:  {
            type: String,
            required: true
        },
        calories:  {
            type: Number,
            required: true
        },
        carbs:  {
            type:Number,
            required: true
        },
        fat:  {
            type:Number,
            required: true
        },
        proteine:  {
            type:Number,
            required: true
        },
        mealType: {
            type: String,
            enum: ['Breakfast', 'Lunch', "Dinner", "Snacks"],
            default: 'Snacks',
            required: true
        },
        ingredients: [],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

    }, {
        timestamps: true
    })
);

module.exports = Meal;