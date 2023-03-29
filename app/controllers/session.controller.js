const { ObjectId } = require("mongodb");
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
    if (req.query && req.query.bodyType) {
        query.push({ $match: { bodyType: req.query.bodyType } });
    }
    query.push({ $sort: { order: 1 } })
    query.push({ $limit: 10 });
    const items = await Session.aggregate(query);
    return res.status(200).send({
        items,
        total: items.length
    });
}