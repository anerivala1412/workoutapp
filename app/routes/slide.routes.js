require('dotenv').config();
const controller = require("../controllers/slide.controller");
const { authJwt, checkRequiredFields } = require("../middlewares");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });
    //image-upload end-point
    app.post('/api/add-slide-picture',[authJwt.verifyToken, authJwt.isAdmin], function(req, res) {
        singleImageUpload(req, res, function(err, some) {
            if (err) {
                return res.status(422).send({ errors: [{ title: 'Image Upload Error', detail: err.message }] });
            }

            return res.json({ 'image': req.file.key });
        });
    });
    app.post(
        "/api/slide", [authJwt.verifyToken, authJwt.isAdmin, checkRequiredFields(['title','image'])],
        controller.addSlide
    );

    app.put(
        "/api/slide/:id", [authJwt.verifyToken, authJwt.isAdmin],
        controller.updateSlide
    );

    app.get(
        "/api/slide/:id", [authJwt.verifyToken],
        controller.getSlide
    );

    app.delete(
        "/api/slide/:id", [authJwt.verifyToken, authJwt.isAdmin],
        controller.deleteSlide
    );

    app.get(
        "/api/slide/", [authJwt.verifyToken, authJwt.isAdmin],
        controller.getSlideList
    );

};