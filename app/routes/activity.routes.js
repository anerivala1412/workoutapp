require('dotenv').config();
const controller = require("../controllers/activity.controller");
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
        "/api/activity", [authJwt.verifyToken],
        controller.addActivity
    );

    app.put(
        "/api/activity/:id", [authJwt.verifyToken],
        controller.updateActivity
    );

    app.get(
        "/api/activity/:id", [authJwt.verifyToken],
        controller.getActivity
    );

    app.delete(
        "/api/activity/:id", [authJwt.verifyToken],
        controller.deleteActivity
    );

    app.get(
        "/api/activity/", [authJwt.verifyToken],
        controller.getActivityList
    );
};