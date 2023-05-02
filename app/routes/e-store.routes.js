require('dotenv').config();
const controller = require("../controllers/e-store.controller");
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
    app.post('/api/add-Estore-picture',[authJwt.verifyToken, authJwt.isAdmin], function(req, res) {
        singleImageUpload(req, res, function(err, some) {
            if (err) {
                return res.status(422).send({ errors: [{ title: 'Image Upload Error', detail: err.message }] });
            }

            return res.json({ 'image': req.file.key });
        });
    });

    app.post(
        "/api/e-store", [authJwt.verifyToken, authJwt.isAdmin, checkRequiredFields(['title','description','image'])],
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