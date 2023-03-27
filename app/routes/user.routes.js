const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
// const upload = require("../middlewares/imageUpload");
// const singleUpload = upload.single("image");
require('dotenv').config();
var fs = require('fs');
const AWS = require('aws-sdk');
const multer = require('multer');
var upload = multer({ dest: './upload/' });
const s3Client = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_ACCESS_SECRET,
    region: process.env.S3_ORIGIN
});

const uploadParams = {
    Bucket: 'fitrobic',
    Key: '', // pass key
    Body: null, // pass file body
};
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
    app.post("/:id/add-profile-picture", upload.single("image"), function(req, res) {
        // uploadParams.Key = req.file.originalname;
        // uploadParams.Body = fs.createReadStream(req.file.path),
        //     console.log({ uploadParams })
        // s3Client.upload(uploadParams, (err, data) => {
        //     if (err) {
        //         res.status(500).json({ error: "Error -> " + err });
        //     }
        //     res.json({
        //         message: 'File uploaded successfully',
        //         'filename': req.file.originalname,
        //         'location': data.Location
        //     });
        // });

        // singleUpload(req, res, function(err) {
        //     // Read content from the file
        //     const fileContent = fs.createReadStream(req);
        //     console.log({ fileContent });
        //     // Setting up S3 upload parameters
        //     const params = {
        //         bucket: 'fitrobic',
        //         Key: 'cat.jpg', // File name you want to save as in S3
        //         Body: fileContent
        //     };

        //     // Uploading files to the bucket
        //     s3.upload(params, function(err, data) {
        //         if (err) {
        //             throw err;
        //         }
        //         console.log(`File uploaded successfully. ${data.Location}`);
        //     });
        //     // User.findByIdAndUpdate(uid, update, { new: true })
        //     //     .then((user) => res.status(200).json({ success: true, user: user }))
        //     //     .catch((err) => res.status(400).json({ success: false, error: err }));
        // });

    });
};