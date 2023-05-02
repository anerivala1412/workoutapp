const { ObjectId } = require("mongodb");
const db = require("../models");
const Trainer = require("../models/trainer.model");
const BaseService = require("../core/base.service");
const Training = db.Training
exports.addTraining = (req, res) => {
    const requestObj = req.body;
    const trainingInfo = new Training(requestObj);

    trainingInfo.save((err, training) => {
        if (err) {
            res.status(500).send({ message: err });
            return
        }
        return res.send({ message: "Training created successfully!" });
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
        }).populate('categories','title')
        .exec((err, training) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            const { image, ...rest } = training._doc;
            const imageUrl = BaseService.awsImageUrl(image);
            const items = { ...rest, imageUrl };
            return res.status(200).send({
                items
            });
        })
}

exports.getTrainingList = async(req, res) => {
    const lists = await Training.find().populate('categories','title');
    const items = lists.reduce((acc, list) => {
        const { image, ...rest } = list._doc;
        const imageUrl = BaseService.awsImageUrl(image);
        acc.push({ ...rest, imageUrl });
        return acc;
    }, []);
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
    try {
        let query = []
        let { page, size } = req.query
        if (!page) page = 1;
        if (!size) size = 10;
        const limit = parseInt(size)
        const skip = BaseService.getSkipValue(limit, page)
        
        query.push(
        { "$sort": { "order": -1 } },
        { "$skip": skip },
        { "$limit": limit }
        )
      

        //querry for the trainers collection
        if (req.query && req.query.name) {
            query.push({
                $lookup: {
                  from: "categories",
                  localField: "category",
                  foreignField: "_id",
                  as: "categoryInfo",
                 
                }
              },
              {
                $match: {
                  $or: [
                    { name: { $regex:req.query.name, $options: "i" } },
                    { "categoryInfo.title": { $regex: req.query.name, $options: "i" } }
                  ]
                }
              },
              {
                $addFields: {
                  category: "$categoryInfo.title"
                }
              },{ $project: { categoryInfo: 0 } }
             );
        }
       
        
        const trainerItems = await Trainer.aggregate([query]);
      
        const items = [...trainerItems]
        return res.status(200).send({
            items,
            total: items.length
        });
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
    
}