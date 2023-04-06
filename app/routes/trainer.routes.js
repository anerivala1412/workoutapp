require('dotenv').config();
const controller = require("../controllers/trainer.controller");
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
        "/api/trainer", [authJwt.verifyToken, authJwt.isAdmin],
        controller.addTrainer
    );

    app.put(
        "/api/trainer/:id", [authJwt.verifyToken, authJwt.isAdmin],
        controller.updateTrainer
    );

    app.get(
        "/api/trainer/:id", [authJwt.verifyToken, authJwt.isAdmin],
        controller.updateTrainer
    );

    app.delete(
        "/api/trainer/:id", [authJwt.verifyToken, authJwt.isAdmin],
        controller.updateTrainer
    );

    app.get(
        "/api/trainer/", [authJwt.verifyToken],
        controller.getTrainerList
    );

};