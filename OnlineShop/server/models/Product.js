const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const moment = require("moment");

const productSchema = mongoose.Schema(
  {
    writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      maxlength: 50,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
      default: [],
    },
    continents: {
      type: Number,
      default: 1,
    },
    sold: {
      type: Number,
      maxlength: 100,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestaps: true }
);

productSchema.index(
  {
    title: "text",
    description: "text",
  },
  {
    weights: {
      title: 5,
      description: 1,
    },
  }
);

productSchema.statics = {
  searchPartial: function (q, callback) {
    return this.find(
      {
        $or: [
          { title: new RegExp(q, "gi") },
          { description: new RegExp(q, "gi") },
        ],
      },
      callback
    );
  },

  searchFull: function (q, callback) {
    return this.find(
      {
        $text: { $search: q, $caseSensitive: false },
      },
      callback
    );
  },

  search: function (q, callback) {
    this.searchFull(q, (err, data) => {
      if (err) return callback(err, data);
      if (!err && data.length) return callback(err, data);
      if (!err && data.length === 0) return this.searchPartial(q, callback);
    });
  },
};

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
