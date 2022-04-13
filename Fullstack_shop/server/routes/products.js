const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const multer = require("multer");
const { auth } = require("../middleware/auth");
const path = require("path")
const {Product}  = require("../models/Product");
// import { response } from "express";

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext != ".jpg" && ext != ".png") {
      return cb(res.status(400).end("Only jpg and png are allowed", false));
    }
    cb(null, true);
  },
});

var upload = multer({ storage: storage }).single("ImageFile");
//=================================
//             Product
//=================================

router.post("/UploadImage", auth, (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.json({ success: false, err });
    return res.json({
      success: true,
      image: res.req.file.path,
      filename: res.req.file.fieldname,
    });
  });
});

router.post("/UploadProduct", auth, (req, res) => {
  // Save data to database
  const product = Product(req.body);

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/getProducts", (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = req.body.skip ? parseInt(req.body.skip) : 8;
  let search = req.body.search

  let findArgs = {}

  for (const key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        }
      } else {
        findArgs[key] = req.body.filters[key]
      }
    }
  }

  if (search) {
    Product.find(findArgs)
    .find({$text: search})
    .populate("writer")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, products) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, products, postSize: products.length });
    });  
  } else {
    Product.find(findArgs)
    .populate("writer")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, products) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, products, postSize: products.length });
    });
  }

  
});

module.exports = router;
