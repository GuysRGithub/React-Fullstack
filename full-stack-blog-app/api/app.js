const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")
const routerRegister = require("./routes/register")
const routerBlogPost = require("./routes/blogPost")

const port = 5000;

mongoose.connect("mongodb://127.0.0.1/blog_api", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}) 
const app = express();
app.use(cors())
app.use(express.json());
app.use("/register", routerRegister)
app.use("/newBlogPost", routerBlogPost)

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})

db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", _ => {
  console.log("Connected to DB");
});

module.exports = app;
