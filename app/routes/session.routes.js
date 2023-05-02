require('dotenv').config();
const controller = require("../controllers/session.controller");
const { authJwt, checkRequiredFields } = require("../middlewares");
const mediaUpload = require('../middlewares/media');
const singleImageUpload = mediaUpload.imageUpload.single('image');
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });
    //image-upload end-point
    app.post('/api/add-session-picture',[authJwt.verifyToken, authJwt.isAdmin], function(req, res) {
        singleImageUpload(req, res, function(err, some) {
            if (err) {
                return res.status(422).send({ errors: [{ title: 'Image Upload Error', detail: err.message }] });
            }

            return res.json({ 'image': req.file.key });
        });
    });
    app.post(
        "/api/session", [authJwt.verifyToken, authJwt.isAdmin, checkRequiredFields(['title'],'bodyType','stage','seat','startDateTime','description','cost','author','tumbnail','image','videoUrl')],
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