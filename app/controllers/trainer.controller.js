const { ObjectId } = require("mongodb");
const db = require("../models");
const Trainer = db.Trainer
exports.addTrainer = (req, res) => {
    const requestObj = req.body;
    const trainerInfo = new Trainer(requestObj);

    trainerInfo.save((err, trainer) => {
        if (err) {
            res.status(500).send({ message: err });
            return
        }
        return res.send({ message: "Trainer created successfully!" });;
    });
};

exports.updateTrainer = (req, res) => {
    const requestObj = req.body;
    const id = req.params.id;
    Trainer.findOneAndUpdate({
            _id: new ObjectId(id)
        }, {...requestObj }, { upsert: true })
        .exec((err, trainer) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            return res.status(200).send({
                ...trainer._doc
            });
        })
}

exports.deleteTrainer = (req, res) => {
    const id = req.params.id;
    Trainer.findByIdAndDelete({
            _id: new ObjectId(id)
        })
        .exec((err, trainer) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            return res.status(200).send({
                ...trainer
            });
        })
}

exports.getTrainer = (req, res) => {
    const id = req.params.id;
    Trainer.findById({
            _id: new ObjectId(id)
        })
        .exec((err, trainer) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            return res.status(200).send({
                ...trainer
            });
        })
}

exports.getTrainerList = async(req, res) => {
    const items = await Trainer.find();
    return res.status(200).send({
        items,
        total: items.length
    });
}

exports.getTrainerByCategory = async() => {
    let query = []
        // query.push({ $match: { user: new ObjectId(req.userId) } });
        // query.push({
        //     $group: {
        //         _id: {
        //             mealType: "$mealType",
        //             name: "$name",
        //             user: new ObjectId(req.userId)
        //         },
        //         total: { $sum: 1 }
        //     }
        // });
        // query.push({
        //     $group: {
        //         _id: "$_id.mealType",
        //         meals: {
        //             $push: {
        //                 name: "$_id.name",
        //                 total: "$total"
        //             }
        //         }
        //     }
        // });
    query.push({ "$sort": { "createdAt": -1 } });

    return res.status(200).send({
        items,
        total: items.length
    });
}