const { ObjectId } = require("mongodb");
const BaseService = require("../core/base.service");
const db = require("../models");
const Session = db.Session
exports.addSession = (req, res) => {
    const requestObj = req.body;
    const categoryInfo = new Session(requestObj);

    categoryInfo.save((err, Session) => {
        if (err) {
            res.status(500).send({ message: err });
            return
        }
        return res.send({ message: "Session created successfully!" });;
    });
};

exports.updateSession = (req, res) => {
    const requestObj = req.body;
    const id = req.params.id;
    Session.findOneAndUpdate({
            _id: new ObjectId(id)
        }, {...requestObj }, { upsert: true })
        .exec((err, catgory) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            return res.status(200).send({
                ...catgory
            });
        })
}

exports.deleteSession = (req, res) => {
    const id = req.params.id;
    Session.findByIdAndDelete({
            _id: new ObjectId(id)
        })
        .exec((err, catgory) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            return res.status(200).send({
                ...catgory
            });
        })
}

exports.getSession = (req, res) => {
    const id = req.params.id;
    Session.findById({
            _id: new ObjectId(id)
        })
        .exec((err, catgory) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            return res.status(200).send({
                ...catgory
            });
        })
}

exports.getSessionList = async(req, res) => {
    let query = []
    let { page, size } = req.query
    if (!page) page = 1;
    if (!size) size = 10;
    const limit = parseInt(size)
    const skip = BaseService.getSkipValue(limit, page)
    if (req.query && req.query.bodyType) {
        query.push({ $match: { bodyType: req.query.bodyType } });
    }
    query.push({ "$sort": { "order": -1 } })
    query.push({ "$skip": skip })
    query.push({ "$limit": limit })
    const items = await Session.aggregate(query);
    return res.status(200).send({
        items,
        total: items.length
    });
}