const express = require("express");
const { Like } = require("../models/Like");
const { DisLike } = require("../models/DisLike");
const router = express.Router();

//=================================
//             User
//=================================

router.post("/getLikes", (req, res) => {
  let args = {};

  if (req.body.videoId) {
    args = { videoId: req.body.videoId };
  } else {
    args = { commentId: req.body.commentId };
  }

  Like.find(args).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.json({ success: true, likes: doc });
  });
});

router.post("/getDisLikes", (req, res) => {
  let args = {};

  if (req.body.videoId) {
    args = { videoId: req.body.videoId };
  } else {
    args = { commentId: req.body.commentId };
  }

  DisLike.find(args).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.json({ success: true, dislikes: doc });
  });
});

router.post("/upLike", (req, res) => {
  let args = {};

  if (req.body.videoId) {
    args = { videoId: req.body.videoId };
  } else {
    args = { commentId: req.body.commentId };
  }

  const like = new Like(args);
  like.save((err, like) => {
    if (err) return res.json({ success: false, err });
    DisLike.findOneAndDelete(args).exec((err, disLike) => {
      if (err) return res.json({ success: false, err });
      res.json({ success: true });
    });
  });
});

router.post("/unLike", (req, res) => {
  let args = {};

  if (req.body.videoId) {
    args = { videoId: req.body.videoId };
  } else {
    args = { commentId: req.body.commentId };
  }

  Like.findOneAndDelete(args).exec((err, _) => {
    if (err) return res.status(400).json({ success: false, err });
    res.json({ success: true });
  });
});


router.post("/upDisLike", (req, res) => {
    let args = {};
  
    if (req.body.videoId) {
      args = { videoId: req.body.videoId };
    } else {
      args = { commentId: req.body.commentId };
    }
  
    const like = new DisLike(args);
    like.save((err, _) => {
      if (err) return res.json({ success: false, err });
      Like.findOneAndDelete(args).exec((err, _) => {
        if (err) return res.json({ success: false, err });
        res.json({ success: true });
      });
    });
  });

router.post("/unDisLike", (req, res) => {
    let args = {};
  
    if (req.body.videoId) {
      args = { videoId: req.body.videoId };
    } else {
      args = { commentId: req.body.commentId };
    }
  
    DisLike.findOneAndDelete(args).exec((err, _) => {
      if (err) return res.status(400).json({ success: false, err });
      res.json({ success: true });
    });
  });

module.exports = router;
