require('dotenv').config();
const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require('@aws-sdk/client-s3')
const s3Client = new S3Client({
    region: process.env.S3_ORIGIN,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_ACCESS_SECRET,
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
    }
};

const imageUpload = multer({
    fileFilter,
    storage: multerS3({
        acl: process.env.S3_PERMISSION,
        s3: s3Client,
        bucket: process.env.S3_BUCKET,
        metadata: function(req, file, cb) {
            cb(null, { fieldName: "TESTING_METADATA" });
        },
        key: function(req, file, cb) {
            // Figure out a unique filename
            var ext = file.originalname.split('.').pop();
            var random = Math.floor(Math.random() * 900000000000000000);
            const filename = random + '.' + ext;
            cb(null, filename); //use Date.now() for unique file keys
        }
    }),
});


const videoUpload = multer({
    fileFilter,
    storage: multerS3({
        acl: process.env.S3_PERMISSION,
        s3: s3Client,
        bucket: process.env.S3_BUCKET,
        metadata: function(req, file, cb) {
            cb(null, { fieldName: "TESTING_METADATA" });
        },
        key: function(req, file, cb) {
            // Figure out a unique filename
            var ext = file.originalname.split('.').pop();
            var random = Math.floor(Math.random() * 900000000000000000);
            const filename = random + '.' + ext;
            cb(null, filename);

        },
    }),
});


const mediaUpload = {
    imageUpload,
    videoUpload,
};
module.exports = mediaUpload;