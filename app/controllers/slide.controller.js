const { ObjectId } = require("mongodb");
const db = require("../models");
const Slide = db.slide
const storageUrl = process.env.S3_URL 
exports.addSlide = (req, res) => {
    const requestObj = req.body;
    const categoryInfo = new Slide(requestObj);

    categoryInfo.save((err, slide) => {
        if (err) {
            res.status(500).send({ message: err });
            return
        }
        return res.send({ message: "Slide created successfully!" });;
    });
};

exports.updateSlide = (req, res) => {
    const requestObj = req.body;
    const id = req.params.id;
    Slide.findOneAndUpdate({
            _id: new ObjectId(id)
        }, {...requestObj }, { upsert: true })
        .exec((err, catgory) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            return res.status(200).send({
                ...catgory
            });
        })
}

exports.deleteSlide = (req, res) => {
    const id = req.params.id;
    Slide.findByIdAndDelete({
            _id: new ObjectId(id)
        })
        .exec((err, catgory) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            return res.status(200).send({
                ...catgory
            });
        })
}

exports.getSlide = (req, res) => {
    const id = req.params.id;
    Slide.findById({
            _id: new ObjectId(id)
        })
        .exec((err, slide) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            const { image, ...rest } = slide._doc;
            const imageUrl = `${storageUrl}/${image}`;
            const items = { ...rest, imageUrl };
            return res.status(200).send({
                items
            });
        })
}

exports.getSlideList = async(req, res) => {
   try {
    const lists = await Slide.find();
    const items = lists.reduce((acc, list) => {
        const { image, ...rest } = list._doc;
        const imageUrl = `${storageUrl}/${image}`;
        acc.push({ ...rest, imageUrl });
        return acc;
    }, []);
    return res.status(200).send({
        items,
        total: items.length
    });
   } catch (error) {
    return res.status(500).send({
        message: error.message
    }) 
   }
}