const { ObjectId } = require("mongodb");
const db = require("../models");
const EventEmitter = require('events');
const activityEmitter = new EventEmitter();
const Activity = db.Activity
exports.addActivity = async (message, socketId) => {
    const id = message.userId;
    const requestObj = message;
    const activity =  await Activity.findOne({
            userId: new ObjectId(id)
        }).populate('userId')
     if(activity && activity.userId) {
        Activity.findOneAndUpdate({
            userId: new ObjectId(id)
        }, {...requestObj }, { upsert: true })
        .exec((err, activity) => {
            if (err) {
               
                return activityEmitter.emit('activity-added', err);
            }
            
            return activityEmitter.emit('activity-added', 'activity updated', socketId);
        })
     } else{
        const activityInfo = new Activity(requestObj);

        activityInfo.save((err, activity) => {
            if (err) {
                activityEmitter.emit('activity-added', err);
                return
            }
            return  activityEmitter.emit('activity-added', 'actvity added', socketId);
        });
     }
   
   
    
};
exports.getActivityEmitter = () => activityEmitter;

exports.updateActivity = (req, res) => {
    const requestObj = req.body;
    const id = req.params.id;
    Activity.findOneAndUpdate({
            _id: new ObjectId(id)
        }, {...requestObj }, { upsert: true })
        .exec((err, activity) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            return res.status(200).send({
                ...activity._doc
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
