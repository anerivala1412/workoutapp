require('dotenv').config();
const controller = require("../controllers/session.controller");
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
        "/api/session", [authJwt.verifyToken, authJwt.isAdmin],
        controller.addSession
    );

    app.put(
        "/api/session/:id", [authJwt.verifyToken, authJwt.isAdmin],
        controller.updateSession
    );

    app.get(
        "/api/session/:id", [authJwt.verifyToken],
        controller.getSession
    );

    app.delete(
        "/api/session/:id", [authJwt.verifyToken, authJwt.isAdmin],
        controller.deleteSession
    );

    app.get(
        "/api/session/", [],
        controller.getSessionList
    );

};