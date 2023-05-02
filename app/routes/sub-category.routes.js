require('dotenv').config();
const controller = require("../controllers/sub-category.controller");
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
    app.post('/api/add-subCategory-picture',[authJwt.verifyToken, authJwt.isAdmin], function(req, res) {
        singleImageUpload(req, res, function(err, some) {
            if (err) {
                return res.status(422).send({ errors: [{ title: 'Image Upload Error', detail: err.message }] });
            }

            return res.json({ 'image': req.file.key });
        });
    });
    app.post(
        "/api/sub-category", [authJwt.verifyToken, authJwt.isAdmin, checkRequiredFields(['title','image','parentCategory'])],
        controller.addSubCategory
    );

    app.put(
        "/api/sub-category/:id", [authJwt.verifyToken, authJwt.isAdmin],
        controller.updateSubCategory
    );

    app.get(
        "/api/sub-category/:id", [authJwt.verifyToken],
        controller.getSubCategory
    );

    app.delete(
        "/api/sub-category/:id", [authJwt.verifyToken, authJwt.isAdmin],
        controller.deleteSubCategory
    );

    app.get(
        "/api/sub-category/", [authJwt.verifyToken],
        controller.getSubCategoryList
    );

};