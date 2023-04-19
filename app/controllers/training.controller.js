const { ObjectId } = require("mongodb");
const db = require("../models");
const Trainer = require("../models/trainer.model");
const BaseService = require("../core/base.service");
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
    try {
        const items = await Training.find().populate('categories');
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

exports.searchWorkoutTrainer = async(req, res) => {
    let query = []
    let trainerQuery = []
    let trainingQuery = []
    let { page, size } = req.query
    if (!page) page = 1;
    if (!size) size = 10;
    const limit = parseInt(size)
    const skip = BaseService.getSkipValue(limit, page)
    
    query.push({ "$sort": { "order": -1 } })
    query.push({ "$skip": skip })
    query.push({ "$limit": limit })

    //querry for the trainers collection
    if (req.query && req.query.name) {
        trainerQuery.push({$match: { name: { $regex: req.query.name, $options: "i" } } }, );
    }
    const trainerItems = await Trainer.aggregate(trainerQuery, query);
    const categories = trainerItems.flatMap(trainer => trainer.category);

    //query for the training collection using the categories from trainer
    trainingQuery.push({$match: { categories: { $in: categories } } })
    const trainingItems = await Training.aggregate(trainingQuery,query); 
    const items = [...trainingItems, ...trainerItems]
    return res.status(200).send({
        items,
        total: items.length
    });
}