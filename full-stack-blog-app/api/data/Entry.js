const mongoose = require("mongoose")

const {Schema} = mongoose

const requiredNumber = {
    type: Number,
    required: true,
}

const logEntrySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    comments: String,
    image: String,
    rating: {
        type: Number,
        min: 0,

    }
})

const Entry = mongoose.model("Entry", logEntrySchema)

module.exports = Entry