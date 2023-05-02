require('dotenv').config();
const controller = require("../controllers/trainer.controller");
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
    app.post('/api/add-trainer-picture',[authJwt.verifyToken, authJwt.isAdmin], function(req, res) {
        singleImageUpload(req, res, function(err, some) {
            if (err) {
                return res.status(422).send({ errors: [{ title: 'Image Upload Error', detail: err.message }] });
            }

            return res.json({ 'image': req.file.key });
        });
    });
    app.post(
        "/api/trainer", [authJwt.verifyToken, authJwt.isAdmin, checkRequiredFields(['image','name','speciality','experience','completedWorkout','activeClient','bio','phonenNumber','category'])],
        controller.addTrainer
    );

    app.put(
        "/api/trainer/:id", [authJwt.verifyToken, authJwt.isAdmin],
        controller.updateTrainer
    );

    app.get(
        "/api/trainer/:id", [authJwt.verifyToken],
        controller.getTrainer
    );

    app.delete(
        "/api/trainer/:id", [authJwt.verifyToken, authJwt.isAdmin],
        controller.deleteTrainer
    );

    app.get(
        "/api/trainer/", [authJwt.verifyToken],
        controller.getTrainerList
    );
    app.get(
        "/api/trainer-by-catgory/", [authJwt.verifyToken],
        controller.getTrainerByCategory
    );

};