const { ObjectId } = require("mongodb");
const db = require("../models");
const Training = db.Training;
exports.addTraining = (req, res) => {
    const requestObj = req.body;
    const trainingInfo = new Training(requestObj);

    trainingInfo.save((err, training) => {
        if (err) {
            res.status(500).send({ message: err });
            return
        }
        return res.send({ message: "Training created successfully!" });;
    });
};

exports.updateTraining = (req, res) => {
    const requestObj = req.body;
    const id = req.params.id;
    Training.findOneAndUpdate({
            _id: new ObjectId(id)
        }, {...requestObj }, { upsert: true })
        .exec((err, training) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            return res.status(200).send({
                ...training._doc
            });
        })
}

exports.deleteTraining = (req, res) => {
    const id = req.params.id;
    Training.findByIdAndDelete({
            _id: new ObjectId(id)
        })
        .exec((err, training) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            return res.status(200).send({
                ...training
            });
        })
}

exports.getTraining = (req, res) => {
    const id = req.params.id;
    Training.findById({
            _id: new ObjectId(id)
        })
        .exec((err, training) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            return res.status(200).send({
                ...training
            });
        })
}

exports.getTrainingList = async(req, res) => {
    const items = await Training.find().populate('categories');
    return res.status(200).send({
        items,
        total: items.length
    });
}

exports.getTrainingAndTrainerList = async(req, res) => {
    const items = await Training.find().populate('categories');
    return res.status(200).send({
        items,
        total: items.length
    });
}