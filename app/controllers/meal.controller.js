const { ObjectId } = require("mongodb");
const db = require("../models");

const Meal = db.Meal;
exports.addMeal = (req, res) => {
    const requestObj = req.body;
    requestObj.user = new ObjectId(req.userId)
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
    requestObj.user = new ObjectId(req.userId)
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
    try {
        let query = []
        query.push({ $match: { user: new ObjectId(req.userId) } });
        query.push({
            $group: {
                _id: {
                    mealType: "$mealType",
                    name: "$name",
                    user: new ObjectId(req.userId)
                },
                total: { $sum: 1 }
            }
        });
        query.push({
            $group: {
                _id: "$_id.mealType",
                meals: {
                    $push: {
                        name: "$_id.name",
                        total: "$total"
                    }
                }
            }
        });
        query.push({ "$sort": { "createdAt": -1 } });

        const items = await Meal.aggregate(query);
        return res.status(200).send({
            items,
            total: items.length
        });
    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}