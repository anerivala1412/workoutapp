var fs = require('fs');
const AWS = require('aws-sdk');
// const s3 = new AWS.S3();
AWS.config.update({ region: 'us-east-1' });
const mime = require('mime');

const BUCKET_NAME = 'my-bucket-name';

let filepath = '/home/user/test-image.jpeg';

const content = fs.readFileSync(filepath);
console.log(mime.getType(filepath));

let params = {
    params: {
        Bucket: BUCKET_NAME,
        Key: 'cancel.jpeg',
        Body: content,
        ContentType: mime.getType(filepath),
    },
};

var upload = new AWS.S3.ManagedUpload(params);

var promise = upload.promise();

promise.then(
    function(data) {
        console.log('Successfully uploaded photo.');
    },
    function(err) {
        console.error('There was an error uploading: ', err.message);
    }
);