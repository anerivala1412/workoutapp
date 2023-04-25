const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    itemType: {
        type: String,
        enum: ["Activity", "Trainer", "EStore", "Training"], // Stores the type of the bookmarked item (e.g. "activity", "trainer", "e-store")
        required: true
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "itemType",
        required: true
    },
}, {
    timestamps: true
});


bookmarkSchema.pre("save", async function(next) { //to check if the itemId is present in the reference collection
    try {
        const model = mongoose.model(this.itemType);
        const item = await model.findById(this.itemId);
        if (!item) {
            const error = new Error(`Referenced ${this.itemType} not found`);
            throw error;
        }
        next();
    } catch (err) {
        next(err);
    }
});

bookmarkSchema.pre("save", async function(next) { //to prevent duplicated items from save
    console.log("Pre-save hook called");
    const bookmark = this;
    const existingBookmark = await Bookmark.findOne({ userId: bookmark.userId, itemId: bookmark.itemId, itemType: bookmark.itemType });
    if (existingBookmark) {
        throw new Error("Bookmark already exists for this item");
    }
    next();
});


const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
module.exports = Bookmark;