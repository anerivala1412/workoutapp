const { ObjectId } = require("mongodb");
const BaseService = require("../core/base.service");
const db = require("../models");
const Experience = db.Experience;

exports.addExperience = (req, res) => {
    const requestObj = req.body;
    const categoryInfo = new Experience(requestObj);

    categoryInfo.save((err, Experience) => {
        if (err) {
            res.status(500).send({ message: err });
            return
        }
        return res.send({ message: "Experience created successfully!" });;
    });
};

exports.updateExperience = (req, res) => {
    const requestObj = req.body;
    const id = req.params.id;
    Experience.findOneAndUpdate({
            _id: new ObjectId(id)
        }, {...requestObj }, { upsert: true })
        .exec((err, experience) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            return res.status(200).send({
                ...experience
            });
        })
}

exports.deleteExperience = (req, res) => {
    const id = req.params.id;
    Experience.findByIdAndDelete({
            _id: new ObjectId(id)
        })
        .exec((err, experience) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            return res.status(200).send({
                ...experience
            });
        })
}

exports.getExperience = (req, res) => {
    const id = req.params.id;
    Experience.findById({
            _id: new ObjectId(id)
        })
        .exec((err, experience) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            return res.status(200).send({
                ...experience
            });
        })
}

exports.getExperienceList = async(req, res) => {
    try {
        let query = []
        let { page, size } = req.query
        if (!page) page = 1;
        if (!size) size = 10;
        const limit = parseInt(size)
        const skip = BaseService.getSkipValue(limit, page)

        query.push({ "$sort": { "order": -1 } })
        query.push({ "$skip": skip })
        query.push({ "$limit": limit })
        const items = await Experience.aggregate(query);
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