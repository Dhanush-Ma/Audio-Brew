const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    preferences: {
      type: Array,
    },
    country: {
      type: String,
    },
    countryCode: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateJWT = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY);
  return token;
};

const Users = mongoose.model("Users", userSchema);

module.exports = { Users };
