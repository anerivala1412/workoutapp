const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        itemType: {
            type: String, // Stores the type of the bookmarked item (e.g. "activity", "trainer", "e-store")
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


bookmarkSchema.pre("save", async function (next) {
    console.log("Pre-save hook called");
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




const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
module.exports = Bookmark;

