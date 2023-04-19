const { ObjectId } = require("mongodb");
const db = require("../models");
const Activity = db.Activity
exports.addActivity = (req, res) => {
    const requestObj = req.body;
    const activityInfo = new Activity(requestObj);

    activityInfo.save((err, activity) => {
        if (err) {
            res.status(500).send({ message: err });
            return
        }
        return res.send({ message: "Activity created successfully!" });;
    });
};

exports.updateActivity = (req, res) => {
    const requestObj = req.body;
    const id = req.params.id;
    Activity.findOneAndUpdate({
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

exports.deleteActivity = (req, res) => {
    const id = req.params.id;
    Activity.findByIdAndDelete({
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

exports.getActivity = (req, res) => {
    const id = req.params.id;
    Activity.findById({
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

exports.getActivityList = async(req, res) => {
   try {
    const items = await Activity.find();
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