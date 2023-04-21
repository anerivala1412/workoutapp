const { ObjectId } = require("mongodb");
const db = require("../models");
const SubCategory = db.SubCategory
exports.addSubCategory = (req, res) => {
    const requestObj = req.body;
    const SubCategoryInfo = new SubCategory(requestObj);

    SubCategoryInfo.save((err, SubCategory) => {
        if (err) {
            res.status(500).send({ message: err });
            return
        }
        return res.send({ message: "SubCategory created successfully!" });;
    });
};

exports.updateSubCategory = (req, res) => {
    const requestObj = req.body;
    const id = req.params.id;
    SubCategory.findOneAndUpdate({
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

exports.deleteSubCategory = (req, res) => {
    const id = req.params.id;
    SubCategory.findByIdAndDelete({
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

exports.getSubCategory = (req, res) => {
    const id = req.params.id;
    SubCategory.findById({
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

exports.getSubCategoryList = async(req, res) => {
   try {
    const items = await SubCategory.find();
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