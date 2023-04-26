require('dotenv').config();
const controller = require('../controllers/chatgpt.image.controller');
const mediaUpload = require('../middlewares/media');
const singleImageUpload = mediaUpload.imageUpload.single('image');
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
  });

  app.get(
    '/api/image-result',
    function (req, res, next) {
      if (req.headers['content-type']?.startsWith('multipart/form-data')) {
        singleImageUpload(req, res, function (err, some) {
          if (err) {
            return res.status(422).send({ errors: [{ title: 'Image Upload Error', detail: err.message }] });
          }
          req.body.imageUrl = req.file.location;
          next();
        });
      } else {
        next();
      }
    },
    controller.getImageResult
  );
};
