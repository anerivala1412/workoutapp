require('dotenv').config();
const controller = require("../controllers/meal.controller");
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
        "/api/meal", [authJwt.verifyToken, authJwt.isUser],
        controller.addMeal
    );

    app.get(
        "/api/meal/:id", [authJwt.verifyToken, authJwt.isAdmin, authJwt.isUser],
        controller.updateMeal
    );

    app.delete(
        "/api/meal/:id", [authJwt.verifyToken, authJwt.isAdmin, authJwt.isUser],
        controller.updateMeal
    );

    app.get(
        "/api/meal/", [authJwt.verifyToken, authJwt.isUser],
        controller.getMealList
    );

};