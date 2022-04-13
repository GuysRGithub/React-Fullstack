const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    hashed_password: {
      type: String,
      trim: true,
      required: true,
    },
    salt: String,
    role: {
      type: String,
      default: "Normal",
    },
    resetPasswordLink: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Virtual Password
userSchema
  .virtual("password")
  .set(function (password) {
    // Use normal, not arrow function to access this
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHash("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },

  authenticate: function (plainPassword) {
    return this.encryptPassword(plainPassword) === this.hashed_password;
  },
};

const User = mongoose.model("UserAuth", userSchema);
module.exports = User;
