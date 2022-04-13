const moogoose = require("mongoose")
const Book = require("./book")

const authorSchema = new moogoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    }

})

authorSchema.pre("remove", function(next) {
    Book.find({author: this.id}, (err, books) => {
        if (err) {
            next(err)
        } else if (books.length > 0) {
            next(new Error("This author has books still"))
        } else {
            next()
        }
    })
}) 

module.exports = moogoose.model("Author",authorSchema)