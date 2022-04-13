const moogoose = require("mongoose");
const path = require("path")
const coverImagePath = 'uploads/bookCovers'

const bookSchema = new moogoose.Schema({
  description: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  publishDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    require: true,
    default: Date.now,
  },
  coverImage: {
    type: Buffer,
    required: true,
  },
  coverImageType: {
    type: String,
    required: true
  },
  author: {
    type: moogoose.Schema.Types.ObjectId,
    required: true,
    ref: "Author"
  },
});

bookSchema.virtual('coverImagePath').get(function() {
  if (this.coverImage != null && this.coverImageType != null) {
    return `data:${this.coverImageType};charset-urf-8;base64,${this.coverImage.toString('base64')}`
  }
})

module.exports = moogoose.model("Book", bookSchema);
module.exports.coverImagePath = coverImagePath
