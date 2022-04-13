const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");
const { Subscriber } = require("../models/Subscriber");

//=================================
//             User
//=================================

router.post("/subscriberNumber", (req, res) => {
  Subscriber.find({ userTo: req.body.userTo }).exec((err, subscriber) => {
    if (err) return res.status(400).send(err);
    return res
      .status(200)
      .json({ success: true, subscriberNumber: subscriber.length });
  });
});

router.post("/subscribed", (req, res) => {
  Subscriber.find({
    userTo: req.body.userTo,
    userFrom: req.body.userFrom,
  }).exec((err, subscriber) => {
    if (err) {
      return res.status(400).send(err);
    }

    return res
      .status(200)
      .json({ success: true, subscribed: subscriber.length !== 0 });
  });
});

router.post("/subscribe", (req, res) => {
  const subscribe = new Subscriber(req.body);
  subscribe.save((err, _) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/unsubscribe", (req, res) => {
  // Subscriber.deleteOne({ "userTo": req.body.userTo, "userFrom": req.body.userFrom })
  Subscriber.findOneAndDelete({
    userTo: req.body.userTo,
    userFrom: req.body.userFrom,
  }).exec((err, _) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});


module.exports = router;
