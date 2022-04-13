const express = require("express");
const router = express.Router();
const Post = require("../data/PostSchema")

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/", (req, res) => {
  const post = new Post({
    blogTitle: req.body.blogTitle,
    blogCategory: req.body.blogCategory,
    postedOn: req.body.postedOn,
    author: req.body.author,
    blogText: req.body.blogText,
    blogImage: req.body.blogImage,
  });

  post.save(function (error, post) {
    if (error) console.log(error);
    console.log("Save User", post);
  });

  Post.find(function (err, posts) {
    if (err) return console.error(err);
    console.log("All User", posts);
  });
});

module.exports = router;
