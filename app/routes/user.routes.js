require('dotenv').config();
const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const mediaUpload = require("../middlewares/media");
const singleImageUpload = mediaUpload.imageUpload.single('image');

const singleVideoUpload = mediaUpload.videoUpload.single('video');
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", controller.allAccess);

    app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

    app.get(
        "/api/test/mod", [authJwt.verifyToken, authJwt.isModerator],
        controller.moderatorBoard
    );

    app.get(
        "/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );

    //image-upload end-point
    app.post('/:id/add-profile-picture',[authJwt.verifyToken], function(req, res) {
        singleImageUpload(req, res, function(err, some) {
            if (err) {
                return res.status(422).send({ errors: [{ title: 'Image Upload Error', detail: err.message }] });
            }

            return res.json({ 'imageUrl': req.file.key });
        });
    });

    //video-upload end-point
    app.post('/:id/add-profile-video',[authJwt.verifyToken], function(req, res) {
        singleVideoUpload(req, res, function(err, some) {
            if (err) {
                return res.status(422).send({ errors: [{ title: 'video Upload Error', detail: err.message }] });
            }
            return res.json({ 'videoUrl': req.file.key });
        });
    });
};