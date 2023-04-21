require('dotenv').config();
const controller = require("../controllers/e-store.controller");
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
        "/api/e-store", [authJwt.verifyToken, authJwt.isAdmin],
        controller.addEStore
    );

    app.put(
        "/api/e-store/:id", [authJwt.verifyToken, authJwt.isAdmin],
        controller.updateEStore
    );

    app.get(
        "/api/e-store/:id", [authJwt.verifyToken, authJwt.isAdmin],
        controller.getEStore
    );

    app.delete(
        "/api/e-store/:id", [authJwt.verifyToken, authJwt.isAdmin],
        controller.deleteEStore
    );

    app.get(
        "/api/e-store/", [authJwt.verifyToken],
        controller.getEStoreList
    );

};