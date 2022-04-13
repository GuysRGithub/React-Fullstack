const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const multer = require("multer");
const { auth } = require("../middleware/auth");
const path = require("path");
const { Product } = require("../models/Product");
// import { response } from "express";

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext != ".jpg" && ext != ".png") {
      return cb(res.status(400).end("Only jpg and png are allowed"), false);
    }
    cb(null, true);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext != ".jpg" && ext != ".png") {
    return cb(res.status(400).end("Only jpg and png are allowed"), false);
  }
  cb(null, true);
};

var upload = multer({ storage: storage, fileFilter: fileFilter }).single(
  "file"
);
//=================================
//             Product
//=================================

router.post("/UploadImage", auth, (req, res) => {
  console.log("Upload Image");

  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, err });
    }
    console.log("Hum", res.req.file);
    return res.json({
      success: true,
      image: res.req.file.path,
      filename: res.req.file.fieldname,
    });
  });
});

router.post("/UploadProduct", auth, (req, res) => {
  // Save data to database
  console.log("Upload Product");
  const product = Product(req.body);

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/getProducts", (req, res) => {
  console.log("Get Products");
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let search = req.body.search;

  console.log("limit", limit, skip);
  let findArgs = {};

  for (const key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  if (search) {
    Product.find(findArgs)
      // .regex($text, new RegExp(search, "i"))
      // .find({ $text: { $search: search} })
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .search(search, function (err, data) {
        console.log(data);
      })
      .exec((err, products) => {
        console.log(err);
        if (err) return res.status(400).json({ success: false, err });
        return res
          .status(200)
          .json({ success: true, products, postSize: products.length });
      });
  } else {
    Product.find(findArgs)
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        console.log("Search Args", products);

        if (err) return res.status(400).json({ success: false, err });
        return res
          .status(200)
          .json({ success: true, products, postSize: products.length });
      });
    // Product.find(findArgs)
    // .exec((err, products) => {
    //   console.log("Search Args", products);
    //   if (err) return res.status(400).json({ success: false, err });
    //     return res
    //       .status(200)
    //       .json({ success: true, products, postSize: products.length });
    // })
  }
});

// product_by_id?id=${productId}&type=single
router.get("/product_bys_id", (req, res) => {
  let type = req.query.type;
  let productId = req.query.id;
  if (type === "array") {
    let ids = req.query.id.split(",");
    productId = [...ids];
  }

  Product.find({ _id: { $in: productId } })
    .populate("writer")
    .exec((err, product) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(product);
    });
});

module.exports = router;
