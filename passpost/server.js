if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require("express")
const bodyParser = require('body-parser')
const expressLayouts = require("express-ejs-layouts")
const methodOverride = require("method-override")
const router = require("./routes/index")
const authorRouter = require("./routes/authors")
const bookRouter = require("./routes/books")
const app = express()
const mongoose = require('mongoose')
app.use(bodyParser.urlencoded({ extended: false, limit: "10mb" }))

// parse application/json
app.use(bodyParser.json())

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function(err, db) {
  
}) 

app.set("view engine", 'ejs')
app.set("views", __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.json())
app.use(express.static("public"))
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"))

app.use('/', router)
app.use('/authors', authorRouter)
app.use("/books", bookRouter)

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening on Port 3000")
})


mongoose.connection.on("error", e => console.log(e))
mongoose.connection.on("open", _ => console.log("DB connected!"))
