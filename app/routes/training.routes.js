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
        controller.addTrainer
    );

    app.put(
        "/api/training/:id", [authJwt.verifyToken, authJwt.isAdmin],
        controller.updateTrainer
    );

    app.get(
        "/api/training/:id", [authJwt.verifyToken, authJwt.isAdmin],
        controller.updateTrainer
    );

    app.delete(
        "/api/training/:id", [authJwt.verifyToken, authJwt.isAdmin],
        controller.updateTrainer
    );

    app.get(
        "/api/training/", [authJwt.verifyToken, authJwt.isUser],
        controller.getTrainerList
    );

};