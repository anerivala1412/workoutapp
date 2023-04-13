require('dotenv').config();
const controller = require("../controllers/bookmark.controller");
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
        "/api/bookmark", [authJwt.verifyToken, authJwt.isUser],
        controller.addBookmark
    );

    app.put(
        "/api/bookmark/:id", [authJwt.verifyToken, authJwt.isUser],
        controller.updateBookmark
    );

    app.get(
        "/api/bookmark/:id", [authJwt.verifyToken, authJwt.isUser],
        controller.updateBookmark
    );

    app.delete(
        "/api/bookmark/:id", [authJwt.verifyToken, authJwt.isUser],
        controller.deleteBookmark
    );

    app.get(
        "/api/bookmark/", [authJwt.verifyToken],
        controller.getBookmarkList
    );

};