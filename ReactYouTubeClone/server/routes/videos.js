const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const multer = require("multer");
const { auth } = require("../middleware/auth");
const ffmpeg = require("fluent-ffmpeg");
const { Video } = require("../models/Video");
const { Subscriber } = require("../models/Subscriber");

// ffmpeg.setFfprobePath("C:\\FFmpeg\\bin\\ffprobe.exe");
// ffmpeg.setFfmpegPath("C:\\FFmpeg\\bin\\ffmpeg.exe");
//=================================
//             User
//=================================

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      return cb(res.status(400).send("Only mp4 file is allow"), false);
    }
    cb(null, true);
  },
});

var upload = multer({ storage: storage }).single("file");

router.post("/uploadfiles", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

// Thumbnail
router.post("/thumbnail", (req, res) => {
  let thumbsFilePath = "";
  let fileDuration = "";

  ffmpeg.ffprobe(req.body.filePath, function (err, data) {
    if (err) {
      console.log(err);
      return res.json({ success: false, err });
    }

    console.log(data);
    fileDuration = data.format.duration;
  });

  ffmpeg(req.body.filePath)
    .on("filenames", function (filenames) {
      thumbsFilePath = "uploads/thumbnails/" + filenames[0];
    })
    .on("end", function () {
      return res.json({
        success: true,
        thumbsFilePath: thumbsFilePath,
        fileDuration: fileDuration,
      });
    })
    .screenshots({
      count: 3,
      folder: "uploads/thumbnails",
      size: "320x240",
      // %b basename without extension
      filename: "thumbnail-%b.png",
    });
});

router.post("/uploadVideo", (req, res) => {
  const video = new Video(req.body);

  video.save((err, video) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
    });
  });
});

router.get("/getVideos", (req, res) => {
  Video.find()
    .populate("writer")
    .exec((err, videos) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, videos });
    });
});

router.post("/getVideo", (req, res) => {
  Video.findById(req.body.videoId)
    .populate("writer")
    .exec((err, video) => {
      if (err) return res.status(400).json(err);
      return res.status(200).json({ success: true, video });
    });
});

router.post("/getSubscriptionVideos", (req, res) => {
  // Find all users
  Subscriber.find({ userFrom: req.body.userFrom }).exec((err, subscribers) => {
    if (err) return res.status(400).json({ success: false, err });

    let subscriberUsersId = [];
    subscribers.map((subscriber) => {
      subscriberUsersId.push(subscriber.userTo);
    });
    Video.find({ writer: { $in: subscriberUsersId } }).exec((err, videos) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, videos });
    });
  });
});

module.exports = router;
