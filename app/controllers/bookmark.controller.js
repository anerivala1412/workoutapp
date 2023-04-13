const { ObjectId } = require("mongodb");
const BaseService = require("../core/base.service");
const db = require("../models");
const Bookmark = db.bookmark
exports.addBookmark = (req, res) => {
        const requestObj = req.body;
        const bookmarkInfo = new Bookmark(requestObj);
    
        bookmarkInfo.save((err, Bookmark) => {
            if (err) {
                res.status(500).send({ message: err.message });
                return
            }
            return res.send({ message: "Bookmark created successfully!" });;
        });
    
   
};

exports.updateBookmark = (req, res) => {
    const requestObj = req.body;
    const id = req.params.id;
    Bookmark.findOneAndUpdate({
            _id: new ObjectId(id)
        }, {...requestObj }, { upsert: true })
        .exec((err, Bookmark) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            return res.status(200).send({
                ...Bookmark
            });
        })
}

exports.deleteBookmark = (req, res) => {
    const id = req.params.id;
    Bookmark.findByIdAndDelete({
            _id: new ObjectId(id)
        })
        .exec((err, Bookmark) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            return res.status(200).send({
                ...Bookmark
            });
        })
}

exports.getBookmark = (req, res) => {
    const id = req.params.id;
    Bookmark.findById({
            _id: new ObjectId(id)
        })
        .exec((err, Bookmark) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            return res.status(200).send({
                ...Bookmark
            });
        })
}

exports.getBookmarkList = async(req, res) => {
    let query = []
    let { page, size } = req.query
    if (!page) page = 1;
    if (!size) size = 10;
    const limit = parseInt(size)
    const skip = BaseService.getSkipValue(limit, page)

    query.push({ "$sort": { "order": -1 } })
    query.push({ "$skip": skip })
    query.push({ "$limit": limit })
    const items = await Bookmark.aggregate(query);
    return res.status(200).send({
        items,
        total: items.length
    });
}