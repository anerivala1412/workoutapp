require('dotenv').config();
const controller = require("../controllers/slide.controller");
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
        "/api/slide", [authJwt.verifyToken, authJwt.isAdmin],
        controller.addSubCategory
    );

    app.put(
        "/api/slide/:id", [authJwt.verifyToken, authJwt.isAdmin],
        controller.updateSubCategory
    );

    app.get(
        "/api/slide/:id", [authJwt.verifyToken, authJwt.isAdmin],
        controller.updateSubCategory
    );

    app.delete(
        "/api/slide/:id", [authJwt.verifyToken, authJwt.isAdmin],
        controller.updateSubCategory
    );

    app.get(
        "/api/slide/", [authJwt.verifyToken, authJwt.isAdmin],
        controller.getSubCategoryList
    );

};