const { ObjectId } = require("mongodb");
const db = require("../models");
const Meal = db.meal
exports.addMeal = (req, res) => {
    const requestObj = req.body;
    const mealInfo = new Meal(requestObj);

    mealInfo.save((err, meal) => {
        if (err) {
            res.status(500).send({ message: err });
            return
        }
        return res.send({ message: "Meal created successfully!" });;
    });
};

exports.updateMeal = (req, res) => {
    const requestObj = req.body;
    const id = req.params.id;
    Meal.findOneAndUpdate({
            _id: new ObjectId(id)
        }, {...requestObj }, { upsert: true })
        .exec((err, meal) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            return res.status(200).send({
                ...meal._doc
            });
        })
}

exports.deleteMeal = (req, res) => {
    const id = req.params.id;
    Meal.findByIdAndDelete({
            _id: new ObjectId(id)
        })
        .exec((err, meal) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            return res.status(200).send({
                ...meal
            });
        })
}

exports.getMeal = (req, res) => {
    const id = req.params.id;
    Meal.findById({
            _id: new ObjectId(id)
        })
        .exec((err, meal) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            return res.status(200).send({
                ...meal
            });
        })
}

exports.getMealList = async(req, res) => {
    const items = await Meal.find();
    return res.status(200).send({
        items,
        total: items.length
    });
}