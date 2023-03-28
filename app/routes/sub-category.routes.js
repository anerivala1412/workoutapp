require('dotenv').config();
const controller = require("../controllers/sub-category.controller");
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
        "/api/sub-category", [authJwt.verifyToken, authJwt.isAdmin],
        controller.addSubCategory
    );

    app.put(
        "/api/sub-category/:id", [authJwt.verifyToken, authJwt.isAdmin],
        controller.updateSubCategory
    );

    app.get(
        "/api/sub-category/:id", [authJwt.verifyToken, authJwt.isAdmin],
        controller.updateSubCategory
    );

    app.delete(
        "/api/sub-category/:id", [authJwt.verifyToken, authJwt.isAdmin],
        controller.updateSubCategory
    );

    app.get(
        "/api/sub-category/", [authJwt.verifyToken, authJwt.isAdmin],
        controller.getSubCategoryList
    );

};