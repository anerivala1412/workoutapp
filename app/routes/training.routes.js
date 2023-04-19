require('dotenv').config();
const controller = require("../controllers/training.controller");
const { authJwt } = require("../middlewares");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/training", [authJwt.verifyToken, authJwt.isAdmin],
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