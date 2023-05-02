require('dotenv').config();
const controller = require("../controllers/meal.controller");
const { authJwt, checkRequiredFields } = require("../middlewares");
const mediaUpload = require("../middlewares/media");
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
    app.post('/api/add-meal-picture',[authJwt.verifyToken], function(req, res) {
        singleImageUpload(req, res, function(err, some) {
            if (err) {
                return res.status(422).send({ errors: [{ title: 'Image Upload Error', detail: err.message }] });
            }

            return res.status(200).json({ 'image': req.file.location });
        });
    });

    app.post(
        "/api/meal", [authJwt.verifyToken, authJwt.isUser, checkRequiredFields(['name','image','calories','carbs','fat','proteine','mealType','ingredients'])],
        controller.addMeal
    );

    app.get(
        "/api/meal/:id", [authJwt.verifyToken, authJwt.isAdmin, authJwt.isUser],
        controller.getMeal
    );

    app.delete(
        "/api/meal/:id", [authJwt.verifyToken, authJwt.isAdmin, authJwt.isUser],
        controller.deleteMeal 
    );

    app.get(
        "/api/meal/", [authJwt.verifyToken, authJwt.isUser],
        controller.getMealList
    );

};