require('dotenv').config();
const controller = require("../controllers/experience.controller");
const { authJwt, checkRequiredFields } = require("../middlewares");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/experience", [authJwt.verifyToken, authJwt.isAdmin, checkRequiredFields(['workout','trainer','user',''])],
        controller.addExperience
    );

    app.put(
        "/api/experience/:id", [authJwt.verifyToken, authJwt.isAdmin],
        controller.updateExperience
    );

    app.get(
        "/api/experience/:id", [authJwt.verifyToken, authJwt.isAdmin],
        controller.getExperience
    );

    app.delete(
        "/api/experience/:id", [authJwt.verifyToken, authJwt.isAdmin],
        controller.deleteExperience
    );

    app.get(
        "/api/experience/", [authJwt.verifyToken],
        controller.getExperienceList
    );

};