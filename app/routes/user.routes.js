require('dotenv').config();
const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const upload = require("../middlewares/imageUpload");
const singleUpload = upload.single('image');

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
    app.post('/:id/add-profile-picture', function(req, res) {
        singleUpload(req, res, function(err, some) {
            if (err) {
                return res.status(422).send({ errors: [{ title: 'Image Upload Error', detail: err.message }] });
            }

            return res.json({ 'imageUrl': req.file.location });
        });
    });
};