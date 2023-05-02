const { ObjectId } = require("mongodb");
const db = require("../models");
const BaseService = require("../core/base.service");
const Category = db.category
const storageUrl = process.env.S3_URL 
exports.addCategory = (req, res) => {
    const requestObj = req.body;
    const categoryInfo = new Category(requestObj);

    categoryInfo.save((err, category) => {
        if (err) {
            res.status(500).send({ message: err });
            return
        }
        return res.send({ message: "Category created successfully!" });
    });
};

exports.updateCategory = (req, res) => {
    const requestObj = req.body;
    const id = req.params.id;
    Category.findOneAndUpdate({
            _id: new ObjectId(id)
        }, {...requestObj }, { upsert: true })
        .exec((err, catgory) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            return res.status(200).send({
                ...catgory._doc
            });
        })
}

exports.deleteCategory = (req, res) => {
    const id = req.params.id;
    Category.findByIdAndDelete({
            _id: new ObjectId(id)
        })
        .exec((err, catgory) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            return res.status(200).send({
                message: "deleted"
            });
        })
}

exports.getCategory = (req, res) => {
    const id = req.params.id;
    Category.findById({
            _id: new ObjectId(id)
        })
        .exec((err, catgory) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            const { image, ...rest } = catgory._doc;
            const imageUrl = BaseService.awsImageUrl(image);
            const items = { ...rest, imageUrl };
            return res.status(200).send({
                items
            });
        })
}

exports.getCategoryList = async(req, res) => {
    try {
        const lists = await Category.find();
        const items = lists.reduce((acc, list) => {
            const { image, ...rest } = list.toObject();
            const imageUrl = BaseService.awsImageUrl(image);
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