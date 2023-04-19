const { ObjectId } = require("mongodb");
const db = require("../models");
const EStore = db.EStore
exports.addEStore = (req, res) => {
    const requestObj = req.body;
    const eStoreInfo = new EStore(requestObj);

    eStoreInfo.save((err, eStore) => {
        if (err) {
            res.status(500).send({ message: err });
            return
        }
        return res.send({ message: "EStore created successfully!" });;
    });
};

exports.updateEStore = (req, res) => {
    const requestObj = req.body;
    const id = req.params.id;
    EStore.findOneAndUpdate({
            _id: new ObjectId(id)
        }, {...requestObj }, { upsert: true })
        .exec((err, catgory) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            return res.status(200).send({
                ...catgory._doc
            });
        })
}

exports.deleteEStore = (req, res) => {
    const id = req.params.id;
    EStore.findByIdAndDelete({
            _id: new ObjectId(id)
        })
        .exec((err, catgory) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            return res.status(200).send({
                message: "deleted"
            });
        })
}

exports.getEStore = (req, res) => {
    const id = req.params.id;
    EStore.findById({
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

exports.getEStoreList = async(req, res) => {
    try {
        const items = await EStore.find();
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