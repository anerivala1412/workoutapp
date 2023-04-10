require('dotenv').config();
const controller = require("../controllers/category.controller");
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
        "/api/category", [authJwt.verifyToken, authJwt.isAdmin],
        controller.addCategory
    );

    app.put(
        "/api/category/:id", [authJwt.verifyToken, authJwt.isAdmin],
        controller.updateCategory
    );

    app.get(
        "/api/category/:id", [authJwt.verifyToken],
        controller.updateCategory
    );

    app.delete(
        "/api/category/:id", [authJwt.verifyToken, authJwt.isAdmin],
        controller.deleteCategory
    );

    app.get(
        "/api/category/", [authJwt.verifyToken],
        controller.getCategoryList
    );

};