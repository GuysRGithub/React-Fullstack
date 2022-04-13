const cors = require('cors')
const cookieParser = require("cookie-parser");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const path = require("path");
const app = express();

////////////////////////////////          CONFIG ENV VARIABLES            ////////////////////////////////
const dotenv = require("dotenv")
if (process.env.NODE_ENV === 'development') {
    dotenv.config({
        path: `./.env.development`
    })
} else {
    dotenv.config({
        path: `./.env.production`
    })
}

mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));


// noinspection JSCheckFunctionSignatures
app.use(cors())

//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({extended: true}));
//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
// app.use('/uploads/images', express.static('uploads/images'));
// app.use(express.static('uploads'))
// app.use(express.static('public'))

app.use('/api/users', require('./routes/author_users'));
// app.use("/api/blogs", require("./routes/blog_posts"))
// app.use("/api/uploads", require("./routes/uploads"))
app.use("/api/users", require("./routes/auth_router"))
app.use("/api/books", require("./routes/book"))

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    // All the javascript and css files will be read and served from this folder
    app.use(express.static("client/build"));

    // index.html for all page routes    html or routing and navigation
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    });
}

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server Listening on ${port}`)
});