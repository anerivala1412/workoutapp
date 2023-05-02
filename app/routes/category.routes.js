require('dotenv').config();
const controller = require("../controllers/category.controller");
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
    app.post('/add-category-picture',[authJwt.verifyToken], function(req, res) {
    singleImageUpload(req, res, function(err, some) {
        if (err) {
            return res.status(422).send({ errors: [{ title: 'Image Upload Error', detail: err.message }] });
        }

        return res.json({ 'image': req.file.key });
    });
});

    app.post(
        "/api/category", [authJwt.verifyToken, authJwt.isAdmin, checkRequiredFields(['title','image'])],
        controller.addCategory
    );

    app.put(
        "/api/category/:id", [authJwt.verifyToken, authJwt.isAdmin],
        controller.updateCategory
    );

    app.get(
        "/api/category/:id", [authJwt.verifyToken],
        controller.getCategory
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