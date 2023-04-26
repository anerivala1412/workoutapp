const { ObjectId } = require("mongodb");
const db = require("../models");
const Category = db.category;

exports.addCategory = (req, res) => {
    const requestObj = req.body;
    const categoryInfo = new Category(requestObj);

    categoryInfo.save((err, category) => {
        if (err) {
            res.status(500).send({ message: err });
            return
        }
        return res.send({ message: "Category created successfully!" });;
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
            return res.status(200).send({
                ...catgory
            });
        })
}

exports.getCategoryList = async(req, res) => {
    try {
        const items = await Category.find();
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