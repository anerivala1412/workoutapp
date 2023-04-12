require('dotenv').config();
const controller = require("../controllers/chatgpt.image.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/image-result", [],
        controller.getImageResult
    );

};