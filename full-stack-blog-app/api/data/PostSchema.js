const mongoose = require("mongoose")

const {Schema} = mongoose


const PostSchema = new Schema({
    blogTitle: {
        type: String,
        required: true
    },
    blogCategory: {
        type: String,
        require: true
    },
    postedOn: {
        type: Date,
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    blogText: {
        type: String,
        required: false
    },
    blogImage: {
        type: String,
        required: false,
    },
})

const PostEntry = mongoose.model("PostEntry", PostSchema)

module.exports = PostEntry