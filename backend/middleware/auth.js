const jwt = require("jsonwebtoken");
const { Users } = require("../models/User");

async function auth(req, res, next) {
  const userToken = req.header("x-auth-token");
  if (!userToken) return res.status(401).send("Access Denied");

  try {
    const loggedInUser = jwt.verify(userToken, process.env.JWT_SECRET_KEY);
    const user = await Users.findById(loggedInUser._id);
    const { _id, name, email, createdAt, preferences, country, countryCode } =
      user;
    req.user = {
      _id,
      name,
      email,
      createdAt,
      preferences,
      country,
      countryCode,
    };
    next();
  } catch (err) {
    console.log(err);
    res.status(400).send("Invalid Token");
  }
}

module.exports = auth;
