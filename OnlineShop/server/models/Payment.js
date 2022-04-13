const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const moment = require("moment");

const paymentSchema = mongoose.Schema(
  {
    user: {
        type: Array,
        default: []
    },
    data: {
        type: Array,
        default: []
    },
    product: {
        type: Array,
        default: []
    }
  },
  { timestaps: true }
);


const Payment = mongoose.model("Payment", paymentSchema);

module.exports = { Payment };
