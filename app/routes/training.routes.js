require('dotenv').config();
const controller = require("../controllers/training.controller");
const { authJwt, checkRequiredFields } = require("../middlewares");
const mediaUpload = require('../middlewares/media');
const singleImageUpload = mediaUpload.imageUpload.single('image');
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });
    //image-upload end-point
    app.post('/api/add-training-picture',[authJwt.verifyToken], function(req, res) {
        singleImageUpload(req, res, function(err, some) {
            if (err) {
                return res.status(422).send({ errors: [{ title: 'Image Upload Error', detail: err.message }] });
            }

            return res.json({ 'image': req.file.key });
        });
    });
    app.post(
        "/api/training", [authJwt.verifyToken, authJwt.isAdmin, checkRequiredFields(['image','name','timing','stage','categories'])],
        controller.addTraining
    );

    app.put(
        "/api/training/:id", [authJwt.verifyToken, authJwt.isAdmin],
        controller.updateTraining
    );

    app.get(
        "/api/training/:id", [authJwt.verifyToken, authJwt.isAdmin],
        controller.getTraining
    );

    app.delete(
        "/api/training/:id", [authJwt.verifyToken, authJwt.isAdmin],
        controller.deleteTraining
    );

    app.get(
        "/api/training/", [authJwt.verifyToken],
        controller.getTrainingList
    );

    app.get(
        "/api/workout-trainers", [authJwt.verifyToken],
        controller.searchWorkoutTrainer
    );

};