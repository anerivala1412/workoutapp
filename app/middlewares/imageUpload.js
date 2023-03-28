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

const upload = multer({
    fileFilter,
    storage: multerS3({
        acl: process.env.S3_PERMISSION,
        s3: s3Client,
        bucket: process.env.S3_BUCKET,
        metadata: function(req, file, cb) {
            console.log({ output: req })
            cb(null, { fieldName: "TESTING_METADATA" });
        },
        key: function(req, file, cb) {
            cb(null, Date.now().toString());
        },
    }),
});

module.exports = upload;