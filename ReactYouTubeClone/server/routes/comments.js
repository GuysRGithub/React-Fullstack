const express = require("express");
const { Comment } = require("../models/Comment");
const router = express.Router();

//=================================
//             User
//=================================

router.post("/saveComment", (req, res) => {
  let comment = new Comment(req.body);
  comment.save((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    Comment.find({ _id: comment._id })
      .populate("writer")
      .exec((err, comment) => {
        if (err) return res.status(400).json({ success: false });
        res.status(200).json({ success: true, comment });
      });
  });
});

router.post("/getComments", (req, res) => {
  Comment.find({"postId": req.body.videoId})
  .populate("writer")
  .exec((err, comments) => {
    if (err) return res.status(400).json({ success: false });
    res.status(200).json({ success: true, comments });  })
});

module.exports = router;
